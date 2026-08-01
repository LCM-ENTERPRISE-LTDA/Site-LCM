import styles from "./ShowcaseVisuals.module.css";

/** AutoHist — clean timeline / record precision */
export function AutoHistVisual({ alive }: { alive: boolean }) {
  return (
    <svg
      className={`${styles.visual} ${styles.autohist} ${alive ? styles.alive : ""}`}
      viewBox="0 0 520 420"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ah-line" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4d9be8" stopOpacity="0" />
          <stop offset="40%" stopColor="#4d9be8" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#4d9be8" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <g className={styles.ahTrack}>
        <path d="M120 60 V360" stroke="url(#ah-line)" strokeWidth="1.5" />
        {[100, 170, 240, 310].map((y, i) => (
          <g key={y} className={styles.ahNode} style={{ ["--i" as string]: i }}>
            <circle cx="120" cy={y} r="5" fill="#0d1626" stroke="#4d9be8" strokeWidth="1.5" />
            <circle cx="120" cy={y} r="2" fill="#4d9be8" />
            <rect
              x="148"
              y={y - 18}
              width={180 + (i % 2) * 40}
              height="36"
              rx="4"
              fill="rgba(77,155,232,0.06)"
              stroke="rgba(77,155,232,0.28)"
              strokeWidth="1"
            />
            <line
              x1="160"
              y1={y - 4}
              x2={280 + (i % 2) * 30}
              y2={y - 4}
              stroke="rgba(77,155,232,0.35)"
              strokeWidth="1.2"
            />
            <line
              x1="160"
              y1={y + 8}
              x2={240 + (i % 3) * 20}
              y2={y + 8}
              stroke="rgba(77,155,232,0.18)"
              strokeWidth="1"
            />
          </g>
        ))}
      </g>
      <g className={styles.ahScan}>
        <rect x="360" y="80" width="120" height="160" rx="6" fill="rgba(77,155,232,0.04)" stroke="rgba(77,155,232,0.2)" />
        <path d="M380 110 H460 M380 140 H440 M380 170 H450 M380 200 H420" stroke="rgba(77,155,232,0.25)" strokeWidth="1" />
      </g>
    </svg>
  );
}

/** Dyson — mysterious constellation / AI depth */
export function DysonVisual({ alive }: { alive: boolean }) {
  return (
    <svg
      className={`${styles.visual} ${styles.dyson} ${alive ? styles.alive : ""}`}
      viewBox="0 0 520 420"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="dy-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="35%" stopColor="rgba(139,124,240,0.35)" />
          <stop offset="100%" stopColor="rgba(139,124,240,0)" />
        </radialGradient>
      </defs>
      <circle className={styles.dyHalo} cx="260" cy="210" r="120" fill="url(#dy-core)" />
      <g className={styles.dyOrbit}>
        <ellipse cx="260" cy="210" rx="150" ry="90" stroke="rgba(139,124,240,0.35)" strokeWidth="1" transform="rotate(-25 260 210)" />
        <ellipse cx="260" cy="210" rx="110" ry="160" stroke="rgba(139,124,240,0.22)" strokeWidth="1" strokeDasharray="3 8" transform="rotate(15 260 210)" />
      </g>
      <g className={styles.dyLinks} stroke="rgba(139,124,240,0.4)" strokeWidth="1">
        <path d="M260 210 L180 120" />
        <path d="M260 210 L340 130" />
        <path d="M260 210 L160 250" />
        <path d="M260 210 L380 260" />
        <path d="M260 210 L230 320" />
        <path d="M260 210 L310 330" />
      </g>
      <g className={styles.dyNodes}>
        <circle cx="260" cy="210" r="8" fill="#0d1626" stroke="#8b7cf0" strokeWidth="1.5" />
        <circle cx="260" cy="210" r="3" fill="#c4b8ff" />
        <circle className={styles.dySat} cx="180" cy="120" r="4" fill="#8b7cf0" />
        <circle className={styles.dySat} cx="340" cy="130" r="3.5" fill="#a594f9" />
        <circle className={styles.dySat} cx="160" cy="250" r="3" fill="#8b7cf0" />
        <circle className={styles.dySat} cx="380" cy="260" r="4" fill="#a594f9" />
        <circle className={styles.dySat} cx="230" cy="320" r="3" fill="#8b7cf0" />
        <circle className={styles.dySat} cx="310" cy="330" r="3.5" fill="#c4b8ff" />
      </g>
    </svg>
  );
}

