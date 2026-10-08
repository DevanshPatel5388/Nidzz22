import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import FallingPetals from "../components/FallingPetals";
import PianoToggle from "../components/PianoToggle";
import ThemeToggle from "../components/ThemeToggle";
import { SleepingCat, Sunflower } from "../components/illustrations";
import { site } from "../data/content";

const stems = [120, 160, 140, 190, 150, 170, 130, 180];

export default function Surprise() {
  const reduce = useReducedMotion();
  const rise = reduce ? { duration: 0 } : { duration: 1.15, ease: [0.22, 1, 0.36, 1] };

  return (
    <section className="sunset relative min-h-[100svh] overflow-hidden">
      <div className="pointer-events-none absolute bottom-8 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#fff6d2] shadow-[0_0_70px_28px_rgba(255,220,150,0.85)]" />
      <FallingPetals count={20} />

      <div className="absolute right-4 top-4 z-20 flex items-center gap-2 sm:right-6 sm:top-6">
        <PianoToggle />
        <ThemeToggle />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center px-6 pb-36 pt-24 text-center">
        <motion.p
          className="sunset-ink font-serif text-3xl italic leading-snug sm:text-4xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...rise, delay: reduce ? 0 : 0.45 }}
        >
          Thank you for being part of my story.
        </motion.p>
        <motion.h1
          className="sunset-ink text-balance mt-6 font-hand text-5xl leading-[0.92] sm:text-7xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...rise, delay: reduce ? 0 : 2 }}
        >
          Happy Birthday, {site.name} ❤️
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 3.2, duration: reduce ? 0 : 0.6 }}
        >
          <Link
            to="/home"
            className="book-btn lift mt-10 inline-flex rounded-full bg-paper px-7 py-3 font-hand text-3xl text-paper-ink"
          >
            Start Again
            <span className="dogear" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-center">
        {stems.map((height, index) => (
          <Sunflower
            key={height + index}
            className="sway -mx-2 w-auto"
            style={{ height, animationDelay: `${index * -0.35}s` }}
          />
        ))}
        <SleepingCat className="absolute bottom-2 left-[6%] h-20 w-auto sm:left-[16%] sm:h-28" />
      </div>
    </section>
  );
}
