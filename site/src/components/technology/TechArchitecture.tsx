"use client";

import { useId } from "react";
import type { TechPerspectiveId } from "@/content/technology";
import { AIArchitecture } from "./AIArchitecture";
import { ExperienceArchitecture } from "./ExperienceArchitecture";
import { SystemsArchitecture } from "./SystemsArchitecture";
import styles from "./TechArchitecture.module.css";

type Props = {
  mode: TechPerspectiveId;
  alive: boolean;
};

/** Abstract living architecture — four visual depths, mode-specific systems. */
export function TechArchitecture({ mode, alive }: Props) {
  const uid = useId().replace(/:/g, "");
  const id = (n: string) => `${n}-${uid}`;

  return (
    <div
      className={`${styles.wrap} ${styles[mode]} ${alive ? styles.alive : ""}`}
      aria-hidden="true"
    >
      <div className={styles.atmosphereBg} />
      <div className={styles.glow} />
      <div className={styles.structureWash} />

      <svg className={styles.svg} viewBox="0 0 560 480" fill="none">
        <defs>
          <linearGradient id={id("flow")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--tech-a)" stopOpacity="0" />
            <stop offset="40%" stopColor="var(--tech-a)" stopOpacity="0.65" />
            <stop offset="100%" stopColor="var(--tech-b)" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={id("core")} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="35%" stopColor="var(--tech-a)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="var(--tech-a)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {mode === "experiencia" ? <ExperienceArchitecture uid={uid} alive={alive} /> : null}
        {mode === "sistemas" ? <SystemsArchitecture uid={uid} alive={alive} /> : null}
        {mode === "ia" ? <AIArchitecture uid={uid} alive={alive} /> : null}
      </svg>

      <div className={styles.vignette} />
    </div>
  );
}
