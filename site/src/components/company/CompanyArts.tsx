"use client";

import styles from "./CompanyArts.module.css";

type Alive = { alive: boolean };

/** Glass planes — architectural triad suggestion. */
export function HeroArchitecture({ alive }: Alive) {
  return (
    <div className={`${styles.art} ${alive ? styles.alive : ""} ${styles.hero}`} aria-hidden="true">
      <div className={styles.glow} />
      <svg className={styles.svg} viewBox="0 0 640 520" fill="none">
        <defs>
          <linearGradient id="co-hero-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4d9be8" stopOpacity="0" />
            <stop offset="45%" stopColor="#4d9be8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#2f6bff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="co-hero-core" cx="48%" cy="42%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="45%" stopColor="rgba(47,107,255,0.16)" />
            <stop offset="100%" stopColor="rgba(47,107,255,0)" />
          </radialGradient>
        </defs>
        {/* Construction grid */}
        <g opacity="0.12" stroke="rgba(130,170,220,0.9)" strokeWidth="0.6">
          {[100, 180, 260, 340, 420].map((y) => (
            <path key={`h${y}`} d={`M80 ${y} H560`} />
          ))}
          {[120, 200, 280, 360, 440, 520].map((x) => (
            <path key={`v${x}`} d={`M${x} 80 V440`} />
          ))}
        </g>
        <ellipse cx="310" cy="240" rx="210" ry="140" fill="url(#co-hero-core)" className={styles.breathe} />
        <g className={styles.planes}>
          <path
            d="M110 340 L290 130 L380 175 L200 385 Z"
            fill="rgba(12,20,36,0.42)"
            stroke="url(#co-hero-edge)"
            strokeWidth="1.25"
          />
          <path
            d="M270 155 L430 95 L545 290 L390 345 Z"
            fill="rgba(14,22,40,0.38)"
            stroke="rgba(130,170,220,0.28)"
            strokeWidth="1.1"
          />
          <path
            d="M190 310 L395 250 L460 375 L255 420 Z"
            fill="rgba(10,16,28,0.48)"
            stroke="rgba(77,155,232,0.32)"
            strokeWidth="1.15"
          />
        </g>
        <path d="M150 310 L500 195" stroke="rgba(130,170,220,0.2)" strokeWidth="0.9" className={styles.line} />
        <path d="M230 110 L370 400" stroke="rgba(47,107,255,0.18)" strokeWidth="0.9" className={styles.lineSlow} />
        <circle cx="318" cy="228" r="3.8" fill="rgba(255,255,255,0.6)" className={styles.core} />
        <circle cx="210" cy="300" r="1.4" fill="#4d9be8" opacity="0.5" className={styles.dust} />
        <circle cx="460" cy="250" r="1.2" fill="#2f6bff" opacity="0.45" className={styles.dust} />
        <circle cx="340" cy="160" r="1" fill="#c8d8f0" opacity="0.4" className={styles.dust} />
        <text x="92" y="72" fill="rgba(130,170,220,0.35)" fontSize="9" fontFamily="monospace">
          01 · STRUCTURE
        </text>
      </svg>
    </div>
  );
}

/** Wireframe fault — technical tension. */
export function ProblemArt({ alive }: Alive) {
  return (
    <div className={`${styles.art} ${alive ? styles.alive : ""} ${styles.problem}`} aria-hidden="true">
      <div className={styles.glowWarm} />
      <svg className={styles.svg} viewBox="0 0 420 480" fill="none">
        <g opacity="0.14" stroke="rgba(130,170,220,0.85)" strokeWidth="0.55">
          <path d="M40 40 H380 V440 H40 Z" />
          <path d="M40 160 H380" />
          <path d="M40 280 H380" />
          <path d="M160 40 V440" />
          <path d="M260 40 V440" />
        </g>
        <path
          d="M70 70 H350 V410 H70 Z"
          stroke="rgba(130,170,220,0.16)"
          strokeWidth="1"
          strokeDasharray="5 9"
          className={styles.frame}
        />
        <path d="M110 100 L230 210 L165 340" stroke="#4d9be8" strokeOpacity="0.4" strokeWidth="1.35" className={styles.faultA} />
        <path d="M310 95 L200 220 L285 350" stroke="#2f6bff" strokeOpacity="0.35" strokeWidth="1.25" className={styles.faultB} />
        <circle cx="230" cy="210" r="5" fill="rgba(255,255,255,0.35)" className={styles.stress} />
        <circle cx="200" cy="220" r="3.2" fill="#4d9be8" fillOpacity="0.55" className={styles.stress} />
        <circle cx="120" cy="180" r="1.2" fill="#4d9be8" opacity="0.45" className={styles.dust} />
        <circle cx="300" cy="300" r="1.1" fill="#2f6bff" opacity="0.4" className={styles.dust} />
        <text x="78" y="58" fill="rgba(130,170,220,0.32)" fontSize="8" fontFamily="monospace">
          OBSERVE · FRICTION
        </text>
      </svg>
    </div>
  );
}

