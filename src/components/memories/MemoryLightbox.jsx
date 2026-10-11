import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * A book-style viewer for one memory, with the whole set reachable from
 * inside it.
 *
 * Keyboard: Escape closes, left and right arrows move between memories.
 * Focus moves to the close button on open and returns to the photo that
 * opened it on close, so keyboard and screen-reader users are not dropped
 * back at the top of a very long page.
 *
 * @param {object|null} memory  The memory being shown, or null when closed.
 * @param {number} index        Its position in the set.
 * @param {number} total        How many memories there are.
 * @param {boolean} reduce      Whether the visitor prefers reduced motion.
 */
export default function MemoryLightbox({ memory, index, total, reduce, onClose, onStep }) {
  const closeRef = useRef(null);
  const returnRef = useRef(null);

  const step = useCallback(
    (delta) => {
      const next = index + delta;
      if (next >= 0 && next < total) onStep(next);
    },
    [index, total, onStep],
  );

  const isOpen = Boolean(memory);

  // Opening and closing only. Keeping this separate from the key handler
  // matters: the handler changes on every step, and if the two shared an
  // effect, each arrow press would re-record the element to return focus to
  // and land the visitor on the close button instead of their photo.
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
    if (!isOpen) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") step(-1);
      else if (event.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, step]);

  return (
    <AnimatePresence>
      {memory && (
        <motion.div
          className="mem-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Chapter ${memory.chapter}${memory.title ? `, ${memory.title}` : ""}`}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            className="mem-lightbox-page"
            initial={reduce ? false : { opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button ref={closeRef} type="button" className="mem-lightbox-close" onClick={onClose}>
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </button>

            <figure className="mem-lightbox-figure">
              {memory.image ? (
                <img src={memory.image} alt={memory.alt} style={{ aspectRatio: memory.ratio }} />
              ) : (
                <div className="mem-blank" style={{ aspectRatio: memory.ratio }} aria-hidden="true">
                  <span>this page is waiting for its photo</span>
                </div>
              )}
              <figcaption>
                <p className="mem-lightbox-chapter">
                  Chapter {String(memory.chapter).padStart(2, "0")}
                  {memory.emoji ? ` ${memory.emoji}` : ""}
                </p>
                {memory.title && <p className="mem-lightbox-title">{memory.title}</p>}
                {memory.caption && <p className="mem-lightbox-caption">{memory.caption}</p>}
              </figcaption>
            </figure>

            <div className="mem-lightbox-nav">
              <button type="button" onClick={() => step(-1)} disabled={index === 0}>
                ‹ Previous
              </button>
              <p aria-live="polite">
                {index + 1} of {total}
              </p>
              <button type="button" onClick={() => step(1)} disabled={index === total - 1}>
                Next ›
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
