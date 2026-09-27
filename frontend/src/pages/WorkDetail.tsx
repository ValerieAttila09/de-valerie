import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import NotFound from "@/pages/NotFound";

const EASE: [number, number, number, number] = [0.77, 0, 0.175, 1];

export default function WorkDetail() {
  const { slug } = useParams();
  const idx = projects.findIndex((p) => p.id === slug);
  if (idx === -1) return <NotFound />;
  const project = projects[idx];
  const next = projects[(idx + 1) % projects.length];

  const meta: Array<[string, string]> = [
    ["Year", String(project.year)],
    ["Role", project.role.join(" + ")],
    ["Category", project.category],
    ["Stack", project.stack.join(", ")],
    ["Status", project.status],
  ];

  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="px-5 pb-32 pt-32 md:px-8"
    >
      <Link
        to="/#work"
        data-testid="back-to-work"
        className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-accent"
      >
        ← All work
      </Link>

      <header className="mt-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
          {String(idx + 1).padStart(2, "0")} / Case Study
        </p>
        <h1
          data-testid="work-title"
          className="mt-4 text-[clamp(3rem,9vw,9rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
        >
          {project.title}
          <span className="text-accent">.</span>
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted">{project.description}</p>
      </header>

      <dl className="mt-14 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-5">
        {meta.map(([k, v]) => (
          <div key={k} className="bg-bg p-5">
            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">{k}</dt>
            <dd className="mt-2 text-sm leading-snug">{v}</dd>
          </div>
        ))}
      </dl>

      <motion.figure
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: 1, delay: 0.3, ease: EASE }}
        className="mt-16 overflow-hidden"
      >
        <img
          src={project.image}
          alt={`${project.title} — ${project.category}`}
          className="aspect-[16/9] w-full object-cover"
        />
      </motion.figure>

      <div className="mt-24">
        {project.sections.map((s, i) => (
          <Reveal key={s.title}>
            <div className="grid gap-4 border-t border-line py-12 md:grid-cols-12">
              <div className="flex items-baseline gap-5 md:col-span-4">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted">{s.title}</h2>
              </div>
              <p className="text-lg leading-relaxed text-ink/85 md:col-span-7 md:col-start-6">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <Link
          to={next.href}
          data-cursor="view"
          data-testid="next-project"
          className="group mt-24 block border-t border-line pt-12"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">Next project</p>
          <p className="mt-4 text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-none tracking-tight transition-transform duration-500 group-hover:translate-x-4">
            {next.title}
            <span className="text-accent">.</span>
          </p>
        </Link>
      </Reveal>
    </motion.main>
  );
}
