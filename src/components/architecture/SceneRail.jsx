import { useEffect, useState } from "react";
import { scrollToScene } from "./useStageSequence";

/**
 * A blueprint ruler pinned to the margin: one tick per scene, the current one
 * filled in. On a long page it answers "where am I, and how much is left"
 * without spending vertical space to do it.
 *
 * Ticks are real buttons, so the rail doubles as navigation.
 *
 * @param {{id: string, label: string, dark?: boolean}[]} scenes  Scenes in
 *        page order; `dark` marks a scene whose backdrop needs light ticks.
 * @param {boolean} reduce  Whether the visitor prefers reduced motion.
 */
export default function SceneRail({ scenes, reduce }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const nodes = scenes.map((scene) => document.getElementById(scene.id)).filter(Boolean);
    if (!nodes.length) return undefined;

    // Whichever scene covers the middle of the viewport is the current one.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = nodes.indexOf(entry.target);
          if (index >= 0) setActive(index);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [scenes]);

  return (
    <nav
      className={`arch-rail${scenes[active]?.dark ? " is-dark" : ""}`}
      aria-label="Scenes on this page"
    >
      <span className="arch-rail-line" aria-hidden="true" />
      {scenes.map((scene, index) => (
        <button
          key={scene.id}
          type="button"
          className={`arch-rail-tick${index === active ? " is-here" : ""}`}
          aria-current={index === active ? "true" : undefined}
          onClick={() => scrollToScene(scene.id, reduce)}
        >
          <span className="arch-rail-num" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="arch-rail-name">{scene.label}</span>
        </button>
      ))}
    </nav>
  );
}
