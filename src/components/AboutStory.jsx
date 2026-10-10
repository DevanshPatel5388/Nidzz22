import { motion } from "framer-motion";
import hairs from "../assets/photos/hairs.jpg";
import eyes from "../assets/photos/eyes.jpg";
import smile from "../assets/photos/smile.png";
import nautanki from "../assets/photos/nautanki.jpg";
import { resolveNamed } from "../lib/photos";

// TODO: Set the path to the final birthday image here.
// Drop the image into src/assets/photos/ and put its file name (without the
// extension) below. Any of jpg, jpeg, png, webp, gif or avif works. If no file
// with this name exists, a neutral blank frame is shown instead of a broken image.
const FINAL_IMAGE_NAME = "finale";
const FINAL_IMAGE_ALT = "Lakhoti in a yellow dress, sitting beside yellow flowers";

const beats = [
  {
    id: "hair",
    src: hairs,
    alt: "Lakhoti from behind, her hair clipped up in the sunlight",
    heading: "those zulfein…",
    roman: [
      "O Hasina Julfon Vaalee Jaanejahan",
      "Dhundhatee Hain Kaafir Aankhe Kiska Nishaan",
    ],
    hindi: [
      "ओ हसीना ज़ुल्फ़ों वाली, जाने जहाँ",
      "ढूँढती हैं काफ़िर आँखें किसका निशाँ",
    ],
    caption: "Lakhoti being Lakhoti. 🙃",
    frame: "4 / 5",
    flip: false,
  },
  {
    id: "eyes",
    src: eyes,
    alt: "A close photo of Lakhoti's eyes",
    heading: "those eyes, madam…",
    hindi: [
      "आँखों में तेरी, अजब सी, अजब सी अदाएँ हैं",
      "दिल को बना दे जो पतंग, साँसें ये तेरी वो हवाएँ हैं",
    ],
    caption: "Expression queen 👀",
    frame: "5 / 3",
    flip: true,
  },
  {
    id: "smile",
    src: smile,
    alt: "Lakhoti smiling, outdoors",
    heading: "and then, that smile…",
    roman: [
      "Muskurane ki wajah tum hooo",
      "Gungunane ki wajah tum hooo",
    ],
    hindi: [
      "मुस्कुराने की वजह तुम हो",
      "गुनगुनाने की वजह तुम हो",
    ],
    caption: "Some of our best memories are just random moments, silly jokes, and laughter.",
    frame: "4 / 3",
    flip: false,
  },
  {
    id: "nautanki",
    src: nautanki,
    alt: "Lakhoti in the car, pulling a face and holding up a peace sign",
    heading: "the nautanki queen herself.",
    hindi: [
      "अदाएं बड़ी फंकी करे है नौटंकी",
      "ये छोरी बड़ी ड्रामा क्वीन है",
    ],
    caption: "Best actress. No auditions needed. 🏆",
    frame: "4 / 5",
    flip: true,
  },
];

const closingLines = [
  "Ye chaand saa roshan cheharaa",
  "Zulfon kaa rang suneharaa",
  "Ye jheel see neelee aankhein",
  "Koyi raaz hain in mein geheraa",
  "Taareef karu kyaa uski",
  "Jis ne tumhein banaayaa",
];

function Lyrics({ beat }) {
  return (
    <blockquote className={`about-lyrics about-lyrics-${beat.id}`}>
      {beat.roman && (
        <p className="about-lyrics-roman">
          {beat.roman.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      )}
      <p className="about-lyrics-hindi" lang="hi">
        {beat.hindi.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
      {beat.id === "nautanki" && (
        <span className="about-lyrics-note" aria-hidden="true">♪ ♫</span>
      )}
    </blockquote>
  );
}

export default function AboutStory({ reduce, fade }) {
  const rise = reduce ? false : { opacity: 0, y: 18 };
  const finalSrc = resolveNamed([FINAL_IMAGE_NAME]);
  const lineStep = reduce ? 0 : 0.28;

  return (
    <div className="about-story">
      {beats.map((beat, index) => {
        const fromX = beat.flip ? 28 : -28;
        const isNautanki = beat.id === "nautanki";
        return (
          <article
            key={beat.id}
            className={`about-beat about-beat-${beat.id}${beat.flip ? " is-flip" : ""}`}
          >
            <motion.div
              className="about-beat-motion"
              initial={
                reduce
                  ? false
                  : isNautanki
                    ? { opacity: 0, x: fromX * 1.4, rotate: 3 }
                    : { opacity: 0, x: fromX }
              }
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ ...fade, duration: reduce ? 0 : isNautanki ? 0.65 : 0.55 }}
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
              transition={{ ...fade, delay: reduce ? 0 : 0.2 }}
            >
              <h2 className="about-beat-title">{beat.heading}</h2>
              <Lyrics beat={beat} />
              <p className="about-beat-caption">{beat.caption}</p>
            </motion.div>
          </article>
        );
      })}

      <section className="about-closing" aria-label="A last few lines for Lakhoti">
        <p className="about-closing-lines">
          {closingLines.map((line, i) => {
            const last = i === closingLines.length - 1;
            return (
              <motion.span
                key={line}
                className={`about-closing-line about-closing-line-${i + 1}${last ? " is-last" : ""}`}
                initial={reduce ? false : { opacity: 0, y: last ? 18 : 12, scale: last ? 0.97 : 1 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  ...fade,
                  duration: reduce ? 0 : last ? 0.8 : 0.5,
                  delay: i * lineStep,
                }}
              >
                {line}
              </motion.span>
            );
          })}
        </p>
      </section>

      <section className="about-finale" aria-label="A last photo of Lakhoti">
        <motion.figure
          className={`about-finale-frame${finalSrc ? "" : " is-empty"}`}
          initial={rise}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ ...fade, duration: reduce ? 0 : 0.7 }}
        >
          {finalSrc ? (
            <img src={finalSrc} alt={FINAL_IMAGE_ALT} loading="lazy" decoding="async" />
          ) : (
            <div className="about-finale-blank" aria-hidden="true" />
          )}
        </motion.figure>
      </section>
    </div>
  );
}
