import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkle } from "./illustrations";
import { site } from "../data/content";

const CANDLES = [
  { left: "30%", height: "17%", delay: "1.05s", flame: "1.35s", color: "#fff6ee" },
  { left: "40%", height: "21%", delay: "1.15s", flame: "1.5s", color: "#f4c7c3" },
  { left: "50%", height: "19%", delay: "1.22s", flame: "1.62s", color: "#fffaf3" },
  { left: "60%", height: "22%", delay: "1.32s", flame: "1.74s", color: "#f0c14b" },
  { left: "70%", height: "16%", delay: "1.4s", flame: "1.86s", color: "#fff6ee" },
];

const SPARKLES = [
  { top: "12%", left: "16%", delay: "0.2s", size: 14 },
  { top: "18%", left: "78%", delay: "0.55s", size: 11 },
  { top: "32%", left: "8%", delay: "0.9s", size: 10 },
  { top: "28%", left: "88%", delay: "1.15s", size: 13 },
  { top: "70%", left: "14%", delay: "0.7s", size: 9 },
  { top: "74%", left: "82%", delay: "1.3s", size: 12 },
];

const HEARTS = [
  { top: "20%", left: "24%", delay: "0.4s" },
  { top: "16%", left: "68%", delay: "1.1s" },
  { top: "64%", left: "22%", delay: "1.6s" },
  { top: "68%", left: "76%", delay: "0.8s" },
];

const CONFETTI = [
  { x: "-70px", y: "-120px", color: "#f4c7c3", delay: "0s" },
  { x: "-30px", y: "-150px", color: "#f0c14b", delay: "0.05s" },
  { x: "20px", y: "-140px", color: "#fffaf3", delay: "0.02s" },
  { x: "64px", y: "-118px", color: "#e7a090", delay: "0.08s" },
  { x: "-90px", y: "-70px", color: "#6f8f5c", delay: "0.04s" },
  { x: "96px", y: "-80px", color: "#f0c14b", delay: "0.1s" },
  { x: "-48px", y: "-90px", color: "#fff6ee", delay: "0.06s" },
  { x: "40px", y: "-96px", color: "#f4c7c3", delay: "0.03s" },
  { x: "8px", y: "-160px", color: "#c8922a", delay: "0.07s" },
  { x: "-110px", y: "-40px", color: "#f0c14b", delay: "0.09s" },
  { x: "120px", y: "-46px", color: "#f4c7c3", delay: "0.05s" },
  { x: "-16px", y: "-70px", color: "#6f8f5c", delay: "0.11s" },
];

function later(list, fn, ms) {
  const id = window.setTimeout(fn, ms);
  list.current.push(id);
  return id;
}

