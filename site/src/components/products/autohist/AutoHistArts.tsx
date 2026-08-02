"use client";

import styles from "./AutoHistArts.module.css";

type Alive = { alive: boolean };

/** Plate → scanner beam → register trail. Abstract, no UI chrome. */
export function HeroScanArt({ alive }: Alive) {
  return (
    <div className={`${styles.art} ${alive ? styles.alive : ""} ${styles.hero}`} aria-hidden="true">
      <div className={styles.glow} />
      <svg className={styles.svg} viewBox="0 0 640 480" fill="none">
        <defs>
          <linearGradient id="ah-beam" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0%" stopColor="#3d8bfd" stopOpacity="0" />
            <stop offset="50%" stopColor="#3d8bfd" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="ah-core" cx="40%" cy="48%" r="50%">
            <stop offset="0%" stopColor="rgba(125,211,252,0.18)" />
            <stop offset="55%" stopColor="rgba(37,99,200,0.12)" />
            <stop offset="100%" stopColor="rgba(10,22,40,0)" />
          </radialGradient>
        </defs>
        <ellipse cx="280" cy="230" rx="220" ry="150" fill="url(#ah-core)" className={styles.breathe} />
        {/* Plate */}
        <rect
          x="90"
          y="175"
          width="200"
          height="72"
          rx="8"
          fill="rgba(8,18,36,0.85)"
          stroke="#3d8bfd"
          strokeOpacity="0.45"
          strokeWidth="1.4"
          className={styles.plate}
        />
        <path d="M115 211 H265" stroke="rgba(125,211,252,0.35)" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="130" cy="211" r="3" fill="#3d8bfd" fillOpacity="0.7" />
        {/* Scanner sweep */}
        <path d="M70 120 H560" stroke="url(#ah-beam)" strokeWidth="1.5" className={styles.scan} />
        <path d="M100 140 C220 200 320 160 520 220" stroke="#3d8bfd" strokeOpacity="0.25" strokeWidth="1.1" className={styles.trail} />
        {/* Register nodes */}
        {[320, 380, 440, 500].map((x, i) => (
          <g key={x} className={styles.node} style={{ animationDelay: `${i * 0.7}s` }}>
            <circle cx={x} cy={200 + i * 18} r="5" fill="rgba(8,18,36,0.9)" stroke="#3d8bfd" strokeOpacity="0.5" strokeWidth="1.1" />
            <circle cx={x} cy={200 + i * 18} r="2" fill="#7dd3fc" fillOpacity="0.65" />
          </g>
        ))}
        <text x="98" y="160" fill="rgba(125,211,252,0.35)" fontSize="9" fontFamily="monospace">
          READ · PLATE
        </text>
      </svg>
    </div>
  );
}

/** Dispersed fragments — problem before convergence. */
export function ProblemScatterArt({ alive }: Alive) {
  return (
    <div className={`${styles.art} ${alive ? styles.alive : ""} ${styles.scatter}`} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 560 360" fill="none">
        <g className={styles.frag}>
          <rect x="40" y="50" width="70" height="48" rx="4" stroke="#3d8bfd" strokeOpacity="0.25" />
          <rect x="180" y="30" width="55" height="40" rx="4" stroke="#3d8bfd" strokeOpacity="0.2" />
          <rect x="320" y="70" width="80" height="36" rx="4" stroke="#2b6cb0" strokeOpacity="0.28" />
          <rect x="450" y="40" width="60" height="50" rx="4" stroke="#3d8bfd" strokeOpacity="0.22" />
          <circle cx="100" cy="180" r="18" stroke="#3d8bfd" strokeOpacity="0.28" />
          <circle cx="260" cy="200" r="14" stroke="#2b6cb0" strokeOpacity="0.25" />
          <circle cx="400" cy="170" r="22" stroke="#3d8bfd" strokeOpacity="0.2" />
          <path d="M60 280 H140" stroke="#3d8bfd" strokeOpacity="0.2" strokeDasharray="4 8" />
          <path d="M220 300 H320" stroke="#2b6cb0" strokeOpacity="0.22" strokeDasharray="3 7" />
          <path d="M380 290 H500" stroke="#3d8bfd" strokeOpacity="0.18" strokeDasharray="5 9" />
        </g>
        <circle cx="280" cy="190" r="4" fill="#7dd3fc" fillOpacity="0.35" className={styles.pulse} />
      </svg>
    </div>
  );
}

