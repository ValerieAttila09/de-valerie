import Lenis from "lenis";

let lenis: Lenis | null = null;

export function initLenis(): () => void {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return () => {};
  lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: true });
  let raf = 0;
  const loop = (time: number) => {
    lenis?.raf(time);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => {
    cancelAnimationFrame(raf);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToTarget(target: string | number) {
  if (lenis) {
    lenis.scrollTo(target, { offset: typeof target === "string" ? -72 : 0 });
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}
