import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Hero } from "@/sections/Hero";
import { SelectedWork } from "@/sections/SelectedWork";
import { About } from "@/sections/About";
import { Capabilities } from "@/sections/Capabilities";
import { TechStack } from "@/sections/TechStack";
import { Playground } from "@/sections/Playground";
import { Experience } from "@/sections/Experience";
import { Currently } from "@/sections/Currently";
import { GitHubSection } from "@/sections/GitHubSection";
import { Contact } from "@/sections/Contact";
import { Marquee } from "@/components/Marquee";
import { scrollToTarget } from "@/lib/smooth";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const t = window.setTimeout(() => scrollToTarget(location.hash), 400);
      return () => window.clearTimeout(t);
    }
  }, [location.hash]);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Hero />
      <Marquee items={["Creative Development", "Interaction Design", "Web Engineering", "Motion & Detail"]} />
      <SelectedWork />
      <About />
      <Capabilities />
      <TechStack />
      <Playground />
      <Experience />
      <Currently />
      <GitHubSection />
      <Marquee items={["Have an idea?", "Let's make it real", "Open for projects 2026"]} />
      <Contact />
    </motion.main>
  );
}
