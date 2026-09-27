import { skillGroups } from "@/data/skills";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

export function TechStack() {
  return (
    <section id="stack" className="border-t border-line px-5 py-24 md:px-8 md:py-36">
      <SectionLabel index="04" title="Tech Stack" meta="Tools, not trophies" />
      <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-5">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.06}>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{g.title}</h3>
            <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
              {g.items.map((item) => (
                <li key={item} className="text-sm md:text-base">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
