import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Plays a scene as a short sequence of stages once it scrolls into view.
 *
 * Each scene in the Architecture story is a little film: doors open, then a
 * character walks in, then the text lands. Rather than repeating timers in
 * every scene, each one declares the delays it wants and reads back the stage
 * it has reached.
 *
 * Under reduced motion the sequence jumps straight to its final stage, so no
 * content is ever gated behind an animation that will not run.
 *
 * @param {number[]} steps  Delay in milliseconds for each stage, from the
 *                          moment the scene enters the viewport.
 * @param {{reduce?: boolean, margin?: string}} options
 * @returns {[object, number, boolean]} Ref for the scene, current stage
 *                          (0 before the first step), and whether it is in view.
 */
export function useStageSequence(steps, { reduce = false, margin = "-100px" } = {}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;

    if (reduce) {
      setStage(steps.length);
      return undefined;
    }

    const timers = steps.map((delay, index) =>
      window.setTimeout(() => setStage((current) => Math.max(current, index + 1)), delay),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [inView, reduce, steps]);

  return [ref, stage, inView];
}

/**
 * Smoothly moves the page to a scene, honouring the reduced-motion setting.
 * @param {string} id      Target element id.
 * @param {boolean} reduce Whether the visitor prefers reduced motion.
 */
export function scrollToScene(id, reduce) {
  const node = document.getElementById(id);
  if (!node) return;
  node.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
