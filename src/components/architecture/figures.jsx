/**
 * Shared illustration primitives for the Architecture story.
 *
 * Every figure here is an original flat-vector drawing built from plain SVG so
 * the whole page stays dependency-free and animatable with CSS. Components that
 * return a <g> are meant to be embedded inside a parent <svg>; components that
 * return their own <svg> are standalone scene props.
 *
 * Note on transforms: a CSS animation that sets `transform` replaces an SVG
 * `transform` attribute on the same element, which would snap the shape back to
 * the origin. Anything animated in CSS therefore sits in its own inner <g>, and
 * placement stays on the wrapper.
 */

/** Palette shared by the illustrations so every scene stays one family. */
export const ink = {
  hair: "#2f2420",
  skin: "#d9a583",
  skinDark: "#c08f70",
  coat: "#e0b03a",
  coatDark: "#c8922a",
  trouser: "#3a4450",
  shoe: "#2b2220",
  bag: "#8c6e58",
  glass: "#bcd7e6",
  glassDeep: "#8fb7cd",
  frame: "#55646f",
  concrete: "#e3dccf",
  concreteDark: "#cfc6b6",
  pine: "#44694b",
  pineDark: "#31513a",
  rock: "#9a8f80",
  red: "#c0463f",
  blueprint: "#35586d",
  wood: "#9c7a58",
  woodDark: "#8a6a4b",
};

/* ------------------------------------------------------------------ */
/* Sky and atmosphere                                                   */
/* ------------------------------------------------------------------ */

/**
 * A soft drifting cloud.
 * @param {number} scale  Relative size multiplier.
 * @param {number} speed  Seconds for one full drift across the scene.
 */
