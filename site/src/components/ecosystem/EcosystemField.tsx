"use client";

import { ecosystemProducts } from "@/content/ecosystem";
import styles from "./EcosystemField.module.css";

type Props = {
  alive: boolean;
  focusId: string | null;
};

/**
 * Shared foundation field — four accent regions without flowchart lines.
 * aria-hidden: product names are duplicated in HTML legend.
 */
export function EcosystemField({ alive, focusId }: Props) {
  return (
    <div
      className={`${styles.field} ${alive ? styles.alive : ""}`}
      data-focus={focusId ?? ""}
      aria-hidden="true"
    >
      <div className={styles.haze} />
      <div className={styles.foundationGlow} />

      <svg className={styles.svg} viewBox="0 0 1100 460" fill="none">
        <defs>
          <linearGradient id="eco-mesh" x1="0" y1="0.2" x2="1" y2="0.8">
            <stop offset="0%" stopColor="#4d9be8" stopOpacity="0" />
            <stop offset="35%" stopColor="#4d9be8" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#2f6bff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#4d9be8" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="eco-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
            <stop offset="45%" stopColor="rgba(47,107,255,0.18)" />
            <stop offset="100%" stopColor="rgba(47,107,255,0)" />
          </radialGradient>
        </defs>

        {/* Shared foundation — structural mesh, not a logo */}
        <g className={styles.foundation}>
          <ellipse cx="550" cy="230" rx="420" ry="150" fill="url(#eco-core)" opacity="0.55" />
          <path
            d="M80 230 C220 140 380 140 550 230 C720 320 880 320 1020 230"
            stroke="url(#eco-mesh)"
            strokeWidth="1.4"
            className={styles.pulse}
          />
          <path
            d="M120 180 C280 240 420 120 550 200 C680 280 820 160 980 220"
            stroke="#4d9be8"
            strokeOpacity="0.22"
            strokeWidth="1.1"
            className={styles.pulseSlow}
          />
          <path
            d="M140 280 C300 200 440 320 550 260 C660 200 800 300 960 250"
            stroke="#2f6bff"
            strokeOpacity="0.18"
            strokeWidth="1.1"
            className={styles.pulse}
          />
          {/* Structural planes — shared material */}
          <rect x="210" y="150" width="160" height="90" rx="8" fill="rgba(16,27,45,0.45)" stroke="rgba(130,170,220,0.18)" strokeWidth="1" className={styles.plane} />
          <rect x="460" y="120" width="180" height="100" rx="8" fill="rgba(16,27,45,0.4)" stroke="rgba(130,170,220,0.16)" strokeWidth="1" className={styles.plane} />
          <rect x="700" y="160" width="150" height="85" rx="8" fill="rgba(16,27,45,0.42)" stroke="rgba(130,170,220,0.15)" strokeWidth="1" className={styles.plane} />
          <rect x="380" y="250" width="200" height="80" rx="8" fill="rgba(16,27,45,0.38)" stroke="rgba(130,170,220,0.14)" strokeWidth="1" className={styles.plane} />
        </g>

        {/* Product regions — asymmetric energy, not equal boxes */}
        <g
          className={`${styles.region} ${styles.autohist} ${focusId === "autohist" ? styles.focused : ""}`}
        >
          <ellipse cx="200" cy="175" rx="110" ry="78" fill="rgba(47,125,209,0.1)" />
          <path d="M120 160 H240 M140 190 H260 M155 220 H230" stroke="#4d9be8" strokeOpacity="0.45" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="175" cy="160" r="4" fill="#0a1018" stroke="#4d9be8" strokeWidth="1.3" />
          <circle cx="230" cy="195" r="3.5" fill="#0a1018" stroke="#4d9be8" strokeWidth="1.2" />
          <circle cx="190" cy="225" r="3" fill="#4d9be8" fillOpacity="0.7" />
        </g>

        <g
          className={`${styles.region} ${styles.dyson} ${focusId === "dyson" ? styles.focused : ""}`}
        >
          <ellipse cx="780" cy="125" rx="100" ry="70" fill="rgba(139,124,240,0.11)" />
          <path d="M720 100 Q760 140 800 110 Q840 80 870 130" stroke="#8b7cf0" strokeOpacity="0.5" strokeWidth="1.4" fill="none" />
          <circle cx="740" cy="115" r="3.5" fill="#0a1018" stroke="#8b7cf0" strokeWidth="1.2" />
          <circle cx="800" cy="105" r="5" fill="#0a1018" stroke="#c4b8ff" strokeWidth="1.3" />
          <circle cx="850" cy="135" r="3" fill="#8b7cf0" fillOpacity="0.75" />
        </g>

        <g
          className={`${styles.region} ${styles.studio} ${focusId === "studio" ? styles.focused : ""}`}
        >
          <ellipse cx="520" cy="320" rx="120" ry="72" fill="rgba(240,160,64,0.09)" />
          <rect x="460" y="290" width="55" height="40" rx="4" fill="rgba(240,160,64,0.08)" stroke="#f0a040" strokeOpacity="0.45" strokeWidth="1.2" />
          <rect x="530" y="305" width="70" height="48" rx="4" fill="rgba(240,160,64,0.1)" stroke="#f0a040" strokeOpacity="0.5" strokeWidth="1.25" />
          <circle cx="505" cy="340" r="3.5" fill="#f0a040" fillOpacity="0.8" />
        </g>

        <g
          className={`${styles.region} ${styles.businesszap} ${focusId === "businesszap" ? styles.focused : ""}`}
        >
          <ellipse cx="900" cy="290" rx="105" ry="75" fill="rgba(62,207,142,0.09)" />
          <path d="M840 270 C870 250 900 300 930 275 C960 250 980 300 990 285" stroke="#3ecf8e" strokeOpacity="0.5" strokeWidth="1.5" fill="none" className={styles.signal} />
          <circle cx="860" cy="265" r="3.5" fill="#0a1018" stroke="#3ecf8e" strokeWidth="1.2" />
          <circle cx="920" cy="280" r="4" fill="#0a1018" stroke="#3ecf8e" strokeWidth="1.3" />
          <circle cx="975" cy="290" r="3" fill="#3ecf8e" fillOpacity="0.75" />
        </g>

        {/* Circulation pulses on shared mesh — not product-to-product arrows */}
        {alive ? (
          <>
            <circle r="2.4" fill="#4d9be8" opacity="0.85">
              <animateMotion dur="11s" repeatCount="indefinite" path="M80 230 C220 140 380 140 550 230 C720 320 880 320 1020 230" />
            </circle>
            <circle r="2" fill="#8b7cf0" opacity="0.7">
              <animateMotion dur="14s" begin="2s" repeatCount="indefinite" path="M120 180 C280 240 420 120 550 200 C680 280 820 160 980 220" />
            </circle>
            <circle r="2.1" fill="#f0a040" opacity="0.65">
              <animateMotion dur="13s" begin="4s" repeatCount="indefinite" path="M140 280 C300 200 440 320 550 260 C660 200 800 300 960 250" />
            </circle>
          </>
        ) : null}
      </svg>

      {/* Hit pads for pointer focus — not boxes, invisible geometry */}
      <div className={styles.hits}>
        {ecosystemProducts.map((p) => (
          <div
            key={p.id}
            className={`${styles.hit} ${styles[`hit_${p.id}`]}`}
            data-eco-region={p.id}
          />
        ))}
      </div>

      <ul className={styles.labels}>
        {ecosystemProducts.map((p) => (
          <li
            key={p.id}
            className={`${styles.label} ${styles[`label_${p.id}`]} ${focusId === p.id ? styles.labelFocus : ""}`}
            style={{ ["--accent" as string]: p.accent }}
          >
            <span className={styles.labelName}>{p.name}</span>
            <span className={styles.labelNote}>{p.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
