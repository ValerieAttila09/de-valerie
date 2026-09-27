# PRD — Valerie: Creative Developer Portfolio

## Original problem statement
"Tolong buatkan saya website portofolio dengan keterangan dan penjelasan yang ada di file yang saya berikan ini" — file: `prompt-ai-portfolio.md`, a 70-section spec for an editorial-minimalist, typography-driven personal portfolio ("Valerie — Creative Developer"), inspired by bleibtgleich.dev principles (dark #0D0D0D, ink #F4F4F0, muted #85857F, accent #C8FF00, 12-col grid, restrained motion, experimental playground).

## User choices (2026-09-27)
- Sample project content from the spec's examples (Northstar, MediaPipe, Music Player…) — replaceable later.
- Placeholder contact links (hello@valerie.dev, @valerie) — to be replaced with real ones.
- Scope: full one-page site + project & experiment detail pages.
- Stack: existing React (Vite) + FastAPI + MongoDB instead of Next.js — all design principles applied on this stack. Motion via `motion` (Framer Motion) + Lenis smooth scroll.

## Architecture
- Frontend: Vite + React 19 + TS strict, Tailwind v4 tokens, `motion/react` animations, Lenis momentum scroll, custom cursor (desktop only), magnetic buttons, masked line-by-line hero reveal, clip-path image reveals, marquee, film-grain overlay.
- Pages: `/` (Hero, Selected Work, About, Capabilities, Tech Stack, Playground, Experience, Now, Open Source, Contact, Footer), `/work/:slug` (case studies), `/playground/:slug` (experiment notes), `*` 404.
- Data: `src/data/{site,projects,experiments,experience,skills}.ts` — content is data-driven, not hardcoded in JSX.
- Backend: FastAPI `/api` router; `POST /api/contact` validates (Pydantic + EmailStr) and stores messages in MongoDB `contact_messages`. Status endpoints kept from template.

## User personas
- Recruiter/creative director scanning work quality fast.
- Fellow developer inspecting technical depth (case studies, experiment write-ups).
- Potential client using the contact form.

## Implemented (2026-09-27)
- Preloader (time-based counter, ~1.1s, reduced-motion aware) with clip-path exit.
- Editorial nav (scroll-shrink, blur, mobile full-screen menu) + custom cursor states (default/link/view/explore) + magnetic CTA.
- Hero: masked line reveal "CREATIVE DEVELOPER.", stroke "V" mouse parallax, scroll parallax fade.
- Selected Work: 4 projects, alternating editorial rows, clip-path/scale image reveals.
- Case study pages: metadata grid + 6 numbered sections + next-project link.
- About, Capabilities (hover-expand rows), Tech Stack, Playground (irregular grid, 4 experiments), Experience, Now (building/learning/exploring), Open Source repos, Contact (links + working form with toast), Footer, 404.
- AI-generated on-brand project/experiment imagery (8 assets).
- SVG favicon "V." mark matching the wordmark.

## Implemented (2026-09-27, iteration 2 — GitHub Live)
- `GET /api/github/repos`: fetches 6 most-recently-updated public repos of the real account **ValerieAttila09** via GitHub public API (no token), cached in MongoDB `github_cache` for 10 min, stale-cache fallback on API failure, 502 when no cache.
- `GITHUB_USERNAME=ValerieAttila09` added to backend/.env.
- Open Source section: live repo rows (name, language, stars, relative "updated … ago", link to repo), "Pulled live from the GitHub API" indicator with pulse dot, "All repositories on GitHub" profile link; graceful fallback to sample list if the API is unreachable (static-CDN safe).
- site.ts github URL now points to the real profile (footer/contact/detail links follow).

## Implemented (2026-09-27, iteration 3 — GitHub Stats Card)
- `GET /api/github/profile`: profile summary of ValerieAttila09 (repos, followers, following, total stars summed across up to 100 public repos, member-since year, avatar), same 10-min Mongo cache + stale fallback pattern.
- Stats card above the repo list: 4 editorial stat cells (Repositories / Followers / Following / Total Stars with accent star) + strip with avatar, @login and "Member since 2024", whole card links to the GitHub profile. Hidden gracefully if the API is unreachable.

## Verified
- `yarn typecheck` clean; `python -c 'import server'` ok.
- curl: `GET /api/` 200, `POST /api/contact` persists + returns doc, invalid body → 422.
- Browser pass via public URL: preloader → hero → work rows → case study navigation → contact form submit shows success toast. Mobile 390px hero + menu checked.

## Backlog (prioritized)
- P0: Replace placeholder contact email/LinkedIn with real ones; real project images & copy in src/data/*.
- P1: Live interactive demos inside `/playground/:slug` (particle field & chord synth can run real code in-browser).
- P1: Tambahkan deskripsi repo di GitHub agar tidak tampil "No description yet" (di sisi GitHub, bukan kode).
- P2: Admin inbox page for contact messages (GET endpoint + simple auth).
- P2: Open Graph share image, sitemap/robots, per-page meta.
- P2: Lighthouse/performance pass (image preloads, font subsetting).

## Next tasks
1. Collect real links/projects from user, swap into `src/data/*`.
2. Build one real playable experiment (chord synth) as Playground highlight.
3. Optional: contact-message inbox + email notification (Resend).
