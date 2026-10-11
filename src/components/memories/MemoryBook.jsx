import { motion } from "framer-motion";

/**
 * The closed journal on the opening page, drawn rather than photographed so
 * it matches the rest of the site's hand-made illustrations.
 * @param {boolean} open  Once true, the cover swings back on its spine.
 */
export function JournalBook({ open = false, closed = false }) {
  return (
    <svg
      viewBox="0 0 260 200"
      className={`mem-book${open ? " is-open" : ""}${closed ? " is-shut" : ""}`}
      role="img"
      aria-label="An illustrated journal"
    >
      <ellipse className="mem-book-shadow" cx="130" cy="182" rx="92" ry="12" />

      {/* Pages behind the cover, revealed as it opens. */}
      <g className="mem-book-pages">
        <rect x="52" y="30" width="156" height="142" rx="4" fill="#fffaf3" stroke="#e0d3bf" />
        <rect x="60" y="38" width="140" height="126" rx="3" fill="#fdf7ec" />
        <path
          d="M78 62h104M78 80h86M78 98h98M78 116h72"
          stroke="#cbb9a0"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <g className="mem-book-heart">
          <path
            d="M130 148c-14-9-22-16-22-24a9 9 0 0 1 16-5l6 6 6-6a9 9 0 0 1 16 5c0 8-8 15-22 24Z"
            fill="#e3a19a"
          />
        </g>
      </g>

      {/* The front cover, hinged on the spine. */}
      <g className="mem-book-cover">
        <rect x="52" y="28" width="158" height="146" rx="5" fill="#9c5f54" />
        <rect x="52" y="28" width="158" height="146" rx="5" fill="none" stroke="#7d473e" strokeWidth="2" />
        <rect x="64" y="40" width="134" height="122" rx="3" fill="none" stroke="#e0b03a" strokeWidth="1.6" opacity="0.7" />
        <path d="M110 86h40M116 100h28" stroke="#f0d9a8" strokeWidth="3" strokeLinecap="round" />
        <circle cx="130" cy="70" r="9" fill="none" stroke="#f0d9a8" strokeWidth="2.2" />
        <path d="M130 64v12M124 70h12" stroke="#f0d9a8" strokeWidth="2.2" strokeLinecap="round" />
      </g>

      {/* Spine and ribbon stay put while the cover moves. */}
      <rect x="44" y="28" width="12" height="146" rx="3" fill="#7d473e" />
      <path className="mem-book-ribbon" d="M186 28v58l-9-9-9 9V28Z" fill="#c4645e" />
    </svg>
  );
}

/**
 * Golden dust drifting behind the content. Purely decorative, and switched
 * off entirely under reduced motion by the stylesheet.
 */
export function DustField({ count = 18 }) {
  const motes = Array.from({ length: count }, (_, i) => ({
    left: `${(i * 41) % 98}%`,
    delay: `${(i % 9) * 1.4}s`,
    duration: `${14 + (i % 5) * 3}s`,
    size: i % 4 === 0 ? 5 : 3,
  }));

  return (
    <div className="mem-dust" aria-hidden="true">
      {motes.map((mote, i) => (
        <span
          key={i}
          style={{
            left: mote.left,
            width: mote.size,
            height: mote.size,
            animationDelay: mote.delay,
            animationDuration: mote.duration,
          }}
        />
      ))}
    </div>
  );
}

/** A small ribbon bookmark for the closing page. */
export function Bookmark() {
  return (
    <motion.svg viewBox="0 0 60 90" className="mem-bookmark" aria-hidden="true">
      <path d="M8 6h44v74l-22-18-22 18Z" fill="#c4645e" />
      <path d="M8 6h44v10H8Z" fill="#a84f4a" />
      <circle cx="30" cy="38" r="9" fill="none" stroke="#f0d9a8" strokeWidth="2.4" />
      <path d="M30 32v12M24 38h12" stroke="#f0d9a8" strokeWidth="2.4" strokeLinecap="round" />
    </motion.svg>
  );
}
