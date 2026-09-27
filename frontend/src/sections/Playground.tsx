import { Link } from "react-router-dom";
import { experiments } from "@/data/experiments";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

const spans = ["md:col-span-7", "md:col-span-5 md:mt-24", "md:col-span-5", "md:col-span-7 md:-mt-10"];

export function Playground() {
  return (
    <section id="playground" className="border-t border-line px-5 py-24 md:px-8 md:py-36">
      <SectionLabel index="05" title="Playground" meta="No client, no brief" />
      <Reveal>
        <h2 className="mt-10 text-[clamp(2.6rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]">
          EXPERIMENTAL
          <br />
          <span className="text-stroke">PLAYGROUND</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-8 max-w-md text-sm leading-relaxed text-muted">
          What I build when there is no client, no brief and no deadline. Small proofs of curiosity —
          each one taught me something the polished projects couldn't.
        </p>
      </Reveal>
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
        {experiments.map((e, i) => (
          <Reveal key={e.id} className={spans[i % spans.length]} delay={0.05 * i}>
            <Link
              to={e.href}
              data-cursor="explore"
              data-testid={`experiment-card-${e.id}`}
              className="group block"
            >
              <div className="relative overflow-hidden border border-line">
                <img
                  src={e.image}
                  alt={`${e.title} — ${e.tech.join(", ")} experiment`}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:rotate-[0.6deg] group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 bg-bg/70 px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-ink/90 backdrop-blur-sm">
                  {e.index}
                </span>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-medium tracking-tight transition-colors duration-300 group-hover:text-accent md:text-2xl">
                  {e.title}
                </h3>
                <span className="font-mono text-[11px] text-muted">{e.year}</span>
              </div>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {e.tech.join(" / ")}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
