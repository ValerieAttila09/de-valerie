import { currently } from "@/data/experience";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

export function Currently() {
  return (
    <section id="now" className="border-t border-line px-5 py-24 md:px-8 md:py-32">
      <SectionLabel index="07" title="Now" meta="Updated 2026" />
      <Reveal className="mt-12">
        <div className="grid gap-px border border-line bg-line md:grid-cols-3">
          {currently.map((c) => (
            <div key={c.label} data-testid={`now-${c.label.toLowerCase()}`} className="bg-bg p-8">
              <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                <span className="size-1.5 animate-pulse-dot rounded-full bg-accent" />
                {c.label}
              </p>
              <p className="mt-6 text-2xl font-medium tracking-tight">{c.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.sub}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
