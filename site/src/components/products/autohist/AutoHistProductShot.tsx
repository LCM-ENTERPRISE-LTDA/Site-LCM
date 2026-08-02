"use client";

import Image from "next/image";
import { autohistScreens, type ScreenKey } from "@/content/autohistScreens";
import styles from "./AutoHistProductShot.module.css";

type Props = {
  screen: ScreenKey;
  priority?: boolean;
  className?: string;
  caption?: string;
  /** Crop framing for tall phone screens on desktop. */
  frame?: "full" | "tall" | "wide";
};

export function AutoHistProductShot({
  screen,
  priority = false,
  className = "",
  caption,
  frame = "tall",
}: Props) {
  const shot = autohistScreens[screen];
  return (
    <figure className={`${styles.figure} ${styles[frame]} ${className}`.trim()}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.stage}>
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 639px) 92vw, (max-width: 959px) 48vw, 280px"
          className={styles.image}
        />
      </div>
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
