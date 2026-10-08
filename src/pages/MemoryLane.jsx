import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import Polaroid from "../components/Polaroid";
import { photos, timeline } from "../data/content";

export default function MemoryLane() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
      <PageHeader
        kicker="pressed between pages"
        title="Memory Lane"
        subtitle="A scrapbook with room for every picture still to come."
      />

      <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            className={index % 2 === 1 ? "sm:mt-8" : ""}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
          >
            <Polaroid photo={photo} />
          </motion.div>
        ))}
      </div>

      <section className="mx-auto mt-16 max-w-2xl px-2">
        <h2 className="text-center font-hand text-5xl text-ink">the thread of us</h2>
        <ol className="relative mt-8 space-y-8 border-l border-dashed border-brown/30 pl-8" style={{ borderColor: "var(--beige)" }}>
          {timeline.map((item, index) => (
            <motion.li
              key={item.title}
              className="relative"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
            >
              <span className="absolute -left-[2.45rem] top-2 h-4 w-4 rounded-full border-2 border-paper bg-sun" />
              <h3 className="font-hand text-4xl leading-none text-ink">{item.title}</h3>
              <p className="mt-2 font-serif text-xl leading-snug text-muted">{item.text}</p>
            </motion.li>
          ))}
        </ol>
      </section>
    </div>
  );
}