/** LCM Studio — creative canvas / layout blocks */
export function StudioVisual({ alive }: { alive: boolean }) {
  return (
    <svg
      className={`${styles.visual} ${styles.studio} ${alive ? styles.alive : ""}`}
      viewBox="0 0 520 420"
      fill="none"
      aria-hidden="true"
    >
      <g className={styles.stFrame}>
        <rect x="70" y="50" width="380" height="300" rx="8" fill="rgba(240,160,64,0.04)" stroke="rgba(240,160,64,0.28)" strokeWidth="1.2" />
        <rect x="70" y="50" width="380" height="36" rx="8" fill="rgba(240,160,64,0.08)" />
        <circle cx="94" cy="68" r="4" fill="rgba(240,160,64,0.45)" />
        <circle cx="112" cy="68" r="4" fill="rgba(240,160,64,0.3)" />
        <circle cx="130" cy="68" r="4" fill="rgba(240,160,64,0.2)" />
      </g>
      <g className={styles.stBlocks}>
        <rect className={styles.stBlock} style={{ ["--i" as string]: 0 }} x="92" y="110" width="160" height="100" rx="5" fill="rgba(240,160,64,0.1)" stroke="rgba(240,160,64,0.4)" />
        <rect className={styles.stBlock} style={{ ["--i" as string]: 1 }} x="270" y="110" width="156" height="48" rx="5" fill="rgba(240,160,64,0.07)" stroke="rgba(240,160,64,0.3)" />
        <rect className={styles.stBlock} style={{ ["--i" as string]: 2 }} x="270" y="172" width="156" height="38" rx="5" fill="rgba(240,160,64,0.07)" stroke="rgba(240,160,64,0.28)" />
        <rect className={styles.stBlock} style={{ ["--i" as string]: 3 }} x="92" y="228" width="334" height="90" rx="5" fill="rgba(240,160,64,0.05)" stroke="rgba(240,160,64,0.25)" />
      </g>
      <g className={styles.stCursor} stroke="#f0a040" strokeWidth="1.4">
        <path d="M300 200 L318 248 L308 248 L316 268 L308 272 L300 252 L290 260 Z" fill="rgba(240,160,64,0.25)" />
      </g>
    </svg>
  );
}

/** BusinessZap — communication signals / flows */
export function BusinessZapVisual({ alive }: { alive: boolean }) {
  return (
    <svg
      className={`${styles.visual} ${styles.businesszap} ${alive ? styles.alive : ""}`}
      viewBox="0 0 520 420"
      fill="none"
      aria-hidden="true"
    >
      <g className={styles.bzHubs}>
        <circle cx="140" cy="210" r="36" fill="rgba(47,191,134,0.08)" stroke="rgba(47,191,134,0.4)" strokeWidth="1.3" />
        <circle cx="380" cy="140" r="28" fill="rgba(47,191,134,0.06)" stroke="rgba(47,191,134,0.32)" strokeWidth="1.2" />
        <circle cx="360" cy="300" r="32" fill="rgba(47,191,134,0.06)" stroke="rgba(47,191,134,0.32)" strokeWidth="1.2" />
      </g>
      <g className={styles.bzPaths} stroke="rgba(47,191,134,0.45)" strokeWidth="1.4" fill="none">
        <path className={styles.bzPath} d="M176 200 C 240 160, 280 150, 352 140" />
        <path className={styles.bzPath} d="M172 230 C 240 260, 280 290, 330 300" />
        <path className={styles.bzPath} d="M380 168 C 390 220, 385 260, 370 268" />
      </g>
      <g className={styles.bzBubbles}>
        <rect className={styles.bzBubble} x="200" y="100" width="90" height="28" rx="8" fill="rgba(47,191,134,0.12)" stroke="rgba(47,191,134,0.35)" />
        <rect className={styles.bzBubble} x="220" y="250" width="70" height="24" rx="8" fill="rgba(47,191,134,0.1)" stroke="rgba(47,191,134,0.3)" />
        <rect className={styles.bzBubble} x="400" y="200" width="60" height="22" rx="8" fill="rgba(47,191,134,0.1)" stroke="rgba(47,191,134,0.28)" />
      </g>
      <circle cx="140" cy="210" r="5" fill="#2fbf86" />
      <circle cx="380" cy="140" r="4" fill="#2fbf86" />
      <circle cx="360" cy="300" r="4" fill="#5dd4a4" />
    </svg>
  );
}
