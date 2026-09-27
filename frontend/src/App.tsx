import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import WorkDetail from "@/pages/WorkDetail";
import PlaygroundDetail from "@/pages/PlaygroundDetail";
import NotFound from "@/pages/NotFound";
import { Preloader } from "@/components/Preloader";
import { Cursor } from "@/components/Cursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LoaderContext } from "@/lib/loader";
import { initLenis } from "@/lib/smooth";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => initLenis(), []);

  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <LoaderContext.Provider value={loaded}>
      <AnimatePresence>
        {!loaded && <Preloader key="preloader" onDone={() => setLoaded(true)} />}
      </AnimatePresence>
      <Cursor />
      <Navbar />
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<WorkDetail />} />
        <Route path="/playground/:slug" element={<PlaygroundDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster position="bottom-right" />
      <div aria-hidden className="grain" />
    </LoaderContext.Provider>
  );
}
