import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

const meta: Array<[string, string]> = [
  ["Based in", "Indonesia"],
  ["Focus", "Creative Development"],
  ["Primary", "Web Development"],
  ["Interests", "Interaction · AI · Creative Coding · WebGL"],
  ["Currently", "Learning advanced WebGL"],
];

export function About() {
  return (
    <section id="about" className="border-t border-line px-5 py-24 md:px-8 md:py-36">
      <SectionLabel index="02" title="About" meta="The short version" />
      <div className="mt-12 grid gap-14 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <h2 className="text-[clamp(1.7rem,3.4vw,3rem)] font-medium leading-[1.18] tracking-tight">
            I'm a programmer interested in the space between <span className="text-muted">software</span>{" "}
            and <span className="text-accent">digital experience</span>.
          </h2>
          <p className="mt-10 max-w-xl text-base leading-relaxed text-muted">
            I build interfaces, tools and experiments for the web — mostly with React and TypeScript,
            increasingly with canvas, shaders, audio and computer vision. Interaction matters to me
            because it's the moment software stops being a document and starts being a conversation.
            The projects I find most interesting sit exactly on that line.
          </p>
        </Reveal>
        <div className="md:col-span-4 md:col-start-9">
          {meta.map(([k, v]) => (
            <Reveal key={k}>
              <div className="flex items-baseline justify-between gap-4 border-t border-line py-4 last:border-b">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">{k}</span>
                <span className="text-right text-sm">{v}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
