import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSoundtrack } from "../context/SoundtrackContext";
import { site } from "../data/content";
import FallingPetals from "../components/FallingPetals";
import ThemeToggle from "../components/ThemeToggle";
import { SittingCat, SleepingCat, Sparkle, Sunflower } from "../components/illustrations";

const sparkles = [
  { top: "14%", left: "18%", delay: "0s", size: 14 },
  { top: "22%", left: "72%", delay: "0.8s", size: 10 },
  { top: "38%", left: "10%", delay: "1.4s", size: 12 },
  { top: "12%", left: "48%", delay: "0.3s", size: 9 },
  { top: "58%", left: "80%", delay: "1.1s", size: 13 },
  { top: "68%", left: "22%", delay: "1.8s", size: 8 },
  { top: "30%", left: "88%", delay: "0.5s", size: 11 },
  { top: "76%", left: "62%", delay: "1.6s", size: 10 },
];

function birthdayNote() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(now.getFullYear(), site.birthdayMonth - 1, site.birthdayDay);
  const diff = Math.round((target - today) / 86400000);
  if (diff === 0) return "today is your day";
  if (diff > 0 && diff <= 30) {
    return `${diff} ${diff === 1 ? "day" : "days"} until ${site.birthdayLabel}`;
  }
  return site.birthdayLabel;
}

export default function Landing() {
  const note = useMemo(() => birthdayNote(), []);
  const { begin } = useSoundtrack();

  return (
    <section className="sky relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-16">
      <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <FallingPetals count={10} />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {sparkles.map((sparkle) => (
          <Sparkle
            key={`${sparkle.top}-${sparkle.left}`}
            className="twinkle absolute text-sun-deep"
            style={{
              top: sparkle.top,
              left: sparkle.left,
              width: sparkle.size,
              height: sparkle.size,
              animationDelay: sparkle.delay,
            }}
          />
        ))}
        <div className="floaty absolute left-[4%] top-[16%] hidden sm:block" style={{ animationDelay: "-1s" }}>
          <Sunflower className="sway h-28 w-auto" />
        </div>
        <div className="floaty absolute right-[6%] top-[18%]" style={{ animationDelay: "-3s" }}>
          <Sunflower className="sway h-24 w-auto sm:h-36" style={{ animationDuration: "6.4s" }} />
        </div>
        <div className="floaty absolute bottom-[8%] left-[8%]" style={{ animationDelay: "-2s" }}>
          <Sunflower className="sway h-20 w-auto sm:h-28" style={{ animationDuration: "7s" }} />
        </div>
        <div className="floaty absolute bottom-[6%] right-[7%] hidden sm:block" style={{ animationDelay: "-4s" }}>
          <Sunflower className="sway h-32 w-auto" style={{ animationDuration: "5.2s" }} />
        </div>
        <SleepingCat className="absolute bottom-3 left-1 h-20 w-auto sm:left-6 sm:h-28" />
        <SittingCat className="absolute bottom-4 right-2 h-24 w-auto sm:right-8 sm:h-32" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="inline-flex rounded-full bg-paper/80 px-4 py-1 font-hand text-2xl text-paper-ink shadow-sm">
          {note}
        </p>
        <h1 className="text-balance mt-5 font-hand text-[3.3rem] leading-[0.9] text-ink sm:text-8xl">
          Happy 22nd Birthday ❤️
        </h1>
        <p className="mx-auto mt-4 max-w-md font-serif text-2xl italic leading-snug text-muted sm:text-3xl">
          A little corner of the internet made just for you.
        </p>
        <Link
          to="/home"
          onClick={begin}
          className="book-btn lift mt-8 inline-flex items-center justify-center rounded-[2rem] bg-paper px-6 py-4 font-hand text-[2rem] leading-none text-paper-ink sm:px-8 sm:text-4xl"
        >
          Open Your Birthday Book
          <span className="dogear" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