/** Living history spine — prontuário, not table. */
export function HistorySpineArt({ alive }: Alive) {
  return (
    <div className={`${styles.art} ${alive ? styles.alive : ""} ${styles.spine}`} aria-hidden="true">
      <div className={styles.spineGlow} />
      <svg className={styles.svg} viewBox="0 0 420 520" fill="none">
        <path
          d="M210 40 V480"
          stroke="#3d8bfd"
          strokeOpacity="0.35"
          strokeWidth="1.4"
          className={styles.spineLine}
        />
        {[80, 160, 240, 320, 400].map((y, i) => (
          <g key={y} className={styles.spineNode} style={{ animationDelay: `${i * 0.55}s` }}>
            <circle cx="210" cy={y} r="10" fill="rgba(6,16,32,0.95)" stroke="#3d8bfd" strokeOpacity="0.55" strokeWidth="1.2" />
            <circle cx="210" cy={y} r="3.5" fill="#7dd3fc" fillOpacity="0.7" />
            <path
              d={i % 2 === 0 ? `M210 ${y} H320` : `M210 ${y} H100`}
              stroke="#2b6cb0"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
            <rect
              x={i % 2 === 0 ? 320 : 40}
              y={y - 16}
              width="60"
              height="32"
              rx="4"
              fill="rgba(10,24,48,0.55)"
              stroke="#3d8bfd"
              strokeOpacity="0.25"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

/** Plate search — illuminate and reveal. */
export function SearchRevealArt({ alive, plate }: Alive & { plate: string }) {
  return (
    <div className={`${styles.art} ${alive ? styles.alive : ""} ${styles.search}`} aria-hidden="true">
      <div className={styles.searchGlow} />
      <svg className={styles.svg} viewBox="0 0 640 340" fill="none">
        <rect
          x="170"
          y="110"
          width="300"
          height="88"
          rx="10"
          fill="rgba(6,16,32,0.9)"
          stroke="#3d8bfd"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          className={styles.searchPlate}
        />
        <text
          x="320"
          y="165"
          textAnchor="middle"
          fill="#7dd3fc"
          fillOpacity="0.85"
          fontSize="28"
          fontFamily="ui-monospace, monospace"
          letterSpacing="0.2em"
        >
          {plate}
        </text>
        <path d="M120 220 H520" stroke="#3d8bfd" strokeOpacity="0.2" strokeWidth="1" className={styles.revealLine} />
        {[180, 260, 340, 420, 500].map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy="220"
            r="3.5"
            fill="#3d8bfd"
            fillOpacity="0.45"
            className={styles.revealNode}
            style={{ animationDelay: `${0.4 + i * 0.35}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

/** Shared memory field — workshop without drawn people. */
export function WorkshopFieldArt({ alive }: Alive) {
  return (
    <div className={`${styles.art} ${alive ? styles.alive : ""} ${styles.workshop}`} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 640 360" fill="none">
        <ellipse cx="320" cy="180" rx="90" ry="60" fill="rgba(61,139,253,0.06)" className={styles.breathe} />
        <circle cx="320" cy="180" r="8" fill="#3d8bfd" fillOpacity="0.55" className={styles.pulse} />
        {[
          [160, 100],
          [480, 100],
          [140, 260],
          [500, 250],
          [320, 60],
        ].map(([x, y], i) => (
          <g key={`${x}-${y}`}>
            <path
              d={`M320 180 L${x} ${y}`}
              stroke="#2b6cb0"
              strokeOpacity="0.28"
              strokeWidth="1"
              className={styles.link}
              style={{ animationDelay: `${i * 0.4}s` }}
            />
            <circle cx={x} cy={y} r="12" fill="rgba(6,16,32,0.9)" stroke="#3d8bfd" strokeOpacity="0.4" strokeWidth="1.1" />
            <circle cx={x} cy={y} r="3" fill="#7dd3fc" fillOpacity="0.55" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/** Continuity arc — years / distance as quiet markers. */
export function ContinuityArt({ alive }: Alive) {
  return (
    <div className={`${styles.art} ${alive ? styles.alive : ""} ${styles.continuity}`} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 720 220" fill="none">
        <path
          d="M40 140 Q200 60 360 120 Q520 180 680 90"
          stroke="#3d8bfd"
          strokeOpacity="0.35"
          strokeWidth="1.3"
          fill="none"
          className={styles.contPath}
        />
        {[100, 250, 400, 550, 650].map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy={i % 2 === 0 ? 110 : 145}
            r="4"
            fill="#7dd3fc"
            fillOpacity="0.55"
            className={styles.contNode}
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
