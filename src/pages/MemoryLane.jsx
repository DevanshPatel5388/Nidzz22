import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import "../components/memories/memories.css";
import { Bookmark, DustField, JournalBook } from "../components/memories/MemoryBook";
import MemoryLightbox from "../components/memories/MemoryLightbox";
import { bookClosing, bookOpening, memories } from "../data/memories";

/** Small, fixed tilts so the page looks arranged by hand rather than by a grid. */
const TILTS = [-2.1, 1.6, -1.2, 2.2, -1.8, 1.1, -2.4, 1.9, -1.4, 2, -1.7, 1.3];

/**
 * One chapter of the book: its number, the photograph, and a note under it.
 * The number arrives first, then the photo settles, then the caption — so
 * each entry reads like a page being filled in rather than a card appearing.
 */
function Chapter({ memory, index, reduce, onOpen }) {
  const side = index % 2 === 0 ? "is-left" : "is-right";
  const tilt = TILTS[index % TILTS.length];

  return (
    <motion.li
      className={`mem-chapter ${side}`}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="mem-chapter-dot" aria-hidden="true" />

      <div className="mem-chapter-body">
        <motion.p
          className="mem-chapter-num"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: reduce ? 0 : 0.35 }}
        >
          Chapter {String(memory.chapter).padStart(2, "0")}
          {memory.emoji ? <span className="mem-chapter-emoji"> {memory.emoji}</span> : null}
        </motion.p>

        <motion.div
          className="mem-frame-wrap"
          initial={reduce ? false : { opacity: 0, rotate: tilt * 2.2, y: 16 }}
          whileInView={{ opacity: 1, rotate: tilt, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : 0.14, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            className="mem-frame"
            onClick={() => onOpen(index)}
            aria-label={`Open chapter ${memory.chapter}${memory.title ? `, ${memory.title}` : ""}`}
          >
            <span className={`tape ${index % 2 === 0 ? "tape-sun" : "tape-blush"}`} aria-hidden="true" />
            {memory.image ? (
              <img
                src={memory.image}
                alt={memory.alt}
                style={{ aspectRatio: memory.ratio }}
                loading={index < 2 ? "eager" : "lazy"}
                decoding="async"
              />
            ) : (
              <span className="mem-blank" style={{ aspectRatio: memory.ratio }}>
                <span>this page is waiting for its photo</span>
              </span>
            )}
            {memory.title && <span className="mem-frame-title">{memory.title}</span>}
          </button>
        </motion.div>

        {memory.caption && (
          <motion.p
            className="mem-chapter-caption"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 0.34 }}
          >
            {memory.caption}
          </motion.p>
        )}
      </div>
    </motion.li>
  );
}

/**
 * Memory Lane.
 *
 * A journal of 22 chapters: an opening page, one chapter per photograph on a
 * drawn thread, a viewer for looking at any of them closely, and a closing
 * page. The chapters live in src/data/memories.js and are meant to be edited
 * there — this file only arranges them.
 */
export default function MemoryLane() {
  const reduce = useReducedMotion();
  const [opened, setOpened] = useState(false);
  const [viewing, setViewing] = useState(null);
  const threadRef = useRef(null);
  const chaptersRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: threadRef,
    offset: ["start 75%", "end 65%"],
  });
  const threadScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const openBook = useCallback(() => {
    setOpened(true);
    // The chapters are always in the page; this only takes you to them.
    window.setTimeout(
      () => chaptersRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }),
      reduce ? 0 : 620,
    );
  }, [reduce]);

  return (
    <div className="mem-page">
      {!reduce && <DustField />}

      <section className="mem-opening" aria-labelledby="mem-opening-title">
        <motion.div
          className="mem-opening-book"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <JournalBook open={opened} />
        </motion.div>

        <motion.h1
          id="mem-opening-title"
          className="mem-opening-title"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.2 }}
        >
          {bookOpening.title}
        </motion.h1>

        <motion.p
          className="mem-opening-blurb"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.34 }}
        >
          {bookOpening.blurb}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.5 }}
        >
          <button type="button" className="mem-cta" onClick={openBook}>
            {bookOpening.cta}
          </button>
        </motion.div>
      </section>

      <section ref={chaptersRef} className="mem-chapters" aria-label="22 memories">
        <div ref={threadRef} className="mem-thread-wrap">
          <span className="mem-thread" aria-hidden="true">
            <motion.span
              className="mem-thread-fill"
              style={reduce ? { scaleY: 1 } : { scaleY: threadScale }}
            />
          </span>

          <ol className="mem-list">
            {memories.map((memory, index) => (
              <Chapter
                key={memory.id}
                memory={memory}
                index={index}
                reduce={reduce}
                onOpen={setViewing}
              />
            ))}
          </ol>
        </div>
      </section>

      <section className="mem-closing" aria-labelledby="mem-closing-title">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <JournalBook closed />
          <h2 id="mem-closing-title" className="mem-closing-title">{bookClosing.title}</h2>
          <p className="mem-closing-blurb">{bookClosing.blurb}</p>
          <div className="mem-closing-row">
            <Bookmark />
          </div>
          <button
            type="button"
            className="mem-cta is-quiet"
            onClick={() =>
              chaptersRef.current?.scrollIntoView({
                behavior: reduce ? "auto" : "smooth",
                block: "start",
              })
            }
          >
            Read the memories again 📖
          </button>
        </motion.div>
      </section>

      <MemoryLightbox
        memory={viewing === null ? null : memories[viewing]}
        index={viewing ?? 0}
        total={memories.length}
        reduce={reduce}
        onClose={() => setViewing(null)}
        onStep={setViewing}
      />
    </div>
  );
}
