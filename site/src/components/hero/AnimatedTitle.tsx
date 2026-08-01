"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import styles from "./AnimatedTitle.module.css";

type Props = {
  id?: string;
  title: string;
  ready: boolean;
  reduced: boolean;
};

export function AnimatedTitle({ id, title, ready, reduced }: Props) {
  const lines = title.split("\n").filter(Boolean);

  return (
    <h1 id={id} className={cn(styles.title, ready && styles.ready, reduced && styles.reduced)}>
      {lines.map((line, index) => (
        <span
          key={`${line}-${index}`}
          className={styles.lineWrap}
          style={{ "--i": index } as CSSProperties}
        >
          <span className={styles.line}>{line}</span>
        </span>
      ))}
    </h1>
  );
}
