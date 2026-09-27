import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

type Variant = "default" | "link" | "view" | "explore" | "drag";

const LABELS: Record<Variant, string> = {
  default: "",
  link: "",
  view: "View Project",
  explore: "Explore",
  drag: "Drag",
};

export function Cursor() {
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
  const reduced = useReducedMotion();
  const [variant, setVariant] = useState<Variant>("default");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 550, damping: 45, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 550, damping: 45, mass: 0.4 });

  useEffect(() => {
    if (!enabled || reduced) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const tagged = t?.closest?.("[data-cursor]") as HTMLElement | null;
      if (tagged) {
        setVariant((tagged.dataset.cursor as Variant) || "default");
        return;
      }
      const interactive = t?.closest?.("a, button, input, textarea, select, label");
      setVariant(interactive ? "link" : "default");
    };
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
    };
  }, [enabled, reduced, x, y]);

  if (!enabled || reduced) return null;

  const label = LABELS[variant];

  return (
    <motion.div
      aria-hidden
      data-testid="custom-cursor"
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={variant}
      variants={{
        default: { width: 10, height: 10, backgroundColor: "rgba(200,255,0,1)", border: "0px solid rgba(200,255,0,0)" },
        link: { width: 42, height: 42, backgroundColor: "rgba(200,255,0,0)", border: "1px solid rgba(200,255,0,0.55)" },
        view: { width: 92, height: 92, backgroundColor: "rgba(200,255,0,1)", border: "0px solid rgba(200,255,0,0)" },
        explore: { width: 92, height: 92, backgroundColor: "rgba(200,255,0,1)", border: "0px solid rgba(200,255,0,0)" },
        drag: { width: 76, height: 76, backgroundColor: "rgba(200,255,0,1)", border: "0px solid rgba(200,255,0,0)" },
      }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      {label ? (
        <span className="px-2 text-center font-mono text-[9px] font-medium uppercase leading-tight tracking-[0.14em] text-bg">
          {label}
        </span>
      ) : null}
    </motion.div>
  );
}
