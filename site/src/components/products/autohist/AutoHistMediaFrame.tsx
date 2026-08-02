"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import styles from "./AutoHistMediaFrame.module.css";

export type MediaFrameVariant = "portrait" | "landscape" | "wide" | "timeline";
export type MediaFrameStatus = "empty" | "ready";
export type MediaObjectFit = "contain" | "cover";

type Props = {
  variant?: MediaFrameVariant;
  index?: string;
  label?: string;
  caption?: string;
  title?: string;
  description?: string;
  /** CSS aspect-ratio, e.g. "4 / 5". Omit on mobile natural mode via CSS. */
  aspectRatio?: string;
  className?: string;
  shotClassName?: string;
  status?: MediaFrameStatus;
  src?: string;
  alt?: string;
  intrinsicWidth?: number;
  intrinsicHeight?: number;
  objectFit?: MediaObjectFit;
  objectPosition?: string;
  priority?: boolean;
  children?: ReactNode;
};

export function AutoHistMediaFrame({
  variant = "portrait",
  index,
  label,
  caption,
  title,
  description,
  aspectRatio,
  className = "",
  shotClassName = "",
  status = "empty",
  src,
  alt = "",
  intrinsicWidth,
  intrinsicHeight,
  objectFit = "contain",
  objectPosition = "top center",
  priority = false,
  children,
}: Props) {
  const hasMedia = Boolean(src || children);
  const resolvedStatus: MediaFrameStatus = hasMedia ? "ready" : status;
  const ratio =
    aspectRatio ??
    (variant === "wide" || variant === "landscape" ? "16 / 10" : "4 / 5");

  return (
    <figure
      className={`${styles.figure} ${styles[variant]} ${className}`.trim()}
      data-status={resolvedStatus}
      aria-label={label ? `Produto AutoHist — ${label}` : "Produto AutoHist"}
    >
      <div className={styles.glow} aria-hidden="true" />
      <div
        className={`${styles.frame} ${shotClassName}`.trim()}
        style={{ aspectRatio: ratio } as CSSProperties}
      >
        <div
          className={styles.slot}
          data-fit={objectFit}
          style={{ ["--ah-object-position" as string]: objectPosition }}
        >
          {children ??
            (src && intrinsicWidth && intrinsicHeight ? (
              <Image
                src={src}
                alt={alt}
                width={intrinsicWidth}
                height={intrinsicHeight}
                priority={priority}
                loading={priority ? "eager" : "lazy"}
                sizes="(max-width: 639px) 92vw, (max-width: 959px) 44vw, 280px"
                className={styles.image}
              />
            ) : null)}
        </div>

        {resolvedStatus === "empty" ? (
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
        ) : (
          <div className={styles.readyChrome} aria-hidden="true">
            <span className={`${styles.corner} ${styles.tl}`} />
            <span className={`${styles.corner} ${styles.tr}`} />
            <span className={`${styles.corner} ${styles.bl}`} />
            <span className={`${styles.corner} ${styles.br}`} />
          </div>
        )}

        <div className={styles.mask} aria-hidden="true" />
      </div>
      {(caption || title || description) && (
        <figcaption className={styles.captionBlock}>
          {caption ? <span className={styles.caption}>{caption}</span> : null}
          {title ? <span className={styles.captionTitle}>{title}</span> : null}
          {description ? <span className={styles.captionDesc}>{description}</span> : null}
        </figcaption>
      )}
    </figure>
  );
}
