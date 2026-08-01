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
 * Living composition — orbital structure around a controlled nucleus.
 * One object, not a pile of polygons. Motion spread across the field.
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

      {/* Field ribbons — guide the eye, gentle drift */}
      <svg className={styles.mid} viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" fill="none">
        <path
          className={styles.ribbon}
          d="M-80 220 C 320 140, 580 280, 900 200 S 1240 120, 1520 180"
          stroke="rgba(130,170,220,0.11)"
          strokeWidth="1"
        />
        <path
          className={styles.ribbonB}
          d="M-40 520 C 360 460, 700 580, 1040 500 S 1340 440, 1520 480"
          stroke="rgba(47,107,255,0.09)"
          strokeWidth="0.9"
        />
        <path
          className={styles.ribbonC}
          d="M200 680 C 480 620, 760 700, 1100 640"
          stroke="rgba(37,180,232,0.06)"
          strokeWidth="0.75"
        />
      </svg>

      <svg className={styles.main} viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <linearGradient id={id("beam")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#25B4E8" stopOpacity="0" />
            <stop offset="45%" stopColor="#2F6BFF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#25B4E8" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={id("core")} cx="48%" cy="46%" r="52%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="16%" stopColor="rgba(200,220,255,0.35)" />
            <stop offset="40%" stopColor="rgba(47,107,255,0.28)" />
            <stop offset="70%" stopColor="rgba(37,180,232,0.08)" />
            <stop offset="100%" stopColor="rgba(13,17,24,0)" />
          </radialGradient>
          <radialGradient id={id("coreHalo")} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(47,107,255,0.28)" />
            <stop offset="40%" stopColor="rgba(37,180,232,0.1)" />
            <stop offset="100%" stopColor="rgba(13,17,24,0)" />
          </radialGradient>
          <linearGradient id={id("ring")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(210,230,255,0.45)" />
            <stop offset="50%" stopColor="rgba(47,107,255,0.22)" />
            <stop offset="100%" stopColor="rgba(37,180,232,0.08)" />
          </linearGradient>
          <filter id={id("soft")} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        {/* Orbital structure — arcs, not stacked polygons */}
        <g className={styles.orbitFar}>
          <ellipse
            cx="720"
            cy="310"
            rx="210"
            ry="128"
            stroke="rgba(160,195,240,0.22)"
            strokeWidth="1.15"
            fill="none"
            transform="rotate(-18 720 310)"
          />
          <ellipse
            cx="720"
            cy="310"
            rx="168"
            ry="98"
            stroke={`url(#${id("ring")})`}
            strokeWidth="1.35"
            fill="none"
            strokeDasharray="5 9"
            transform="rotate(12 720 310)"
          />
        </g>

        <g className={styles.orbitMid}>
          <ellipse
            cx="720"
            cy="310"
            rx="118"
            ry="72"
            stroke="rgba(47,107,255,0.42)"
            strokeWidth="1.4"
            fill="rgba(47,107,255,0.055)"
            transform="rotate(-8 720 310)"
          />
          {/* Triad spokes — engineering, not shapes piled up */}
          <path
            className={styles.spoke}
            d="M720 310 L720 198"
            stroke={`url(#${id("beam")})`}
            strokeWidth="1.2"
          />
          <path
            className={styles.spoke}
            d="M720 310 L618 368"
            stroke={`url(#${id("beam")})`}
            strokeWidth="1.1"
          />
          <path
            className={styles.spoke}
            d="M720 310 L822 368"
            stroke={`url(#${id("beam")})`}
            strokeWidth="1.1"
          />
          <path
            className={styles.spokeGlow}
            d="M720 310 L720 198 M720 310 L618 368 M720 310 L822 368"
            stroke="#2F6BFF"
            strokeWidth="2.4"
            filter={`url(#${id("soft")})`}
            opacity="0.12"
          />
        </g>

        <g className={styles.orbitNear}>
          <ellipse
            cx="720"
            cy="310"
            rx="52"
            ry="52"
            stroke="rgba(243,246,250,0.2)"
            strokeWidth="0.9"
            fill="none"
          />
          <circle cx="720" cy="198" r="3" fill="#25B4E8" opacity="0.95" />
          <circle cx="618" cy="368" r="2.6" fill="#2F6BFF" opacity="0.9" />
          <circle cx="822" cy="368" r="2.6" fill="#2F6BFF" opacity="0.9" />
          {/* Orbital satellites */}
          <circle className={styles.satA} cx="890" cy="250" r="2" fill="rgba(37,180,232,0.75)" />
          <circle className={styles.satB} cx="560" cy="280" r="1.6" fill="rgba(130,170,220,0.65)" />
        </g>

        <g className={styles.nodes}>
          <circle className={styles.coreHalo} cx="720" cy="310" r="110" fill={`url(#${id("coreHalo")})`} />
          <circle className={styles.coreBloom} cx="720" cy="310" r="64" fill={`url(#${id("core")})`} />
          <circle cx="720" cy="310" r="14" stroke="rgba(243,246,250,0.22)" strokeWidth="1" fill="none" />
          <circle cx="720" cy="310" r="7" stroke="rgba(47,107,255,0.45)" strokeWidth="0.85" fill="rgba(10,14,22,0.35)" />
          <circle cx="720" cy="310" r="2.6" fill="#FFFFFF" />
        </g>

        {!reduced && alive ? (
          <g className={styles.packets}>
            <circle r="1.4" fill="#25B4E8">
              <animateMotion dur="6.5s" begin="0.4s" repeatCount="indefinite" path="M720 198 L720 310" />
              <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.12;0.8;1" dur="6.5s" begin="0.4s" repeatCount="indefinite" />
            </circle>
            <circle r="1.2" fill="#2F6BFF">
              <animateMotion dur="7.8s" begin="1.8s" repeatCount="indefinite" path="M618 368 L720 310" />
              <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.12;0.82;1" dur="7.8s" begin="1.8s" repeatCount="indefinite" />
            </circle>
            <circle r="1.15" fill="#25B4E8">
              <animateMotion dur="8.5s" begin="3.4s" repeatCount="indefinite" path="M822 368 L720 310" />
              <animate attributeName="opacity" values="0;0.65;0.65;0" keyTimes="0;0.12;0.85;1" dur="8.5s" begin="3.4s" repeatCount="indefinite" />
            </circle>
          </g>
        ) : null}
      </svg>

      <svg className={styles.near} viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" fill="none">
        <circle className={styles.spec} cx="1180" cy="180" r="1.3" fill="rgba(243,246,250,0.4)" />
        <circle className={styles.specB} cx="260" cy="560" r="1.1" fill="rgba(37,180,232,0.35)" />
        <circle className={styles.specC} cx="1080" cy="520" r="0.9" fill="rgba(47,107,255,0.3)" />
      </svg>

      <div className={styles.readSafe} />
    </div>
  );
}
