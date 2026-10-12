import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { dreams } from "../data/content";

const STORAGE_KEY = "birthday-future-plans";

function todayISO() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function isISODate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function prettyDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function readPlans() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (!raw || typeof raw !== "object") return {};
    const saved = {};
    for (const dream of dreams) {
      if (!dream.plan) continue;
      const item = raw[dream.id];
      if (!item || typeof item !== "object" || !isISODate(item.date)) continue;
      saved[dream.id] = {
        date: item.date,
        note: typeof item.note === "string" ? item.note.slice(0, 400) : "",
      };
    }
    return saved;
  } catch {
    return {};
  }
}

function BadmintonArt() {
  return (
    <svg className="future-art" viewBox="0 0 220 72" aria-hidden="true">
      <path d="M28 58c18-28 8-46-8-50" fill="none" stroke="#3e2c22" strokeWidth="2" />
      <ellipse cx="18" cy="10" rx="10" ry="13" fill="none" stroke="#3e2c22" strokeWidth="2" />
      <path d="M168 58c-16-30-6-48 10-52" fill="none" stroke="#3e2c22" strokeWidth="2" />
      <ellipse cx="180" cy="8" rx="10" ry="13" fill="none" stroke="#3e2c22" strokeWidth="2" />
      <g className="future-shuttle">
        <path d="M0 0l8 16" stroke="#c8922a" strokeWidth="2" />
        <circle cx="0" cy="0" r="4" fill="#fffaf3" stroke="#3e2c22" />
      </g>
    </svg>
  );
}

function ShoppingArt() {
  return (
    <svg className="future-art" viewBox="0 0 220 72" aria-hidden="true">
      <g className="future-bag future-bag-a">
        <path d="M18 28h36l-4 32H22z" fill="#f4c7c3" stroke="#3e2c22" strokeWidth="1.6" />
        <path d="M26 28c0-8 6-12 10-12s10 4 10 12" fill="none" stroke="#3e2c22" strokeWidth="1.6" />
      </g>
      <g className="future-bag future-bag-b">
        <path d="M78 24h32l-4 36H82z" fill="#f0c14b" stroke="#3e2c22" strokeWidth="1.6" />
        <path d="M86 24c0-8 5-12 10-12s10 4 10 12" fill="none" stroke="#3e2c22" strokeWidth="1.6" />
      </g>
      <rect x="140" y="18" width="52" height="40" rx="4" fill="#fffaf3" stroke="#3e2c22" strokeWidth="1.6" />
      <path d="M148 34h36M148 44h24" stroke="#c8922a" strokeWidth="1.6" />
    </svg>
  );
}

function TeddyArt() {
  return (
    <svg className="future-art" viewBox="0 0 220 72" aria-hidden="true">
      <g className="future-teddy">
        <circle cx="28" cy="18" r="8" fill="#c8922a" stroke="#3e2c22" />
        <circle cx="56" cy="18" r="8" fill="#c8922a" stroke="#3e2c22" />
        <circle cx="42" cy="34" r="16" fill="#e0b03a" stroke="#3e2c22" />
        <circle cx="36" cy="32" r="2" fill="#3e2c22" />
        <circle cx="48" cy="32" r="2" fill="#3e2c22" />
        <path d="M39 38h6" stroke="#3e2c22" strokeWidth="1.4" strokeLinecap="round" />
      </g>
      <g className="future-teddy future-teddy-b">
        <circle cx="118" cy="22" r="7" fill="#e3a19a" stroke="#3e2c22" />
        <circle cx="142" cy="22" r="7" fill="#e3a19a" stroke="#3e2c22" />
        <circle cx="130" cy="38" r="14" fill="#f4c7c3" stroke="#3e2c22" />
        <circle cx="125" cy="36" r="1.8" fill="#3e2c22" />
        <circle cx="135" cy="36" r="1.8" fill="#3e2c22" />
      </g>
    </svg>
  );
}

