import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Character, IsoBuilding, PineTree, SparkleField } from "./figures";
import { scrollToScene } from "./useStageSequence";

/** The moment she starts: 26 October 2026, 9am in Sudbury (Eastern time). */
const START_AT = Date.UTC(2026, 9, 26, 13, 0, 0);

/**
 * Works out how long is left until the first day.
 * @returns {{started: boolean, days: number, hours: number, minutes: number}}
 */
function timeUntilStart(now) {
  const remaining = START_AT - now;
  if (remaining <= 0) return { started: true, days: 0, hours: 0, minutes: 0 };
  const minutes = Math.floor(remaining / 60000);
  return {
    started: false,
    days: Math.floor(minutes / 1440),
    hours: Math.floor((minutes % 1440) / 60),
    minutes: minutes % 60,
  };
}

/**
 * The milestone card for her first day.
 *
 * The countdown is always computed from the current clock, so once the date
 * passes the section turns into a celebration rather than a negative number.
 */
export function MilestoneScene({ reduce }) {
  const [left, setLeft] = useState(() => timeUntilStart(Date.now()));

  useEffect(() => {
    const tick = () => setLeft(timeUntilStart(Date.now()));
    tick();
    const timer = window.setInterval(tick, 60000);
    return () => window.clearInterval(timer);
  }, []);

  const units = [
    { value: left.days, label: left.days === 1 ? "day" : "days" },
    { value: left.hours, label: left.hours === 1 ? "hour" : "hours" },
    { value: left.minutes, label: left.minutes === 1 ? "minute" : "minutes" },
  ];

  return (
    <section id="scene-milestone" className="arch-scene arch-scene-paper" aria-labelledby="arch-date-title">
      <div className="arch-scene-inner">
        <motion.div
          className="arch-date-card"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="arch-date-tab" aria-hidden="true" />
          <p className="arch-date-month">October 2026</p>
          <p id="arch-date-title" className="arch-date-big">
            <span className="arch-date-day">26</span>
          </p>
          <p className="arch-date-line">Day One of a Beautiful New Beginning</p>

          {left.started ? (
            <p className="arch-countdown-done">The Journey Has Begun!</p>
          ) : (
            <div className="arch-countdown" aria-label={`${left.days} days, ${left.hours} hours and ${left.minutes} minutes to go`}>
              {units.map((unit) => (
                <span key={unit.label} className="arch-countdown-unit" aria-hidden="true">
                  <strong>{unit.value}</strong>
                  <em>{unit.label}</em>
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

const MILESTONES = [
  { title: "August 20, 2023", text: "Arriving in Canada." },
  { title: "Her Humber chapter", text: "Studying and growing." },
  { title: "Toronto and the CN Tower", text: "A new life, new experiences, and dreams taking shape." },
  { title: "The work", text: "Deadlines, site visits, and presentations." },
  { title: "The tools", text: "AutoCAD, Revit, SketchUp, and Twinmotion." },
  { title: "Arrival in Sudbury", text: "North into the pine and the rock, to the place the job is." },
  { title: "October 26, 2026", text: "Beginning at Hatch in Sudbury, Ontario." },
  { title: "Everything still to design", text: "The buildings, the drawings, and the ideas that have not happened yet." },
];

/** The spine of the story: one line drawing itself through every milestone. */
export function JourneyTimeline({ reduce }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} id="scene-timeline" className="arch-scene arch-scene-paper" aria-labelledby="arch-timeline-title">
      <div className="arch-scene-inner">
        <div className="arch-scene-copy is-centred">
          <p className="arch-eyebrow">the whole journey</p>
          <h2 id="arch-timeline-title" className="arch-heading">How the story runs.</h2>
        </div>

        <ol className="arch-timeline">
          <span className="arch-timeline-rail" aria-hidden="true">
            <motion.span
              className="arch-timeline-fill"
              style={reduce ? { scaleY: 1 } : { scaleY }}
            />
          </span>

          {MILESTONES.map((item, index) => (
            <motion.li
              key={item.title}
              className="arch-timeline-item"
              initial={reduce ? false : { opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: reduce ? 0 : (index % 3) * 0.06 }}
            >
              <span className="arch-timeline-dot" aria-hidden="true">{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * The last scene. Evening settles, the windows warm up, and the story hands
 * itself back to her.
 * @param {() => void} onReplay  Restarts every scene from the top.
 */
export function FinaleScene({ reduce, onReplay }) {
  const lines = [
    "Your Story Is Just Beginning.",
    "Dream boldly. Design thoughtfully. Build beautifully.",
    "Here's to your next big adventure at Hatch!",
  ];

  return (
    <section id="scene-finale" className="arch-scene arch-scene-evening" aria-labelledby="arch-finale-title">
      <SparkleField count={18} className="arch-sparkles-night" />

      <div className="arch-scene-inner">
        <div className="arch-finale-stage">
          <svg viewBox="0 0 900 300" className="arch-finale-backdrop" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 212 140 170 280 204 420 162 560 200 700 164 840 202 900 184V300H0Z" fill="#3b4255" opacity="0.8" />
            <g opacity="0.55" fill="#2f3647">
              <rect x="690" y="150" width="26" height="62" />
              <rect x="724" y="166" width="20" height="46" />
              <path d="M762 212V96h6l2-72h4l2 72h6v116Z" />
            </g>
            <g>
              <PineTree x={70} y={228} scale={0.8} dark delay={0.2} />
              <PineTree x={840} y={226} scale={0.7} dark delay={0.6} />
            </g>
          </svg>

          <div className="arch-finale-model">
            <IsoBuilding stage={4} evening sway={!reduce} />
          </div>

          <svg viewBox="0 0 160 200" className="arch-finale-person" aria-hidden="true">
            <g transform="translate(80 190) scale(1.05)">
              <Character pose="stand" />
            </g>
          </svg>
        </div>

        <div className="arch-finale-copy">
          {lines.map((line, index) => (
            <motion.p
              key={line}
              className={`arch-finale-line arch-finale-line-${index + 1}`}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: reduce ? 0 : index * 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {index === 0 ? <span id="arch-finale-title">{line}</span> : line}
            </motion.p>
          ))}

          <button
            type="button"
            className="arch-btn arch-btn-light"
            onClick={() => {
              onReplay();
              scrollToScene("scene-begin", reduce);
            }}
          >
            Replay the journey
          </button>
        </div>
      </div>
    </section>
  );
}
