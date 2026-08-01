"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import styles from "./TriadHero.module.css";

type TriadHeroProps = {
  className?: string;
};

/**
 * Conceptual hero: three parts assemble into one structure.
 * Story = construction → union → ecosystem. Not a flowchart.
 */
export function TriadHero({ className }: TriadHeroProps) {
  const [phase, setPhase] = useState<"enter" | "join" | "settle">("enter");
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
      setPhase("settle");
      return;
    }
    setPhase("enter");
    const t1 = window.setTimeout(() => setPhase("join"), 280);
    const t2 = window.setTimeout(() => setPhase("settle"), 860);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [reduced]);

  return (
    <div
      className={cn(styles.wrap, styles[phase], className)}
      aria-hidden="true"
    >
      <div className={styles.stage}>
        <div className={styles.bloom} />
        <svg className={styles.canvas} viewBox="0 0 320 300" fill="none">
          {/* faint construction field */}
          <path
            className={styles.guide}
            d="M160 36 L262 230 L58 230 Z"
            strokeLinejoin="round"
          />

          <g className={cn(styles.part, styles.top)}>
            <path
              d="M160 48 L196 92 L160 136 L124 92 Z"
              strokeLinejoin="round"
            />
          </g>
          <g className={cn(styles.part, styles.left)}>
            <path
              d="M78 232 L148 232 L113 166 Z"
              strokeLinejoin="round"
            />
          </g>
          <g className={cn(styles.part, styles.right)}>
            <path
              d="M172 232 L242 232 L207 166 Z"
              strokeLinejoin="round"
            />
          </g>

          {/* union channels — the “Y” of negative space, suggested */}
          <path
            className={styles.channel}
            d="M160 136 L160 158 M160 158 L120 198 M160 158 L200 198"
            strokeLinecap="round"
          />
        </svg>

        <div className={styles.orbit}>
          <span className={styles.chip} data-tone="a">
            AutoHist
          </span>
          <span className={styles.chip} data-tone="d">
            Dyson
          </span>
          <span className={styles.chip} data-tone="s">
            Studio
          </span>
          <span className={styles.chip} data-tone="b">
            BusinessZap
          </span>
        </div>
      </div>
      <p className={styles.caption}>Três partes. Uma estrutura. Um ecossistema.</p>
    </div>
  );
}
