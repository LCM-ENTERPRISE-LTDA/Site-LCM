"use client";

import Image from "next/image";
import styles from "./AutoHistHeroVisual.module.css";

type Props = {
  alive: boolean;
  reduced: boolean;
};

const KEY_VISUAL = "/products/autohist/hero/autohist-key-visual.webp";

/**
 * AutoHist Hero V1.1 — full-bleed key visual + living overlays.
 * Does not recreate or replace the official image.
 */
export function AutoHistHeroVisual({ alive, reduced }: Props) {
  const motionOn = alive && !reduced;

  return (
    <div
      className={`${styles.stage} ${alive ? styles.alive : ""} ${reduced ? styles.reduced : ""}`}
      aria-hidden="true"
    >
      <div className={styles.backHaze} />
      <div className={styles.floorReflect} />

      <div className={styles.bleed}>
        <div className={styles.imageLayer}>
          <Image
            src={KEY_VISUAL}
            alt=""
            fill
            priority
            sizes="(max-width: 639px) 100vw, (max-width: 959px) 92vw, 56vw"
            className={styles.image}
          />
        </div>

        <div className={styles.feather} />

        {motionOn ? <div className={styles.scanner} /> : null}

        {motionOn ? (
          <svg className={styles.pulseSvg} viewBox="0 0 800 560" fill="none">
            <path
              id="ah-timeline-path"
              d="M120 210 C240 120 360 100 480 150 C580 190 660 240 720 300"
              fill="none"
            />
            <circle r="3.2" className={styles.pulseA} fill="#7dd3fc">
              <animateMotion dur="11s" repeatCount="indefinite" begin="0s">
                <mpath href="#ah-timeline-path" />
              </animateMotion>
            </circle>
            <circle r="2.4" className={styles.pulseB} fill="#3d8bfd">
              <animateMotion dur="14s" repeatCount="indefinite" begin="3.5s">
                <mpath href="#ah-timeline-path" />
              </animateMotion>
            </circle>
            <circle r="2" className={styles.pulseC} fill="#9ec9ff">
              <animateMotion dur="16s" repeatCount="indefinite" begin="7s">
                <mpath href="#ah-timeline-path" />
              </animateMotion>
            </circle>
          </svg>
        ) : null}

        <div className={styles.foreGlow} />
      </div>

      {/* Particles + vignette live outside the image mask */}
      {motionOn ? (
        <div className={styles.particles}>
          <span className={styles.p1} />
          <span className={styles.p2} />
          <span className={styles.p3} />
          <span className={styles.p4} />
          <span className={styles.p5} />
        </div>
      ) : null}
      <div className={styles.edgeVignette} />
    </div>
  );
}