/** Engineering mesh — three rising constructive beams. */
export function ThinkingArt({ alive }: Alive) {
  return (
    <div className={`${styles.art} ${alive ? styles.alive : ""} ${styles.thinking}`} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 720 280" fill="none">
        <defs>
          <linearGradient id="co-pillar" x1="0.5" y1="1" x2="0.5" y2="0">
            <stop offset="0%" stopColor="#2f6bff" stopOpacity="0" />
            <stop offset="50%" stopColor="#4d9be8" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.14" />
          </linearGradient>
        </defs>
        <g opacity="0.1" stroke="rgba(130,170,220,1)" strokeWidth="0.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <path key={i} d={`M${40 + i * 55} 30 V250`} />
          ))}
        </g>
        <path d="M50 230 H670" stroke="rgba(130,170,220,0.22)" strokeWidth="1" />
        <rect x="120" y="70" width="44" height="160" rx="3" fill="url(#co-pillar)" className={styles.pillar} />
        <rect x="330" y="45" width="50" height="185" rx="3" fill="url(#co-pillar)" className={styles.pillarMid} />
        <rect x="540" y="85" width="44" height="145" rx="3" fill="url(#co-pillar)" className={styles.pillar} />
        <circle cx="142" cy="70" r="2" fill="#4d9be8" opacity="0.55" className={styles.dust} />
        <circle cx="355" cy="45" r="2.2" fill="#ffffff" opacity="0.4" className={styles.dust} />
        <circle cx="562" cy="85" r="2" fill="#2f6bff" opacity="0.5" className={styles.dust} />
      </svg>
    </div>
  );
}

/** Signal path — stations without dated timeline. */
export function CraftArt({ alive }: Alive) {
  return (
    <div className={`${styles.art} ${alive ? styles.alive : ""} ${styles.craft}`} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 720 220" fill="none">
        <g opacity="0.12" stroke="rgba(130,170,220,0.9)" strokeWidth="0.55">
          <path d="M30 40 H690 V180 H30 Z" />
          <path d="M30 110 H690" />
        </g>
        <path
          d="M50 110 H670"
          stroke="rgba(77,155,232,0.28)"
          strokeWidth="1.2"
          strokeDasharray="3 11"
          className={styles.craftPath}
        />
        {[130, 290, 450, 610].map((x, i) => (
          <g key={x} className={styles.station} style={{ animationDelay: `${i * 0.55}s` }}>
            <circle cx={x} cy="110" r="16" fill="rgba(8,14,26,0.92)" stroke="#4d9be8" strokeOpacity="0.4" strokeWidth="1.15" />
            <circle cx={x} cy="110" r="4.2" fill="#4d9be8" fillOpacity="0.75" />
            <text x={x - 6} y="148" fill="rgba(130,170,220,0.35)" fontSize="8" fontFamily="monospace">
              {String(i + 1).padStart(2, "0")}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/** Horizon mesh — calm future field. */
export function FutureArt({ alive }: Alive) {
  return (
    <div className={`${styles.art} ${alive ? styles.alive : ""} ${styles.future}`} aria-hidden="true">
      <div className={styles.horizonGlow} />
      <svg className={styles.svg} viewBox="0 0 720 320" fill="none">
        <g opacity="0.09" stroke="rgba(130,170,220,1)" strokeWidth="0.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse key={i} cx="360" cy="210" rx={80 + i * 40} ry={18 + i * 10} />
          ))}
        </g>
        <ellipse cx="360" cy="220" rx="280" ry="48" fill="rgba(47,107,255,0.07)" className={styles.horizon} />
        <path
          d="M70 200 Q200 130 360 165 Q520 200 650 140"
          stroke="rgba(77,155,232,0.38)"
          strokeWidth="1.2"
          fill="none"
          className={styles.horizonLine}
        />
        <circle cx="360" cy="162" r="3.2" fill="rgba(255,255,255,0.55)" className={styles.beacon} />
        <circle cx="220" cy="175" r="1.1" fill="#4d9be8" opacity="0.4" className={styles.dust} />
        <circle cx="500" cy="185" r="1.2" fill="#2f6bff" opacity="0.35" className={styles.dust} />
        <text x="70" y="60" fill="rgba(130,170,220,0.3)" fontSize="8" fontFamily="monospace">
          PURPOSE · HORIZON
        </text>
      </svg>
    </div>
  );
}
