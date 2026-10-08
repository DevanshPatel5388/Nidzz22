import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BookStack, Cap, MusicNote, Paw, Pencil, Shoe, SittingCat, Sunflower } from "../components/illustrations";
import { site } from "../data/content";
import { resolveNamed } from "../lib/photos";

const notes = [
  {
    text: "Cats and sunflowers. Not a whole personality essay. She just likes them, and you can tell.",
    doodle: "cat",
    tilt: "sm:-rotate-1",
  },
  {
    text: "She collects shoes and caps. I have stopped asking whether she needs another one.",
    doodle: "shoe",
    tilt: "sm:rotate-1",
  },
  {
    text: "She can sit with a book for ages. Then someone says Momos or Panipuri, and the book loses.",
    doodle: "book",
    tilt: "sm:rotate-[0.6deg]",
  },
  {
    text: "She ignores my messages. This is a long-running joke, and I am putting it here so she can ignore this too.",
    doodle: "paw",
    tilt: "sm:-rotate-[0.7deg]",
  },
];

const memories = [
  {
    id: "dramebaaz",
    title: "the dramebaaz side",
    stamp: "Oscar-worthy performance",
    paragraphs: [
      "Remember when you moved to that place on Holyake Crescent? The house was horrible, and there were Punjabi guys living there. You called Harsh and started your nautanki to convince him.",
      "You seemed to be crying. You were acting. You were so convincing that even I got scared.",
    ],
  },
  {
    id: "padhaku",
    title: "the padhaku side",
    paragraphs: [
      "Assignments, deadlines, quizzes, exams. All of it at once. So you stayed awake the entire night and finished it.",
      "The next morning, the dark circles were right there. The work, I get. Sleep was not optional, madam.",
    ],
  },
  {
    id: "childish",
    title: "the childish side",
    quote: "Pani Puri",
    paragraphs: [
      "After your favourite Pani Puri, we were recording a vlog, and then you said “Pani Puri.” I don’t know what it was about that one second. It came out so sweet. Proper childish.",
      "Imagine being that happy about Pani Puri. Fair enough. I get it.",
    ],
  },
  {
    id: "angry",
    title: "the angry woman side",
    stamp: "Case reopened: Birthday 2024",
    paragraphs: [
      "Your birthday in 2024. Harsh made a comment, mentioned my name, and somehow I was in it.",
      "You were furious with me. I still remember how angry you were. One comment, my name, and the birthday came with a side of that.",
    ],
  },
  {
    id: "singer",
    title: "the singer side",
    stamp: "100% confidence, 0% accuracy",
    paragraphs: [
      "After we bought the water filter, you sang “Brown Munde.” The lyrics were wrong. The confidence was not.",
      "I’ve heard a lot of songs. Not one of them was Brown Munde, sung like that. Your version was funnier. Don’t fix it.",
    ],
  },
];

function doodleFor(kind) {
  if (kind === "cat") return <SittingCat className="h-14 w-auto" />;
  if (kind === "shoe") return (
    <span className="flex items-end gap-2">
      <Shoe className="h-10 w-auto" />
      <Cap className="h-9 w-auto" />
    </span>
  );
  if (kind === "book") return <BookStack className="h-12 w-auto" />;
  return <Paw className="h-8 w-8 text-blush-deep" />;
}

