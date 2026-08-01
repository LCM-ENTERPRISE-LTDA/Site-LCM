"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { usePointerParallax } from "./PointerParallax";
import styles from "./TriadScene.module.css";

type TriadSceneProps = {
  className?: string;
};

type Phase = "idle" | "enter" | "join" | "settle";

export function TriadScene({ className }: TriadSceneProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [inView, setInView] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(pointer: fine)");
    const sync = () => {
      setReduced(motion.matches);
      setFinePointer(pointer.matches);
    };
    sync();
    motion.addEventListener("change", sync);
    pointer.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      pointer.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) {
      setPhase("settle");
      return;
    }
    setPhase("enter");
    const t1 = window.setTimeout(() => setPhase("join"), 320);
    const t2 = window.setTimeout(() => setPhase("settle"), 980);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [reduced]);

  usePointerParallax(stageRef, {
    maxOffset: 7,
    enabled: finePointer && !reduced && inView,
  });

  return (
    <div
      ref={stageRef}
      className={cn(
        styles.stage,
        styles[phase],
        inView && styles.alive,
        reduced && styles.reduced,
        className,
      )}
      aria-hidden="true"
    >
      <div className={styles.bloom} />
      <div className={styles.gridFade} />

      <svg className={styles.canvas} viewBox="0 0 420 380" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="triad-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-brand-cyan)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--color-brand)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--color-brand-cyan)" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Depth planes */}
        <g className={styles.planeFar}>
          <path
            d="M70 300 L210 70 L350 300 Z"
            stroke="rgba(130,170,220,0.08)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
        </g>

        {/* Connections */}
        <g className={styles.connections}>
          <path className={styles.channel} d="M210 118 L210 210" stroke="url(#triad-line)" strokeWidth="1.4" />
          <path className={styles.channel} d="M210 210 L132 268" stroke="url(#triad-line)" strokeWidth="1.4" />
          <path className={styles.channel} d="M210 210 L288 268" stroke="url(#triad-line)" strokeWidth="1.4" />
          <circle className={styles.pulse} cx="210" cy="164" r="2.2" fill="var(--color-brand-cyan)" />
          <circle className={styles.pulseDelayed} cx="171" cy="239" r="2" fill="var(--color-brand)" />
          <circle className={styles.pulse} cx="249" cy="239" r="2" fill="var(--color-brand)" />
        </g>

        {/* Three founder modules — abstract, not a logo redraw */}
        <g className={cn(styles.node, styles.nodeTop)}>
          <circle cx="210" cy="108" r="34" fill="url(#node-glow)" />
          <path
            d="M210 78 L236 108 L210 138 L184 108 Z"
            stroke="var(--color-brand)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="210" cy="108" r="3.5" fill="var(--color-brand-cyan)" />
        </g>

        <g className={cn(styles.node, styles.nodeLeft)}>
          <circle cx="128" cy="276" r="30" fill="url(#node-glow)" />
          <path
            d="M104 298 L128 248 L152 298 Z"
            stroke="var(--color-brand-cyan)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="128" cy="276" r="3.2" fill="var(--color-brand)" />
        </g>

        <g className={cn(styles.node, styles.nodeRight)}>
          <circle cx="292" cy="276" r="30" fill="url(#node-glow)" />
          <path
            d="M268 298 L292 248 L316 298 Z"
            stroke="var(--color-brand)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="292" cy="276" r="3.2" fill="var(--color-brand-cyan)" />
        </g>

        {/* Core join point — ecosystem origin */}
        <g className={styles.core}>
          <circle cx="210" cy="210" r="7" stroke="rgba(244,247,251,0.35)" strokeWidth="1.2" />
          <circle cx="210" cy="210" r="2.5" fill="var(--color-text)" />
        </g>
      </svg>
    </div>
  );
}
