import { motion } from "framer-motion";
import { Pencil, Ruler } from "../components/illustrations";
import { site } from "../data/content";

function BuildingSketch() {
  const line = (d, delay = 0) => (
    <path className="sketch-line" pathLength="1" d={d} style={{ animationDelay: `${delay}s` }} />
  );

  return (
    <svg viewBox="0 0 980 430" className="h-auto w-full text-[#35586d] dark:text-[#d5e6f0]" role="img" aria-label="A hand-drawn row of buildings">
      <path d="M40 360h900" className="sketch-line" pathLength="1" />
      <path d="M70 250h160" className="sketch-line" pathLength="1" style={{ animationDelay: "0.1s" }} />
      {line("M90 360V250h120v110", 0.15)}
      {line("M78 250 150 176l72 74", 0.25)}
      {line("M132 360v-58h28v58", 0.35)}
      {line("M104 274h22v22h-22z", 0.4)}
      {line("M168 274h22v22h-22z", 0.45)}
      {line("M115 285h0.1M179 285h0.1", 0.5)}
      <path d="M115 274v22M104 285h22M168 274v22M168 285h22" className="sketch-line" pathLength="1" style={{ animationDelay: "0.55s" }} />
      <circle cx="154" cy="332" r="2" fill="currentColor" />

      {line("M300 360V150h180v210", 0.2)}
      {line("M286 168h208", 0.3)}
      {line("M318 168 390 108l72 60", 0.4)}
      {line("M332 360v-70h48v70", 0.5)}
      {line("M356 290v-28c0-10 24-10 24 0v28", 0.6)}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={318 + col * 48}
            y={186 + row * 34}
            width="22"
            height="18"
            className="sketch-line"
            pathLength="1"
            style={{ animationDelay: `${0.3 + row * 0.08}s` }}
          />
        )),
      )}

      {line("M560 360V200h210v160", 0.25)}
      {line("M770 270h120v90", 0.4)}
      {line("M548 214h234", 0.35)}
      {Array.from({ length: 4 }, (_, col) =>
        Array.from({ length: 3 }, (_, row) => (
          <rect
            key={`m-${col}-${row}`}
            x={584 + col * 44}
            y={230 + row * 36}
            width="24"
            height="20"
            className="sketch-line"
            pathLength="1"
            style={{ animationDelay: `${0.45 + col * 0.05}s` }}
          />
        )),
      )}

      <g transform="translate(820 300)">
        <path d="M30 60c-1 0-2-28-1-48" stroke="#6f8f5c" strokeWidth="2" fill="none" />
        <circle cx="28" cy="8" r="10" fill="#f0c14b" />
        <circle cx="28" cy="8" r="4" fill="#6b4f3a" />
      </g>

      <g transform="translate(860 54)" fill="none" stroke="currentColor">
        <circle r="26" strokeWidth="1.4" />
        <path d="M0 16V-18" strokeWidth="1.4" />
        <path d="M-6 -8 0-18 6-8" strokeWidth="1.4" />
        <text y="-32" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="Caveat, cursive" fontSize="16">N</text>
      </g>

      <text x="146" y="338" textAnchor="middle" fill="currentColor" fontFamily="Caveat, cursive" fontSize="18">22</text>
    </svg>
  );
}

function FloorPlan() {
  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full text-[#35586d] dark:text-[#d5e6f0]" aria-hidden="true">
      <rect x="16" y="16" width="288" height="168" className="sketch-line" pathLength="1" />
      <path d="M120 16v168M120 100h184" className="sketch-line" pathLength="1" style={{ animationDelay: "0.3s" }} />
      <text x="68" y="96" textAnchor="middle" fill="currentColor" fontFamily="Caveat, cursive" fontSize="22">reading</text>
      <text x="210" y="64" textAnchor="middle" fill="currentColor" fontFamily="Caveat, cursive" fontSize="22">studio</text>
      <text x="210" y="148" textAnchor="middle" fill="currentColor" fontFamily="Caveat, cursive" fontSize="22">sunroom</text>
    </svg>
  );
}

export default function Architecture() {
  return (
    <div className="blueprint relative min-h-screen overflow-hidden">
      <Pencil className="pointer-events-none absolute right-4 top-24 hidden w-40 rotate-12 opacity-90 sm:block" />
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-center font-hand text-3xl text-sun-deep">sketchbook</p>
        <h1 className="text-balance text-center font-hand text-5xl leading-[0.92] sm:text-7xl">Architecture World</h1>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <BuildingSketch />
        </motion.div>

        <blockquote className="mx-auto mt-4 max-w-2xl rounded-[1.5rem] bg-paper/80 px-6 py-8 text-center text-paper-ink shadow-sm backdrop-blur-sm">
          <p className="font-hand text-4xl leading-tight sm:text-5xl">
            You don&apos;t just design buildings.
            <br />
            You design dreams, spaces, and possibilities.
          </p>
        </blockquote>

        <div className="mt-10 grid items-center gap-6 md:grid-cols-[1.3fr_0.8fr]">
          <div className="rounded-2xl bg-white/35 p-3 dark:bg-white/5">
            <FloorPlan />
          </div>
          <div className="border border-current/30 bg-white/40 p-4 font-type text-sm leading-7 dark:bg-white/5">
            <p className="tracking-[0.18em]">TITLE BLOCK</p>
            <p className="mt-2 font-hand text-3xl leading-none">project: a beautiful year</p>
            <p>drawn for: {site.name}</p>
            <p>date: 18.10</p>
            <p>sheet: 22 / 22</p>
            <p className="mt-2 italic">scale: full of hope</p>
          </div>
        </div>

        <Ruler className="mx-auto mt-8 w-full max-w-md" />
      </div>
    </div>
  );
}
