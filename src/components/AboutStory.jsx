import { motion } from "framer-motion";
import hairs from "../assets/photos/hairs.jpg";
import eyes from "../assets/photos/eyes.jpg";
import smile from "../assets/photos/smile.png";
import nautanki from "../assets/photos/nautanki.jpg";

const beats = [
  {
    id: "hair",
    src: hairs,
    alt: "Lakhoti from behind, her hair clipped up in the sunlight",
    heading: "those zulfein…",
    caption: "Lakhoti being Lakhoti. 🙃",
    frame: "4 / 5",
    flip: false,
  },
  {
    id: "eyes",
    src: eyes,
    alt: "A close photo of Lakhoti's eyes",
    heading: "those eyes, madam…",
    caption: "Expression queen 👀",
    frame: "5 / 3",
    flip: true,
  },
  {
    id: "smile",
    src: smile,
    alt: "Lakhoti smiling, outdoors",
    heading: "and then, that smile…",
    caption: "Some of our best memories are just random moments, silly jokes, and laughter.",
    frame: "4 / 3",
    flip: false,
  },
  {
    id: "nautanki",
    src: nautanki,
    alt: "Lakhoti in the car, pulling a face and holding up a peace sign",
    heading: "the nautanki queen herself.",
    caption: "Best actress. No auditions needed. 🏆",
    frame: "4 / 5",
    flip: true,
  },
];

const finale = [hairs, eyes, smile, nautanki];

export default function AboutStory({ reduce, fade }) {
  const rise = reduce ? false : { opacity: 0, y: 18 };

  return (
    <div className="about-story">
      {beats.map((beat, index) => {
        const fromX = beat.flip ? 28 : -28;
        return (
          <article
            key={beat.id}
            className={`about-beat about-beat-${beat.id}${beat.flip ? " is-flip" : ""}`}
          >
            <motion.div
              className="about-beat-motion"
              initial={reduce ? false : { opacity: 0, x: fromX }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ ...fade, duration: reduce ? 0 : 0.55 }}
            >
              <figure className="about-beat-photo">
                <span className={`tape ${index % 2 === 0 ? "tape-sun" : "tape-blush"}`} aria-hidden="true" />
                <img
                  src={beat.src}
                  alt={beat.alt}
                  style={{ aspectRatio: beat.frame }}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </figure>
            </motion.div>
            <motion.div
              className="about-beat-copy"
              initial={rise}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ ...fade, delay: reduce ? 0 : 0.12 }}
            >
              <h2 className="about-beat-title">{beat.heading}</h2>
              <p className="about-beat-caption">{beat.caption}</p>
            </motion.div>
          </article>
        );
      })}

      <section className="about-finale" aria-label="The four photos together">
        <div className="about-finale-row">
          {finale.map((src, index) => (
            <motion.img
              key={src}
              src={src}
              alt=""
              className={`about-finale-shot about-finale-shot-${index + 1}`}
              initial={rise}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...fade, delay: reduce ? 0 : index * 0.08 }}
            />
          ))}
        </div>
        <motion.p
          className="about-finale-line"
          initial={rise}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...fade, delay: reduce ? 0 : 0.28 }}
        >
          that's her.
        </motion.p>
      </section>
    </div>
  );
}
