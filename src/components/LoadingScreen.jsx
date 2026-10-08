import { useEffect } from "react";
import { motion } from "framer-motion";
import { SleepingCat, Sunflower } from "./illustrations";
import { site } from "../data/content";

export default function LoadingScreen({ onDone }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(onDone, reduce ? 500 : 2300);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.button
      type="button"
      onClick={onDone}
      className="fixed inset-0 z-[90] flex cursor-pointer flex-col items-center justify-center bg-cream px-6 text-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Opening your birthday book. Activate to skip."
    >
      <Sunflower className="sway h-36 w-auto" />
      <p className="mt-2 font-hand text-4xl text-ink sm:text-5xl">opening your birthday book</p>
      <p className="mt-1 font-serif text-xl italic text-muted">made for {site.name}</p>
      <div className="mt-6 h-0.5 w-40 overflow-hidden rounded-full bg-beige">
        <div className="load-bar" />
      </div>
      <SleepingCat className="mt-6 h-16 w-auto opacity-80" />
      <span className="mt-4 font-hand text-2xl text-muted">tap to open</span>
    </motion.button>
  );
}
