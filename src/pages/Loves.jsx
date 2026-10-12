import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { moments, momentsIntro } from "../data/moments";
import "./moments.css";

const momentFiles = import.meta.glob(
  "../assets/photos/moments/*.{jpg,jpeg,png,webp,gif,avif,JPG,JPEG,PNG,WEBP,GIF,AVIF}",
  { eager: true, import: "default" },
);

const tilts = [-1.2, 1, -0.7, 1.3, -1, 0.5, -0.4, 1.1, -1.3, 0.7, -0.6, 1.2, 0.3, -0.9, 0.8, -0.5, 1.1, -0.8];

function fileName(path) {
  return (path.split(/[/\\]/).pop() || "").toLowerCase();
}

function momentSrc(moment) {
  const wanted = new Set(
    [moment.image, moment.id]
      .filter(Boolean)
      .map((name) => fileName(String(name)).replace(/\.[^.]+$/, "")),
  );
  const found = Object.entries(momentFiles).find(([path]) => wanted.has(fileName(path).replace(/\.[^.]+$/, "")));
  if (found) return found[1];
  if (typeof moment.image === "string" && /^(https?:|\/|data:)/.test(moment.image)) return moment.image;
  return "";
}

function Frame({ moment, src, failed, onFail, contain }) {
  if (src && !failed) {
    return (
      <img
        src={src}
        alt={moment.alt || moment.title}
        loading="lazy"
        decoding="async"
        style={contain ? { objectFit: "contain", maxHeight: "58vh" } : undefined}
        onError={onFail}
      />
    );
  }
  return (
    <span className="moment-empty">
      <strong>{moment.id}</strong>
      <span>Photograph goes here</span>
    </span>
  );
}

function MomentLightbox({ moment, index, total, reduce, onClose, onStep }) {
  const closeRef = useRef(null);
  const returnRef = useRef(null);
  const sheetRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const src = moment ? momentSrc(moment) : "";
  const isOpen = Boolean(moment);

  const step = useCallback(
    (delta) => {
      const next = index + delta;
      if (next >= 0 && next < total) onStep(next);
    },
    [index, total, onStep],
  );

  useEffect(() => {
    if (!isOpen) return undefined;
    returnRef.current = document.activeElement;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (returnRef.current instanceof HTMLElement) returnRef.current.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!moment) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") step(-1);
      else if (event.key === "ArrowRight") step(1);
      else if (event.key === "Tab" && sheetRef.current) {
        const items = [...sheetRef.current.querySelectorAll("button")];
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
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [moment, onClose, step]);

  useEffect(() => {
    setFailed(false);
  }, [moment]);

  if (!moment) return null;

  return (
    <div
      className="moments-lightbox"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={sheetRef}
        className="moments-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="moment-dialog-title"
      >
        <button ref={closeRef} type="button" className="moments-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <figure>
          <Frame moment={moment} src={src} failed={failed} onFail={() => setFailed(true)} contain />
          <figcaption>
            <h2 id="moment-dialog-title">{moment.title}</h2>
            {moment.date ? <p className="moment-date">{moment.date}</p> : null}
          </figcaption>
        </figure>
        <div className="moments-copy">
          <p className={moment.caption ? undefined : "moments-pending"}>
            {moment.caption || "A short caption will go here."}
          </p>
          <p className={moment.story ? undefined : "moments-pending"}>
            {moment.story || "The longer story will be written once this photograph has one."}
          </p>
        </div>
        <div className="moments-nav">
          <button type="button" onClick={() => step(-1)} disabled={index === 0}>
            Previous
          </button>
          <p aria-live="polite">{index + 1} of {total}</p>
          <button type="button" onClick={() => step(1)} disabled={index === total - 1}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Loves() {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(null);
  const [failed, setFailed] = useState({});
  const open = openIndex == null ? null : moments[openIndex];

  return (
    <div className="moments">
      <header className="moments-open">
        <p className="moments-kicker">for us</p>
        <h1>
          {momentsIntro.title} <span aria-hidden="true">💗</span>
        </h1>
        <p className="moments-lead">{momentsIntro.line}</p>
        <p className="moments-scroll">
          scroll through the pages <span aria-hidden="true">↓</span>
        </p>
      </header>

      <section className="moments-board" aria-label="Photographs still to be added">
        {moments.map((moment, index) => {
          const src = momentSrc(moment);
          return (
            <motion.button
              key={moment.id}
              type="button"
              className={`moment-card is-${moment.layout}`}
              style={{ "--tilt": `${tilts[index % tilts.length]}deg` }}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -40px" }}
              transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : (index % 3) * 0.04 }}
              onClick={() => setOpenIndex(index)}
            >
              <span className="moment-tape" aria-hidden="true" />
              <span className="moment-frame">
                <Frame
                  moment={moment}
                  src={src}
                  failed={failed[moment.id]}
                  onFail={() => setFailed((current) => ({ ...current, [moment.id]: true }))}
                />
              </span>
              <span className="moment-meta">
                <span className="moment-title">{moment.title}</span>
                {moment.date ? <span className="moment-date">{moment.date}</span> : null}
                {moment.caption ? <span className="moment-caption">{moment.caption}</span> : null}
              </span>
            </motion.button>
          );
        })}
      </section>

      <MomentLightbox
        moment={open}
        index={openIndex ?? 0}
        total={moments.length}
        reduce={reduce}
        onClose={() => setOpenIndex(null)}
        onStep={setOpenIndex}
      />
    </div>
  );
}
