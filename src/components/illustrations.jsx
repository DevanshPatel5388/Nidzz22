export function Sunflower({ className = "", style }) {
  const petals = Array.from({ length: 12 });
  return (
    <svg viewBox="0 0 80 148" className={className} style={style} aria-hidden="true">
      <path d="M40 62c-1 18-6 38-4 74" stroke="#6f8f5c" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <ellipse cx="27" cy="96" rx="13" ry="6" fill="#8eaa78" transform="rotate(-38 27 96)" />
      <ellipse cx="55" cy="108" rx="12" ry="5.5" fill="#6f8f5c" transform="rotate(32 55 108)" />
      <g>
        {petals.map((_, index) => (
          <ellipse
            key={index}
            cx="40"
            cy="22"
            rx="6.2"
            ry="14"
            fill={index % 2 === 0 ? "#f2c14e" : "#e6b43a"}
            transform={`rotate(${index * 30} 40 40)`}
          />
        ))}
        <circle cx="40" cy="40" r="11" fill="#6b4f3a" />
        <circle cx="40" cy="40" r="4.5" fill="#3e2c22" />
        <circle cx="36" cy="37" r="1.2" fill="#f0c14b" />
        <circle cx="44" cy="38" r="1.1" fill="#f0c14b" />
        <circle cx="40" cy="44" r="1.1" fill="#f0c14b" />
      </g>
    </svg>
  );
}

export function SleepingCat({ className = "" }) {
  return (
    <svg viewBox="0 0 230 150" className={className} aria-hidden="true">
      <ellipse cx="132" cy="104" rx="74" ry="30" fill="#f4e2cc" />
      <path d="M188 104c22-4 34 10 28 22-8 4-24 2-34-6" fill="#e7d0b4" />
      <circle cx="74" cy="96" r="34" fill="#f4e2cc" />
      <path d="M52 74l12-28 16 24z" fill="#f4e2cc" />
      <path d="M78 72l14-30 16 28z" fill="#f4e2cc" />
      <path d="M58 70l8-16 8 14z" fill="#f4c7c3" />
      <path d="M84 68l8-16 10 16z" fill="#f4c7c3" />
      <path d="M56 98c6-5 12-5 16 0" fill="none" stroke="#3e2c22" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M80 98c6-5 12-5 16 0" fill="none" stroke="#3e2c22" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M72 106l4 5 4-5" fill="#e7a8a2" />
      <path d="M76 111c-4 4-8 4-8 1M76 111c4 4 8 4 8 1" fill="none" stroke="#3e2c22" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M48 104h-16M50 110h-14M92 104h16M90 110h14" stroke="#c4a484" strokeWidth="1.4" strokeLinecap="round" />
      <ellipse cx="60" cy="108" rx="6" ry="3.5" fill="#f4c7c3" opacity="0.7" />
      <ellipse cx="94" cy="108" rx="6" ry="3.5" fill="#f4c7c3" opacity="0.7" />
      <path d="M108 92c8 10 20 14 34 12" fill="none" stroke="#e7d0b4" strokeWidth="8" strokeLinecap="round" />
      <text className="zzz" x="150" y="62" fill="#c8922a" fontFamily="Caveat, cursive" fontSize="22">z</text>
      <text className="zzz" x="168" y="46" fill="#e3a19a" fontFamily="Caveat, cursive" fontSize="18" style={{ animationDelay: "0.4s" }}>z</text>
      <text className="zzz" x="184" y="32" fill="#c8922a" fontFamily="Caveat, cursive" fontSize="15" style={{ animationDelay: "0.8s" }}>z</text>
    </svg>
  );
}

export function SittingCat({ className = "" }) {
  return (
    <svg viewBox="0 0 140 160" className={className} aria-hidden="true">
      <path d="M28 118c-16 8-22 24-8 30 18-6 28-16 30-28" fill="#e7d0b4" />
      <ellipse cx="74" cy="112" rx="36" ry="32" fill="#f4e2cc" />
      <ellipse cx="74" cy="68" rx="30" ry="28" fill="#f7e7d4" />
      <path d="M52 50l8-26 16 22z" fill="#f4e2cc" />
      <path d="M78 48l12-28 16 26z" fill="#f4e2cc" />
      <path d="M57 48l6-14 8 12z" fill="#f4c7c3" />
      <path d="M84 46l7-14 9 14z" fill="#f4c7c3" />
      <g className="blink">
        <ellipse cx="64" cy="68" rx="4" ry="5" fill="#3e2c22" />
        <ellipse cx="86" cy="68" rx="4" ry="5" fill="#3e2c22" />
        <circle cx="65.5" cy="66.5" r="1.1" fill="#fffaf3" />
        <circle cx="87.5" cy="66.5" r="1.1" fill="#fffaf3" />
      </g>
      <path d="M74 76l3.5 4 3.5-4" fill="#e7a8a2" />
      <path d="M74 80c-3 3-6 3-6 1M74 80c3 3 6 3 6 1" fill="none" stroke="#3e2c22" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M46 74h-14M48 80h-12M100 74h14M98 80h12" stroke="#c4a484" strokeWidth="1.4" strokeLinecap="round" />
      <ellipse cx="58" cy="78" rx="5" ry="3" fill="#f4c7c3" opacity="0.75" />
      <ellipse cx="92" cy="78" rx="5" ry="3" fill="#f4c7c3" opacity="0.75" />
      <ellipse cx="60" cy="128" rx="12" ry="8" fill="#f7e7d4" />
      <ellipse cx="90" cy="128" rx="12" ry="8" fill="#f7e7d4" />
    </svg>
  );
}

