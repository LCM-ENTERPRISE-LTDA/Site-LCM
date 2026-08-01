"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";
import styles from "./HeroArtComposition.module.css";

type Props = {
  phase: "idle" | "enter" | "ready";
  alive: boolean;
  reduced: boolean;
};

/**
 * Single memorable visual object spanning the Hero width.
 * Abstract construction field — not the LCM logo, not scattered triad modules.
 */
export function HeroArtComposition({ phase, alive, reduced }: Props) {
  const uid = useId().replace(/:/g, "");
  const id = (n: string) => `${n}-${uid}`;

  return (
    <div
      className={cn(
        styles.art,
        styles[phase],
        alive && styles.alive,
        reduced && styles.reduced,
      )}
      aria-hidden="true"
    >
      {/* Far layer */}
      <div className={styles.far}>
        <div className={styles.glowA} />
        <div className={styles.glowB} />
        <div className={styles.haze} />
      </div>

      {/* Mid layer — full-width structural ribbons */}
      <svg className={styles.mid} viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" fill="none">
        <path
          className={styles.ribbon}
          d="M-40 210 C 280 120, 520 280, 760 200 S 1200 80, 1480 160"
          stroke="rgba(130,170,220,0.14)"
          strokeWidth="1.2"
        />
        <path
          className={styles.ribbonB}
          d="M-60 520 C 260 610, 540 440, 820 560 S 1180 680, 1500 540"
          stroke="rgba(47,107,255,0.12)"
          strokeWidth="1.4"
        />
        <path
          className={styles.ribbonC}
          d="M100 740 L420 620 L780 700 L1100 580 L1400 660"
          stroke="rgba(130,170,220,0.08)"
          strokeWidth="1"
          strokeDasharray="6 14"
        />
      </svg>

      {/* Main object — one composition with internal tensions */}
      <svg className={styles.main} viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <linearGradient id={id("beam")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#25B4E8" stopOpacity="0" />
            <stop offset="45%" stopColor="#2F6BFF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#25B4E8" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={id("core")} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(243,246,250,0.28)" />
            <stop offset="40%" stopColor="rgba(47,107,255,0.22)" />
            <stop offset="100%" stopColor="rgba(47,107,255,0)" />
          </radialGradient>
          <linearGradient id={id("plane")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(47,107,255,0.18)" />
            <stop offset="100%" stopColor="rgba(37,180,232,0.04)" />
          </linearGradient>
          <filter id={id("soft")} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
        </defs>

        {/* Translucent planes — unified structure */}
        <g className={styles.planes}>
          <path
            d="M520 250 L760 170 L980 250 L900 390 L600 390 Z"
            fill={`url(#${id("plane")})`}
            stroke="rgba(180,205,235,0.22)"
            strokeWidth="1.2"
          />
          <path
            d="M580 310 L860 250 L940 360 L700 430 Z"
            fill="rgba(18,23,32,0.35)"
            stroke="rgba(47,107,255,0.35)"
            strokeWidth="1.3"
          />
          <path
            d="M640 200 L820 200 L820 280 L640 280 Z"
            fill="rgba(47,107,255,0.08)"
            stroke="rgba(37,180,232,0.3)"
            strokeWidth="1"
          />
        </g>

        {/* Internal force lines — three tensions inside one object */}
        <g className={styles.forces}>
          <path className={styles.force} d="M720 220 L720 400" stroke={`url(#${id("beam")})`} strokeWidth="1.5" />
          <path className={styles.force} d="M620 360 L820 280" stroke={`url(#${id("beam")})`} strokeWidth="1.35" />
          <path className={styles.force} d="M620 280 L820 360" stroke={`url(#${id("beam")})`} strokeWidth="1.35" />
          <path
            className={styles.forceGlow}
            d="M720 220 L720 400 M620 360 L820 280 M620 280 L820 360"
            stroke="#2F6BFF"
            strokeWidth="3"
            filter={`url(#${id("soft")})`}
          />
        </g>

        {/* Anchor nodes */}
        <g className={styles.nodes}>
          <circle cx="720" cy="220" r="4" fill="#25B4E8" />
          <circle cx="620" cy="360" r="3.5" fill="#2F6BFF" />
          <circle cx="820" cy="360" r="3.5" fill="#2F6BFF" />
          <circle cx="720" cy="310" r="56" fill={`url(#${id("core")})`} />
          <circle cx="720" cy="310" r="11" stroke="rgba(243,246,250,0.35)" strokeWidth="1.1" />
          <circle cx="720" cy="310" r="3.2" fill="#F3F6FA" />
        </g>

        {/* Side extensions — enter from edges, clipped by viewport */}
        <g className={styles.extensions} stroke="rgba(130,170,220,0.16)" strokeWidth="1">
          <path d="M-20 300 C 180 260, 320 340, 520 280" strokeDasharray="4 12" />
          <path d="M920 340 C 1100 280, 1260 360, 1460 300" strokeDasharray="4 12" />
          <path d="M40 480 C 220 520, 400 460, 560 500" opacity="0.7" />
          <path d="M880 480 C 1060 520, 1240 450, 1420 510" opacity="0.7" />
        </g>

        {!reduced && alive ? (
          <g className={styles.packets}>
            <circle r="1.5" fill="#25B4E8">
              <animateMotion dur="6s" begin="0.4s" repeatCount="indefinite" path="M720 220 L720 400" />
              <animate attributeName="opacity" values="0;0.8;0.8;0" keyTimes="0;0.12;0.8;1" dur="6s" begin="0.4s" repeatCount="indefinite" />
            </circle>
            <circle r="1.3" fill="#2F6BFF">
              <animateMotion dur="7.2s" begin="2s" repeatCount="indefinite" path="M620 360 L820 280" />
              <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.1;0.85;1" dur="7.2s" begin="2s" repeatCount="indefinite" />
            </circle>
            <circle r="1.3" fill="#2F6BFF">
              <animateMotion dur="7.8s" begin="3.6s" repeatCount="indefinite" path="M620 280 L820 360" />
              <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.1;0.85;1" dur="7.8s" begin="3.6s" repeatCount="indefinite" />
            </circle>
          </g>
        ) : null}
      </svg>

      {/* Near accents */}
      <svg className={styles.near} viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" fill="none">
        <circle className={styles.spec} cx="1080" cy="200" r="1.4" fill="rgba(243,246,250,0.4)" />
        <circle className={styles.specB} cx="320" cy="560" r="1.1" fill="rgba(37,180,232,0.35)" />
        <circle className={styles.spec} cx="1260" cy="480" r="1" fill="rgba(243,246,250,0.28)" />
        <path className={styles.nearStroke} d="M1180 140 L1320 220" stroke="rgba(180,205,235,0.18)" strokeWidth="1" />
        <path className={styles.nearStrokeB} d="M120 620 L240 700" stroke="rgba(47,107,255,0.16)" strokeWidth="1" />
      </svg>

      <div className={styles.readSafe} />
    </div>
  );
}
