"use client";

import type { CSSProperties, ReactNode } from "react";
import styles from "./AutoHistMediaFrame.module.css";

export type MediaFrameVariant = "portrait" | "landscape" | "wide" | "timeline";
export type MediaFrameStatus = "empty" | "ready";

type Props = {
  variant?: MediaFrameVariant;
  index?: string;
  label?: string;
  caption?: string;
  /** CSS aspect-ratio value, e.g. "4 / 5" */
  aspectRatio?: string;
  className?: string;
  status?: MediaFrameStatus;
  /** Future media (next/image or img) — layout stays stable */
  children?: ReactNode;
};

export function AutoHistMediaFrame({
  variant = "portrait",
  index,
  label,
  caption,
  aspectRatio,
  className = "",
  status = "empty",
  children,
}: Props) {
  const ratio =
    aspectRatio ??
    (variant === "wide" || variant === "landscape"
      ? "16 / 10"
      : variant === "timeline"
        ? "4 / 5"
        : "4 / 5");

  return (
    <figure
      className={`${styles.figure} ${styles[variant]} ${className}`.trim()}
      data-status={status}
      aria-label={label ? `Área de produto — ${label}` : "Área de produto"}
    >
      <div className={styles.glow} aria-hidden="true" />
      <div
        className={styles.frame}
        style={{ aspectRatio: ratio } as CSSProperties}
      >
        <div className={styles.slot}>{children ?? null}</div>

        {status === "empty" || !children ? (
          <div className={styles.tech} aria-hidden="true">
            <div className={styles.techGrid} />
            <div className={styles.focusLine} />
            <div className={styles.focusDot} />
            <span className={`${styles.corner} ${styles.tl}`} />
            <span className={`${styles.corner} ${styles.tr}`} />
            <span className={`${styles.corner} ${styles.bl}`} />
            <span className={`${styles.corner} ${styles.br}`} />
            {index ? <span className={styles.coord}>{index}</span> : null}
          </div>
        ) : null}

        <div className={styles.mask} aria-hidden="true" />
      </div>
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
