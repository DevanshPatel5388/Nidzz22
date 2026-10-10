import { Fragment } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Bird,
  BigNickel,
  CanadaMap,
  Character,
  Cloud,
  OntarioMap,
  PineTree,
  SparkleField,
  TorontoSkyline,
  TravelCar,
} from "./figures";
import { scrollToScene, useStageSequence } from "./useStageSequence";

/**
 * Reveals a line one letter at a time.
 *
 * Letters are grouped per word and each word is kept on one line, so the
 * animation can never introduce a mid-word break. The whole run carries an
 * aria-label, so assistive tech reads the sentence rather than the letters.
 */
function LetterReveal({ text, className = "", delay = 0, reduce }) {
  if (reduce) return <span className={className}>{text}</span>;

  let index = 0;
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, w) => (
        <Fragment key={`${word}-${w}`}>
          {w > 0 ? " " : null}
          <span aria-hidden="true" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {word.split("").map((char, c) => {
              const step = index;
              index += 1;
              return (
                <motion.span
                  key={`${char}-${c}`}
                  style={{ display: "inline-block" }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: delay + step * 0.035, ease: [0.22, 1, 0.36, 1] }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        </Fragment>
      ))}
    </span>
  );
}

const OPENING_STEPS = [300, 1400];

/**
 * Scene one. A sunrise sky, an illustrated map of Canada, and a route that
 * draws itself toward Ontario while a small plane follows it.
 */
export function OpeningScene({ reduce }) {
  const [ref, stage] = useStageSequence(OPENING_STEPS, { reduce, margin: "0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const cloudsY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const mapY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const sunY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -30]);

  return (
    <section ref={ref} id="scene-begin" className="arch-scene arch-scene-dawn" aria-labelledby="arch-opening-title">
      <motion.span className="arch-sun" style={{ y: sunY }} aria-hidden="true" />
      <SparkleField count={10} />

      <motion.div className="arch-cloud-layer" style={{ y: cloudsY }} aria-hidden="true">
        <Cloud className="arch-cloud-a" scale={1.1} speed={88} opacity={0.9} />
        <Cloud className="arch-cloud-b" scale={0.7} speed={120} opacity={0.65} />
        <Cloud className="arch-cloud-c" scale={0.9} speed={104} opacity={0.75} />
      </motion.div>

      <div className="arch-scene-inner arch-opening-grid">
        <div className="arch-opening-copy">
          <p className="arch-eyebrow">August 20, 2023</p>
          <h1 id="arch-opening-title" className="arch-title">
            <LetterReveal text="A New Chapter Begins in Canada" reduce={reduce} />
          </h1>
          <motion.p
            className="arch-lede"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 1.5 }}
          >
            Every beautiful journey begins with a single step.
          </motion.p>

          <motion.div
            className="arch-cta-row"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: reduce ? 0 : 1.9 }}
          >
            <button type="button" className="arch-btn" onClick={() => scrollToScene("scene-toronto", reduce)}>
              Let&apos;s Begin the Journey
            </button>
            <button type="button" className="arch-btn-quiet" onClick={() => scrollToScene("scene-hatch", reduce)}>
              Skip to the celebration
            </button>
          </motion.div>
        </div>

        <motion.div className={`arch-map-wrap${stage >= 1 ? " is-ready" : ""}`} style={{ y: mapY }}>
          <CanadaMap animate={!reduce} />
        </motion.div>
      </div>
    </section>
  );
}

const HUMBER_STEPS = [200, 1400];

/**
 * Her studies at Humber, between arriving in Canada and the skyline.
 * The campus is an original drawing, not a specific Humber building.
 */
export function HumberScene({ reduce }) {
  const [ref, stage] = useStageSequence(HUMBER_STEPS, { reduce });

  return (
    <section ref={ref} id="scene-humber" className="arch-scene arch-scene-day" aria-labelledby="arch-humber-title">
      <div className="arch-scene-inner">
        <motion.div
          className="arch-scene-copy is-centred"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="arch-eyebrow">Lakhoti studied at Humber</p>
          <h2 id="arch-humber-title" className="arch-heading">Her Humber Chapter</h2>
          <p className="arch-sub">A journey of learning, growth, and new possibilities.</p>
        </motion.div>

        <div className={`arch-campus is-stage-${stage}`}>
          <svg viewBox="0 0 760 340" role="img" aria-label="An original illustration of a college campus and a study desk">
            <rect width="760" height="340" fill="#f4efe4" />
            <rect y="230" width="760" height="110" fill="#d5e0c4" />
            <path d="M30 268h360" stroke="#c9b89a" strokeWidth="14" strokeLinecap="round" />
            <g transform="translate(150 78)">
              <rect width="250" height="150" fill="#fffaf3" stroke="#3e2c22" strokeWidth="1.6" />
              <path d="M0 0h250" stroke="#c0463f" strokeWidth="8" />
              <rect x="28" y="28" width="40" height="46" fill="#d7e4ef" stroke="#35586d" />
              <rect x="84" y="28" width="40" height="46" fill="#d7e4ef" stroke="#35586d" />
              <rect x="140" y="28" width="40" height="46" fill="#d7e4ef" stroke="#35586d" />
              <rect x="104" y="96" width="42" height="54" fill="#f4c7c3" stroke="#3e2c22" />
            </g>
            <PineTree x={70} y={268} scale={0.7} />
            <PineTree x={460} y={272} scale={0.55} dark />
            <g className="arch-campus-walker">
              <g transform="translate(70 292) scale(0.42)">
                <Character pose="walk" />
              </g>
            </g>
            <g transform="translate(500 46)">
              <rect width="220" height="160" rx="8" fill="#fffaf3" stroke="#3e2c22" strokeWidth="1.4" />
              <path d="M24 32h140M24 52h100" fill="none" stroke="#35586d" strokeWidth="2" />
              <rect x="24" y="72" width="64" height="52" fill="none" stroke="#35586d" strokeWidth="2" />
              <path d="M108 86h80M108 106h62" fill="none" stroke="#35586d" strokeWidth="2" />
              <text x="24" y="146" fill="#3e2c22" fontFamily="Caveat, cursive" fontSize="22">notes</text>
            </g>
          </svg>
        </div>
        <p className="arch-campus-note">A campus drawn for her, not a picture of one building.</p>
      </div>
    </section>
  );
}