export function Cloud({ className = "", style, scale = 1, speed = 70, opacity = 0.85 }) {
  return (
    <span
      className={`arch-cloud ${className}`}
      style={{ "--cloud-speed": `${speed}s`, "--cloud-scale": scale, opacity, ...style }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 160 62" width="160" height="62">
        <g fill="currentColor">
          <ellipse cx="46" cy="40" rx="34" ry="20" />
          <ellipse cx="80" cy="30" rx="30" ry="24" />
          <ellipse cx="112" cy="41" rx="28" ry="18" />
          <rect x="18" y="40" width="112" height="18" rx="9" />
        </g>
      </svg>
    </span>
  );
}

/** A small bird drawn as two wing strokes. */
export function Bird({ className = "", style }) {
  return (
    <svg className={`arch-bird ${className}`} style={style} viewBox="0 0 28 12" aria-hidden="true">
      <path
        d="M1 8c4 0 6-5 7-5s3 5 6 5c3 0 5-4 6-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Stylised maple leaf, drawn as one symmetric path. */
const LEAF_PATH =
  "M0-26 3.5-15 12-18 9.5-7 21-4 13.5 3 22 10 8.5 11.5 10 20 1.5 15.5 0 26-1.5 15.5-10 20-8.5 11.5-22 10-13.5 3-21-4-9.5-7-12-18-3.5-15Z";

export function MapleLeaf({ className = "", style, fill = ink.red }) {
  return (
    <svg className={className} style={style} viewBox="-30 -30 60 60" aria-hidden="true">
      <path fill={fill} d={LEAF_PATH} />
    </svg>
  );
}

/** Canadian flag on a pole, gently moving in the breeze. */
export function CanadaFlag({ className = "" }) {
  return (
    <g className={className} aria-hidden="true">
      <rect x="-1.5" y="-96" width="3" height="96" fill="#8a8f93" rx="1.5" />
      <g className="arch-flag-cloth">
        <rect x="2" y="-94" width="64" height="38" fill="#fdfbf6" />
        <rect x="2" y="-94" width="16" height="38" fill={ink.red} />
        <rect x="50" y="-94" width="16" height="38" fill={ink.red} />
        <g transform="translate(34 -75) scale(0.52)">
          <path fill={ink.red} d={LEAF_PATH} />
        </g>
      </g>
    </g>
  );
}

/** Decorative sparkle field used for the celebratory beats. */
export function SparkleField({ count = 14, className = "" }) {
  const dots = Array.from({ length: count }, (_, i) => ({
    left: `${4 + ((i * 37) % 92)}%`,
    top: `${4 + ((i * 53) % 84)}%`,
    delay: `${(i % 7) * 0.65}s`,
    size: i % 3 === 0 ? 8 : 5,
  }));

  return (
    <span className={`arch-sparkles ${className}`} aria-hidden="true">
      {dots.map((dot, i) => (
        <span
          key={i}
          className="arch-sparkle"
          style={{ left: dot.left, top: dot.top, animationDelay: dot.delay, width: dot.size, height: dot.size }}
        />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Maps                                                                 */
/* ------------------------------------------------------------------ */

/**
 * Illustrated map of Canada with an arrival route that draws itself.
 * @param {boolean} animate  When false the route is shown already drawn.
 */
export function CanadaMap({ animate = true }) {
  const route = "M14 236C86 266 178 236 244 190";

  return (
    <svg
      viewBox="0 0 420 290"
      className="arch-canada-map"
      role="img"
      aria-label="An illustrated map of Canada with a travel route leading to Ontario"
    >
      <path
        className="arch-map-land"
        d="M24 86 58 58 120 48 176 56 214 40 262 50 320 44 372 70 392 96 380 122 396 146 372 168 342 178 316 200 276 208 240 196 196 202 150 196 104 200 60 190 40 160 28 124Z"
      />
      <g className="arch-map-isles">
        <ellipse cx="146" cy="26" rx="30" ry="9" />
        <ellipse cx="224" cy="18" rx="20" ry="7" />
        <ellipse cx="300" cy="24" rx="24" ry="8" />
      </g>
      <path className="arch-map-bay" d="M198 62 258 58 250 112 232 134 206 126 196 92Z" />
      <g className="arch-map-lakes">
        <ellipse cx="238" cy="176" rx="20" ry="7" transform="rotate(-16 238 176)" />
        <ellipse cx="272" cy="190" rx="15" ry="6" transform="rotate(-8 272 190)" />
      </g>

      <path className={`arch-route ${animate ? "is-drawing" : ""}`} d={route} pathLength="1" />
      <path className={`arch-route-dots ${animate ? "is-delayed" : ""}`} d={route} pathLength="1" />

      <g className="arch-map-pin" transform="translate(252 182)">
        <circle className="arch-pin-pulse" r="13" />
        <circle r="5.5" />
        <text x="14" y="5">Ontario</text>
      </g>

      {animate ? (
        <g className="arch-plane">
          <Plane />
          <animateMotion dur="3.4s" begin="0s" fill="freeze" rotate="auto" path={route} />
        </g>
      ) : (
        <g className="arch-plane" transform="translate(244 190)">
          <Plane />
        </g>
      )}
    </svg>
  );
}

/** Small aeroplane glyph pointing along its travel direction. */
function Plane() {
  return (
    <path
      d="M-11-4 6-4 11 0 6 4-11 4-6 0Z M-2-4-7-11-3-11 2-4 M-2 4-7 11-3 11 2 4"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  );
}

/** Stylised Ontario map with the Toronto to Sudbury route. */
export function OntarioMap({ progress = 1 }) {
  return (
    <svg
      viewBox="0 0 260 300"
      className="arch-ontario-map"
      role="img"
      aria-label="A map of Ontario with a route running north from Toronto to Sudbury"
    >
      <path
        className="arch-map-land"
        d="M34 44 96 20 158 34 196 20 216 54 210 96 224 128 200 158 212 190 184 214 168 252 140 272 112 258 96 226 68 234 48 198 30 150 22 96Z"
      />
      <path className="arch-map-bay" d="M150 246 188 236 196 252 176 268 152 262Z" />

      <path
        className="arch-route is-progress"
        d="M156 232C142 214 126 192 118 156"
        pathLength="1"
        style={{ "--route-progress": progress }}
      />

      <g className="arch-map-city" transform="translate(156 232)">
        <circle r="5" />
        <text x="11" y="5">Toronto</text>
      </g>
      <g className="arch-map-city is-destination" transform="translate(118 156)">
        <circle className="arch-pin-pulse" r="13" />
        <circle r="6.5" />
        <text x="14" y="5">Sudbury</text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Toronto                                                              */
/* ------------------------------------------------------------------ */

const GROUND_Y = 588;

/** Deterministic window grid so the skyline never reshuffles between renders. */
function windows(cols, rows, x, y, w, h, gapX, gapY, seed) {
  const cells = [];
  for (let c = 0; c < cols; c += 1) {
    for (let r = 0; r < rows; r += 1) {
      const n = (c * 7 + r * 13 + seed * 5) % 11;
      cells.push({
        key: `${seed}-${c}-${r}`,
        x: x + c * (w + gapX),
        y: y + r * (h + gapY),
        w,
        h,
        lit: n > 4,
        delay: ((c + r + seed) % 9) * 0.12,
      });
    }
  }
  return cells;
}

const BLOCKS = [
  { x: 70, w: 112, y: 326, seed: 1, cols: 4, rows: 7, fill: ink.concreteDark },
  { x: 198, w: 86, y: 378, seed: 2, cols: 3, rows: 5, fill: ink.concrete },
  { x: 300, w: 98, y: 344, seed: 3, cols: 3, rows: 6, fill: ink.concrete },
  { x: 414, w: 72, y: 408, seed: 4, cols: 2, rows: 4, fill: ink.concreteDark },
  { x: 742, w: 80, y: 396, seed: 5, cols: 2, rows: 4, fill: ink.concrete },
  { x: 838, w: 124, y: 300, seed: 6, cols: 4, rows: 8, fill: ink.concreteDark },
  { x: 978, w: 92, y: 358, seed: 7, cols: 3, rows: 6, fill: ink.concrete },
];

/**
 * Toronto skyline with the CN Tower as the hero silhouette.
 *
 * The tower is drawn to the landmark's recognisable proportions — a tapering
 * shaft, the main observation pod around two thirds up, the smaller SkyPod
 * above it, and the long antenna — as an original illustration.
 */
export function TorontoSkyline() {
  return (
    <svg
      viewBox="0 0 1200 620"
      preserveAspectRatio="xMidYMax slice"
      className="arch-skyline"
      role="img"
      aria-label="An illustration of the Toronto skyline with the CN Tower"
    >
      <g className="arch-skyline-blocks">
        {BLOCKS.map((b) => (
          <g key={b.x} className="arch-rise" style={{ "--rise-delay": `${b.seed * 0.1}s` }}>
            <rect x={b.x} y={b.y} width={b.w} height={GROUND_Y - b.y} fill={b.fill} />
            {windows(b.cols, b.rows, b.x + 11, b.y + 14, 12, 13, 9, 12, b.seed).map((win) => (
              <rect
                key={win.key}
                className={win.lit ? "arch-window is-lit" : "arch-window"}
                x={win.x}
                y={win.y}
                width={win.w}
                height={win.h}
                style={{ "--win-delay": `${0.9 + win.delay}s` }}
              />
            ))}
          </g>
        ))}
      </g>

      <g transform="translate(600 0)">
        <g className="arch-tower-shaft">
          <path d={`M-23 ${GROUND_Y}-11 252H11L23 ${GROUND_Y}Z`} fill={ink.concrete} />
          <path d={`M-23 ${GROUND_Y}-16 252H-7L-12 ${GROUND_Y}Z`} fill={ink.concreteDark} opacity="0.7" />
          <path d={`M-6 ${GROUND_Y - 30}-3 258h6l3 ${GROUND_Y - 288}Z`} fill="#fff" opacity="0.26" />
        </g>
        <g className="arch-tower-pod">
          <path
            d="M-47 240C-47 224-24 212 0 212 24 212 47 224 47 240L39 260C21 269-21 269-39 260Z"
            fill={ink.concrete}
          />
          <rect x="-43" y="229" width="86" height="12" fill={ink.glassDeep} />
          <rect x="-35" y="245" width="70" height="7" fill={ink.glass} opacity="0.85" />
          <path d="M-47 240C-47 224-24 212 0 212" fill="none" stroke="#fff" strokeWidth="2.6" opacity="0.5" />
        </g>
        <g className="arch-tower-upper">
          <path d="M-7.5 216-5 160H5L7.5 216Z" fill={ink.concrete} />
          <path d="M-7.5 216-4.5 160H-1.5L-3.5 216Z" fill={ink.concreteDark} opacity="0.6" />
        </g>
        <g className="arch-tower-sky">
          <rect x="-16" y="138" width="32" height="24" rx="4" fill={ink.concrete} />
          <rect x="-12" y="144" width="24" height="9" fill={ink.glassDeep} />
        </g>
        <g className="arch-tower-mast">
          <path d="M-3.8 140-1.4 38h2.8L3.8 140Z" fill={ink.frame} />
          <circle className="arch-beacon" cx="0" cy="34" r="3.6" fill="#f4654f" />
        </g>
      </g>

      <g transform="translate(1116 404)">
        <CanadaFlag />
      </g>

      <rect x="0" y={GROUND_Y} width="1200" height={620 - GROUND_Y} className="arch-ground-haze" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Northern Ontario                                                     */
/* ------------------------------------------------------------------ */

/**
 * A single pine tree. Placement lives on the wrapper so the sway animation,
 * which sets `transform`, cannot override it.
 */
export function PineTree({ x = 0, y = 0, scale = 1, dark = false, delay = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} aria-hidden="true">
      <g className="arch-pine" style={{ "--sway-delay": `${delay}s` }}>
        <rect x="-3" y="-16" width="6" height="18" fill="#5a4330" />
        <path d="M0-74-20-34H20Z" fill={dark ? ink.pineDark : ink.pine} />
        <path d="M0-56-25-18H25Z" fill={dark ? ink.pineDark : ink.pine} />
        <path d="M0-36-30 4H30Z" fill={dark ? "#2a4631" : "#3b5e42"} />
      </g>
    </g>
  );
}

/** The Big Nickel, a Sudbury landmark, drawn as a coin standing on a plinth. */
export function BigNickel({ x = 0, y = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} aria-hidden="true">
      <path d="M-15 0-9-42h18L15 0Z" fill="#8d8575" />
      <g className="arch-nickel">
        <ellipse cx="0" cy="-74" rx="31" ry="33" fill="#b9bdbd" />
        <ellipse cx="0" cy="-74" rx="25" ry="27" fill="#cfd3d2" />
        <ellipse cx="0" cy="-74" rx="25" ry="27" fill="none" stroke="#9aa0a0" strokeWidth="1.6" />
        <path d="M-10-82 0-90 10-82 6-64H-6Z" fill="#9aa0a0" />
      </g>
    </g>
  );
}

/** A small travelling car seen from the side. */
export function TravelCar() {
  return (
    <g aria-hidden="true">
      <path d="M-30 0-26-12H-8L-2-22H14L20-12H28L30 0Z" fill={ink.red} />
      <path d="M-6-20H12L17-12H-2Z" fill={ink.glass} />
      <path d="M-24-12H-8L-6-20H-21Z" fill={ink.glass} />
      <circle cx="-16" cy="1" r="6" fill="#2b2220" />
      <circle cx="16" cy="1" r="6" fill="#2b2220" />
      <circle cx="-16" cy="1" r="2.4" fill="#cfd3d2" />
      <circle cx="16" cy="1" r="2.4" fill="#cfd3d2" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* The character                                                        */
/* ------------------------------------------------------------------ */

/**
 * The illustrated architect who appears through the whole story.
 * Returns a <g> anchored at her feet so scenes can place her directly.
 * @param {"stand"|"walk"|"sit"} pose
 */
export function Character({ pose = "stand", className = "" }) {
  const sitting = pose === "sit";

  if (sitting) {
    return (
      <g className={`arch-person is-sit ${className}`} aria-hidden="true">
        <path d="M-16-26H14L18-4H-4Z" fill={ink.trouser} />
        <path d="M-15-62H15L17-24H-17Z" fill={ink.coat} />
        <path d="M-5-62H5L6-26H-6Z" fill="#fdf6ea" />
        <path d="M15-58 25-40 19-36 9-54Z" fill={ink.coat} />
        <circle cx="23" cy="-38" r="4.2" fill={ink.skin} />
        <path d="M-11-78H11L10-60H-10Z" fill={ink.skin} />
        <circle cx="0" cy="-90" r="13" fill={ink.skin} />
        <path
          d="M-13-92C-13-103-7-107 0-107 7-107 13-103 13-92 13-86 11-84 11-84L9-96H-9L-11-84C-11-84-13-86-13-92Z"
          fill={ink.hair}
        />
        <circle cx="-14" cy="-86" r="7" fill={ink.hair} />
      </g>
    );
  }

  return (
    <g className={`arch-person is-${pose} ${className}`} aria-hidden="true">
      <g className="arch-leg arch-leg-back">
        <path d="M-9-44H-1L-3 0H-11Z" fill="#2f3845" />
        <path d="M-13 0H-1V5H-15Z" fill={ink.shoe} />
      </g>
      <g className="arch-leg arch-leg-front">
        <path d="M1-44H9L11 0H3Z" fill={ink.trouser} />
        <path d="M1 0H13V5H-1Z" fill={ink.shoe} />
      </g>

      <path d="M-14-84C-14-92-8-96 0-96 8-96 14-92 14-84L16-40H-16Z" fill={ink.coat} />
      <path d="M-5-94H5L6-42H-6Z" fill="#fdf6ea" />

      <g className="arch-arm arch-arm-back">
        <path d="M-14-86-20-52-13-50-7-82Z" fill={ink.coatDark} />
      </g>
      <g className="arch-arm arch-arm-front">
        <path d="M14-86 20-52 13-50 7-82Z" fill={ink.coat} />
        <circle cx="17" cy="-51" r="4" fill={ink.skin} />
      </g>

      <path d="M-11-112H11L10-94H-10Z" fill={ink.skin} />
      <circle cx="0" cy="-122" r="13" fill={ink.skin} />
      <path
        d="M-13-124C-13-135-7-139 0-139 7-139 13-135 13-124 13-118 11-116 11-116L9-128H-9L-11-116C-11-116-13-118-13-124Z"
        fill={ink.hair}
      />
      <circle cx="-14" cy="-118" r="7" fill={ink.hair} />

      <g className="arch-bag">
        <path d="M-6-82 14-62" stroke={ink.bag} strokeWidth="2.5" fill="none" />
        <rect x="8" y="-64" width="18" height="15" rx="3" fill={ink.bag} />
        <rect x="8" y="-59" width="18" height="3" fill="#6f5543" />
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* The workplace                                                        */
/* ------------------------------------------------------------------ */

/**
 * A modern glass-fronted workplace. The doors slide open and the architect
 * walks in, driven by the `stage` prop rather than by hover.
 * @param {number} stage  0 approach, 1 lit, 2 doors open, 3 walked in.
 */
export function GlassOffice({ stage = 0 }) {
  const glassCells = [];
  for (let c = 0; c < 8; c += 1) {
    for (let r = 0; r < 3; r += 1) {
      glassCells.push({ key: `${c}-${r}`, x: 120 + c * 56, y: 92 + r * 62, delay: ((c + r) % 6) * 0.1 });
    }
  }

  return (
    <svg
      viewBox="0 0 660 420"
      className={`arch-office is-stage-${stage}`}
      role="img"
      aria-label="An illustrated modern glass-fronted workplace with its doors opening"
    >
      <rect x="96" y="60" width="472" height="330" fill={ink.concrete} />
      <rect x="96" y="60" width="472" height="18" fill={ink.concreteDark} />
      <rect x="112" y="84" width="440" height="200" fill={ink.glassDeep} />
      {glassCells.map((cell) => (
        <rect
          key={cell.key}
          className="arch-pane"
          x={cell.x}
          y={cell.y}
          width="48"
          height="54"
          style={{ "--pane-delay": `${cell.delay}s` }}
        />
      ))}
      <g className="arch-glass-sheen" aria-hidden="true">
        <path d="M150 284 300 84h54L204 284Z" />
        <path d="M232 284 382 84h26L258 284Z" />
      </g>

      <rect x="112" y="284" width="440" height="10" fill={ink.frame} />
      <rect x="252" y="294" width="160" height="96" fill="#44535f" />
      <rect x="258" y="300" width="148" height="84" fill="#1f2b33" />
      <g>
        <rect className="arch-door-leaf arch-door-left" x="258" y="300" width="74" height="84" fill={ink.glass} />
        <rect className="arch-door-leaf arch-door-right" x="332" y="300" width="74" height="84" fill={ink.glass} />
      </g>
      <rect x="238" y="276" width="188" height="12" rx="4" fill={ink.concreteDark} />

      <g className="arch-office-light" aria-hidden="true">
        <ellipse cx="332" cy="384" rx="110" ry="22" />
      </g>

      <g className="arch-office-person">
        <g transform="translate(470 390) scale(0.56)">
          <Character pose="walk" />
        </g>
      </g>

      <PineTree x={58} y={392} scale={0.74} delay={0.2} />
      <PineTree x={614} y={392} scale={0.66} dark delay={0.5} />
      <rect x="0" y="386" width="660" height="34" className="arch-ground" />
    </svg>
  );
}

/**
 * The welcoming interior she steps into: a window onto the north, warm
 * pendant lights, and her own desk.
 */
export function OfficeInterior() {
  return (
    <svg
      viewBox="0 0 660 420"
      className="arch-interior"
      role="img"
      aria-label="An illustrated modern office interior with the architect at her desk"
    >
      <defs>
        <radialGradient id="arch-lampglow" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#f7dc9e" stopOpacity="0.62" />
          <stop offset="100%" stopColor="#f7dc9e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="660" height="348" fill="#efe7d9" />
      <rect x="0" y="348" width="660" height="72" fill="#dbcfbb" />

      <rect x="46" y="76" width="168" height="136" rx="6" fill={ink.glass} />
      <path d="M54 204 104 168l36 24 34-30 26 22v20H54Z" fill="#9dbb96" />
      <circle cx="180" cy="108" r="14" fill="#f3d089" />
      <rect x="46" y="76" width="168" height="136" rx="6" fill="none" stroke={ink.frame} strokeWidth="6" />
      <path d="M130 76v136M46 144h168" stroke={ink.frame} strokeWidth="4" />

      <g className="arch-lamp-glow" aria-hidden="true" fill="url(#arch-lampglow)">
        <ellipse cx="364" cy="150" rx="118" ry="86" />
        <ellipse cx="548" cy="162" rx="92" ry="70" />
      </g>
      <g stroke={ink.frame} strokeWidth="3" fill="none">
        <path d="M364 0v46M548 0v62" />
      </g>
      <path d="M336 46h56l13 24h-82Z" fill={ink.coatDark} />
      <path d="M526 62h44l11 20h-66Z" fill={ink.coatDark} />

      <g className="arch-interior-sheets">
        <rect x="236" y="92" width="78" height="58" rx="3" fill="#fdfbf4" stroke="rgba(62,44,34,0.16)" transform="rotate(-3 275 121)" />
        <path d="M250 112h50M250 126h32" stroke={ink.blueprint} strokeWidth="2.4" opacity="0.55" transform="rotate(-3 275 121)" />
      </g>

      <rect x="300" y="248" width="13" height="100" rx="5" fill={ink.woodDark} />

      <g transform="translate(340 348) scale(1.15)">
        <Character pose="sit" />
      </g>

      <rect x="316" y="286" width="286" height="13" rx="3" fill={ink.wood} />
      <rect x="330" y="299" width="13" height="49" fill={ink.woodDark} />
      <rect x="576" y="299" width="13" height="49" fill={ink.woodDark} />

      <rect x="440" y="216" width="122" height="70" rx="5" fill="#3c4a55" />
      <rect x="446" y="222" width="110" height="58" fill="#eaf3f8" />
      <path d="M456 272 492 248l32 24" fill="none" stroke={ink.blueprint} strokeWidth="2.4" />
      <path d="M464 272v-18h16v18M506 272v-26h18v26" fill="none" stroke={ink.blueprint} strokeWidth="2.4" />

      <g fill="#6f8f5c">
        <ellipse cx="112" cy="312" rx="26" ry="30" />
        <ellipse cx="94" cy="326" rx="17" ry="19" />
        <ellipse cx="131" cy="328" rx="15" ry="17" />
      </g>
      <path d="M96 342h34l-4 22H100Z" fill="#b98a63" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Drawing board                                                        */
/* ------------------------------------------------------------------ */

/**
 * The architectural floor plan that draws itself with the site's existing
 * `.sketch-line` animation.
 * @param {boolean} drawing  Whether the drawing animation should run.
 */
export function PlanSheet({ drawing = true }) {
  const line = (d, delay) => (
    <path
      key={d}
      className={drawing ? "sketch-line" : "arch-plan-static"}
      pathLength="1"
      d={d}
      style={{ animationDelay: `${delay}s` }}
    />
  );

  return (
    <svg viewBox="0 0 420 310" className="arch-plan" role="img" aria-label="An architectural floor plan drawing itself">
      <g className="arch-plan-grid" aria-hidden="true">
        {Array.from({ length: 13 }, (_, i) => (
          <path key={`v${i}`} d={`M${30 + i * 30} 24V282`} />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <path key={`h${i}`} d={`M30 ${24 + i * 32}H390`} />
        ))}
      </g>

      {line("M40 40H380V262H40Z", 0)}
      {line("M180 40V262", 0.5)}
      {line("M180 160H380", 0.8)}
      {line("M40 150H180", 1)}
      {line("M96 262V240M96 240H132M132 262V240", 1.2)}
      {line("M180 94A22 22 0 0 1 202 116", 1.4)}
      {line("M248 160A26 26 0 0 1 274 186", 1.5)}
      {line("M300 40V62H348V40", 1.6)}
      {line("M62 196H112V238H62Z", 1.7)}
      {line("M300 196H360V240H300Z", 1.8)}

      <g className="arch-plan-dims" style={{ animationDelay: "2.1s" }}>
        <path d="M40 286H380" />
        <path d="M40 280v12M380 280v12" />
        <text x="210" y="302" textAnchor="middle">12 400</text>
      </g>

      <g className="arch-plan-labels" style={{ animationDelay: "2.3s" }}>
        <text x="110" y="100">studio</text>
        <text x="110" y="212">archive</text>
        <text x="280" y="112">atrium</text>
        <text x="282" y="224">terrace</text>
      </g>
    </svg>
  );
}

/**
 * Builds one window quad on an isometric face.
 * @param {number[]} origin  Corner the face is measured from.
 * @param {number[]} uVec    Vector along the face's horizontal edge.
 * @param {number[]} vVec    Vector down the face.
 */
function isoPane(origin, uVec, vVec, u0, v0, du, dv) {
  const pt = (u, v) => `${origin[0] + u * uVec[0] + v * vVec[0]} ${origin[1] + u * uVec[1] + v * vVec[1]}`;
  return `M${pt(u0, v0)}L${pt(u0 + du, v0)}L${pt(u0 + du, v0 + dv)}L${pt(u0, v0 + dv)}Z`;
}

/** Window grid for both visible faces of the isometric model. */
function isoPanes() {
  const faces = [
    { id: "l", origin: [70, 172], u: [140, 62], v: [0, 96] },
    { id: "r", origin: [210, 234], u: [140, -62], v: [0, 96] },
  ];
  const panes = [];
  faces.forEach((face) => {
    for (let r = 0; r < 3; r += 1) {
      for (let c = 0; c < 4; c += 1) {
        panes.push({
          key: `${face.id}-${r}-${c}`,
          dark: face.id === "r",
          delay: (r + c) * 0.07,
          d: isoPane(face.origin, face.u, face.v, 0.08 + c * 0.22, 0.12 + r * 0.27, 0.15, 0.16),
        });
      }
    }
  });
  return panes;
}

const ISO_PANES = isoPanes();

/**
 * Isometric building shared by the studio, the playground and the finale.
 * Elements appear by stage so one component drives every "build it up" moment.
 * @param {number} stage    0 empty site, 1 slab, 2 structure, 3 windows, 4 finished.
 * @param {boolean} sway    Slow inspection rotation.
 * @param {boolean} evening Warm lit windows for the closing scene.
 */
export function IsoBuilding({ stage = 4, sway = false, evening = false }) {
  return (
    <svg
      viewBox="0 0 420 390"
      className={`arch-iso is-stage-${stage}${sway ? " is-sway" : ""}${evening ? " is-evening" : ""}`}
      role="img"
      aria-label={
        stage === 0
          ? "An empty building site, marked out and ready"
          : `A three dimensional model of the building, stage ${stage} of four`
      }
    >
      <g className="arch-iso-shadow" aria-hidden="true">
        <path d="M210 360 54 292 210 224 366 292Z" />
      </g>

      <path className="arch-iso-site" d="M210 196 56 264 210 332 364 264Z" aria-hidden="true" />

      <g className="arch-iso-slab">
        <path d="M210 206 70 268 210 330 350 268Z" fill="#c6bcaa" />
        <path d="M70 268 210 330v14L70 282Z" fill="#a89d8c" />
        <path d="M210 330 350 268v14l-140 62Z" fill="#978c7c" />
      </g>

      <g className="arch-iso-body">
        <path d="M70 172 210 234v96L70 268Z" fill="#e7e0d2" />
        <path d="M210 234 350 172v96l-140 62Z" fill="#cdc5b4" />
        <path d="M210 110 70 172l140 62 140-62Z" fill="#f5f0e4" />
      </g>

      <g className="arch-iso-windows">
        {ISO_PANES.map((pane) => (
          <path
            key={pane.key}
            className={`arch-iso-pane${pane.dark ? " is-shaded" : ""}`}
            d={pane.d}
            style={{ "--pane-delay": `${pane.delay}s` }}
          />
        ))}
      </g>

      <g className="arch-iso-roof">
        <path d="M140 172 210 203v-34l-70-31Z" fill="#ded6c6" />
        <path d="M210 203 280 172v-34l-70 31Z" fill="#c9c1b0" />
        <path d="M210 117 140 148l70 31 70-31Z" fill="#efe9dc" />
        <path d="M252 126 258 88h5l5 36Z" fill={ink.frame} />
        <circle cx="260" cy="86" r="4" fill={ink.coat} />
      </g>

      <g className="arch-iso-trees">
        <PineTree x={44} y={320} scale={0.4} delay={0.1} />
        <PineTree x={380} y={320} scale={0.34} dark delay={0.4} />
      </g>
    </svg>
  );
}
