import { ArrowUpRight, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { site } from "@/data/site";
import { apiGet } from "@/lib/api";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

interface GithubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  updated_at: string;
}

interface GithubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  url: string;
  public_repos: number;
  followers: number;
  following: number;
  total_stars: number;
  member_since: string;
}

interface RepoRow {
  name: string;
  desc: string;
  lang: string | null;
  url: string;
  stars: number | null;
  updated: string | null;
}

const fallbackRepos: RepoRow[] = [
  { name: "valerie.dev", desc: "This portfolio — editorial system, motion, structure.", lang: "TypeScript", url: site.github, stars: null, updated: null },
  { name: "chord-synth", desc: "Voice-led chord instrument on the Web Audio API.", lang: "TypeScript", url: site.github, stars: null, updated: null },
  { name: "hand-ui", desc: "Gesture-controlled interface components with MediaPipe.", lang: "TypeScript", url: site.github, stars: null, updated: null },
  { name: "noise-field", desc: "Curl-noise flow fields, in canvas and shader form.", lang: "GLSL", url: site.github, stars: null, updated: null },
];

export function GitHubSection() {
  const { data, isError } = useQuery({
    queryKey: ["github-repos"],
    queryFn: () => apiGet<GithubRepo[]>("/github/repos"),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });

  const { data: profile, isError: profileError } = useQuery({
    queryKey: ["github-profile"],
    queryFn: () => apiGet<GithubProfile>("/github/profile"),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });

  const live = !isError && !!data && data.length > 0;
  const showProfile = !profileError && !!profile;

  const stats: Array<[string, string, boolean?]> = showProfile
    ? [
        ["Repositories", String(profile!.public_repos)],
        ["Followers", String(profile!.followers)],
        ["Following", String(profile!.following)],
        ["Total Stars", String(profile!.total_stars), true],
      ]
    : [];
  const repos: RepoRow[] = live
    ? data!.map((r) => ({
        name: r.name,
        desc: r.description ?? "No description yet.",
        lang: r.language,
        url: r.url,
        stars: r.stars,
        updated: r.updated_at,
      }))
    : fallbackRepos;

  return (
    <section id="code" className="border-t border-line px-5 py-24 md:px-8 md:py-32">
      <SectionLabel
        index="08"
        title="Open Source"
        meta={live ? "Live — @ValerieAttila09" : "GitHub"}
      />
      <Reveal>
        <h2 className="mt-10 text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]">
          CODE
          <br />
          IN THE OPEN<span className="text-accent">.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          {live ? (
            <>
              <span className="size-1.5 animate-pulse-dot rounded-full bg-accent" />
              Pulled live from the GitHub API
            </>
          ) : (
            "Selected repositories"
          )}
        </p>
      </Reveal>
      {showProfile && (
        <Reveal delay={0.1}>
          <a
            href={profile!.url}
            target="_blank"
            rel="noreferrer"
            data-testid="github-stats-card"
            className="group mt-12 block"
          >
            <div className="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
              {stats.map(([label, value, accent]) => (
                <div key={label} data-testid={`github-stat-${label.toLowerCase().replace(/\s+/g, "-")}`} className="bg-bg p-6 md:p-8">
                  <p className="flex items-baseline gap-2 text-3xl font-semibold tracking-tight md:text-5xl">
                    {accent ? <Star className="size-4 self-center text-accent md:size-6" /> : null}
                    {value}
                  </p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border border-t-0 border-line px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted md:px-8">
              <span className="flex items-center gap-3">
                <img
                  src={profile!.avatar_url}
                  alt={`${profile!.login} GitHub avatar`}
                  loading="lazy"
                  className="size-6 rounded-full border border-line"
                />
                @{profile!.login}
              </span>
              <span className="flex items-center gap-3">
                Member since {profile!.member_since}
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </span>
            </div>
          </a>
        </Reveal>
      )}
      <div className="mt-14">
        {repos.map((r) => (
          <Reveal key={r.name}>
            <a
              href={r.url}
              target="_blank"
              rel="noreferrer"
              data-testid={`repo-${r.name}`}
              className="group grid grid-cols-12 items-baseline gap-4 border-t border-line py-6 last:border-b"
            >
              <span className="col-span-10 text-lg font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-3 md:col-span-3 md:text-xl">
                {r.name}
              </span>
              <span className="col-span-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:col-span-2">
                {r.lang ?? "—"}
              </span>
              <span className="col-span-12 text-sm leading-relaxed text-muted md:col-span-4">
                {r.desc}
              </span>
              <span className="col-span-10 flex items-center gap-4 font-mono text-[11px] text-muted md:col-span-2">
                {r.stars !== null && (
                  <span className="flex items-center gap-1.5">
                    <Star className="size-3 text-accent" />
                    {r.stars}
                  </span>
                )}
                {r.updated &&
                  formatDistanceToNow(new Date(r.updated), { addSuffix: true })}
              </span>
              <ArrowUpRight className="col-span-2 size-4 justify-self-end text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent md:col-span-1" />
            </a>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          data-testid="github-profile-link"
          className="group mt-10 inline-flex items-center gap-3 border-b border-line pb-1 font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:border-accent hover:text-ink"
        >
          All repositories on GitHub
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </a>
      </Reveal>
    </section>
  );
}
