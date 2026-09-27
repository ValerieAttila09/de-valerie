import { ArrowUp } from "lucide-react";
import { scrollToTarget } from "@/lib/smooth";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer data-testid="footer" className="border-t border-line px-5 py-10 md:px-8">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-2xl font-semibold tracking-tight">
            VALERIE<span className="text-accent">.</span>
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            Creative Developer
          </p>
        </div>
        <div className="flex gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          <a href={site.github} target="_blank" rel="noreferrer" data-testid="footer-github" className="transition-colors hover:text-ink">
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" data-testid="footer-linkedin" className="transition-colors hover:text-ink">
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`} data-testid="footer-email" className="transition-colors hover:text-ink">
            Email
          </a>
        </div>
        <div className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          <span>© 2026 — Indonesia</span>
          <span className="hidden lg:inline">{site.footerStack}</span>
          <button
            data-testid="back-to-top"
            onClick={() => scrollToTarget(0)}
            className="flex items-center gap-2 text-ink transition-colors hover:text-accent"
          >
            Top <ArrowUp className="size-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
