"use client";

import Image from "next/image";
import styles from "./AutoHistHeroVisual.module.css";

type Props = {
  alive: boolean;
  reduced: boolean;
};

const KEY_VISUAL = "/products/autohist/hero/autohist-horizon.webp";

/**
 * AutoHist Hero V2 — "Horizonte Técnico" as a full-bleed living scene.
 * Desktop: absolute scene behind the copy column.
 * Tablet: in-flow below the copy, motion preserved.
 * Mobile: in-flow, static, tightly cropped.
 *
 * SVG viewBox matches the source art (1536x1024) with `slice`,
 * mirroring the image's cover crop so pulses ride the painted light path.
 */
export function AutoHistHeroVisual({ alive, reduced }: Props) {
  const motionOn = alive && !reduced;

  return (
    <div
      className={`${styles.scene} ${alive ? styles.alive : ""} ${reduced ? styles.reduced : ""}`}
      aria-hidden="true"
    >
      <div className={styles.imageWrap}>
        <Image
          src={KEY_VISUAL}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.image}
        />
      </div>

      {/* Volumetric depth — breathes, never covers the plate */}
      <div className={styles.horizonHaze} />
      <div className={styles.floorGlow} />

      {/* Data line + pulses riding the painted timeline */}
      {motionOn ? (
        <svg
          className={styles.dataline}
          viewBox="0 0 1536 1024"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <path
            id="ah-data-path"
            d="M-40 585 C 320 566 680 558 950 590 C 1040 601 1110 618 1180 642"
            stroke="rgba(90, 160, 255, 0.08)"
            strokeWidth="1.5"
            fill="none"
          />
          <circle r="3.4" className={styles.pulseA} fill="#8fc3ff">
            <animateMotion dur="13s" repeatCount="indefinite" begin="0s">
              <mpath href="#ah-data-path" />
            </animateMotion>
          </circle>
          <circle r="2.4" className={styles.pulseB} fill="#3d8bfd">
            <animateMotion dur="19s" repeatCount="indefinite" begin="4.5s">
              <mpath href="#ah-data-path" />
            </animateMotion>
          </circle>
          <circle r="1.8" className={styles.pulseC} fill="#bcd9ff">
            <animateMotion dur="23s" repeatCount="indefinite" begin="9s">
              <mpath href="#ah-data-path" />
            </animateMotion>
          </circle>
        </svg>
      ) : null}

      {motionOn ? <div className={styles.scanner} /> : null}

      {motionOn ? (
        <div className={styles.particles}>
          <span className={styles.p1} />
          <span className={styles.p2} />
          <span className={styles.p3} />
          <span className={styles.p4} />
        </div>
      ) : null}

      {/* Edge fusion — seals the scene into the hero environment */}
      <div className={styles.fuse} />
    </div>
  );
}
