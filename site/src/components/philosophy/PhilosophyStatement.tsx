"use client";

import type { PhilosophyStatement } from "@/content/philosophy";
import styles from "./PhilosophyStatement.module.css";

type Props = {
  statement: PhilosophyStatement;
  index: number;
};

/**
 * Single cinematic beat. Visibility driven by --pv (scroll), not enter-once IO.
 */
export function PhilosophyStatementBlock({ statement, index }: Props) {
  return (
    <article
      className={styles.panel}
      data-phrase={index}
      style={{ ["--pv" as string]: index === 0 ? "1" : "0" }}
      aria-label={`Princípio ${index + 1}`}
    >
      <p className={styles.statement}>
        {statement.lines.map((line) => (
          <span key={line} className={styles.line}>
            {line}
          </span>
        ))}
      </p>
    </article>
  );
}
