import { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AudioProvider } from "./context/AudioContext";
import { SoundtrackProvider } from "./context/SoundtrackContext";
import { ThemeProvider } from "./context/ThemeContext";
import CakeIntro from "./components/CakeIntro";
import MusicControl from "./components/MusicControl";
import Navigation from "./components/Navigation";
import { pages, site } from "./data/content";
import About from "./pages/About";
import Architecture from "./pages/Architecture";
import Future from "./pages/Future";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Letter from "./pages/Letter";
import Loves from "./pages/Loves";
import MemoryLane from "./pages/MemoryLane";
import Surprise from "./pages/Surprise";

function Book() {
  const location = useLocation();
  const reduce = useReducedMotion();
  const showChrome = location.pathname !== "/" && location.pathname !== "/surprise";
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setEntered(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previous;
    const current = pages.find((page) => page.to === location.pathname);
    const label = location.pathname === "/" ? "Happy 22nd Birthday" : current?.title || "Happy Birthday";
    document.title = `${label} · ${site.name}`;
  }, [location.pathname]);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <AnimatePresence>
        {showChrome && <Navigation key="nav" />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.main
          id="content"
          key={location.pathname}
          initial={entered && !reduce ? { opacity: 0, y: 14 } : false}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 1 } : { opacity: 0, y: -10 }}
          transition={{ duration: reduce ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/memories" element={<MemoryLane />} />
            <Route path="/loves" element={<Loves />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/letter" element={<Letter />} />
            <Route path="/future" element={<Future />} />
            <Route path="/surprise" element={<Surprise />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {showChrome && (
            <footer className="px-4 pb-10 pt-6 text-center font-hand text-2xl text-muted">
              for {site.name}, with love · {site.birthdayLabel}
            </footer>
          )}
        </motion.main>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const finish = useCallback(() => setLoading(false), []);

  return (
    <ThemeProvider>
      <SoundtrackProvider>
        <AudioProvider>
          <Book />
          <MusicControl />
          <AnimatePresence>{loading && <CakeIntro key="cake" onDone={finish} />}</AnimatePresence>
        </AudioProvider>
      </SoundtrackProvider>
    </ThemeProvider>
  );
}
