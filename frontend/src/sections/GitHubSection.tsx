import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

const repos = [
  { name: "valerie.dev", lang: "TypeScript", desc: "This portfolio — editorial system, motion, structure." },
  { name: "chord-synth", lang: "TypeScript", desc: "Voice-led chord instrument on the Web Audio API." },
  { name: "hand-ui", lang: "TypeScript", desc: "Gesture-controlled interface components with MediaPipe." },
  { name: "noise-field", lang: "GLSL", desc: "Curl-noise flow fields, in canvas and shader form." },
];

export function GitHubSection() {
  return (
    <section id="code" className="border-t border-line px-5 py-24 md:px-8 md:py-32">
      <SectionLabel index="08" title="Open Source" meta="GitHub" />
      <Reveal>
        <h2 className="mt-10 text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]">
          CODE
          <br />
          IN THE OPEN<span className="text-accent">.</span>
        </h2>
      </Reveal>
      <div className="mt-14">
        {repos.map((r) => (
          <Reveal key={r.name}>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              data-testid={`repo-${r.name}`}
              className="group grid grid-cols-12 items-baseline gap-4 border-t border-line py-6 last:border-b"
            >
              <span className="col-span-10 text-lg font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-3 md:col-span-4 md:text-xl">
                {r.name}
              </span>
              <span className="col-span-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:col-span-2">
                {r.lang}
              </span>
              <span className="col-span-12 text-sm leading-relaxed text-muted md:col-span-5">
                {r.desc}
              </span>
              <ArrowUpRight className="col-span-2 size-4 justify-self-end text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent md:col-span-1" />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
