import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { MiniMark } from "../components/illustrations";
import { reasons } from "../data/content";

const washes = ["#fffaf3", "#fff6f3", "#fff8e8", "#f8f1e6"];
const tilts = [-1.4, 1.1, -0.6, 1.3, -1, 0.8, -1.5, 1, -0.4, 1.2, -1.1, 0.7, -0.8, 1.4, -1.2, 0.5, -0.9, 1.1, -1.3, 0.6, -0.7, 1];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
      <PageHeader
        kicker="volume 22"
        title="22 Reasons Why You're Amazing"
        subtitle="Twenty-two little truths. One for every year of you."
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, index) => (
          <motion.article
            key={reason.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: (index % 3) * 0.05 }}
          >
            <div
              className="reason-card scrap rounded-[1.4rem] px-5 pb-5 pt-6"
              style={{ "--tilt": `${tilts[index]}deg`, background: washes[index % washes.length] }}
            >
              <span className="absolute -left-2 -top-3 grid h-10 w-10 place-items-center rounded-full bg-blush font-hand text-xl text-paper-ink shadow-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="mb-2 flex justify-end">
                <MiniMark index={index} className="h-8 w-8" />
              </div>
              <h2 className="font-hand text-4xl leading-none text-paper-ink">{reason.title}</h2>
              <p className="mt-2 font-serif text-lg leading-snug text-paper-muted">{reason.line}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