export function LoafCat({ className = "" }) {
  return (
    <svg viewBox="0 0 180 120" className={className} aria-hidden="true">
      <ellipse cx="96" cy="78" rx="68" ry="28" fill="#f4e2cc" />
      <ellipse cx="58" cy="70" rx="28" ry="24" fill="#f7e7d4" />
      <path d="M40 56l8-20 14 18z" fill="#f4e2cc" />
      <path d="M62 54l10-22 14 20z" fill="#f4e2cc" />
      <path d="M44 54l6-12 8 11z" fill="#f4c7c3" />
      <path d="M68 52l6-12 8 12z" fill="#f4c7c3" />
      <path d="M46 70c5-4 10-4 14 0" fill="none" stroke="#3e2c22" strokeWidth="2" strokeLinecap="round" />
      <path d="M66 70c5-4 10-4 14 0" fill="none" stroke="#3e2c22" strokeWidth="2" strokeLinecap="round" />
      <path d="M60 78l3 4 3-4" fill="#e7a8a2" />
      <path d="M40 118c10-8 22-10 34-6M78 116c16-6 34-6 52 2" fill="none" stroke="#e7d0b4" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export function Paw({ className = "" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <ellipse cx="32" cy="42" rx="13" ry="11" fill="currentColor" />
      <ellipse cx="14" cy="24" rx="6" ry="8" fill="currentColor" />
      <ellipse cx="26" cy="15" rx="6" ry="8" fill="currentColor" />
      <ellipse cx="40" cy="15" rx="6" ry="8" fill="currentColor" />
      <ellipse cx="51" cy="25" rx="6" ry="8" fill="currentColor" />
    </svg>
  );
}

export function Sparkle({ className = "", style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path d="M12 1.2 13.5 9.2 22 12l-8.5 2.8L12 22.8 10.5 14.8 2 12l8.5-2.8Z" fill="currentColor" />
    </svg>
  );
}

export function Petal({ className = "", style, color = "#f2c14e" }) {
  return (
    <svg viewBox="0 0 20 32" className={className} style={style} aria-hidden="true">
      <ellipse cx="10" cy="16" rx="6" ry="13" fill={color} />
      <ellipse cx="10" cy="16" rx="2.4" ry="10" fill="#fff6d2" opacity="0.45" />
    </svg>
  );
}

export function Heart({ className = "" }) {
  return (
    <svg viewBox="0 0 48 44" className={className} aria-hidden="true">
      <path
        d="M24 40C8 28 2 20 6 12 9 6 16 6 20 10c2 2 3 3 4 3s2-1 4-3c4-4 11-4 14 2 4 8-2 16-18 28Z"
        fill="#f4c7c3"
        stroke="#e3a19a"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function Star({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="m24 4 5 12 13 1-10 8 3 13-11-7-11 7 3-13L5 17l13-1Z" fill="#f0c14b" stroke="#c8922a" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

export function Yarn({ className = "" }) {
  return (
    <svg viewBox="0 0 90 70" className={className} aria-hidden="true">
      <ellipse cx="40" cy="40" rx="28" ry="22" fill="#f4c7c3" />
      <path d="M22 36c8 4 18 4 28-2M20 46c10 2 22 0 32-8M30 28c8 6 16 8 26 4" fill="none" stroke="#e3a19a" strokeWidth="1.6" />
      <path d="M64 30c14-10 20-6 16 8-6 4-14 2-16-2" fill="none" stroke="#c8922a" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Shoe({ upper = "#fffaf3", sole = "#5c4332", lace = "#e7d8c4", className = "" }) {
  return (
    <svg viewBox="0 0 220 130" className={className} aria-hidden="true">
      <rect x="22" y="90" width="180" height="18" rx="9" fill={sole} />
      <path d="M42 92V54c0-12 12-20 26-18h12v56H42Z" fill={upper} stroke="#4e382a" strokeWidth="2.3" strokeLinejoin="round" />
      <path d="M78 92V60c18-22 62-22 96 4 10 8 16 18 14 28H78Z" fill={upper} stroke="#4e382a" strokeWidth="2.3" strokeLinejoin="round" />
      <path d="M50 56c10-8 22-8 30 4" fill="none" stroke="#4e382a" strokeWidth="2" strokeLinecap="round" />
      <path d="M90 68h34M94 78h36M98 88h30" fill="none" stroke={lace} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M150 52c16 12 24 26 22 40" fill="none" stroke="#4e382a" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Cap({ crown = "#fffaf3", brim = "#f0e2cf", className = "" }) {
  return (
    <svg viewBox="0 0 160 110" className={className} aria-hidden="true">
      <path d="M18 74c18 16 108 16 124 0-8 14-36 22-62 22S28 88 18 74Z" fill={brim} stroke="#5c4332" strokeWidth="2" />
      <path d="M42 74c2-34 16-48 40-50 26 0 40 16 42 50" fill={crown} stroke="#5c4332" strokeWidth="2" />
      <path d="M82 28c6 14 6 30 0 44" fill="none" stroke="#5c4332" strokeWidth="1.4" opacity="0.45" />
      <ellipse cx="82" cy="30" rx="5" ry="3.2" fill="#f0c14b" stroke="#5c4332" strokeWidth="1.3" />
      <path d="M48 74c10 6 54 6 66 0" fill="none" stroke="#5c4332" strokeWidth="1.4" opacity="0.35" />
    </svg>
  );
}

export function BookStack({ className = "" }) {
  return (
    <svg viewBox="0 0 120 90" className={className} aria-hidden="true">
      <rect x="18" y="18" width="78" height="16" rx="2" fill="#6b4f3a" />
      <rect x="24" y="36" width="78" height="16" rx="2" fill="#e3a19a" />
      <rect x="16" y="54" width="86" height="18" rx="2" fill="#f0c14b" />
      <path d="M18 26h8M24 44h8M16 63h8" stroke="#fffaf3" strokeWidth="2" />
    </svg>
  );
}

export function Ticket({ className = "" }) {
  return (
    <svg viewBox="0 0 140 80" className={className} aria-hidden="true">
      <rect x="8" y="14" width="124" height="54" rx="8" fill="#fffaf3" stroke="#6b4f3a" strokeWidth="1.6" />
      <path d="M96 14v54" stroke="#e3a19a" strokeWidth="1.4" strokeDasharray="3 3" />
      <circle cx="18" cy="28" r="3" fill="#f0c14b" />
      <path d="M28 40h52M28 50h40" stroke="#d9c3ae" strokeWidth="2" strokeLinecap="round" />
      <text x="108" y="46" textAnchor="middle" fill="#6b4f3a" fontFamily="Caveat, cursive" fontSize="16">go</text>
    </svg>
  );
}

export function Cottage({ className = "" }) {
  return (
    <svg viewBox="0 0 120 100" className={className} fill="none" aria-hidden="true">
      <path d="M16 48 60 16l44 32" stroke="#6b4f3a" strokeWidth="2" />
      <path d="M28 46h64v40H28z" stroke="#6b4f3a" strokeWidth="2" />
      <path d="M52 86V64h16v22" stroke="#6b4f3a" strokeWidth="2" />
      <path d="M36 58h14v12H36zM70 58h14v12H70z" stroke="#6b4f3a" strokeWidth="1.6" />
      <circle cx="78" cy="28" r="6" fill="#f0c14b" />
    </svg>
  );
}

export function Pencil({ className = "" }) {
  return (
    <svg viewBox="0 0 170 36" className={className} aria-hidden="true">
      <polygon points="8,18 30,6 30,30" fill="#f0c14b" stroke="#6b4f3a" strokeWidth="1.4" />
      <rect x="30" y="6" width="104" height="24" fill="#f4c7c3" stroke="#6b4f3a" strokeWidth="1.4" />
      <rect x="112" y="6" width="18" height="24" fill="#f6e7c8" stroke="#6b4f3a" strokeWidth="1.4" />
      <polygon points="130,6 158,18 130,30" fill="#f7e7d4" stroke="#6b4f3a" strokeWidth="1.4" />
      <polygon points="148,13 158,18 148,23" fill="#3e2c22" />
      <path d="M42 6v24" stroke="#6b4f3a" strokeWidth="1.2" />
    </svg>
  );
}

export function Ruler({ className = "" }) {
  const ticks = Array.from({ length: 26 });
  return (
    <svg viewBox="0 0 340 40" className={className} aria-hidden="true">
      <rect x="2" y="4" width="336" height="32" rx="3" fill="#f8efd8" stroke="#6b4f3a" strokeWidth="1.5" />
      {ticks.map((_, index) => (
        <line
          key={index}
          x1={14 + index * 12}
          y1="4"
          x2={14 + index * 12}
          y2={index % 5 === 0 ? 20 : 12}
          stroke="#6b4f3a"
          strokeWidth="1.2"
        />
      ))}
    </svg>
  );
}

export function MusicNote({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M9 17.5a2.5 2.5 0 1 1-2-2.45V5.2l10-2v9.3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17" cy="14.2" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function Flourish() {
  return (
    <div className="mt-4 flex items-center justify-center gap-3 text-sun-deep" aria-hidden="true">
      <span className="h-px w-10 bg-beige sm:w-16" />
      <Sunflower className="h-8 w-auto" />
      <span className="h-px w-10 bg-beige sm:w-16" />
    </div>
  );
}

const marks = [Heart, Star, Sunflower, SittingCat, BookStack, Sparkle];

export function MiniMark({ index, className = "h-8 w-8" }) {
  const Mark = marks[index % marks.length];
  return <Mark className={className} />;
}
