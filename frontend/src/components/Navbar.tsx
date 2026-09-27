import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { LoaderContext } from "@/lib/loader";

const EASE: [number, number, number, number] = [0.77, 0, 0.175, 1];

const links = [
  { label: "Work", to: "/#work" },
  { label: "Playground", to: "/#playground" },
  { label: "About", to: "/#about" },
  { label: "Contact", to: "/#contact" },
];

export function Navbar() {
  const loaded = useContext(LoaderContext);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -90 }}
        animate={{ y: loaded ? 0 : -90 }}
        transition={{ duration: 0.8, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
          scrolled ? "border-b border-line bg-bg/80 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <nav
          className={`flex items-center justify-between px-5 transition-[padding] duration-500 md:px-8 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          <Link to="/" data-testid="nav-home-link" className="text-sm font-semibold tracking-tight">
            VALERIE<span className="text-accent">©</span>
          </Link>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.3em] text-muted md:block">
            Creative Developer
          </span>
          <div className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                className="group relative font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-ink"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-[width] duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
          <button
            data-testid="nav-menu-button"
            onClick={() => setOpen((v) => !v)}
            className="font-mono text-[11px] uppercase tracking-[0.25em] md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg px-6 md:hidden"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: EASE }}
              >
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block border-t border-line py-5 text-4xl font-medium tracking-tight"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
