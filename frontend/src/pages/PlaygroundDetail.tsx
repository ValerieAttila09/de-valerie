import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { experiments } from "@/data/experiments";
import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import NotFound from "@/pages/NotFound";

const EASE: [number, number, number, number] = [0.77, 0, 0.175, 1];

export default function PlaygroundDetail() {
  const { slug } = useParams();
  const idx = experiments.findIndex((e) => e.id === slug);
  if (idx === -1) return <NotFound />;
  const exp = experiments[idx];
  const next = experiments[(idx + 1) % experiments.length];

  const notes: Array<[string, string]> = [
    ["What I was trying", exp.trying],
    ["What I learned", exp.learned],
    ["How it works", exp.howItWorks],
  ];

  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="px-5 pb-32 pt-32 md:px-8"
    >
      <Link
        to="/#playground"
        data-testid="back-to-playground"
        className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-accent"
      >
        ← Playground
      </Link>

      <header className="mt-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
          {exp.index} — {exp.year}
        </p>
        <h1
          data-testid="experiment-title"
          className="mt-4 text-[clamp(2.6rem,8vw,8rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
        >
          {exp.title}
          <span className="text-accent">.</span>
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted">{exp.description}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {exp.tech.map((t) => (
            <span
              key={t}
              className="border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      <motion.figure
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: 1, delay: 0.3, ease: EASE }}
        className="mt-16 overflow-hidden"
      >
        <img
          src={exp.image}
          alt={`${exp.title} experiment visual`}
          className="aspect-[16/9] w-full object-cover"
        />
      </motion.figure>

      <div className="mt-24">
        {notes.map(([title, body], i) => (
          <Reveal key={title}>
            <div className="grid gap-4 border-t border-line py-12 md:grid-cols-12">
              <div className="flex items-baseline gap-5 md:col-span-4">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted">{title}</h2>
              </div>
              <p className="text-lg leading-relaxed text-ink/85 md:col-span-7 md:col-start-6">{body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-16 flex flex-wrap gap-4">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            data-testid="experiment-demo-link"
            className="group flex items-center gap-3 border border-line-strong px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-bg"
          >
            Live demo
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            data-testid="experiment-source-link"
            className="group flex items-center gap-3 border border-line px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-colors duration-300 hover:border-line-strong hover:text-ink"
          >
            Source code
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </Reveal>

      <Reveal>
        <Link
          to={next.href}
          data-cursor="explore"
          data-testid="next-experiment"
          className="group mt-24 block border-t border-line pt-12"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">Next experiment</p>
          <p className="mt-4 text-[clamp(2.2rem,6vw,5rem)] font-semibold leading-none tracking-tight transition-transform duration-500 group-hover:translate-x-4">
            {next.title}
            <span className="text-accent">.</span>
          </p>
        </Link>
      </Reveal>
    </motion.main>
  );
}