const TORONTO_STEPS = [200, 900, 1800];

/**
 * Scene two. The sky warms into daytime, the skyline rises, the CN Tower
 * builds upward, and the city lights come on.
 */
export function TorontoScene({ reduce }) {
  const [ref, stage] = useStageSequence(TORONTO_STEPS, { reduce });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const skylineScale = useTransform(scrollYProgress, [0, 0.55, 1], reduce ? [1, 1, 1] : [1.06, 1, 1.03]);
  const birdsX = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);

  return (
    <section ref={ref} id="scene-toronto" className="arch-scene arch-scene-day" aria-labelledby="arch-toronto-title">
      <div className="arch-cloud-layer" aria-hidden="true">
        <Cloud className="arch-cloud-a" scale={1.2} speed={96} opacity={0.8} />
        <Cloud className="arch-cloud-c" scale={0.8} speed={132} opacity={0.6} />
      </div>

      <motion.div className="arch-bird-layer" style={{ x: birdsX }} aria-hidden="true">
        <Bird className="arch-bird-1" />
        <Bird className="arch-bird-2" />
        <Bird className="arch-bird-3" />
      </motion.div>

      <div className="arch-scene-inner">
        <motion.div
          className="arch-scene-copy is-centred"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="arch-toronto-title" className="arch-heading">
            A new life, new experiences, and dreams taking shape.
          </h2>
        </motion.div>
      </div>

      <motion.div className={`arch-skyline-wrap is-stage-${stage}`} style={{ scale: skylineScale }}>
        <TorontoSkyline />
      </motion.div>
    </section>
  );
}

const SUDBURY_STEPS = [200, 1100];

/**
 * Scene three. The story travels north from Toronto into the rock, pine and
 * sunset of Northern Ontario, arriving at Sudbury.
 *
 * The landscape is one SVG so the hills, treeline and road share a single
 * coordinate system; parallax is applied to groups inside it.
 */
export function SudburyScene({ reduce }) {
  const [ref, stage] = useStageSequence(SUDBURY_STEPS, { reduce });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const hillsX = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const roadX = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);

  return (
    <section ref={ref} id="scene-sudbury" className="arch-scene arch-scene-dusk" aria-labelledby="arch-sudbury-title">
      <div className="arch-scene-inner arch-sudbury-grid">
        <motion.div
          className="arch-scene-copy"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="arch-eyebrow">heading north</p>
          <h2 id="arch-sudbury-title" className="arch-heading">Next Stop: Sudbury, Ontario</h2>
          <p className="arch-sub">Where a new professional journey begins.</p>
        </motion.div>

        <div className={`arch-ontario-wrap${stage >= 1 ? " is-ready" : ""}`}>
          <OntarioMap progress={stage >= 1 ? 1 : 0} />
        </div>
      </div>

      <div className={`arch-north is-stage-${stage}`}>
        <svg
          viewBox="0 0 1200 440"
          preserveAspectRatio="xMidYMax slice"
          className="arch-north-svg"
          role="img"
          aria-label="An illustration of the Northern Ontario landscape on the road to Sudbury"
        >
          <circle className="arch-north-sun" cx="930" cy="214" r="62" />

          <motion.g style={{ x: hillsX }}>
            <path
              d="M-60 208 120 150 300 196 480 138 660 190 840 142 1020 192 1260 152V440H-60Z"
              fill="#7a6b78"
              opacity="0.55"
            />
            <path
              d="M-60 258 140 206 340 250 540 200 740 246 940 198 1140 248 1260 224V440H-60Z"
              fill="#5d5862"
              opacity="0.72"
            />
          </motion.g>

          <path d="M-60 306 200 292 520 302 820 290 1120 300 1260 294V440H-60Z" fill="#3d4a40" />

          <g className="arch-north-trees">
            <PineTree x={70} y={312} scale={1} delay={0.1} />
            <PineTree x={156} y={308} scale={0.78} dark delay={0.5} />
            <PineTree x={1046} y={310} scale={0.92} delay={0.3} />
            <PineTree x={1140} y={314} scale={0.72} dark delay={0.7} />
          </g>
          <BigNickel x={300} y={306} scale={0.92} />

          <motion.g className="arch-north-roadgroup" style={{ x: roadX }}>
            <path d="M470 300 760 300 1080 440 170 440Z" fill="#4a4a4f" />
            <path className="arch-road-dashes" d="M622 310 596 440" />
            <g transform="translate(640 392) scale(1.5)">
              <g className="arch-north-car">
                <TravelCar />
              </g>
            </g>
          </motion.g>
        </svg>
      </div>
    </section>
  );
}
