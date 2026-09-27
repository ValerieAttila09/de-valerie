import { capabilities } from "@/data/skills";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

export function Capabilities() {
  return (
    <section id="capabilities" className="border-t border-line px-5 py-24 md:px-8 md:py-36">
      <SectionLabel index="03" title="Capabilities" meta="What I do" />
      <div className="mt-14">
        {capabilities.map((c) => (
          <Reveal key={c.index}>
            <div
              tabIndex={0}
              data-testid={`capability-row-${c.index}`}
              className="group border-t border-line outline-none last:border-b"
            >
              <div className="flex items-baseline gap-6 py-6 md:gap-10 md:py-8">
                <span className="font-mono text-xs text-muted transition-colors duration-300 group-hover:text-accent group-focus-within:text-accent">
                  {c.index}
                </span>
                <h3 className="text-2xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-3 group-focus-within:translate-x-3 md:text-4xl">
                  {c.title}
                </h3>
              </div>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <div className="max-w-2xl pb-8 pl-12 md:pl-[4.5rem]">
                    <p className="text-sm leading-relaxed text-muted">{c.description}</p>
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted/70">
                      {c.tags.join(" / ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
