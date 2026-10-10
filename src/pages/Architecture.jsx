import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import "../components/architecture/architecture.css";
import { OpeningScene, SudburyScene, TorontoScene } from "../components/architecture/JourneyScenes";
import { HatchScene, PlaygroundScene, StudioScene } from "../components/architecture/WorkplaceScenes";
import { FinaleScene, JourneyTimeline, MilestoneScene } from "../components/architecture/ClosingScenes";

/**
 * Architecture World.
 *
 * An animated short story about a new career: arriving in Canada, the Toronto
 * skyline, the road north to Sudbury, the first morning at Hatch, a building
 * designed from blank sheet to finished model, and the day it all starts.
 *
 * The scenes are ordered so the sky moves from sunrise to evening down the
 * page. Bumping `replayKey` remounts the stack, which resets every scene's
 * stage sequence so the whole journey can be watched again.
 */
export default function Architecture() {
  const reduce = useReducedMotion();
  const [replayKey, setReplayKey] = useState(0);

  return (
    <div className="arch-page">
      <div className="arch-stack" key={replayKey}>
        <OpeningScene reduce={reduce} />
        <TorontoScene reduce={reduce} />
        <SudburyScene reduce={reduce} />
        <HatchScene reduce={reduce} />
        <StudioScene reduce={reduce} />
        <PlaygroundScene reduce={reduce} />
        <MilestoneScene reduce={reduce} />
        <JourneyTimeline reduce={reduce} />
        <FinaleScene reduce={reduce} onReplay={() => setReplayKey((key) => key + 1)} />
      </div>
    </div>
  );
}
