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
 * Continuous environment with a clear visual gravity center (center-right).
 * Structure stays concentrated; only ambient energy radiates outward.
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

      {/* Concentrated nucleus field — center-right, not full-width scatter */}
      <div className={styles.nucleusField}>
        <svg className={styles.nucleusSvg} viewBox="0 0 640 560" fill="none">
          <defs>
            <linearGradient id={gid("line")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-brand-cyan)" stopOpacity="0.12" />
              <stop offset="50%" stopColor="var(--color-brand)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--color-brand-cyan)" stopOpacity="0.12" />
            </linearGradient>
            <radialGradient id={gid("glow")} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.34" />
              <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={gid("coreBloom")} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(244,247,251,0.22)" />
              <stop offset="35%" stopColor="rgba(47,107,255,0.28)" />
              <stop offset="100%" stopColor="rgba(47,107,255,0)" />
            </radialGradient>
            <filter id={gid("soft")} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="1.4" />
            </filter>
          </defs>

          {/* Soft structural halo — ambient only */}
          <g className={styles.ambientRays} stroke="rgba(130,170,220,0.12)" strokeWidth="1">
            <path d="M320 260 L120 80" strokeDasharray="3 14" />
            <path d="M320 260 L560 70" strokeDasharray="4 16" />
            <path d="M320 260 L600 320" strokeDasharray="3 12" />
            <path d="M320 260 L80 380" strokeDasharray="2 14" />
            <path d="M320 260 L500 500" strokeDasharray="4 14" />
          </g>

          {/* Primary connections — triad → core */}
          <g className={styles.connections}>
            <path className={styles.channel} d="M320 118 L320 260" stroke={`url(#${gid("line")})`} strokeWidth="1.45" />
            <path className={styles.channel} d="M320 260 L198 390" stroke={`url(#${gid("line")})`} strokeWidth="1.45" />
            <path className={styles.channel} d="M320 260 L442 390" stroke={`url(#${gid("line")})`} strokeWidth="1.45" />
            {/* Implied outer triangle between modules */}
            <path
              className={styles.channelHint}
              d="M320 118 L198 390 L442 390 Z"
              stroke="rgba(130,170,220,0.14)"
              strokeWidth="1"
              strokeDasharray="5 12"
            />
            <path
              className={styles.channelGlow}
              d="M320 118 L320 260 M320 260 L198 390 M320 260 L442 390"
              stroke="var(--color-brand)"
              strokeWidth="3"
              filter={`url(#${gid("soft")})`}
            />
          </g>

          {/* Particles near nucleus */}
          <g className={styles.localDust} fill="rgba(180,210,240,0.45)">
            <circle className={styles.d1} cx="280" cy="200" r="1.1" />
            <circle className={styles.d2} cx="360" cy="180" r="0.9" />
            <circle className={styles.d3} cx="250" cy="310" r="1" />
            <circle className={styles.d1} cx="390" cy="300" r="0.85" />
            <circle className={styles.d2} cx="320" cy="340" r="0.75" />
            <circle className={styles.d3} cx="300" cy="150" r="0.7" />
            <circle className={styles.d1} cx="420" cy="240" r="0.8" />
            <circle className={styles.d2} cx="220" cy="250" r="0.7" />
          </g>

          {!reduced && alive ? (
            <g className={styles.packets}>
              <circle r="1.55" fill="var(--color-brand-cyan)">
                <animateMotion dur="5.6s" begin="0.2s" repeatCount="indefinite" path="M320 118 L320 260" />
                <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.12;0.8;1" dur="5.6s" begin="0.2s" repeatCount="indefinite" />
              </circle>
              <circle r="1.35" fill="var(--color-brand)">
                <animateMotion dur="6.8s" begin="1.6s" repeatCount="indefinite" path="M320 260 L198 390" />
                <animate attributeName="opacity" values="0;0.75;0.75;0" keyTimes="0;0.1;0.85;1" dur="6.8s" begin="1.6s" repeatCount="indefinite" />
              </circle>
              <circle r="1.35" fill="var(--color-brand)">
                <animateMotion dur="7.4s" begin="3s" repeatCount="indefinite" path="M320 260 L442 390" />
                <animate attributeName="opacity" values="0;0.75;0.75;0" keyTimes="0;0.1;0.85;1" dur="7.4s" begin="3s" repeatCount="indefinite" />
              </circle>
              <circle r="1.15" fill="var(--color-brand-cyan)">
                <animateMotion dur="8.8s" begin="4.4s" repeatCount="indefinite" path="M320 118 L320 260" />
                <animate attributeName="opacity" values="0;0.5;0.5;0" keyTimes="0;0.15;0.8;1" dur="8.8s" begin="4.4s" repeatCount="indefinite" />
              </circle>
            </g>
          ) : null}

          {/* Module top */}
          <g className={cn(styles.module, styles.moduleA)}>
            <circle cx="320" cy="118" r="38" fill={`url(#${gid("glow")})`} />
            <path
              d="M320 86 L352 118 L320 150 L288 118 Z"
              stroke="var(--color-brand)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="320" cy="118" r="3.2" fill="var(--color-brand-cyan)" />
          </g>

          {/* Module bottom-left */}
          <g className={cn(styles.module, styles.moduleB)}>
            <circle cx="198" cy="390" r="34" fill={`url(#${gid("glow")})`} />
            <path
              d="M170 414 L198 356 L226 414 Z"
              stroke="var(--color-brand-cyan)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="198" cy="390" r="2.9" fill="var(--color-brand)" />
          </g>

          {/* Module bottom-right */}
          <g className={cn(styles.module, styles.moduleC)}>
            <circle cx="442" cy="390" r="34" fill={`url(#${gid("glow")})`} />
            <path
              d="M414 414 L442 356 L470 414 Z"
              stroke="var(--color-brand)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="442" cy="390" r="2.9" fill="var(--color-brand-cyan)" />
          </g>

          {/* Product signals from core */}
          <g className={styles.signals}>
            <circle className={styles.sigA} cx="320" cy="260" r="1.5" fill="var(--product-autohist)" />
            <circle className={styles.sigD} cx="320" cy="260" r="1.4" fill="var(--product-dyson)" />
            <circle className={styles.sigS} cx="320" cy="260" r="1.35" fill="var(--product-studio)" />
            <circle className={styles.sigB} cx="320" cy="260" r="1.4" fill="var(--product-businesszap)" />
          </g>

          {/* Nucleus — gravity center */}
          <g className={styles.core}>
            <circle cx="320" cy="260" r="54" fill={`url(#${gid("coreBloom")})`} />
            <circle className={styles.coreOuter} cx="320" cy="260" r="20" stroke="rgba(47,107,255,0.28)" strokeWidth="1" />
            <circle className={styles.coreRing} cx="320" cy="260" r="10" stroke="rgba(244,247,251,0.4)" strokeWidth="1.2" />
            <circle cx="320" cy="260" r="3.2" fill="var(--color-text)" />
          </g>
        </svg>
      </div>

      {/* Sparse far ambient dust — secondary only */}
      <svg className={styles.farDust} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <g fill="rgba(160,190,230,0.28)">
          <circle className={styles.d2} cx="1080" cy="160" r="0.7" />
          <circle className={styles.d3} cx="1240" cy="420" r="0.65" />
          <circle className={styles.d1} cx="1180" cy="680" r="0.6" />
          <circle className={styles.d2} cx="900" cy="720" r="0.55" />
        </g>
      </svg>

      <div className={styles.readVeil} />
    </div>
  );
}