export default function CakeIntro({ onDone }) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState("arrive");
  const [lit, setLit] = useState(() => CANDLES.map(() => true));
  const lock = useRef(false);
  const timers = useRef([]);
  const buttonRef = useRef(null);
  const wishRef = useRef(null);

  useEffect(() => {
    if (reduce) {
      setReady(true);
      return undefined;
    }
    const id = window.setTimeout(() => setReady(true), 1750);
    return () => window.clearTimeout(id);
  }, [reduce]);

  useEffect(() => () => {
    timers.current.forEach((id) => window.clearTimeout(id));
  }, []);

  useEffect(() => {
    if (ready && phase === "arrive") buttonRef.current?.focus();
  }, [ready, phase]);

  useEffect(() => {
    if (phase === "celebrate") wishRef.current?.focus();
  }, [phase]);

  function blow() {
    if (lock.current || !ready || phase !== "arrive") return;
    lock.current = true;
    setPhase("blowing");

    const gap = reduce ? 0 : 170;
    const start = reduce ? 0 : 380;
    CANDLES.forEach((_, index) => {
      later(timers, () => {
        setLit((current) => current.map((on, item) => (item === index ? false : on)));
      }, start + index * gap);
    });

    later(timers, () => setPhase("celebrate"), start + CANDLES.length * gap + (reduce ? 80 : 280));
    later(timers, onDone, start + CANDLES.length * gap + (reduce ? 420 : 1700));
  }

  const celebrating = phase === "celebrate";

  return (
    <motion.div
      className={`cake-intro${phase === "blowing" ? " is-blowing" : ""}${celebrating ? " is-celebrating" : ""}${reduce ? " is-reduced" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cake-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
      transition={{ duration: reduce ? 0.2 : 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="cake-sparkles" aria-hidden="true">
        {SPARKLES.map((sparkle) => (
          <Sparkle
            key={`${sparkle.top}-${sparkle.left}`}
            className="cake-sparkle"
            style={{
              top: sparkle.top,
              left: sparkle.left,
              width: sparkle.size,
              height: sparkle.size,
              animationDelay: sparkle.delay,
            }}
          />
        ))}
        {HEARTS.map((heart) => (
          <span
            key={`${heart.top}-${heart.left}`}
            className="cake-heart"
            style={{ top: heart.top, left: heart.left, animationDelay: heart.delay }}
          />
        ))}
      </div>

      <div className="cake-copy">
        <p className="cake-kicker">for {site.name}</p>
        <h1 id="cake-title" className="cake-title">A Little Birthday Surprise 🎂</h1>
        <p ref={wishRef} tabIndex={-1} className="cake-invite" aria-live="polite">
          {celebrating ? "Wish made! ❤️" : "Make a wish and blow out the candles!"}
        </p>
      </div>

      <div className={`cake-scene${celebrating ? " is-bounce" : ""}`}>
        <BirthdayCake />
        <div className="cake-wicks" aria-hidden="true">
          {CANDLES.map((candle, index) => (
            <span
              key={candle.left}
              className={`cake-candle${lit[index] ? "" : " is-out"}`}
              style={{ left: candle.left, height: candle.height, animationDelay: candle.delay }}
            >
              <span className="cake-smoke" />
              <span className="cake-flame" style={{ "--flame": candle.flame }} />
              <span className="cake-stick" style={{ background: candle.color }} />
            </span>
          ))}
        </div>
        <div className="cake-wind" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        {celebrating && (
          <div className="cake-confetti" aria-hidden="true">
            {CONFETTI.map((piece) => (
              <i
                key={`${piece.x}-${piece.y}`}
                style={{
                  "--x": piece.x,
                  "--y": piece.y,
                  background: piece.color,
                  animationDelay: piece.delay,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {phase !== "celebrate" && (
        <button
          ref={buttonRef}
          type="button"
          className="cake-blow"
          onClick={blow}
          disabled={!ready || phase !== "arrive"}
        >
          Blow the Candles ✨
        </button>
      )}
    </motion.div>
  );
}

function BirthdayCake() {
  return (
    <svg className="cake-art" viewBox="0 0 400 290" aria-hidden="true">
      <ellipse cx="200" cy="262" rx="148" ry="16" fill="#e4d0b8" />
      <ellipse cx="200" cy="256" rx="134" ry="11" fill="#fffaf3" />
      <path d="M74 222c0 22 28 32 126 32s126-10 126-32V160H74v62z" fill="#e7a090" />
      <path d="M74 172c16 18 34 8 50-4 18 16 42 14 58 0 16 16 40 16 56 0 18 14 36 16 50 4 12 12 24 8 30 0v-18H74v18z" fill="#fff7ef" />
      <g>
        <rect x="108" y="196" width="9" height="3.2" rx="1.2" fill="#f0c14b" transform="rotate(-28 112 197)" />
        <rect x="156" y="208" width="8" height="3" rx="1.2" fill="#fffaf3" transform="rotate(18 160 209)" />
        <rect x="214" y="200" width="9" height="3.2" rx="1.2" fill="#6f8f5c" transform="rotate(-12 218 201)" />
        <rect x="262" y="210" width="8" height="3" rx="1.2" fill="#f0c14b" transform="rotate(24 266 211)" />
        <rect x="188" y="214" width="7" height="3" rx="1.2" fill="#c8922a" transform="rotate(-8 191 215)" />
      </g>
      <path d="M108 184c0 16 20 26 92 26s92-10 92-26V128H108v56z" fill="#f6e3c4" />
      <path d="M108 140c14 16 32 8 46-2 16 14 38 12 54 0 16 14 36 12 50 2 14 12 28 8 34 0v-16H108v18z" fill="#fffaf3" />
      <rect x="132" y="150" width="8" height="3" rx="1" fill="#e7a090" transform="rotate(16 136 151)" />
      <rect x="196" y="158" width="8" height="3" rx="1" fill="#6f8f5c" transform="rotate(-20 200 159)" />
      <rect x="248" y="152" width="8" height="3" rx="1" fill="#f0c14b" transform="rotate(12 252 153)" />
      <path d="M140 146c0 14 14 22 60 22s60-8 60-22V100H140v46z" fill="#f4c7c3" />
      <path d="M140 112c12 14 26 6 38-2 14 12 32 10 44 0 12 10 28 10 36 2 8 8 18 6 22 0v-14H140v16z" fill="#fffaf3" />
      <ellipse cx="170" cy="98" rx="16" ry="9" fill="#fffaf3" />
      <ellipse cx="200" cy="92" rx="18" ry="10" fill="#fffdf8" />
      <ellipse cx="230" cy="98" rx="16" ry="9" fill="#fffaf3" />
      <circle cx="186" cy="90" r="2.2" fill="#e7a090" />
      <circle cx="214" cy="90" r="2.2" fill="#f0c14b" />
    </svg>
  );
}
