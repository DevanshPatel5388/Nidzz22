import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Character, Cloud, IsoBuilding, PineTree, PlanSheet } from "./figures";
import { useStageSequence } from "./useStageSequence";

const TASKS = ["Sketch the idea", "Revise the drawing", "Finish the sheet"];
const WORK_STEPS = [500, 1400, 2300];

/**
 * The study years: a desk, revisions, and a short task list.
 * No real deadline dates or project names.
 */
export function HardWorkScene({ reduce }) {
  const [ref, stage] = useStageSequence(WORK_STEPS, { reduce });

  return (
    <section ref={ref} id="scene-work" className="arch-scene arch-scene-studio" aria-labelledby="arch-work-title">
      <div className="arch-scene-inner">
        <div className="arch-scene-copy is-centred">
          <h2 id="arch-work-title" className="arch-heading">Every Deadline Taught Her Something.</h2>
          <p className="arch-sub">Every Challenge Helped Her Grow.</p>
        </div>

        <div className={`arch-craft is-stage-${stage}`}>
          <svg viewBox="0 0 640 320" role="img" aria-label="An illustrated desk where a drawing is revised">
            <rect width="640" height="320" fill="#f6f1e6" />
            <rect x="36" y="188" width="360" height="14" rx="3" fill="#9c7a58" />
            <rect x="58" y="202" width="12" height="70" fill="#8a6a4b" />
            <rect x="350" y="202" width="12" height="70" fill="#8a6a4b" />
            <g transform="translate(150 250) scale(0.7)">
              <Character pose="sit" />
            </g>
            <rect x="210" y="78" width="150" height="96" rx="6" fill="#3c4a55" />
            <rect x="218" y="86" width="134" height="80" fill="#eef5f9" />
            <path className="arch-revise" d="M232 140h90M232 124h70M248 150v-28h24v28" fill="none" stroke="#35586d" strokeWidth="2" />
            <path className="arch-revise-late" d="M300 112h36M300 128h24" fill="none" stroke="#c8922a" strokeWidth="2" />
            <g transform="translate(40 48)">
              <rect width="120" height="90" rx="4" fill="#fffaf3" stroke="#3e2c22" />
              <path d="M16 24h80M16 40h64M16 56h72" stroke="#35586d" strokeWidth="2" />
            </g>
            <g transform="translate(500 36)">
              <circle cx="48" cy="48" r="36" fill="#fffaf3" stroke="#3e2c22" strokeWidth="2" />
              <path d="M48 48V24M48 48l16 10" stroke="#3e2c22" strokeWidth="2" strokeLinecap="round" />
            </g>
          </svg>

          <ol className="arch-tasks">
            {TASKS.map((task, index) => (
              <li key={task} className={stage > index ? "is-done" : undefined}>
                <span aria-hidden="true">{stage > index ? "✓" : "·"}</span>
                {task}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const SITE_STEPS = [400, 1600];

/** An original construction site. Not a place she actually visited. */
export function SiteVisitScene({ reduce }) {
  const [ref, stage] = useStageSequence(SITE_STEPS, { reduce });

  return (
    <section ref={ref} id="scene-site" className="arch-scene arch-scene-day" aria-labelledby="arch-site-title">
      <div className="arch-cloud-layer" aria-hidden="true">
        <Cloud className="arch-cloud-a" scale={0.8} speed={110} opacity={0.7} />
      </div>
      <div className="arch-scene-inner">
        <div className="arch-scene-copy is-centred">
          <h2 id="arch-site-title" className="arch-heading">Beyond the Drawings, There Was the Real World.</h2>
          <p className="arch-sub">Every Visit Brought New Perspectives.</p>
        </div>
        <div className={`arch-site is-stage-${stage}`}>
          <svg viewBox="0 0 760 360" role="img" aria-label="An original illustration of an architectural site visit">
            <rect width="760" height="360" fill="#d7e6f2" />
            <rect y="250" width="760" height="110" fill="#c9bda8" />
            <g transform="translate(80 70)">
              <rect x="40" y="40" width="220" height="150" fill="#e7e0d2" stroke="#3e2c22" />
              <path d="M40 40h220" stroke="#c8922a" strokeWidth="8" />
              <rect x="70" y="70" width="36" height="28" fill="#8fb7cd" />
              <rect x="130" y="70" width="36" height="28" fill="#8fb7cd" />
              <rect x="190" y="70" width="36" height="28" fill="#8fb7cd" />
            </g>
            <g className="arch-crane" transform="translate(520 40)">
              <rect x="28" y="40" width="8" height="180" fill="#55646f" />
              <g className="arch-crane-arm">
                <rect y="36" width="150" height="8" fill="#c8922a" />
                <rect x="120" y="44" width="3" height="40" fill="#3e2c22" />
              </g>
            </g>
            <PineTree x={40} y={268} scale={0.55} />
            <g className="arch-site-person">
              <g transform="translate(250 292) scale(0.48)">
                <Character pose="stand" />
                <ellipse cx="0" cy="-136" rx="18" ry="7" fill="#f0c14b" stroke="#3e2c22" strokeWidth="2" />
                <path d="M-12 -78 H12 L10 -46 H-10 Z" fill="#f0a020" />
                <rect x="16" y="-70" width="22" height="28" rx="2" fill="#fffaf3" stroke="#3e2c22" />
              </g>
            </g>
          </svg>
        </div>
        <p className="arch-campus-note">An original site, drawn for the story. Not a place she visited.</p>
      </div>
    </section>
  );
}

const SLIDES = [
  { name: "Floor plan", art: "plan" },
  { name: "Elevation", art: "elevation" },
  { name: "Model", art: "model" },
  { name: "Visualization", art: "render" },
];

function SlideArt({ art }) {
  if (art === "plan") return <PlanSheet drawing={false} />;
  if (art === "elevation") {
    return (
      <svg viewBox="0 0 420 310" role="img" aria-label="An architectural elevation">
        <rect width="420" height="310" fill="#f7f3ea" />
        <path d="M70 250V90h280v160" fill="none" stroke="#35586d" strokeWidth="3" />
        <path d="M70 90 210 40l140 50" fill="none" stroke="#35586d" strokeWidth="3" />
        <path d="M110 250v-70h40v70M190 160h36v40h-36zM270 150h40v50h-40z" fill="none" stroke="#35586d" strokeWidth="2.4" />
      </svg>
    );
  }
  if (art === "model") return <IsoBuilding stage={3} />;
  return <IsoBuilding stage={4} evening />;
}

/** Slides of a made-up presentation. No clients or awards. */
export function PresentationScene({ reduce }) {
  const [ref, stage] = useStageSequence([700, 1700, 2700], { reduce });
  const [manual, setManual] = useState(null);
  const index = manual ?? Math.min(stage, SLIDES.length - 1);
  const slide = SLIDES[index];

  return (
    <section ref={ref} id="scene-present" className="arch-scene arch-scene-paper" aria-labelledby="arch-present-title">
      <div className="arch-scene-inner">
        <div className="arch-scene-copy is-centred">
          <h2 id="arch-present-title" className="arch-heading">Turning Ideas Into Something Others Could See.</h2>
          <p className="arch-sub">Every Presentation Was Another Step Forward.</p>
        </div>

        <div className="arch-present">
          <div className="arch-screen" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.name}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: reduce ? 0 : 0.45 }}
              >
                <SlideArt art={slide.art} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="arch-audience" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="arch-tool-tabs" role="tablist" aria-label="Presentation slides">
            {SLIDES.map((item, itemIndex) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-selected={index === itemIndex}
                className={index === itemIndex ? "is-on" : undefined}
                onClick={() => setManual(itemIndex)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const TOOLS = [
  { name: "AutoCAD", art: "plan", note: "Lines, guides, and a plan taking shape." },
  { name: "Revit", art: "build", note: "Floors and walls rising off the sheet." },
  { name: "SketchUp", art: "model", note: "The model, turned so the form can be seen." },
  { name: "Twinmotion", art: "render", note: "Light, trees, and a finished view." },
];

function ToolArt({ art, reduce }) {
  if (art === "plan") return <PlanSheet drawing={!reduce} />;
  if (art === "build") return <IsoBuilding stage={2} />;
  if (art === "model") return <IsoBuilding stage={4} sway={!reduce} />;
  return (
    <div className="arch-render">
      <IsoBuilding stage={4} evening sway={!reduce} />
    </div>
  );
}

/** The four tools as one drawing sequence, not a software screenshot. */
export function ToolsScene({ reduce }) {
  const [ref, stage] = useStageSequence([800, 2000, 3200], { reduce });
  const [manual, setManual] = useState(null);
  const index = manual ?? Math.min(stage, TOOLS.length - 1);
  const tool = TOOLS[index];

  return (
    <section ref={ref} id="scene-tools" className="arch-scene arch-scene-studio" aria-labelledby="arch-tools-title">
      <div className="arch-scene-inner">
        <div className="arch-scene-copy is-centred">
          <h2 id="arch-tools-title" className="arch-heading">From the First Line to the Final Vision.</h2>
          <p className="arch-sub">Every Tool Helped Bring an Idea to Life.</p>
        </div>
        <div className="arch-present">
          <div className="arch-tool-tabs" role="tablist" aria-label="Design tools">
            {TOOLS.map((item, itemIndex) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                id={`arch-tool-${itemIndex}`}
                aria-selected={index === itemIndex}
                aria-controls="arch-tool-panel"
                className={index === itemIndex ? "is-on" : undefined}
                onClick={() => setManual(itemIndex)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div
            id="arch-tool-panel"
            role="tabpanel"
            aria-labelledby={`arch-tool-${index}`}
            className="arch-screen"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tool.name}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.4 }}
              >
                <ToolArt art={tool.art} reduce={reduce} />
                <p className="arch-tool-note">{tool.note}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
