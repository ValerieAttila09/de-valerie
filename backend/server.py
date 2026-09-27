import asyncio
import httpx
from contextlib import asynccontextmanager
from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
from lib.db import client, db, ensure_indexes


# Startup runs before the yield, shutdown after it. Add your own setup/teardown here.
@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.index_task = asyncio.create_task(ensure_indexes())  # background: a big index build must not block boot
    yield
    client.close()


# Create the main app without a prefix
app = FastAPI(lifespan=lifespan)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=4000)

class ContactMessage(ContactCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.model_dump())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactCreate):
    message = ContactMessage(**input.model_dump())
    _ = await db.contact_messages.insert_one(message.model_dump())
    return message

class GithubRepo(BaseModel):
    name: str
    description: str | None = None
    language: str | None = None
    stars: int = 0
    forks: int = 0
    url: str
    updated_at: str

GITHUB_CACHE_TTL_SECONDS = 600

@api_router.get("/github/repos", response_model=List[GithubRepo])
async def get_github_repos():
    username = os.environ["GITHUB_USERNAME"]
    now = datetime.now(timezone.utc)
    cached = await db.github_cache.find_one({"key": "repos"})
    if cached:
        fetched_at = cached["fetched_at"].replace(tzinfo=timezone.utc)
        if (now - fetched_at).total_seconds() < GITHUB_CACHE_TTL_SECONDS:
            return [GithubRepo(**r) for r in cached["repos"]]
    try:
        async with httpx.AsyncClient(
            timeout=10,
            headers={"Accept": "application/vnd.github+json", "User-Agent": "valerie-portfolio"},
        ) as http:
            res = await http.get(
                f"https://api.github.com/users/{username}/repos",
                params={"sort": "updated", "direction": "desc", "per_page": 6, "type": "public"},
            )
            res.raise_for_status()
            repos = [
                GithubRepo(
                    name=r["name"],
                    description=r.get("description"),
                    language=r.get("language"),
                    stars=r.get("stargazers_count", 0),
                    forks=r.get("forks_count", 0),
                    url=r["html_url"],
                    updated_at=r["updated_at"],
                )
                for r in res.json()
            ]
        await db.github_cache.update_one(
            {"key": "repos"},
            {"$set": {"key": "repos", "fetched_at": now, "repos": [r.model_dump() for r in repos]}},
            upsert=True,
        )
        return repos
    except Exception:
        if cached:
            return [GithubRepo(**r) for r in cached["repos"]]
        raise HTTPException(status_code=502, detail="GitHub API unavailable")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
