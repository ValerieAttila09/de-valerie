import { experience } from "@/data/experience";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

export function Experience() {
  return (
    <section id="experience" className="border-t border-line px-5 py-24 md:px-8 md:py-32">
      <SectionLabel index="06" title="Experience" meta="2024 — Now" />
      <div className="mt-12">
        {experience.map((e) => (
          <Reveal key={e.year}>
            <div className="grid grid-cols-12 items-baseline gap-4 border-t border-line py-7 last:border-b">
              <span className="col-span-3 font-mono text-xs text-muted md:col-span-2">{e.year}</span>
              <h3 className="col-span-9 text-xl font-medium tracking-tight md:col-span-4 md:text-2xl">
                {e.title}
              </h3>
              <p className="col-span-12 text-sm leading-relaxed text-muted md:col-span-6">{e.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