function FoundPhoto({ names, caption, tilt = "-rotate-2", className = "" }) {
  const src = resolveNamed(names);
  const [failed, setFailed] = useState(!src);
  if (!src || failed) return null;

  return (
    <figure className={`polaroid w-full max-w-[16rem] ${tilt} ${className}`}>
      <span className="tape tape-blush" aria-hidden="true" />
      <div className="aspect-[4/5] overflow-hidden bg-[#f3eadf]">
        <img
          src={src}
          alt={caption}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      </div>
      <figcaption className="absolute inset-x-3 bottom-2 text-center font-hand text-[1.7rem] leading-none text-paper-ink">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function About() {
  const reduce = useReducedMotion();
  const fade = reduce ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] };

  return (
    <article className="about-journal">
      <header className="max-w-2xl">
        <p className="font-hand text-2xl text-sun-deep sm:text-3xl">if someone asked me</p>
        <h1 className="mt-1 font-hand text-5xl leading-none text-ink sm:text-6xl">Okay, so… her.</h1>
      </header>

      <div className="about-open">
        <FoundPhoto
          names={["portrait", "photo-portrait", "her"]}
          caption="Lakhoti"
          tilt="sm:-rotate-2"
          className="about-portrait"
        />
        <div className="max-w-xl space-y-4 text-[1.05rem] leading-relaxed text-ink sm:text-lg">
          <p>
            If someone asked me about Lakhoti, I would not give them a neat answer. I would say she is my Chaddi-Baddi, and then I would have to explain the fights, the weeks we did not talk, and the part where we ended up close again anyway.
          </p>
          <p>
            She turns {site.age} on {site.birthdayLabel}. Architecture, college, work, studying, and LOVERS, lol. I do not know who approved that schedule.
          </p>
        </div>
      </div>

      <section className="mt-14" aria-labelledby="little-things">
        <h2 id="little-things" className="font-hand text-4xl leading-none text-ink sm:text-5xl">
          the little things that make her her
        </h2>
        <div className="about-scatter">
          {notes.map((note, index) => (
            <motion.figure
              key={note.text}
              className={`about-note scrap ${note.tilt}`}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...fade, delay: reduce ? 0 : index * 0.04 }}
            >
              <span className={`tape ${index % 2 === 0 ? "tape-blush" : "tape-sun"}`} aria-hidden="true" />
              <div className="flex items-start gap-3">
                <div className="mt-1 shrink-0 text-paper-ink" aria-hidden="true">{doodleFor(note.doodle)}</div>
                <figcaption className="font-hand text-[1.85rem] leading-tight text-paper-ink">{note.text}</figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </section>

      <MemoryDeck reduce={reduce} fade={fade} />

      <section className="about-serious" aria-labelledby="serious">
        <Sunflower className="h-16 w-auto" />
        <div>
          <h2 id="serious" className="font-hand text-4xl leading-none text-ink sm:text-5xl">
            the serious side, for a second
          </h2>
          <div className="about-serious-paper">
            <p>Jokes apart. I know you actually want to be an Architect.</p>
            <p>
              College, work, assignments, exams, and the rest of what you fit into a day. That is a lot. I’m proud of the effort. I hope it gets you a good-paying job in your field, and the future you want.
            </p>
            <p>
              Also, my future house is already your responsibility. I want one slightly ridiculous window, and a proper place for the shoes you are definitely going to judge. You can take your time replying. You usually do. No pressure.
            </p>
          </div>
          <p className="about-signoff">Still Chaddi-Baddi, though.</p>
        </div>
      </section>
    </article>
  );
}

const noteEase = [0.22, 1, 0.36, 1];

function MemoryDeck({ reduce, fade }) {
  const total = memories.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [busy, setBusy] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [leaving, setLeaving] = useState(null);
  const [stageHeight, setStageHeight] = useState(null);
  const lock = useRef(false);
  const turn = useRef(0);
  const interacted = useRef(false);
  const cueRef = useRef(null);
  const endRef = useRef(null);
  const setHeight = useCallback((next) => {
    setStageHeight((current) => (current === next ? current : next));
  }, []);
  const memory = memories[index];
  const isLast = index === total - 1;

  function go(nextIndex) {
    if (lock.current || nextIndex === index || nextIndex < 0 || nextIndex >= total) return;
    lock.current = true;
    const ticket = ++turn.current;
    const dir = nextIndex > index ? 1 : -1;
    interacted.current = true;
    setBusy(true);
    setHasMoved(true);
    setDirection(dir);
    if (!reduce) {
      setLeaving({
        memory: memories[index],
        dir,
        cueLabel: index === total - 1
          ? null
          : index === 0
            ? "Click to reveal the next memory"
            : "Open the next memory",
      });
    }
    setIndex(nextIndex);
    window.setTimeout(() => {
      if (turn.current !== ticket) return;
      setLeaving(null);
      lock.current = false;
      setBusy(false);
    }, reduce ? 0 : 460);
  }

  useEffect(() => {
    if (!interacted.current) return;
    const node = isLast ? endRef.current : cueRef.current;
    node?.focus({ preventScroll: true });
  }, [index, isLast]);

  function onKeyDown(event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  }

  return (
    <section className="about-memories" aria-labelledby="memories" onKeyDown={onKeyDown}>
      <h2 id="memories" className="font-hand text-4xl leading-none text-ink sm:text-5xl">
        a few memories
      </h2>
      <motion.div
        className="about-deck"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={fade}
      >
        <p className="about-deck-count">Memory {index + 1} of {total}</p>
        <p className="about-deck-live" aria-live="polite">
          {memory.title}. Memory {index + 1} of {total}.
          {isLast ? " And these are just a few of our memories." : ""}
        </p>
        <div
          className="about-deck-stage"
          style={stageHeight ? { height: stageHeight } : undefined}
        >
          <span className="about-deck-sheet about-deck-sheet-back" aria-hidden="true" />
          <span className="about-deck-sheet" aria-hidden="true" />
          {leaving && (
            <motion.article
              key={`leave-${leaving.memory.id}`}
              className={`about-memory about-memory-${leaving.memory.id} is-leaving`}
              aria-hidden="true"
              initial={{ opacity: 1, x: 0, rotate: 0, y: 0 }}
              animate={{
                opacity: 0,
                x: leaving.dir > 0 ? -46 : 46,
                rotate: leaving.dir > 0 ? -1.5 : 1.5,
                y: -6,
              }}
              transition={{ duration: 0.42, ease: noteEase }}
            >
              <MemoryBody
                memory={leaving.memory}
                cue={leaving.cueLabel ? "ghost" : null}
                cueLabel={leaving.cueLabel}
              />
            </motion.article>
          )}
          <motion.article
            key={memory.id}
            className={`about-memory about-memory-${memory.id} is-current${isLast ? "" : " is-openable"}`}
            aria-labelledby={`memory-${memory.id}`}
            initial={reduce || !hasMoved ? false : {
              opacity: 0,
              x: direction > 0 ? 42 : -42,
              rotate: direction > 0 ? 1.4 : -1.4,
              y: 12,
            }}
            animate={{ opacity: 1, x: 0, rotate: 0, y: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.45, ease: noteEase }}
            onClick={(event) => {
              if (isLast || event.target.closest("button")) return;
              go(index + 1);
            }}
          >
            <MemoryBody
              memory={memory}
              cue={isLast ? null : "button"}
              cueLabel={index === 0 ? "Click to reveal the next memory" : "Open the next memory"}
              cueRef={cueRef}
              busy={busy}
              onOpen={() => go(index + 1)}
              onHeight={setHeight}
            />
          </motion.article>
        </div>
        <div className="about-deck-nav">
          <button type="button" onClick={() => go(index - 1)} disabled={busy || index === 0}>
            Previous memory
          </button>
          {isLast ? (
            <motion.p
              ref={endRef}
              tabIndex={-1}
              className="about-deck-end"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.4, delay: 0.12 }}
            >
              And these are just a few of our memories ❤️
            </motion.p>
          ) : (
            <button type="button" onClick={() => go(index + 1)} disabled={busy}>
              Next memory
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}

function MemoryBody({ memory, cue, cueLabel, cueRef, busy, onOpen, onHeight }) {
  const body = (
    <>
      <MemoryMark id={memory.id} />
      <h3
        id={cue === "ghost" ? undefined : `memory-${memory.id}`}
        className="font-hand text-4xl leading-none text-paper-ink"
      >
        {memory.title}
      </h3>
      {memory.quote && <p className="about-quote">{memory.quote}</p>}
      {memory.paragraphs.map((paragraph) => (
        <p key={paragraph} className="about-memory-copy">{paragraph}</p>
      ))}
      {memory.stamp && <p className="about-stamp">{memory.stamp}</p>}
      {cue === "button" && (
        <button
          ref={cueRef}
          type="button"
          className="about-deck-cue"
          onClick={onOpen}
          disabled={busy}
        >
          {cueLabel}
        </button>
      )}
      {cue === "ghost" && <p className="about-deck-cue">{cueLabel}</p>}
    </>
  );

  if (!onHeight) return body;
  return <NoteFrame onHeight={onHeight}>{body}</NoteFrame>;
}

function NoteFrame({ onHeight, children }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const node = ref.current?.parentElement;
    if (!node) return undefined;
    const measure = () => onHeight(node.offsetHeight + 8);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [onHeight]);

  return <div ref={ref}>{children}</div>;
}

function MemoryMark({ id }) {
  if (id === "padhaku") {
    return (
      <span className="about-mark-wrap" aria-hidden="true">
        <Pencil className="about-mark" />
      </span>
    );
  }
  if (id === "singer") {
    return (
      <span className="about-mark-wrap" aria-hidden="true">
        <MusicNote className="about-mark about-mark-note" />
      </span>
    );
  }
  return null;
}
