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
 * Refined V3.1 art — same concept, tighter craft.
 * One structure with layered depth; peripheral lines support, never compete.
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
      <div className={styles.far}>
        <div className={styles.glowCore} />
        <div className={styles.glowSoft} />
        <div className={styles.haze} />
      </div>

      {/* Mid — fewer, longer, quieter ribbons */}
      <svg className={styles.mid} viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" fill="none">
        <path
          className={styles.ribbon}
          d="M-80 240 C 360 160, 640 300, 920 230 S 1280 150, 1520 210"
          stroke="rgba(130,170,220,0.07)"
          strokeWidth="0.9"
        />
        <path
          className={styles.ribbonB}
          d="M-40 560 C 400 500, 720 620, 1040 540 S 1360 480, 1500 520"
          stroke="rgba(47,107,255,0.06)"
          strokeWidth="0.85"
        />
      </svg>

      <svg className={styles.main} viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <linearGradient id={id("beam")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#25B4E8" stopOpacity="0" />
            <stop offset="40%" stopColor="#2F6BFF" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#25B4E8" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={id("core")} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(243,246,250,0.34)" />
            <stop offset="28%" stopColor="rgba(47,107,255,0.2)" />
            <stop offset="62%" stopColor="rgba(37,180,232,0.06)" />
            <stop offset="100%" stopColor="rgba(47,107,255,0)" />
          </radialGradient>
          <linearGradient id={id("plate")} x1="0.15" y1="0" x2="0.9" y2="1">
            <stop offset="0%" stopColor="rgba(47,107,255,0.14)" />
            <stop offset="55%" stopColor="rgba(18,23,32,0.45)" />
            <stop offset="100%" stopColor="rgba(37,180,232,0.05)" />
          </linearGradient>
          <linearGradient id={id("rim")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(180,205,235,0.28)" />
            <stop offset="100%" stopColor="rgba(47,107,255,0.12)" />
          </linearGradient>
          <filter id={id("soft")} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        {/* Quiet side leads into the object — not decorative waves */}
        <g className={styles.leads} stroke="rgba(130,170,220,0.1)" strokeWidth="0.8">
          <path d="M40 330 C 220 300, 380 350, 540 320" />
          <path d="M900 340 C 1080 300, 1260 350, 1420 320" />
        </g>

        {/* Unified structure: back plate → mid plate → rim → core */}
        <g className={styles.planeFar}>
          <path
            d="M560 270 L720 185 L880 270 L820 395 L620 395 Z"
            fill={`url(#${id("plate")})`}
            stroke={`url(#${id("rim")})`}
            strokeWidth="1"
            opacity="0.85"
          />
        </g>

        <g className={styles.planeMid}>
          <path
            d="M600 295 L780 235 L860 330 L720 390 L580 345 Z"
            fill="rgba(13,17,24,0.42)"
            stroke="rgba(47,107,255,0.28)"
            strokeWidth="1.05"
          />
        </g>

        <g className={styles.planeNear}>
          <rect
            x="655"
            y="248"
            width="130"
            height="52"
            rx="3"
            fill="rgba(47,107,255,0.06)"
            stroke="rgba(37,180,232,0.22)"
            strokeWidth="0.9"
            transform="rotate(-8 720 274)"
          />
        </g>

        <g className={styles.forces}>
          <path className={styles.force} d="M720 228 L720 378" stroke={`url(#${id("beam")})`} strokeWidth="1.25" />
          <path className={styles.force} d="M640 345 L800 275" stroke={`url(#${id("beam")})`} strokeWidth="1.1" />
          <path className={styles.force} d="M640 285 L800 345" stroke={`url(#${id("beam")})`} strokeWidth="1.1" />
          <path
            className={styles.forceGlow}
            d="M720 228 L720 378 M640 345 L800 275 M640 285 L800 345"
            stroke="#2F6BFF"
            strokeWidth="2.2"
            filter={`url(#${id("soft")})`}
          />
        </g>

        <g className={styles.nodes}>
          <circle className={styles.coreBloom} cx="720" cy="305" r="64" fill={`url(#${id("core")})`} />
          <circle cx="720" cy="228" r="2.6" fill="#25B4E8" opacity="0.85" />
          <circle cx="640" cy="345" r="2.2" fill="#2F6BFF" opacity="0.75" />
          <circle cx="800" cy="345" r="2.2" fill="#2F6BFF" opacity="0.75" />
          <circle cx="720" cy="305" r="9" stroke="rgba(243,246,250,0.28)" strokeWidth="1" />
          <circle cx="720" cy="305" r="2.6" fill="#F3F6FA" />
        </g>

        {!reduced && alive ? (
          <g className={styles.packets}>
            <circle r="1.25" fill="#25B4E8">
              <animateMotion dur="7.2s" begin="0.6s" repeatCount="indefinite" path="M720 228 L720 378" />
              <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.15;0.8;1" dur="7.2s" begin="0.6s" repeatCount="indefinite" />
            </circle>
            <circle r="1.1" fill="#2F6BFF">
              <animateMotion dur="8.4s" begin="2.8s" repeatCount="indefinite" path="M640 345 L800 275" />
              <animate attributeName="opacity" values="0;0.55;0.55;0" keyTimes="0;0.12;0.85;1" dur="8.4s" begin="2.8s" repeatCount="indefinite" />
            </circle>
          </g>
        ) : null}
      </svg>

      <svg className={styles.near} viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" fill="none">
        <circle className={styles.spec} cx="1120" cy="210" r="1.1" fill="rgba(243,246,250,0.32)" />
        <circle className={styles.specB} cx="300" cy="540" r="0.9" fill="rgba(37,180,232,0.28)" />
      </svg>

      <div className={styles.readSafe} />
    </div>
  );
}
