import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useInView, useReducedMotion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { SleepingCat } from "../components/illustrations";
import { letter, site } from "../data/content";

/** Characters per second. ~2,100 characters lands at roughly twenty seconds. */
const SPEED = 115;

/** How long the cover takes to swing open before the writing starts. */
const COVER_MS = 1150;

/** The pencil that sits at the write head, tip on the baseline. */
function PencilTip() {
  return (
    <span className="letter-pencil" aria-hidden="true">
      <svg viewBox="0 0 44 44">
        <path d="M5 39 9.5 28.5 15.5 34.5Z" fill="#4a4038" />
        <path d="M9.5 28.5 30 8l6 6L15.5 34.5Z" fill="#e0b03a" />
        <path d="M9.5 28.5 12.5 31.5 32.5 10.5 30 8Z" fill="#f0cd74" />
        <path d="M30 8 33 5l6 6-3 3Z" fill="#b9bdbd" />
        <path d="M33 5a3.2 3.2 0 0 1 4.6 0 3.2 3.2 0 0 1 1.4 6L33 5Z" fill="#e3a19a" />
      </svg>
    </span>
  );
}

/**
 * The Birthday Letter.
 *
 * The notebook cover swings open when the page comes into view, then the
 * letter is written out by hand with a pencil following the last character.
 *
 * Under reduced motion the cover is already open and the whole letter is
 * there from the start, so nothing is gated behind an animation. Tapping the
 * page finishes the writing immediately at any point.
 */
export default function Letter() {
  const reduce = useReducedMotion();
  const pageRef = useRef(null);
  const pencilRef = useRef(null);
  const inView = useInView(pageRef, { once: true, amount: 0.3 });

  const [open, setOpen] = useState(reduce);
  const [count, setCount] = useState(reduce ? letter.length : 0);
  const done = count >= letter.length;

  const finish = useCallback(() => setCount(letter.length), []);

  // Open the cover once the letter is on screen.
  useEffect(() => {
    if (reduce) {
      setOpen(true);
      setCount(letter.length);
      return undefined;
    }
    if (!inView || open) return undefined;
    const timer = window.setTimeout(() => setOpen(true), 260);
    return () => window.clearTimeout(timer);
  }, [inView, open, reduce]);

  // Write it out, timed off the clock rather than one timeout per character,
  // so the pace holds steady regardless of how busy the main thread is.
  useEffect(() => {
    if (reduce || !open || done) return undefined;

    let frame = 0;
    let startedAt;
    const tick = (now) => {
      if (startedAt === undefined) startedAt = now + COVER_MS;
      const elapsed = now - startedAt;
      if (elapsed > 0) {
        setCount((current) => Math.max(current, Math.min(Math.floor((elapsed / 1000) * SPEED), letter.length)));
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [open, done, reduce]);

  // Keep the pencil in view as it moves down the page, nudging as little as
  // possible so it never fights someone scrolling themselves.
  useEffect(() => {
    if (reduce || done || !pencilRef.current) return;
    const rect = pencilRef.current.getBoundingClientRect();
    if (rect.bottom > window.innerHeight * 0.82 || rect.top < 0) {
      pencilRef.current.scrollIntoView({ block: "nearest", behavior: "auto" });
    }
  }, [count, done, reduce]);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
      <PageHeader
        kicker="read slowly"
        title="Birthday Letter"
        subtitle={`for ${site.name}, on ${site.birthdayLabel}`}
      />

      <article
        ref={pageRef}
        className={`letter-sheet notebook relative mx-auto mt-6 max-w-2xl rounded-sm${open ? " is-open" : ""}`}
      >
        <span className="hole top-8" />
        <span className="hole top-24" />
        <span className="hole top-40" />

        <div
          className="notebook-body is-hand w-full cursor-text text-left"
          onClick={finish}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              finish();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Birthday letter. Activate to show the whole letter at once."
        >
          {letter.slice(0, count)}
          {!done && (
            <span ref={pencilRef} className="letter-writehead">
              <PencilTip />
            </span>
          )}
        </div>

        {/* The cover, hinged on the spine, over the page until it opens. */}
        <span className="letter-cover" aria-hidden="true">
          <span className="letter-cover-plate">
            <span className="letter-cover-label">for {site.name}</span>
          </span>
        </span>
      </article>

      {!done && (
        <p className="mt-4 text-center font-hand text-2xl text-muted">
          tap the page to read it all at once
        </p>
      )}

      <SleepingCat className="mx-auto mt-2 h-24 w-auto" />
      <p className="mt-4 text-center">
        <Link to="/home" className="font-hand text-3xl text-ink underline decoration-[#e7d3bc] underline-offset-4">
          Back to Home
        </Link>
      </p>
    </div>
  );
}
