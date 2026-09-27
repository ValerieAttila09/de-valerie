import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-svh flex-col items-start justify-center px-5 md:px-8"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">Error — 404</p>
      <h1
        data-testid="not-found-heading"
        className="mt-6 text-[clamp(2.8rem,10vw,10rem)] font-semibold leading-[0.92] tracking-[-0.03em]"
      >
        THIS PAGE
        <br />
        DOESN'T EXIST<span className="text-accent">.</span>
      </h1>
      <Link
        to="/"
        data-testid="not-found-home"
        className="mt-12 border-b border-line pb-1 font-mono text-xs uppercase tracking-[0.25em] text-muted transition-colors hover:border-accent hover:text-ink"
      >
        Return home
      </Link>
    </motion.main>
  );
}
