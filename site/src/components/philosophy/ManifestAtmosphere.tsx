"use client";

import type { CSSProperties } from "react";
import styles from "./ManifestAtmosphere.module.css";

/**
 * Cinematic field — haze, mist, dust, grain, breathing light.
 * No ribbons. No S-curves. Color continuum via CSS vars + progress.
 */
export function ManifestAtmosphere({ alive }: { alive: boolean }) {
  return (
    <div className={`${styles.layers} ${alive ? styles.alive : ""}`} aria-hidden="true">
      <div className={styles.wash} />
      <div className={styles.volumeFar} />
      <div className={styles.volumeMid} />
      <div className={styles.bloom} />
      <div className={styles.mist} />
      <div className={styles.dust}>
        {Array.from({ length: 24 }, (_, i) => (
          <span
            key={i}
            className={styles.speck}
            style={
              {
                ["--sx"]: `${8 + ((i * 37) % 84)}%`,
                ["--sy"]: `${6 + ((i * 53) % 88)}%`,
                ["--si"]: i,
                ["--sr"]: `${0.6 + (i % 3) * 0.35}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className={styles.grain} />
      <div className={styles.vignette} />
    </div>
  );
}
