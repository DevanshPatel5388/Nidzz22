import { useState } from "react";
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

      <section className="about-memories" aria-labelledby="memories">
        <h2 id="memories" className="font-hand text-4xl leading-none text-ink sm:text-5xl">
          a few memories
        </h2>
        <div className="about-memory-list">
          {memories.map((memory, index) => (
            <motion.article
              key={memory.id}
              className={`about-memory about-memory-${memory.id}`}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ ...fade, delay: reduce ? 0 : (index % 2) * 0.04 }}
            >
              <MemoryMark id={memory.id} />
              <h3 className="font-hand text-4xl leading-none text-paper-ink">{memory.title}</h3>
              {memory.quote && <p className="about-quote">{memory.quote}</p>}
              {memory.paragraphs.map((paragraph) => (
                <p key={paragraph} className="about-memory-copy">{paragraph}</p>
              ))}
              {memory.stamp && <p className="about-stamp">{memory.stamp}</p>}
            </motion.article>
          ))}
        </div>
      </section>

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
