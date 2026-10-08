import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import {
  BookStack,
  Cap,
  Cottage,
  SittingCat,
  Shoe,
  Sunflower,
  Ticket,
} from "../components/illustrations";
import { favorites, site } from "../data/content";
import { resolveNamed } from "../lib/photos";

const art = {
  cat: <SittingCat className="h-24 w-auto" />,
  sunflower: <Sunflower className="h-24 w-auto" />,
  books: <BookStack className="h-20 w-auto" />,
  shoe: <Shoe className="h-16 w-auto" />,
  cap: <Cap className="h-16 w-auto" />,
  ticket: <Ticket className="h-16 w-auto" />,
  building: <Cottage className="h-20 w-auto" />,
};

const washes = ["#fff6f3", "#fff8e8", "#f7f3ea", "#f8f1e6", "#fff5f0", "#f6f4ea", "#fff8ee"];

function Portrait() {
  const src = resolveNamed(["portrait", "photo-portrait", "her"]);
  const [failed, setFailed] = useState(!src);

  return (
    <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-md sm:h-44 sm:w-44">
      {!failed && src ? (
        <img
          src={src}
          alt={site.name}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center bg-[#f8efe4]">
          <Sunflower className="h-16 w-auto" />
          <span className="font-hand text-3xl text-paper-ink">{site.name}</span>
        </div>
      )}
    </div>
  );
}

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
      <PageHeader
        kicker="a portrait"
        title="The Girl Behind The Smile"
        subtitle="A few of the things that feel like you."
      />

      <motion.section
        className="scrap mx-auto mt-8 grid max-w-3xl items-center gap-6 rounded-[1.8rem] px-6 py-7 sm:grid-cols-[auto_1fr] sm:px-8"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Portrait />
        <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2">
          {[
            ["name", site.name],
            ["turning", String(site.age)],
            ["date", site.birthdayLabel],
            ["filed under", "sunlight"],
            ["status", "deeply loved"],
          ].map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="font-type text-xs tracking-[0.14em] text-paper-muted">{label}</dt>
              <dd className="font-hand text-3xl leading-none text-paper-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </motion.section>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((item, index) => (
          <motion.article
            key={item.title}
            className="lift scrap rounded-[1.5rem] p-5"
            style={{ background: washes[index % washes.length] }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: (index % 3) * 0.05 }}
          >
            <div className="mb-3 flex h-32 items-center justify-center rounded-2xl bg-white/55">
              {art[item.art]}
            </div>
            <p className="text-2xl" aria-hidden="true">{item.emoji}</p>
            <h2 className="font-hand text-4xl leading-none text-paper-ink">{item.title}</h2>
            <p className="mt-2 font-serif text-lg leading-snug text-paper-muted">{item.text}</p>
          </motion.article>
        ))}
      </div>

      <blockquote className="scrap mx-auto mt-12 max-w-3xl rounded-[1.8rem] px-8 py-10 text-center">
        <span className="block font-hand text-7xl leading-none text-blush-deep" aria-hidden="true">“</span>
        <p className="font-serif text-3xl italic leading-snug text-paper-ink sm:text-4xl">
          Some people make the world brighter simply by being in it.
        </p>
      </blockquote>
    </div>
  );
}