const artFor = {
  badminton: BadmintonArt,
  shopping: ShoppingArt,
  teddy: TeddyArt,
};

export default function Future() {
  const reduce = useReducedMotion();
  const titleId = useId();
  const dateRef = useRef(null);
  const dialogRef = useRef(null);
  const [pinned, setPinned] = useState(() => new Set());
  const [plans, setPlans] = useState(readPlans);
  const [openId, setOpenId] = useState(null);
  const [draftDate, setDraftDate] = useState("");
  const [draftNote, setDraftNote] = useState("");
  const [error, setError] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const today = todayISO();

  const openDream = dreams.find((dream) => dream.id === openId);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
    } catch {
      /* This browser can still show the plan for the current visit. */
    }
  }, [plans]);

  useEffect(() => {
    if (!openId) return undefined;
    const previous = document.activeElement;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpenId(null);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const items = [...dialogRef.current.querySelectorAll("button, input, textarea")];
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusId = window.setTimeout(() => dateRef.current?.focus(), 30);
    return () => {
      window.clearTimeout(focusId);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [openId]);

  function toggle(title) {
    setPinned((current) => {
      const next = new Set(current);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  }

  function openPlan(dream) {
    const saved = plans[dream.id];
    setDraftDate(saved?.date || "");
    setDraftNote(saved?.note || "");
    setError("");
    setSavedFlash(false);
    setConfirmId(null);
    setOpenId(dream.id);
  }

  function savePlan(event) {
    event.preventDefault();
    if (!openDream) return;
    if (!isISODate(draftDate) || draftDate < today) {
      setError("Pick a day that hasn't happened yet.");
      dateRef.current?.focus();
      return;
    }
    const note = draftNote.trim().slice(0, 400);
    setPlans((current) => ({
      ...current,
      [openDream.id]: { date: draftDate, note },
    }));
    setError("");
    setSavedFlash(true);
    window.setTimeout(() => setOpenId(null), reduce ? 0 : 900);
  }

  function clearPlan(id) {
    setPlans((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
    setConfirmId(null);
    setOpenId(null);
  }

  return (
    <div className="pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <PageHeader
          kicker="unwritten"
          title="Future Adventures"
          subtitle="A wall of things worth looking forward to. Tap a card to pin it, or plan one of the new days."
        />
      </div>

      <section className="cork mx-4 mt-6 rounded-[2rem] px-4 py-10 sm:mx-6 sm:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dreams.map((dream, index) => {
            if (dream.plan) {
              const saved = plans[dream.id];
              const Art = artFor[dream.id];
              return (
                <motion.article
                  key={dream.id}
                  className="scrap relative rounded-[1.2rem] px-5 pb-5 pt-7"
                  style={{ transform: `rotate(${dream.rotate}deg)` }}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduce ? 0 : (index % 3) * 0.05 }}
                >
                  <span
                    className="absolute left-1/2 top-0 h-4 w-10 -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] rounded-sm opacity-80"
                    style={{ background: dream.pin }}
                  />
                  <Art />
                  <h2 className="mt-1 font-hand text-4xl leading-none">{dream.title}</h2>
                  <p className="mt-2 font-serif text-lg leading-snug text-paper-muted">{dream.line}</p>
                  <p className="mt-2 font-hand text-2xl leading-tight text-[#c8922a]">{dream.caption}</p>
                  {saved ? (
                    <div className="mt-3">
                      <p className="font-serif text-lg text-paper-ink">Planned for: {prettyDate(saved.date)}</p>
                      {saved.note ? <p className="mt-1 font-serif text-lg italic text-paper-muted">“{saved.note}”</p> : null}
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button type="button" className="future-btn" onClick={() => openPlan(dream)}>
                          Edit the plan
                        </button>
                        {confirmId === dream.id ? (
                          <>
                            <button type="button" className="future-btn" onClick={() => clearPlan(dream.id)}>
                              Yes, clear it
                            </button>
                            <button type="button" className="future-btn future-btn-quiet" onClick={() => setConfirmId(null)}>
                              Keep it
                            </button>
                          </>
                        ) : (
                          <button type="button" className="future-btn future-btn-quiet" onClick={() => setConfirmId(dream.id)}>
                            Clear the plan
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <button type="button" className="future-btn mt-3" onClick={() => openPlan(dream)}>
                      Plan this day
                    </button>
                  )}
                </motion.article>
              );
            }

            const on = pinned.has(dream.title);
            return (
              <motion.button
                key={dream.title}
                type="button"
                onClick={() => toggle(dream.title)}
                aria-pressed={on}
                className="scrap relative rounded-[1.2rem] px-5 pb-5 pt-7 text-left"
                style={{ transform: `rotate(${on ? 0 : dream.rotate}deg)` }}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: reduce ? 0 : (index % 3) * 0.05 }}
              >
                <span
                  className="absolute left-1/2 top-0 h-4 w-10 -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] rounded-sm opacity-80"
                  style={{ background: dream.pin }}
                />
                <span className="text-3xl" aria-hidden="true">{dream.emoji}</span>
                <h2 className="mt-1 font-hand text-4xl leading-none">{dream.title}</h2>
                <p className="mt-2 font-serif text-lg leading-snug text-paper-muted">{dream.line}</p>
                <p className="mt-3 font-hand text-2xl text-[#c8922a]">{on ? "pinned" : "someday"}</p>
              </motion.button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-xl px-5 text-center">
        <div className="scrap rounded-[1.6rem] px-6 py-8">
          <p className="font-type text-sm tracking-[0.18em] text-paper-muted">Still loading...</p>
          <p className="mt-2 font-hand text-5xl leading-none text-paper-ink">Our future memories.</p>
          <div className="mx-auto mt-5 h-2 w-full max-w-xs overflow-hidden rounded-full bg-[#f3e7d6]">
            <div className="memory-load h-full rounded-full bg-gradient-to-r from-blush-deep to-sun" />
          </div>
          <p className="mt-4 font-serif text-xl italic text-paper-muted">some things are worth the wait</p>
        </div>
      </section>

      {openDream ? (
        <div className="future-modal" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpenId(null); }}>
          <form
            ref={dialogRef}
            className="future-dialog scrap"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onSubmit={savePlan}
          >
            <button type="button" className="future-close" onClick={() => setOpenId(null)} aria-label="Close">
              ×
            </button>
            <p id={titleId} className="font-hand text-4xl leading-none">When are we making this memory? 💗</p>
            <p className="mt-1 font-serif text-xl text-paper-muted">{openDream.title}</p>

            <label className="mt-4 block font-hand text-2xl" htmlFor="future-date">Select a date</label>
            <input
              ref={dateRef}
              id="future-date"
              className="future-field"
              type="date"
              min={today}
              value={draftDate}
              onChange={(event) => setDraftDate(event.target.value)}
              required
            />

            <label className="mt-3 block font-hand text-2xl" htmlFor="future-note">Add a personal note</label>
            <textarea
              id="future-note"
              className="future-field future-note"
              rows={3}
              maxLength={400}
              placeholder={openDream.placeholder}
              value={draftNote}
              onChange={(event) => setDraftNote(event.target.value)}
            />

            {error ? <p className="mt-2 font-serif text-lg text-[#8a3d32]" role="alert">{error}</p> : null}
            {savedFlash ? <p className="mt-2 font-hand text-2xl text-[#c8922a]" role="status">Yay! One more memory to look forward to! 💗</p> : null}

            <button type="submit" className="future-btn mt-4">Let&apos;s Make It Happen 💕</button>
            <p className="mt-3 font-serif text-sm text-paper-muted">Saved in this browser only. Another phone or browser will not see it.</p>
          </form>
        </div>
      ) : null}
    </div>
  );
}
