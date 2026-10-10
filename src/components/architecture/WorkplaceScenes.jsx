import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "../../data/content";
import { Character, GlassOffice, IsoBuilding, OfficeInterior, PlanSheet, SparkleField, ink } from "./figures";
import { useStageSequence } from "./useStageSequence";

const HATCH_STEPS = [200, 1100, 2000, 2900, 3600];

/**
 * The centrepiece scene. The camera approaches a modern workplace, the doors
 * open, the architect walks in, and the interior warms up around her.
 *
 * The building is an original celebratory illustration, not a depiction of a
 * real office, so it carries no company branding of any kind.
 */
export function HatchScene({ reduce }) {
  const [ref, stage] = useStageSequence(HATCH_STEPS, { reduce });
  const inside = stage >= 4;

  return (
    <section ref={ref} id="scene-hatch" className="arch-scene arch-scene-morning" aria-labelledby="arch-hatch-title">
      <div className="arch-scene-inner">
        <motion.div
          className="arch-scene-copy is-centred"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="arch-eyebrow">Her Next Chapter Begins</p>
          <h2 id="arch-hatch-title" className="arch-heading">Hatch | Sudbury, Ontario, Canada</h2>
        </motion.div>

        <div className={`arch-building-stage is-stage-${stage}`}>
          <AnimatePresence mode="wait" initial={false}>
            {inside ? (
              <motion.div
                key="interior"
                className="arch-building-layer"
                initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <OfficeInterior />
              </motion.div>
            ) : (
              <motion.div
                key="exterior"
                className="arch-building-layer"
                initial={false}
                animate={reduce ? { opacity: 1 } : { opacity: 1, scale: stage >= 1 ? 1 : 0.94 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
                transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlassOffice stage={Math.min(stage, 3)} />
              </motion.div>
            )}
          </AnimatePresence>
          {stage >= 5 && <SparkleField count={16} className="arch-sparkles-warm" />}
        </div>

        <motion.div
          className="arch-arrival-card"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={stage >= 5 || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="arch-arrival-date">
            <span>Starting</span>
            <strong>October 26, 2026</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

const STUDIO_STEPS = [200, 1000, 2600, 3600, 4600];

/** The architect's desk: monitor, lamp, rolled drawings and a steady hand. */
function DeskScene({ stage }) {
  return (
    <svg
      viewBox="0 0 420 340"
      className={`arch-desk is-stage-${stage}`}
      role="img"
      aria-label="The architect working at her desk on the building model"
    >
      <g className="arch-desk-lampglow" aria-hidden="true">
        <ellipse cx="330" cy="186" rx="78" ry="62" />
      </g>

      <g className="arch-float-sheets" aria-hidden="true">
        <g transform="rotate(-5 316 50)">
          <rect x="286" y="28" width="60" height="44" rx="2" fill="#fdfbf4" stroke="rgba(62,44,34,0.18)" />
          <path d="M296 42h40M296 52h26M296 62h34" stroke={ink.blueprint} strokeWidth="2" opacity="0.5" />
        </g>
        <g transform="rotate(4 232 70)">
          <rect x="206" y="52" width="52" height="38" rx="2" fill="#fdfbf4" stroke="rgba(62,44,34,0.18)" />
          <path d="M216 66h32M216 76h20" stroke={ink.blueprint} strokeWidth="2" opacity="0.45" />
        </g>
      </g>

      <rect x="84" y="196" width="14" height="122" rx="5" fill={ink.woodDark} />

      <g transform="translate(130 318) scale(1.35)">
        <Character pose="sit" />
      </g>

      <rect x="6" y="250" width="408" height="14" rx="4" fill={ink.wood} />
      <rect x="30" y="264" width="14" height="76" fill={ink.woodDark} />
      <rect x="376" y="264" width="14" height="76" fill={ink.woodDark} />

      <rect x="210" y="172" width="136" height="80" rx="5" fill="#3c4a55" />
      <rect x="216" y="178" width="124" height="68" fill="#eef5f9" />
      <g className="arch-screen-art">
        <path d="M228 238 278 212l50 26" fill="none" stroke={ink.blueprint} strokeWidth="2.4" />
        <path d="M240 238v-22h20v22M296 238v-30h22v30" fill="none" stroke={ink.blueprint} strokeWidth="2.4" />
        <path className="arch-screen-cursor" d="M0 0 9 22 13 13 22 9Z" fill="#2b3a44" />
      </g>

      <g className="arch-desk-lamp">
        <rect x="364" y="150" width="6" height="100" fill="#55646f" />
        <path d="M336 148h62l-13-28h-36Z" fill={ink.coatDark} />
        <rect x="348" y="244" width="38" height="8" rx="4" fill="#55646f" />
      </g>

      <g className="arch-desk-sheets">
        <rect x="52" y="226" width="86" height="26" rx="3" transform="rotate(-4 95 239)" fill="#fdfbf4" />
        <path d="M64 238h58" stroke={ink.blueprint} strokeWidth="2" opacity="0.5" transform="rotate(-4 95 239)" />
      </g>
    </svg>
  );
}

/**
 * The design studio. A blank sheet becomes a plan, the plan becomes a model,
 * and the architect is at the desk while it happens.
 */
export function StudioScene({ reduce }) {
  const [ref, stage] = useStageSequence(STUDIO_STEPS, { reduce });
  const modelStage = stage >= 5 ? 4 : stage >= 4 ? 3 : stage >= 3 ? 2 : 1;

  return (
    <section ref={ref} id="scene-studio" className="arch-scene arch-scene-studio" aria-labelledby="arch-studio-title">
      <div className="arch-scene-inner">
        <motion.div
          className="arch-scene-copy is-centred"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="arch-eyebrow">the drawing board</p>
          <h2 id="arch-studio-title" className="arch-heading">Every great structure begins with an idea.</h2>
        </motion.div>

        <div className="arch-studio-grid">
          <div className={`arch-board is-stage-${stage}`}>
            <div className="arch-board-sheet">
              <AnimatePresence mode="wait" initial={false}>
                {stage >= 3 ? (
                  <motion.div
                    key="model"
                    className="arch-board-layer"
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <IsoBuilding stage={modelStage} sway={stage >= 5 && !reduce} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="plan"
                    className="arch-board-layer"
                    initial={false}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.5 }}
                  >
                    <PlanSheet drawing={stage >= 2 && !reduce} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="arch-board-tools" aria-hidden="true">
              <span className="arch-tool arch-tool-pencil" />
              <span className="arch-tool arch-tool-rule" />
              <span className="arch-tool arch-tool-pad" />
            </div>
          </div>

          <div className="arch-studio-side">
            <DeskScene stage={stage} />
            <div className="arch-titleblock">
              <p className="arch-titleblock-head">TITLE BLOCK</p>
              <p className="arch-titleblock-project">project: a beautiful beginning</p>
              <p>drawn for: {site.name}</p>
              <p>location: Sudbury, ON</p>
              <p>sheet: 01 / 01</p>
              <p className="arch-titleblock-scale">scale: full of hope</p>
            </div>
          </div>
        </div>

        <motion.p
          className="arch-closing-note"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={stage >= 5 || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.6 }}
        >
          Here&apos;s to everything you&apos;ll create.
        </motion.p>
      </div>
    </section>
  );
}

/**
 * Each entry is the state of the drawing at that stage, plus the action that
 * moves it on. The last entry has no action, so the control becomes a reset.
 */
const PLAY_STEPS = [
  { caption: "An empty site, waiting for an idea.", action: "Start Designing" },
  { caption: "The slab is down and the footprint is set.", action: "Add Structure" },
  { caption: "Walls and floors find their place.", action: "Add Windows" },
  { caption: "Light gets in, and the building wakes up.", action: "Bring It to Life" },
  { caption: "Roof on, trees in. One finished design.", action: null },
];

/**
 * A small interactive build. The visitor steps a building from an empty site
 * to a finished design, and can replay it as often as they like.
 */
export function PlaygroundScene({ reduce }) {
  const [stage, setStage] = useState(0);
  const current = PLAY_STEPS[stage];
  const atEnd = current.action === null;

  return (
    <section id="scene-playground" className="arch-scene arch-scene-paper" aria-labelledby="arch-play-title">
      <div className="arch-scene-inner">
        <div className="arch-scene-copy is-centred">
          <p className="arch-eyebrow">your turn</p>
          <h2 id="arch-play-title" className="arch-heading">Build one yourself.</h2>
          <p className="arch-sub">Four steps, same as the real thing. Roughly.</p>
        </div>

        <div className="arch-play">
          <div className="arch-play-model">
            <IsoBuilding stage={stage} sway={atEnd && !reduce} />
          </div>

          <div className="arch-play-panel">
            <ol className="arch-play-steps">
              {PLAY_STEPS.slice(1).map((item, index) => (
                <li key={item.caption} className={stage >= index + 1 ? "is-done" : ""}>
                  <span className="arch-play-dot" aria-hidden="true" />
                  <span>{item.caption}</span>
                </li>
              ))}
            </ol>

            <p className="arch-play-live" aria-live="polite">
              Stage {stage} of {PLAY_STEPS.length - 1}. {current.caption}
            </p>

            <div className="arch-play-controls">
              {atEnd ? (
                <button type="button" className="arch-btn" onClick={() => setStage(0)}>
                  Start again
                </button>
              ) : (
                <button type="button" className="arch-btn" onClick={() => setStage((s) => s + 1)}>
                  {current.action}
                </button>
              )}
              {stage > 0 && (
                <button type="button" className="arch-btn-quiet" onClick={() => setStage((s) => Math.max(0, s - 1))}>
                  Step back
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
