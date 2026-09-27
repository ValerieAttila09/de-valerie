import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { ContactForm } from "@/components/ContactForm";

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "GitHub", value: "@valerie", href: site.github },
  { label: "LinkedIn", value: "/in/valerie", href: site.linkedin },
];

export function Contact() {
  return (
    <section id="contact" className="border-t border-line px-5 py-24 md:px-8 md:py-36">
      <SectionLabel index="09" title="Contact" meta="Open for projects" />
      <Reveal>
        <h2 className="mt-10 text-[clamp(3rem,9vw,9rem)] font-semibold leading-[0.92] tracking-[-0.03em]">
          LET'S BUILD
          <br />
          SOMETHING<span className="text-accent">.</span>
        </h2>
      </Reveal>
      <div className="mt-16 grid gap-16 md:grid-cols-12 md:mt-24">
        <Reveal className="md:col-span-5">
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Have an idea, a project, or a strange technical problem that needs someone who cares about
            both the code and the craft? My inbox is open.
          </p>
          <div className="mt-10">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                data-testid={`contact-link-${c.label.toLowerCase()}`}
                className="group flex items-center justify-between gap-4 border-t border-line py-5 last:border-b"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                  {c.label}
                </span>
                <span className="flex items-center gap-3 text-lg font-medium tracking-tight md:text-xl">
                  {c.value}
                  <ArrowUpRight className="size-4 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
                </span>
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
