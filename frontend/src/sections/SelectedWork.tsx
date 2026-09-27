import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

const EASE: [number, number, number, number] = [0.77, 0, 0.175, 1];

function ProjectRow({ project, index, flip }: { project: Project; index: number; flip: boolean }) {
  return (
    <Reveal>
      <Link
        to={project.href}
        data-cursor="view"
        data-testid={`project-row-${project.id}`}
        className="group grid grid-cols-1 gap-8 border-t border-line py-10 last:border-b md:grid-cols-12 md:gap-6 md:py-14"
      >
        <div className={`flex flex-col justify-between md:col-span-5 ${flip ? "md:order-2" : ""}`}>
          <div className="flex items-start justify-between">
            <span className="font-mono text-xs text-muted transition-colors duration-300 group-hover:text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <ArrowUpRight className="size-4 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
          </div>
          <div>
            <h3 className="mt-8 text-4xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-3 md:text-6xl">
              {project.title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{project.description}</p>
            <div className="mt-6 space-y-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <p>{project.category}</p>
              <p>
                {project.year} — {project.stack.join(" / ")}
              </p>
            </div>
          </div>
        </div>
        <div className={`md:col-span-7 ${flip ? "md:order-1" : ""}`}>
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 1, ease: EASE }}
            className="aspect-[3/2] overflow-hidden"
          >
            <motion.img
              src={project.image}
              alt={`${project.title} — ${project.category}`}
              loading="lazy"
              initial={{ scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 1.4, ease: EASE }}
              className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </motion.div>
        </div>
      </Link>
    </Reveal>
  );
}

export function SelectedWork() {
  return (
    <section id="work" className="px-5 py-24 md:px-8 md:py-36">
      <SectionLabel index="01" title="Selected Work" meta="2024 — 2026" />
      <Reveal>
        <h2 className="mt-10 text-[clamp(2.6rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]">
          SELECTED
          <br />
          WORK
        </h2>
      </Reveal>
      <div className="mt-16 md:mt-24">
        {projects.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
