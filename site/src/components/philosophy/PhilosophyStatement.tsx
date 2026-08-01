"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { PhilosophyStatement } from "@/content/philosophy";
import styles from "./PhilosophyStatement.module.css";

type Props = {
  statement: PhilosophyStatement;
  index: number;
};

export function PhilosophyStatementBlock({ statement, index }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <article
      ref={ref}
      className={cn(
        styles.panel,
        visible && styles.visible,
        reduced && styles.reduced,
      )}
      style={{ ["--panel-i" as string]: index }}
      aria-label={`Princípio ${index + 1}`}
    >
      <div className={styles.light} aria-hidden="true" />
      <p className={styles.statement}>
        {statement.lines.map((line, lineIndex) => (
          <span
            key={line}
            className={styles.line}
            style={{ ["--line-i" as string]: lineIndex }}
          >
            <span className={styles.lineInner}>{line}</span>
          </span>
        ))}
      </p>
    </article>
  );
}
