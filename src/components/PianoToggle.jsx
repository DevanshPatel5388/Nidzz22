import { useAudio } from "../context/AudioContext";
import { MusicNote } from "./illustrations";

export default function PianoToggle({ compact = false }) {
  const { enabled, blocked, toggle } = useAudio();
  const label = blocked ? "Tap for piano" : enabled ? "Piano on" : "Soft piano";

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-pressed={enabled}
        aria-label={enabled ? "Turn soft piano off" : "Turn soft piano on for the final page"}
        title="Soft piano on the final page"
        className={`grid h-10 w-10 place-items-center rounded-full scrap ${enabled ? "bg-sun text-paper-ink" : "bg-paper text-paper-ink"}`}
      >
        <MusicNote className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      className={`rounded-full px-4 py-2 font-hand text-2xl scrap ${enabled ? "bg-sun text-paper-ink" : "bg-paper text-paper-ink"}`}
    >
      {label}
    </button>
  );
}
