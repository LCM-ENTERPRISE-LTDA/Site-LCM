"use client";

import { useId } from "react";
import type { TechPerspectiveId } from "@/content/technology";
import styles from "./TechArchitecture.module.css";

type Props = {
  mode: TechPerspectiveId;
  alive: boolean;
};

/** Abstract living architecture — no cliché icons. */
export function TechArchitecture({ mode, alive }: Props) {
  const uid = useId().replace(/:/g, "");
  const id = (n: string) => `${n}-${uid}`;

  return (
    <div
      className={`${styles.wrap} ${styles[mode]} ${alive ? styles.alive : ""}`}
      aria-hidden="true"
    >
      <div className={styles.glow} />
      <svg className={styles.svg} viewBox="0 0 560 480" fill="none">
        <defs>
          <linearGradient id={id("flow")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--tech-a)" stopOpacity="0" />
            <stop offset="45%" stopColor="var(--tech-a)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--tech-b)" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={id("core")} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
            <stop offset="40%" stopColor="var(--tech-a)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--tech-a)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {mode === "experiencia" ? (
          <g className={styles.scene}>
            <ellipse
              className={styles.ring}
              cx="280"
              cy="240"
              rx="190"
              ry="125"
              stroke="var(--tech-a)"
              strokeOpacity="0.12"
              strokeWidth="1"
            />
            <ellipse
              cx="280"
              cy="240"
              rx="150"
              ry="95"
              stroke="var(--tech-a)"
              strokeOpacity="0.2"
              strokeWidth="1"
            />
            <ellipse
              cx="280"
              cy="240"
              rx="105"
              ry="65"
              stroke="var(--tech-a)"
              strokeOpacity="0.3"
              strokeWidth="1.1"
            />
            <path
              id={id("p1")}
              d="M100 240 C180 180 240 180 280 240 C320 300 380 300 460 240"
              stroke={`url(#${id("flow")})`}
              strokeWidth="1.25"
              className={styles.pulsePath}
            />
            <path
              id={id("p2")}
              d="M280 90 C220 160 220 220 280 240 C340 260 340 320 280 390"
              stroke={`url(#${id("flow")})`}
              strokeWidth="1.1"
              className={styles.pulsePath}
            />
            <path
              d="M160 140 C220 180 240 220 280 240 C320 260 340 300 400 340"
              stroke="var(--tech-a)"
              strokeOpacity="0.2"
              strokeWidth="1"
            />
            <path
              d="M400 140 C340 180 320 220 280 240 C240 260 220 300 160 340"
              stroke="var(--tech-a)"
              strokeOpacity="0.2"
              strokeWidth="1"
            />
            {[
              [280, 130],
              [190, 190],
              [370, 190],
              [165, 280],
              [395, 280],
              [280, 350],
            ].map(([x, y], i) => (
              <circle
                key={i}
                className={styles.node}
                style={{ ["--i" as string]: i }}
                cx={x}
                cy={y}
                r="4.2"
                fill="#0a1018"
                stroke="var(--tech-a)"
                strokeWidth="1.3"
              />
            ))}
            <circle cx="280" cy="240" r="52" fill={`url(#${id("core")})`} className={styles.core} />
            <circle cx="280" cy="240" r="4.5" fill="var(--tech-a)" />
            {alive ? (
              <>
                <circle r="2.2" fill="var(--tech-a)" opacity="0.85">
                  <animateMotion dur="7s" repeatCount="indefinite" path="M100 240 C180 180 240 180 280 240 C320 300 380 300 460 240" />
                </circle>
                <circle r="1.8" fill="var(--tech-b)" opacity="0.7">
                  <animateMotion dur="9s" begin="1.5s" repeatCount="indefinite" path="M280 90 C220 160 220 220 280 240 C340 260 340 320 280 390" />
                </circle>
              </>
            ) : null}
          </g>
        ) : null}

        {mode === "sistemas" ? (
          <g className={styles.scene}>
            {[
              [70, 85, 115, 68],
              [220, 65, 135, 78],
              [390, 95, 105, 62],
              [90, 200, 125, 72],
              [255, 190, 145, 82],
              [435, 220, 88, 58],
              [125, 330, 155, 68],
              [325, 320, 135, 72],
            ].map(([x, y, w, h], i) => (
              <rect
                key={i}
                className={styles.module}
                style={{ ["--i" as string]: i }}
                x={x}
                y={y}
                width={w}
                height={h}
                rx="4"
                fill="rgba(47,107,255,0.045)"
                stroke={i % 3 === 0 ? "var(--tech-b)" : "var(--tech-a)"}
                strokeOpacity="0.42"
                strokeWidth="1.15"
              />
            ))}
            <path
              d="M127 153 V200 M287 143 V190 M442 157 V220 M152 272 V330 M327 272 V320"
              stroke={`url(#${id("flow")})`}
              strokeWidth="1.2"
              className={styles.pulsePath}
            />
            <path
              d="M185 236 H255 M400 249 H435 M215 364 H325"
              stroke="var(--tech-b)"
              strokeOpacity="0.35"
              strokeWidth="1"
              className={styles.pulsePath}
            />
            {[
              [127, 153],
              [287, 143],
              [442, 157],
              [327, 272],
              [215, 364],
            ].map(([x, y], i) => (
              <circle
                key={i}
                className={styles.node}
                style={{ ["--i" as string]: i }}
                cx={x}
                cy={y}
                r="3.2"
                fill="#0a1018"
                stroke="var(--tech-b)"
                strokeWidth="1.1"
              />
            ))}
            {alive ? (
              <circle r="2" fill="var(--tech-b)" opacity="0.8">
                <animateMotion dur="8s" repeatCount="indefinite" path="M127 153 L127 200 L185 236 L255 236 L287 190" />
              </circle>
            ) : null}
          </g>
        ) : null}

        {mode === "ia" ? (
          <g className={styles.scene}>
            <circle
              cx="280"
              cy="240"
              r="145"
              stroke="var(--tech-a)"
              strokeOpacity="0.1"
              strokeWidth="1"
            />
            <circle
              cx="280"
              cy="240"
              r="118"
              stroke="var(--tech-a)"
              strokeOpacity="0.16"
              strokeWidth="1"
              strokeDasharray="3 11"
              className={styles.orbit}
            />
            <circle
              cx="280"
              cy="240"
              r="82"
              stroke="var(--tech-a)"
              strokeOpacity="0.28"
              strokeWidth="1.1"
              className={styles.orbitRev}
            />
            <circle cx="280" cy="240" r="64" fill={`url(#${id("core")})`} className={styles.core} />
            {[
              [280, 100],
              [385, 155],
              [410, 285],
              [305, 380],
              [160, 345],
              [130, 200],
              [210, 140],
              [360, 330],
              [200, 300],
              [355, 200],
            ].map(([x, y], i) => (
              <g key={i}>
                <path
                  d={`M280 240 Q${(280 + x) / 2 + (i % 2 ? 18 : -18)} ${(240 + y) / 2} ${x} ${y}`}
                  stroke="var(--tech-a)"
                  strokeOpacity="0.26"
                  strokeWidth="1"
                  className={styles.pulsePath}
                />
                <circle
                  className={styles.node}
                  style={{ ["--i" as string]: i }}
                  cx={x}
                  cy={y}
                  r="3.6"
                  fill="#0a1018"
                  stroke="var(--tech-b)"
                  strokeWidth="1.15"
                />
              </g>
            ))}
            <circle cx="280" cy="240" r="7" fill="var(--tech-a)" />
            <circle cx="280" cy="240" r="2.4" fill="#fff" opacity="0.85" />
            {alive ? (
              <circle r="2.1" fill="var(--tech-b)" opacity="0.75">
                <animateMotion
                  dur="10s"
                  repeatCount="indefinite"
                  path="M280 100 Q320 170 280 240 Q240 310 305 380"
                />
              </circle>
            ) : null}
          </g>
        ) : null}
      </svg>
    </div>
  );
}
