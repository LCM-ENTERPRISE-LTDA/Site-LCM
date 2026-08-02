"use client";

import { useRef } from "react";
import { usePageVisibility, usePrefersReducedMotion } from "@/motion/useMotion";
import { usePointerField } from "@/motion/usePointerField";
import styles from "./Atmosphere.module.css";

/**
 * LCM Global Atmosphere — identical on every page, behind all content.
 * Living gradient · volumetric haze · ambient glow · particles · vignette.
 * The static grain lives in globals.css (body::before), above this layer.
 */
export function Atmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const visible = usePageVisibility();

  usePointerField(ref, !reduced && visible, {
    maxPx: 2,
    lerp: 0.03,
    listen: "window",
    varX: "--gx",
    varY: "--gy",
  });

  const cls = [
    styles.root,
    reduced ? styles.reduced : "",
    visible ? "" : styles.paused,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={cls} aria-hidden="true">
      <div className={styles.gradient} />
      <div className={styles.hazeA} />
      <div className={styles.hazeB} />
      <div className={styles.glow}>
        <div className={styles.glowInner} />
      </div>
      {reduced ? null : (
        <div className={styles.particles}>
          <span className={styles.pa} />
          <span className={styles.pb} />
          <span className={styles.pc} />
          <span className={styles.pd} />
          <span className={styles.pe} />
          <span className={styles.pf} />
        </div>
      )}
      <div className={styles.vignette} />
    </div>
  );
}
