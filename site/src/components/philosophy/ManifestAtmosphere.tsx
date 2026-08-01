"use client";

import { useId } from "react";
import styles from "./ManifestAtmosphere.module.css";

/**
 * Living layers behind the manifesto — haze, current, dust, breath.
 * Purely decorative. Energy colors = philosophy continuum, not product labels.
 */
export function ManifestAtmosphere({ alive }: { alive: boolean }) {
  const uid = useId().replace(/:/g, "");
  const id = (n: string) => `${n}-${uid}`;

  return (
    <div className={`${styles.layers} ${alive ? styles.alive : ""}`} aria-hidden="true">
      <div className={styles.farHaze} />
      <div className={styles.volumeA} />
      <div className={styles.volumeB} />

      <svg className={styles.current} viewBox="0 0 100 1400" preserveAspectRatio="none">
        <defs>
          <linearGradient id={id("flow")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4d9be8" stopOpacity="0" />
            <stop offset="12%" stopColor="#4d9be8" stopOpacity="0.45" />
            <stop offset="32%" stopColor="#6b8ef0" stopOpacity="0.4" />
            <stop offset="48%" stopColor="#8b7cf0" stopOpacity="0.42" />
            <stop offset="64%" stopColor="#c49270" stopOpacity="0.38" />
            <stop offset="78%" stopColor="#f0a040" stopOpacity="0.36" />
            <stop offset="90%" stopColor="#2fbf86" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2fbf86" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={id("soft")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2f6bff" stopOpacity="0" />
            <stop offset="20%" stopColor="#4d9be8" stopOpacity="0.18" />
            <stop offset="45%" stopColor="#8b7cf0" stopOpacity="0.16" />
            <stop offset="70%" stopColor="#f0a040" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#2fbf86" stopOpacity="0" />
          </linearGradient>
          <filter id={id("blur")} x="-40%" y="-5%" width="180%" height="110%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <path
          className={styles.currentGlow}
          d="M52 0 C 38 180, 68 320, 46 480 S 70 720, 48 900 S 62 1180, 50 1400"
          stroke={`url(#${id("soft")})`}
          strokeWidth="48"
          fill="none"
          filter={`url(#${id("blur")})`}
        />
        <path
          className={styles.currentCore}
          d="M50 0 C 36 170, 66 340, 44 500 S 72 740, 46 920 S 64 1200, 50 1400"
          stroke={`url(#${id("flow")})`}
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <svg className={styles.dust} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        {[
          [180, 120],
          [320, 280],
          [520, 90],
          [680, 340],
          [840, 160],
          [980, 420],
          [1120, 200],
          [1260, 380],
          [240, 520],
          [460, 600],
          [720, 540],
          [940, 680],
          [1180, 620],
          [390, 760],
          [860, 780],
          [1050, 80],
          [150, 400],
          [600, 200],
        ].map(([x, y], i) => (
          <circle
            key={`${x}-${y}`}
            className={styles.speck}
            style={{ ["--si" as string]: i }}
            cx={x}
            cy={y}
            r={i % 4 === 0 ? 1.2 : 0.75}
            fill="rgba(210,225,245,0.55)"
          />
        ))}
      </svg>

      <div className={styles.midMist} />
      <div className={styles.breath} />
      <div className={styles.noise} />
      <div className={styles.foreground} />
    </div>
  );
}
