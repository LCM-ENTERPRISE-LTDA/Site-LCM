"use client";

import Image from "next/image";
import styles from "./AutoHistHeroVisual.module.css";

type Props = {
  alive: boolean;
  reduced: boolean;
};

const KEY_VISUAL = "/products/autohist/hero/autohist-key-visual.webp";

/**
 * Official AutoHist Hero Key Visual — photographic composition.
 * Do not replace with SVG recreation.
 */
export function AutoHistHeroVisual({ alive, reduced }: Props) {
  return (
    <div
      className={`${styles.stage} ${alive ? styles.alive : ""} ${reduced ? styles.reduced : ""}`}
      aria-hidden="true"
    >
      <div className={styles.frame}>
        <div className={styles.parallax}>
          <Image
            src={KEY_VISUAL}
            alt=""
            fill
            priority
            sizes="(max-width: 639px) 100vw, (max-width: 959px) 90vw, 52vw"
            className={styles.image}
          />
        </div>
        <div className={styles.scanner} />
        <div className={styles.edgeMask} />
        <div className={styles.integrate} />
        <div className={styles.glow} />
        <div className={styles.haze} />
        <div className={styles.grain} />
      </div>
    </div>
  );
}
