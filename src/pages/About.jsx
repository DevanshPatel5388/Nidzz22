import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BookStack, Cap, Paw, Shoe, SittingCat, Sunflower } from "../components/illustrations";
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

const memoryShots = [
  { names: ["photo-1", "photo_1"], caption: "Lakhoti" },
  { names: ["photo-2", "photo_2"], caption: "Chaddi-Baddi" },
  { names: ["photo-3", "photo_3"], caption: "kept this one" },
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

      <section className="mt-16 max-w-2xl" aria-labelledby="memories">
        <h2 id="memories" className="font-hand text-4xl leading-none text-ink sm:text-5xl">
          a few memories
        </h2>
        <div className="mt-4 space-y-4 text-[1.05rem] leading-relaxed text-ink sm:text-lg">
          <p>
            We have had the silly fights. We have also had the quieter stretches, where nobody was really talking, and that part was worse than the fights.
          </p>
          <p>
            Then one day we were Chaddi-Baddi again. I still do not have a tidy explanation. I am just glad that is the version that stuck.
          </p>
        </div>
        <MemoryPhotos />
      </section>

      <section className="mt-16 max-w-2xl" aria-labelledby="serious">
        <h2 id="serious" className="font-hand text-4xl leading-none text-ink sm:text-5xl">
          the serious side, for a second
        </h2>
        <div className="scrap mt-5 max-w-xl rounded-[1.4rem] px-5 py-5 sm:px-6">
          <div className="space-y-3 text-[1.05rem] leading-relaxed text-paper-ink sm:text-lg">
            <p>
              She actually wants to do architecture. Not just talk about it.
            </p>
            <p>
              College, work, studying, all of it at the same time. I am proud of her. I want her to get the things she is aiming at.
            </p>
          </div>
        </div>
      </section>

      <section className="about-close" aria-label="Closing">
        <Sunflower className="h-16 w-auto" />
        <div className="max-w-xl space-y-3 text-[1.05rem] leading-relaxed text-ink sm:text-lg">
          <p>
            She has also been told that my future house is her problem. I want one slightly ridiculous window, and a place for the shoes she will definitely judge. She can answer whenever. I am used to the wait.
          </p>
          <p className="font-hand text-4xl leading-none text-ink">Still Chaddi-Baddi, though.</p>
        </div>
      </section>
    </article>
  );
}

function MemoryPhotos() {
  const shots = memoryShots
    .map((shot) => ({ ...shot, src: resolveNamed(shot.names) }))
    .filter((shot) => shot.src);

  if (shots.length === 0) return null;

  return (
    <div className="mt-8 flex flex-wrap items-start gap-8">
      {shots.map((shot, index) => (
        <FoundPhoto
          key={shot.caption}
          names={shot.names}
          caption={shot.caption}
          tilt={index % 2 === 0 ? "sm:-rotate-2" : "sm:rotate-2"}
        />
      ))}
    </div>
  );
}
