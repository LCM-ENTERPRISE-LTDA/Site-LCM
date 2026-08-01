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
 * V3.2 — same construction, premium finish.
 * Depth, materials and nucleus presence — no new forms or effects.
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

      <svg className={styles.mid} viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" fill="none">
        <path
          className={styles.ribbon}
          d="M-60 255 C 380 175, 660 290, 940 220 S 1300 145, 1520 200"
          stroke="rgba(130,170,220,0.05)"
          strokeWidth="0.7"
        />
      </svg>

      <svg className={styles.main} viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <linearGradient id={id("beam")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#25B4E8" stopOpacity="0" />
            <stop offset="36%" stopColor="#2F6BFF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#25B4E8" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={id("core")} cx="46%" cy="44%" r="54%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="14%" stopColor="rgba(220,232,255,0.28)" />
            <stop offset="36%" stopColor="rgba(47,107,255,0.2)" />
            <stop offset="62%" stopColor="rgba(37,180,232,0.05)" />
            <stop offset="100%" stopColor="rgba(13,17,24,0)" />
          </radialGradient>
          <radialGradient id={id("coreHalo")} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(47,107,255,0.18)" />
            <stop offset="45%" stopColor="rgba(37,180,232,0.05)" />
            <stop offset="100%" stopColor="rgba(13,17,24,0)" />
          </radialGradient>
          <linearGradient id={id("plateFar")} x1="0.1" y1="0" x2="0.9" y2="1">
            <stop offset="0%" stopColor="rgba(40,78,150,0.32)" />
            <stop offset="38%" stopColor="rgba(8,12,20,0.78)" />
            <stop offset="100%" stopColor="rgba(18,42,88,0.28)" />
          </linearGradient>
          <linearGradient id={id("plateMid")} x1="0.18" y1="0" x2="0.88" y2="1">
            <stop offset="0%" stopColor="rgba(70,120,210,0.16)" />
            <stop offset="28%" stopColor="rgba(6,10,18,0.85)" />
            <stop offset="72%" stopColor="rgba(12,28,55,0.55)" />
            <stop offset="100%" stopColor="rgba(37,180,232,0.12)" />
          </linearGradient>
          <linearGradient id={id("plateNear")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="40%" stopColor="rgba(47,107,255,0.12)" />
            <stop offset="100%" stopColor="rgba(6,10,18,0.5)" />
          </linearGradient>
          <linearGradient id={id("rim")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(230,240,255,0.55)" />
            <stop offset="40%" stopColor="rgba(47,107,255,0.35)" />
            <stop offset="100%" stopColor="rgba(37,180,232,0.18)" />
          </linearGradient>
          <linearGradient id={id("rimFar")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(160,190,230,0.28)" />
            <stop offset="100%" stopColor="rgba(47,107,255,0.12)" />
          </linearGradient>
          <linearGradient id={id("spec")} x1="0.35" y1="0.15" x2="0.7" y2="0.85">
            <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(47,107,255,0.06)" />
          </linearGradient>
          <filter id={id("soft")} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.15" />
          </filter>
        </defs>

        <ellipse
          className={styles.cast}
          cx="720"
          cy="418"
          rx="128"
          ry="20"
          fill="rgba(0,0,0,0.45)"
          filter={`url(#${id("soft")})`}
        />

        {/* Far plate */}
        <g className={styles.planeFar}>
          <path
            d="M542 265 L720 165 L898 265 L832 415 L608 415 Z"
            fill={`url(#${id("plateFar")})`}
            stroke={`url(#${id("rimFar")})`}
            strokeWidth="1.15"
          />
          <path
            d="M568 282 L720 198 L872 282"
            stroke="rgba(210,225,245,0.14)"
            strokeWidth="0.75"
            fill="none"
          />
        </g>

        {/* Mid plate — primary engineered surface */}
        <g className={styles.planeMid}>
          <path
            d="M588 295 L788 228 L872 340 L716 408 L572 350 Z"
            fill={`url(#${id("plateMid")})`}
            stroke={`url(#${id("rim")})`}
            strokeWidth="1.25"
          />
          <path
            d="M588 295 L788 228 L872 340 L716 408 L572 350 Z"
            fill={`url(#${id("spec")})`}
          />
          <path
            d="M612 310 L768 262 L838 342 L712 386 L602 342 Z"
            fill="none"
            stroke="rgba(37,180,232,0.12)"
            strokeWidth="0.7"
          />
        </g>

        {/* Near plate */}
        <g className={styles.planeNear}>
          <rect
            x="650"
            y="244"
            width="140"
            height="50"
            rx="2"
            fill={`url(#${id("plateNear")})`}
            stroke="rgba(230,240,255,0.38)"
            strokeWidth="0.95"
            transform="rotate(-7.5 720 269)"
          />
          <line
            x1="666"
            y1="256"
            x2="794"
            y2="256"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.65"
            transform="rotate(-7.5 720 269)"
          />
        </g>

        <g className={styles.forces}>
          <path className={styles.force} d="M720 212 L720 398" stroke={`url(#${id("beam")})`} strokeWidth="1.2" />
          <path className={styles.force} d="M628 355 L812 265" stroke={`url(#${id("beam")})`} strokeWidth="1.05" />
          <path className={styles.force} d="M628 275 L812 355" stroke={`url(#${id("beam")})`} strokeWidth="1.05" />
          <path
            className={styles.forceGlow}
            d="M720 212 L720 398 M628 355 L812 265 M628 275 L812 355"
            stroke="#2F6BFF"
            strokeWidth="2.1"
            filter={`url(#${id("soft")})`}
          />
        </g>

        <g className={styles.nodes}>
          <circle className={styles.coreHalo} cx="720" cy="308" r="98" fill={`url(#${id("coreHalo")})`} />
          <circle className={styles.coreBloom} cx="720" cy="308" r="56" fill={`url(#${id("core")})`} />
          <circle cx="720" cy="212" r="2.5" fill="#25B4E8" opacity="0.92" />
          <circle cx="628" cy="355" r="2.1" fill="#2F6BFF" opacity="0.85" />
          <circle cx="812" cy="355" r="2.1" fill="#2F6BFF" opacity="0.85" />
          <circle cx="720" cy="308" r="13" stroke="rgba(243,246,250,0.18)" strokeWidth="0.85" fill="none" />
          <circle cx="720" cy="308" r="6.5" stroke="rgba(47,107,255,0.4)" strokeWidth="0.75" fill="rgba(8,12,20,0.4)" />
          <circle cx="720" cy="308" r="2.35" fill="#FFFFFF" />
        </g>

        {!reduced && alive ? (
          <g className={styles.packets}>
            <circle r="1.15" fill="#25B4E8">
              <animateMotion dur="7.8s" begin="0.8s" repeatCount="indefinite" path="M720 212 L720 398" />
              <animate attributeName="opacity" values="0;0.65;0.65;0" keyTimes="0;0.15;0.8;1" dur="7.8s" begin="0.8s" repeatCount="indefinite" />
            </circle>
            <circle r="1" fill="#2F6BFF">
              <animateMotion dur="9s" begin="3.2s" repeatCount="indefinite" path="M628 355 L812 265" />
              <animate attributeName="opacity" values="0;0.5;0.5;0" keyTimes="0;0.12;0.85;1" dur="9s" begin="3.2s" repeatCount="indefinite" />
            </circle>
          </g>
        ) : null}
      </svg>

      <svg className={styles.near} viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" fill="none">
        <circle className={styles.spec} cx="1140" cy="200" r="1" fill="rgba(243,246,250,0.26)" />
      </svg>

      <div className={styles.readSafe} />
    </div>
  );
}
