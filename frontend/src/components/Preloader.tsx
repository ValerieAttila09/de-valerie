import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    const start = performance.now();
    const t = window.setInterval(() => {
      setCount(Math.min(100, Math.floor((performance.now() - start) / 11)));
    }, 40);
    return () => window.clearInterval(t);
  }, [reduced, onDone]);

  useEffect(() => {
    if (count >= 100) {
      const t = window.setTimeout(onDone, 320);
      return () => window.clearTimeout(t);
    }
  }, [count, onDone]);

  return (
    <motion.div
      data-testid="preloader"
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-bg px-5 py-6 md:px-8"
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
    >
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
        <span>Valerie — Portfolio</span>
        <span>© 2026</span>
      </div>
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-2xl font-medium tracking-tight md:text-4xl">VALERIE</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            Creative Developer
          </p>
        </div>
        <p className="font-mono text-6xl font-medium tabular-nums leading-none md:text-8xl">
          {count}
          <span className="text-accent">%</span>
        </p>
      </div>
    </motion.div>
  );
}
