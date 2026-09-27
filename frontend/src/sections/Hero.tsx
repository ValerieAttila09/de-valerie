import { useContext, useRef } from "react";
import type { ReactNode, RefObject } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { LoaderContext } from "@/lib/loader";
import { scrollToTarget } from "@/lib/smooth";
import { Magnetic } from "@/components/Magnetic";

const EASE: [number, number, number, number] = [0.77, 0, 0.175, 1];

function MaskedLine({
  children,
  delay,
  started,
}: {
  children: ReactNode;
  delay: number;
  started: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block will-change-transform"
        initial={reduced ? false : { y: "112%" }}
        animate={started || reduced ? { y: "0%" } : undefined}
        transition={{ duration: 0.95, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const loaded = useContext(LoaderContext);
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref as RefObject<HTMLElement>,
    offset: ["start start", "end start"],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 55, damping: 18 });
  const py = useSpring(my, { stiffness: 55, damping: 18 });
  const pxInv = useTransform(px, (v) => -v * 0.45);
  const pyInv = useTransform(py, (v) => -v * 0.45);

  const onMove = (e: React.MouseEvent) => {
    mx.set((e.clientX / window.innerWidth - 0.5) * 48);
    my.set((e.clientY / window.innerHeight - 0.5) * 48);
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-svh flex-col justify-between overflow-hidden px-5 pb-8 pt-28 md:px-8"
    >
      <motion.span
        aria-hidden
        style={{ x: px, y: py }}
        className="text-stroke pointer-events-none absolute -right-[8vw] top-[6vh] select-none text-[42vw] font-bold leading-none"
      >
        V
      </motion.span>

      <motion.div
        style={{ opacity: fade }}
        className="relative flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-muted"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : undefined}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          Portfolio — 2026
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : undefined}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="hidden items-center gap-2 md:flex"
        >
          <span className="size-1.5 animate-pulse-dot rounded-full bg-accent" />
          Available for work
        </motion.span>
      </motion.div>

      <motion.div style={{ y: headingY, opacity: fade }} className="relative">
        <motion.p
          style={{ x: pxInv, y: pyInv }}
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : undefined}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-muted"
        >
          Valerie — Software × Design
        </motion.p>
        <h1
          data-testid="hero-heading"
          className="text-[clamp(3.2rem,11.5vw,11rem)] font-semibold leading-[0.92] tracking-[-0.03em]"
        >
          <MaskedLine started={loaded} delay={0.1}>
            CREATIVE
          </MaskedLine>
          <MaskedLine started={loaded} delay={0.22}>
            DEVELOPER<span className="text-accent">.</span>
          </MaskedLine>
        </h1>
        <div className="mt-10 flex justify-start md:justify-end">
          <motion.p
            initial={{ y: 24, opacity: 0 }}
            animate={loaded ? { y: 0, opacity: 1 } : undefined}
            transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
            className="max-w-sm font-mono text-xs uppercase leading-relaxed tracking-[0.18em] text-muted"
          >
            I build digital experiences where code, design and interaction meet.
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : undefined}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="relative flex items-end justify-between border-t border-line pt-5"
      >
        <Magnetic>
          <button
            data-testid="hero-scroll-cta"
            onClick={() => scrollToTarget("#work")}
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-ink"
          >
            <span className="relative flex h-8 w-px overflow-hidden bg-line">
              <motion.span
                className="absolute left-0 top-0 h-3 w-px bg-accent"
                animate={{ y: [-12, 32] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            Scroll to explore
          </button>
        </Magnetic>
        <div className="flex gap-8 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          <span className="hidden sm:inline">Based in Indonesia</span>
          <span>Building for the web</span>
        </div>
      </motion.div>
    </section>
  );
}
