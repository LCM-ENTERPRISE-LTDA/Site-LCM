"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";
import styles from "./HeroEnvironment.module.css";

type Phase = "idle" | "enter" | "join" | "settle";

type HeroEnvironmentProps = {
  phase: Phase;
  alive: boolean;
  reduced: boolean;
};

/**
 * Full-bleed visual field for ImmersiveHero.
 * No panel, no radius, no scene box — layers span the entire hero.
 */
export function HeroEnvironment({ phase, alive, reduced }: HeroEnvironmentProps) {
  const uid = useId().replace(/:/g, "");
  const gid = (name: string) => `${name}-${uid}`;

  return (
    <div
      className={cn(
        styles.env,
        styles[phase],
        alive && styles.alive,
        reduced && styles.reduced,
      )}
      aria-hidden="true"
    >
      <div className={styles.atmosphere} />
      <div className={styles.noise} />
      <div className={styles.grid} />
      <div className={styles.light} />

      {/* Background structures — incomplete planes */}
      <svg className={cn(styles.layer, styles.layerBg)} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <g className={styles.structFar} stroke="rgba(130,170,220,0.07)" fill="none" strokeWidth="1">
          <path d="M520 120 L980 40 L1380 280" strokeDasharray="4 14" />
          <path d="M640 780 L1040 860 L1440 520" strokeDasharray="3 12" />
          <path d="M420 200 L420 640" strokeDasharray="2 16" opacity="0.5" />
        </g>
        <g className={styles.structMid} stroke="rgba(130,170,220,0.09)" fill="none" strokeWidth="1">
          <path d="M700 160 L1180 220 L1260 560 L860 700 L700 160" />
          <path d="M760 280 L1100 320" strokeDasharray="6 10" />
        </g>
      </svg>

      {/* Particles */}
      <svg className={cn(styles.layer, styles.layerPart)} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <g className={styles.dustDeep} fill="rgba(170,200,235,0.35)">
          <circle className={styles.d1} cx="520" cy="210" r="1.1" />
          <circle className={styles.d2} cx="880" cy="140" r="0.9" />
          <circle className={styles.d3} cx="1180" cy="260" r="1" />
          <circle className={styles.d1} cx="980" cy="620" r="0.85" />
          <circle className={styles.d2} cx="640" cy="520" r="0.75" />
          <circle className={styles.d3} cx="1280" cy="480" r="0.8" />
          <circle className={styles.d1} cx="760" cy="340" r="0.7" />
          <circle className={styles.d2} cx="1080" cy="720" r="0.9" />
          <circle className={styles.d3} cx="460" cy="400" r="0.65" />
          <circle className={styles.d1} cx="1320" cy="160" r="0.7" />
        </g>

        {!reduced && alive ? (
          <g className={styles.packets}>
            <circle r="1.5" fill="var(--color-brand-cyan)">
              <animateMotion dur="6.2s" begin="0.3s" repeatCount="indefinite" path="M980 210 L960 380" />
              <animate attributeName="opacity" values="0;0.8;0.8;0" keyTimes="0;0.12;0.8;1" dur="6.2s" begin="0.3s" repeatCount="indefinite" />
            </circle>
            <circle r="1.3" fill="var(--color-brand)">
              <animateMotion dur="7.4s" begin="1.8s" repeatCount="indefinite" path="M960 380 L820 560" />
              <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.1;0.85;1" dur="7.4s" begin="1.8s" repeatCount="indefinite" />
            </circle>
            <circle r="1.3" fill="var(--color-brand)">
              <animateMotion dur="8.1s" begin="3.2s" repeatCount="indefinite" path="M960 380 L1180 520" />
              <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.1;0.85;1" dur="8.1s" begin="3.2s" repeatCount="indefinite" />
            </circle>
            <circle r="1.15" fill="var(--color-brand-cyan)">
              <animateMotion dur="9.2s" begin="4.6s" repeatCount="indefinite" path="M700 300 L960 380" />
              <animate attributeName="opacity" values="0;0.55;0.55;0" keyTimes="0;0.15;0.8;1" dur="9.2s" begin="4.6s" repeatCount="indefinite" />
            </circle>
          </g>
        ) : null}
      </svg>

      {/* Connections + modules + signals + core */}
      <svg className={cn(styles.layer, styles.layerMain)} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={gid("line")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-brand-cyan)" stopOpacity="0.08" />
            <stop offset="50%" stopColor="var(--color-brand)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--color-brand-cyan)" stopOpacity="0.08" />
          </linearGradient>
          <radialGradient id={gid("glow")} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
          </radialGradient>
          <filter id={gid("soft")} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
          <linearGradient id={gid("safe")} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="black" stopOpacity="0.15" />
            <stop offset="35%" stopColor="black" stopOpacity="0.55" />
            <stop offset="100%" stopColor="black" stopOpacity="1" />
          </linearGradient>
          <mask id={gid("read")}>
            <rect width="1440" height="900" fill={`url(#${gid("safe")})`} />
          </mask>
        </defs>

        <g className={styles.connections} mask={`url(#${gid("read")})`}>
          <path className={styles.channel} d="M700 300 L960 380" stroke={`url(#${gid("line")})`} strokeWidth="1.2" fill="none" />
          <path className={styles.channel} d="M980 210 L960 380" stroke={`url(#${gid("line")})`} strokeWidth="1.35" fill="none" />
          <path className={styles.channel} d="M960 380 L820 560" stroke={`url(#${gid("line")})`} strokeWidth="1.35" fill="none" />
          <path className={styles.channel} d="M960 380 L1180 520" stroke={`url(#${gid("line")})`} strokeWidth="1.35" fill="none" />
          <path className={styles.channelSecondary} d="M1180 520 L1320 420" stroke="rgba(130,170,220,0.18)" strokeWidth="1" fill="none" strokeDasharray="3 10" />
          <path className={styles.channelSecondary} d="M820 560 L680 680" stroke="rgba(130,170,220,0.14)" strokeWidth="1" fill="none" strokeDasharray="2 12" />
          <path className={styles.channelSecondary} d="M980 210 L1120 120" stroke="rgba(130,170,220,0.16)" strokeWidth="1" fill="none" strokeDasharray="4 11" />
          <path
            className={styles.channelGlow}
            d="M980 210 L960 380 M960 380 L820 560 M960 380 L1180 520 M700 300 L960 380"
            stroke="var(--color-brand)"
            strokeWidth="2.5"
            fill="none"
            filter={`url(#${gid("soft")})`}
          />
        </g>

        {/* Indirect triad modules — planes / anchors, not logo shapes */}
        <g className={cn(styles.module, styles.moduleA)}>
          <circle cx="980" cy="210" r="42" fill={`url(#${gid("glow")})`} />
          <path d="M948 190 L1012 190 L1012 232 L980 252 L948 232 Z" stroke="var(--color-brand)" strokeWidth="1.7" fill="none" strokeLinejoin="round" />
          <circle cx="980" cy="210" r="2.8" fill="var(--color-brand-cyan)" />
        </g>

        <g className={cn(styles.module, styles.moduleB)}>
          <circle cx="820" cy="560" r="36" fill={`url(#${gid("glow")})`} />
          <path d="M792 580 L820 520 L848 580" stroke="var(--color-brand-cyan)" strokeWidth="1.7" fill="none" strokeLinejoin="round" />
          <path d="M800 548 L840 548" stroke="rgba(244,247,251,0.25)" strokeWidth="1" />
          <circle cx="820" cy="560" r="2.5" fill="var(--color-brand)" />
        </g>

        <g className={cn(styles.module, styles.moduleC)}>
          <circle cx="1180" cy="520" r="36" fill={`url(#${gid("glow")})`} />
          <path d="M1152 500 L1208 500 L1180 548 Z" stroke="var(--color-brand)" strokeWidth="1.7" fill="none" strokeLinejoin="round" />
          <circle cx="1180" cy="520" r="2.5" fill="var(--color-brand-cyan)" />
        </g>

        <g className={styles.signals}>
          <circle className={styles.sigA} cx="960" cy="380" r="1.5" fill="var(--product-autohist)" />
          <circle className={styles.sigD} cx="960" cy="380" r="1.4" fill="var(--product-dyson)" />
          <circle className={styles.sigS} cx="960" cy="380" r="1.35" fill="var(--product-studio)" />
          <circle className={styles.sigB} cx="960" cy="380" r="1.4" fill="var(--product-businesszap)" />
        </g>

        <g className={styles.core}>
          <circle className={styles.coreOuter} cx="960" cy="380" r="18" stroke="rgba(47,107,255,0.2)" strokeWidth="0.9" fill="none" />
          <circle className={styles.coreRing} cx="960" cy="380" r="9" stroke="rgba(244,247,251,0.3)" strokeWidth="1.1" fill="none" />
          <circle cx="960" cy="380" r="2.8" fill="var(--color-text)" />
        </g>
      </svg>

      {/* Foreground depth */}
      <svg className={cn(styles.layer, styles.layerFg)} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="rgba(180,205,235,0.12)" strokeWidth="1">
          <path className={styles.fgLine} d="M1280 80 L1400 200" />
          <path className={styles.fgLineB} d="M110 640 L240 760" opacity="0.35" />
        </g>
        <circle className={styles.fgSpec} cx="1240" cy="300" r="1.4" fill="rgba(244,247,251,0.35)" />
        <circle className={styles.fgSpecB} cx="1080" cy="180" r="1" fill="rgba(25,184,242,0.35)" />
      </svg>

      {/* Reading veil — soft, not a card */}
      <div className={styles.readVeil} />
    </div>
  );
}
