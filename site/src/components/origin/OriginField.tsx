"use client";

import styles from "./OriginField.module.css";

type Props = {
  alive: boolean;
};

/**
 * Single visual protagonist — refined nucleus, not a diagram.
 * aria-hidden: copy lives in HTML outside this field.
 */
export function OriginField({ alive }: Props) {
  return (
    <div
      className={`${styles.field} ${alive ? styles.alive : ""}`}
      aria-hidden="true"
    >
      <div className={styles.depthGlow} />
      <div className={styles.haze} />

      <svg className={styles.svg} viewBox="0 0 720 420" fill="none">
        <defs>
          <radialGradient id="ov-core" cx="50%" cy="48%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="35%" stopColor="rgba(47,107,255,0.16)" />
            <stop offset="100%" stopColor="rgba(47,107,255,0)" />
          </radialGradient>
          <linearGradient id="ov-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4d9be8" stopOpacity="0" />
            <stop offset="40%" stopColor="#4d9be8" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#2f6bff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#2f6bff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Architectural planes — nearly invisible structure */}
        <g className={styles.planes}>
          <rect
            x="210"
            y="130"
            width="300"
            height="160"
            rx="10"
            fill="rgba(12,18,32,0.35)"
            stroke="rgba(130,170,220,0.1)"
            strokeWidth="1"
          />
          <rect
            x="250"
            y="155"
            width="220"
            height="110"
            rx="8"
            fill="rgba(12,18,32,0.28)"
            stroke="rgba(130,170,220,0.08)"
            strokeWidth="1"
          />
        </g>

        {/* Nucleus — permanent origin */}
        <g className={styles.nucleus}>
          <ellipse cx="360" cy="210" rx="150" ry="95" fill="url(#ov-core)" />
          <ellipse
            cx="360"
            cy="210"
            rx="118"
            ry="72"
            stroke="url(#ov-ring)"
            strokeWidth="1.15"
            className={styles.ring}
          />
          <ellipse
            cx="360"
            cy="210"
            rx="78"
            ry="46"
            stroke="rgba(77,155,232,0.28)"
            strokeWidth="1"
            className={styles.ringInner}
          />
          <circle
            cx="360"
            cy="210"
            r="4.5"
            fill="rgba(255,255,255,0.55)"
            className={styles.core}
          />
          {/* Fine architectural lines */}
          <path
            d="M220 210 H500"
            stroke="rgba(130,170,220,0.14)"
            strokeWidth="0.8"
          />
          <path
            d="M360 130 V290"
            stroke="rgba(130,170,220,0.1)"
            strokeWidth="0.8"
          />
        </g>

        {/* Discrete dust — sparse */}
        {alive ? (
          <g className={styles.dust}>
            <circle cx="280" cy="160" r="1.1" fill="#4d9be8" opacity="0.35">
              <animate
                attributeName="opacity"
                values="0.15;0.4;0.15"
                dur="9s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="430" cy="250" r="0.9" fill="#2f6bff" opacity="0.3">
              <animate
                attributeName="opacity"
                values="0.1;0.35;0.1"
                dur="11s"
                begin="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="390" cy="175" r="0.8" fill="#c8d8f0" opacity="0.25">
              <animate
                attributeName="opacity"
                values="0.08;0.3;0.08"
                dur="13s"
                begin="4s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ) : (
          <g className={styles.dust}>
            <circle cx="280" cy="160" r="1.1" fill="#4d9be8" opacity="0.25" />
            <circle cx="430" cy="250" r="0.9" fill="#2f6bff" opacity="0.2" />
            <circle cx="390" cy="175" r="0.8" fill="#c8d8f0" opacity="0.18" />
          </g>
        )}
      </svg>
    </div>
  );
}
