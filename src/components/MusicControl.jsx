import { motion, useReducedMotion } from "framer-motion";
import { useSoundtrack } from "../context/SoundtrackContext";

export default function MusicControl() {
  const reduce = useReducedMotion();
  const { visible, playing, muted, needsGesture, toggle, toggleMute } = useSoundtrack();

  if (!visible) return null;

  return (
    <motion.div
      className={`music-dock ${playing ? "is-playing" : ""} ${needsGesture ? "is-prompt" : ""}`}
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      role="group"
      aria-label="Birthday song"
    >
      <button
        type="button"
        className="music-play scrap"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Pause birthday song" : "Play birthday song"}
      >
        <span className="music-glyph" aria-hidden="true">
          ♫
        </span>
        {needsGesture && <span className="music-label">Play Birthday Song</span>}
      </button>
      <button
        type="button"
        className="music-mute scrap"
        onClick={toggleMute}
        aria-pressed={muted}
        aria-label={muted ? "Unmute birthday song" : "Mute birthday song"}
      >
        <MuteMark muted={muted} />
      </button>
      {!needsGesture && (
        <span className="music-tip" aria-hidden="true">
          Birthday Song
        </span>
      )}
    </motion.div>
  );
}

function MuteMark({ muted }) {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {muted ? (
        <path d="M16 9.5l5 5M21 9.5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      ) : (
        <path
          d="M16 9.2a3.4 3.4 0 0 1 0 5.6M18.2 7a6 6 0 0 1 0 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
