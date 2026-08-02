"use client";

import styles from "./CompanyArts.module.css";

type Alive = { alive: boolean };

/** Architectural planes — triad suggested by three intersecting structures, not the logo. */
export function HeroArchitecture({ alive }: Alive) {
  return (
    <div className={`${styles.art} ${alive ? styles.alive : ""} ${styles.hero}`} aria-hidden="true">
      <div className={styles.glow} />
      <svg className={styles.svg} viewBox="0 0 640 480" fill="none">
        <defs>
          <linearGradient id="co-hero-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4d9be8" stopOpacity="0" />
            <stop offset="45%" stopColor="#4d9be8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2f6bff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="co-hero-core" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="50%" stopColor="rgba(47,107,255,0.14)" />
            <stop offset="100%" stopColor="rgba(47,107,255,0)" />
          </radialGradient>
        </defs>
        <ellipse cx="320" cy="230" rx="200" ry="130" fill="url(#co-hero-core)" className={styles.breathe} />
        {/* Three structural planes — foundation triad */}
        <g className={styles.planes}>
          <path
            d="M120 320 L280 140 L360 180 L200 360 Z"
            fill="rgba(12,20,36,0.55)"
            stroke="url(#co-hero-edge)"
            strokeWidth="1.2"
          />
          <path
            d="M280 160 L420 110 L520 280 L380 330 Z"
            fill="rgba(14,22,40,0.45)"
            stroke="rgba(130,170,220,0.22)"
            strokeWidth="1.1"
          />
          <path
            d="M200 300 L380 250 L440 360 L260 400 Z"
            fill="rgba(10,16,28,0.5)"
            stroke="rgba(77,155,232,0.28)"
            strokeWidth="1.15"
          />
        </g>
        <path d="M160 300 L480 200" stroke="rgba(130,170,220,0.18)" strokeWidth="0.9" className={styles.line} />
        <path d="M240 120 L360 380" stroke="rgba(47,107,255,0.16)" strokeWidth="0.9" className={styles.lineSlow} />
        <circle cx="320" cy="220" r="3.5" fill="rgba(255,255,255,0.55)" className={styles.core} />
      </svg>
    </div>
  );
}

/** Tension / fracture — the problem that sparked the company. */
export function ProblemArt({ alive }: Alive) {
  return (
    <div className={`${styles.art} ${alive ? styles.alive : ""} ${styles.problem}`} aria-hidden="true">
      <div className={styles.glowWarm} />
      <svg className={styles.svg} viewBox="0 0 560 360" fill="none">
        <path
          d="M80 80 H480 V280 H80 Z"
          stroke="rgba(130,170,220,0.12)"
          strokeWidth="1"
          strokeDasharray="6 10"
          className={styles.frame}
        />
        <path
          d="M140 100 L260 180 L200 260"
          stroke="#4d9be8"
          strokeOpacity="0.35"
          strokeWidth="1.4"
          className={styles.faultA}
        />
        <path
          d="M420 90 L300 190 L380 270"
          stroke="#2f6bff"
          strokeOpacity="0.3"
          strokeWidth="1.3"
          className={styles.faultB}
        />
        <circle cx="260" cy="180" r="5" fill="rgba(255,255,255,0.35)" className={styles.stress} />
        <circle cx="300" cy="190" r="3.5" fill="#4d9be8" fillOpacity="0.55" className={styles.stress} />
      </svg>
    </div>
  );
}

/** Three light pillars — principles as structure, not cards. */
export function ThinkingArt({ alive }: Alive) {
  return (
    <div className={`${styles.art} ${alive ? styles.alive : ""} ${styles.thinking}`} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 560 300" fill="none">
        <defs>
          <linearGradient id="co-pillar" x1="0.5" y1="1" x2="0.5" y2="0">
            <stop offset="0%" stopColor="#2f6bff" stopOpacity="0" />
            <stop offset="55%" stopColor="#4d9be8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <g className={styles.pillarSet}>
          <rect x="90" y="60" width="48" height="180" rx="4" fill="url(#co-pillar)" className={styles.pillar} />
          <rect x="250" y="40" width="52" height="200" rx="4" fill="url(#co-pillar)" className={styles.pillarMid} />
          <rect x="410" y="70" width="48" height="170" rx="4" fill="url(#co-pillar)" className={styles.pillar} />
        </g>
        <path d="M70 250 H490" stroke="rgba(130,170,220,0.2)" strokeWidth="1" />
      </svg>
    </div>
  );
}

/** Sequential stations — idea to enduring product (not a dated timeline). */
export function CraftArt({ alive }: Alive) {
  return (
    <div className={`${styles.art} ${alive ? styles.alive : ""} ${styles.craft}`} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 640 200" fill="none">
        <path
          d="M40 100 H600"
          stroke="rgba(77,155,232,0.25)"
          strokeWidth="1.2"
          strokeDasharray="4 12"
          className={styles.craftPath}
        />
        {[120, 260, 400, 540].map((x, i) => (
          <g key={x} className={styles.station} style={{ animationDelay: `${i * 0.6}s` }}>
            <circle cx={x} cy="100" r="14" fill="rgba(10,16,28,0.9)" stroke="#4d9be8" strokeOpacity="0.45" strokeWidth="1.2" />
            <circle cx={x} cy="100" r="4" fill="#4d9be8" fillOpacity="0.7" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/** Horizon / long purpose — future without sci-fi spectacle. */
export function FutureArt({ alive }: Alive) {
  return (
    <div className={`${styles.art} ${alive ? styles.alive : ""} ${styles.future}`} aria-hidden="true">
      <div className={styles.horizonGlow} />
      <svg className={styles.svg} viewBox="0 0 640 280" fill="none">
        <ellipse cx="320" cy="200" rx="260" ry="40" fill="rgba(47,107,255,0.08)" className={styles.horizon} />
        <path
          d="M80 180 Q200 120 320 150 Q440 180 560 130"
          stroke="rgba(77,155,232,0.35)"
          strokeWidth="1.2"
          fill="none"
          className={styles.horizonLine}
        />
        <circle cx="320" cy="148" r="3" fill="rgba(255,255,255,0.5)" className={styles.beacon} />
      </svg>
    </div>
  );
}
