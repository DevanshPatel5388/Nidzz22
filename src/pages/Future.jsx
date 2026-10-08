import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { dreams } from "../data/content";

export default function Future() {
  const [pinned, setPinned] = useState(() => new Set());

  function toggle(title) {
    setPinned((current) => {
      const next = new Set(current);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  }

  return (
    <div className="pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <PageHeader
          kicker="unwritten"
          title="Future Adventures"
          subtitle="A wall of things worth looking forward to. Tap a card to pin it."
        />
      </div>

      <section className="cork mx-4 mt-6 rounded-[2rem] px-4 py-10 sm:mx-6 sm:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dreams.map((dream, index) => {
            const on = pinned.has(dream.title);
            return (
              <motion.button
                key={dream.title}
                type="button"
                onClick={() => toggle(dream.title)}
                aria-pressed={on}
                className="scrap relative rounded-[1.2rem] px-5 pb-5 pt-7 text-left"
                style={{ transform: `rotate(${on ? 0 : dream.rotate}deg)` }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.05 }}
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
    </div>
  );
}
