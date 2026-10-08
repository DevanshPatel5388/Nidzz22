import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import {
  Cap,
  LoafCat,
  Paw,
  Shoe,
  SittingCat,
  SleepingCat,
  Sunflower,
  Yarn,
} from "../components/illustrations";
import { books, caps, diaryEntries, shoes, stamps } from "../data/content";

const loveLinks = [
  ["cats", "Cats"],
  ["books", "Books"],
  ["shoes", "Shoes"],
  ["caps", "Caps"],
  ["journey", "Jab We Met"],
  ["garden", "Sunflowers"],
];

function LoveHeading({ eyebrow, title, text }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="font-hand text-2xl text-sun-deep">{eyebrow}</p>
      <h2 className="font-hand text-5xl leading-none text-ink sm:text-6xl">{title}</h2>
      <p className="mt-3 font-serif text-xl italic text-muted">{text}</p>
    </div>
  );
}

function CatsSection() {
  const board = useRef(null);
  const mounted = useRef(true);
  const last = useRef(0);
  const [paws, setPaws] = useState([]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  function leavePaw(event, force) {
    const now = performance.now();
    if (!force && event.pointerType !== "mouse") return;
    if (!force && now - last.current < 140) return;
    last.current = now;
    const rect = board.current.getBoundingClientRect();
    const paw = {
      id: `${now}-${Math.random()}`,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      r: `${Math.round(Math.random() * 50 - 25)}deg`,
    };
    setPaws((current) => [...current.slice(-14), paw]);
    window.setTimeout(() => {
      if (mounted.current) setPaws((current) => current.filter((item) => item.id !== paw.id));
    }, 2300);
  }

  return (
    <section id="cats" className="section-anchor px-4 py-16 sm:px-6">
      <LoveHeading
        eyebrow="pspsps"
        title="Cats"
        text="Move through this little room. The floor remembers you."
      />
      <div
        ref={board}
        onPointerMove={(event) => leavePaw(event, false)}
        onPointerDown={(event) => leavePaw(event, true)}
        className="relative mx-auto mt-8 min-h-[28rem] max-w-4xl cursor-crosshair overflow-hidden rounded-[2rem] bg-[color-mix(in_srgb,var(--blush)_45%,var(--cream))]"
      >
        {paws.map((paw) => (
          <span
            key={paw.id}
            className="paw-pop"
            style={{ left: paw.x, top: paw.y, "--r": paw.r }}
          >
            <Paw className="h-full w-full" />
          </span>
        ))}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center gap-2 px-4 pb-4 sm:gap-6">
          <SleepingCat className="w-36 sm:w-48" />
          <SittingCat className="w-24 sm:w-32" />
          <LoafCat className="hidden w-40 sm:block" />
        </div>
        <Yarn className="pointer-events-none absolute left-6 top-8 w-20 opacity-80" />
      </div>
    </section>
  );
}

function BooksSection() {
  const [open, setOpen] = useState(books[3]);

  return (
    <section id="books" className="section-anchor bg-[color-mix(in_srgb,var(--beige)_55%,transparent)] px-4 py-16 sm:px-6">
      <LoveHeading
        eyebrow="the stacks"
        title="Books"
        text="Tap a spine. It opens just enough to show a note."
      />
      <div className="mx-auto mt-8 max-w-3xl">
        <div className="flex h-64 items-end justify-center gap-2 sm:gap-3">
          {books.map((book) => {
            const active = open?.title === book.title;
            return (
              <button
                key={book.title}
                type="button"
                onClick={() => setOpen(book)}
                className="relative w-11 origin-bottom rounded-t-md shadow-md transition duration-300 hover:-translate-y-3 sm:w-14"
                style={{
                  height: book.height,
                  background: book.spine,
                  color: book.ink,
                  transform: active ? "translateY(-14px)" : undefined,
                }}
                aria-pressed={active}
              >
                <span className="absolute inset-x-1 top-3 font-hand text-lg leading-none [writing-mode:vertical-rl] sm:text-2xl">
                  {book.title}
                </span>
              </button>
            );
          })}
        </div>
        <div className="h-3 rounded-b-xl bg-[#8a6248] shadow-inner" />
        {open && (
          <div className="mt-6" style={{ perspective: 1200 }}>
            <motion.div
              key={open.title}
              className="scrap mx-auto max-w-xl rounded-[1.4rem] px-6 py-7"
              initial={{ rotateY: -75, opacity: 0.2 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 90, damping: 16 }}
              style={{ transformOrigin: "left center" }}
            >
              <p className="font-type text-xs tracking-[0.2em] text-paper-muted">opened</p>
              <h3 className="font-hand text-5xl leading-none">{open.title}</h3>
              <p className="mt-3 font-serif text-2xl italic leading-snug">{open.note}</p>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

function ShoesSection() {
  const [picked, setPicked] = useState(shoes[0].name);

  return (
    <section id="shoes" className="section-anchor px-4 py-16 sm:px-6">
      <LoveHeading
        eyebrow="the wall"
        title="Shoes Collection"
        text="A little museum of paths she might take."
      />
      <div className="mx-auto mt-8 max-w-4xl rounded-[2rem] bg-[#f6efe6] px-4 pb-6 pt-8 shadow-inner">
        <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3">
          {shoes.map((shoe) => {
            const active = picked === shoe.name;
            return (
              <button
                key={shoe.name}
                type="button"
                onClick={() => setPicked(shoe.name)}
                className="text-center"
                aria-pressed={active}
              >
                <span className={`mx-auto block transition duration-300 ${active ? "-translate-y-2" : ""}`}>
                  <Shoe upper={shoe.upper} sole={shoe.sole} lace={shoe.lace} className="mx-auto h-24 w-auto" />
                </span>
                <span className={`mt-1 block font-hand text-2xl ${active ? "text-[#c8922a]" : "text-paper-ink"}`}>
                  {shoe.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CapsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || paused) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % caps.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [paused, reduce]);

  function shift(direction) {
    setIndex((current) => (current + direction + caps.length) % caps.length);
  }

  const neighbors = [-1, 0, 1].map((offset) => ({
    offset,
    cap: caps[(index + offset + caps.length) % caps.length],
  }));

  return (
    <section
      id="caps"
      className="section-anchor bg-[color-mix(in_srgb,var(--sun)_18%,transparent)] px-4 py-16 sm:px-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <LoveHeading
        eyebrow="little crowns"
        title="Caps Collection"
        text="A slow turn around the collection. Hover to pause."
      />
      <div className="mx-auto mt-8 flex max-w-3xl items-end justify-center gap-3 sm:gap-8">
        {neighbors.map(({ cap, offset }) => (
          <button
            key={`${cap.name}-${offset}`}
            type="button"
            onClick={() => shift(offset === 0 ? 1 : offset)}
            className={`text-center transition duration-500 ${offset === 0 ? "scale-110" : "scale-90 opacity-65"}`}
            aria-label={cap.name}
          >
            <Cap crown={cap.crown} brim={cap.brim} className={`mx-auto w-auto drop-shadow-md ${offset === 0 ? "h-32 sm:h-40" : "h-20 sm:h-24"}`} />
            <p className={`font-hand text-3xl text-ink ${offset === 0 ? "mt-2" : "mt-1 text-2xl"}`}>{cap.name}</p>
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-3">
        <button type="button" onClick={() => shift(-1)} className="scrap rounded-full bg-paper px-4 py-1 font-hand text-2xl text-paper-ink">
          turn back
        </button>
        <button type="button" onClick={() => shift(1)} className="scrap rounded-full bg-paper px-4 py-1 font-hand text-2xl text-paper-ink">
          turn
        </button>
      </div>
    </section>
  );
}

function JourneySection() {
  const [page, setPage] = useState(0);

  return (
    <section id="journey" className="section-anchor px-4 py-16 sm:px-6">
      <LoveHeading
        eyebrow="a scenic route"
        title="Jab We Met"
        text="Train tickets, a diary, and the long way around. Drawn from scratch, just for her."
      />
      <div className="mx-auto mt-8 grid max-w-5xl gap-5 lg:grid-cols-2">
        <article className="scrap flex overflow-hidden rounded-[1.4rem]">
          <div className="flex-1 p-6">
            <p className="font-type text-[0.7rem] tracking-[0.28em] text-paper-muted">ADMIT ONE</p>
            <h3 className="mt-1 font-hand text-5xl leading-none">Jab We Met</h3>
            <dl className="mt-4 space-y-1 font-serif text-xl">
              <div className="flex justify-between gap-4"><dt className="text-paper-muted">from</dt><dd>here</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-paper-muted">to</dt><dd>wherever the day goes</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-paper-muted">seat</dt><dd>window</dd></div>
            </dl>
          </div>
          <div className="flex w-24 flex-col items-center justify-center border-l border-dashed border-[#e3a19a] bg-[#fff6f3] text-center font-type text-xs tracking-[0.14em]">
            <p>18</p>
            <p className="mt-1">OCT</p>
            <p className="mt-6">WINDOW</p>
          </div>
        </article>

        <article className="scrap rounded-[1.4rem] p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-hand text-4xl leading-none">a page from the road</h3>
            <button
              type="button"
              onClick={() => setPage((current) => (current + 1) % diaryEntries.length)}
              className="rounded-full bg-blush px-3 py-1 font-hand text-xl text-paper-ink"
            >
              turn the page
            </button>
          </div>
          <motion.p
            key={page}
            initial={{ opacity: 0, rotateX: -40 }}
            animate={{ opacity: 1, rotateX: 0 }}
            className="mt-4 min-h-24 font-serif text-2xl italic leading-snug"
          >
            {diaryEntries[page]}
          </motion.p>
        </article>
      </div>

      <div className="mx-auto mt-5 flex max-w-5xl flex-wrap justify-center gap-3">
        {stamps.map((stamp) => (
          <span
            key={stamp}
            className="grid h-20 w-20 rotate-[-8deg] place-items-center rounded-full border-2 border-dashed border-[#c47d74] text-center font-hand text-lg leading-none text-[#a8645c] odd:rotate-6"
          >
            {stamp}
          </span>
        ))}
      </div>

      <div className="relative mx-auto mt-8 h-52 max-w-5xl overflow-hidden rounded-[2rem] border-[10px] border-[#6b4f3a] bg-gradient-to-b from-[#f8d7a8] to-[#f3e2b0]">
        <div className="train-track absolute bottom-0 flex w-[200%] items-end">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex w-1/2 items-end justify-around px-4">
              {Array.from({ length: 6 }, (_, index) => (
                <Sunflower key={`${copy}-${index}`} className="h-24 w-auto sm:h-32" />
              ))}
            </div>
          ))}
        </div>
        <div className="absolute left-1/2 top-1/2 h-16 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/40" />
      </div>
    </section>
  );
}

function GardenSection() {
  const heights = [150, 190, 160, 210, 170, 200, 150];
  const [bloom, setBloom] = useState(3);
  const reduce = useReducedMotion();

  return (
    <section id="garden" className="section-anchor px-4 py-16 sm:px-6">
      <LoveHeading
        eyebrow="face the light"
        title="Sunflowers"
        text="A small garden. Tap one and it stands a little taller."
      />
      <div className="relative mx-auto mt-8 flex h-80 max-w-5xl items-end justify-center gap-1 overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#f8e7c4] to-[#d5e4c4] px-2 sm:gap-3 dark:from-[#3a2a1c] dark:to-[#243024]">
        {heights.map((height, index) => (
          <motion.button
            key={height + index}
            type="button"
            onClick={() => setBloom(index)}
            className="origin-bottom"
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: index * 0.06 }}
            aria-label={`Sunflower ${index + 1}`}
          >
            <Sunflower
              className={`sway w-auto ${bloom === index ? "h-52 sm:h-60" : ""}`}
              style={{
                height: bloom === index ? undefined : height * 0.72,
                animationDelay: `${index * -0.4}s`,
              }}
            />
          </motion.button>
        ))}
      </div>
    </section>
  );
}

export default function Loves() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <PageHeader
          kicker="a field guide"
          title="Things She Loves"
          subtitle="Six little worlds, all of them hers."
        />
      </div>
      <div className="sticky top-[4.6rem] z-40 border-b border-[var(--line)] bg-cream/80 backdrop-blur-md">
        <div className="no-scrollbar mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3">
          {loveLinks.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="shrink-0 rounded-full bg-paper px-3 py-1 font-hand text-xl text-paper-ink shadow-sm"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
      <CatsSection />
      <BooksSection />
      <ShoesSection />
      <CapsSection />
      <JourneySection />
      <GardenSection />
    </div>
  );
}
