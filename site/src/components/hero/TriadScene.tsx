"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { usePointerParallax } from "./PointerParallax";
import styles from "./TriadScene.module.css";

type TriadSceneProps = {
  className?: string;
};

type Phase = "idle" | "enter" | "join" | "settle";

export function TriadScene({ className }: TriadSceneProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const uid = useId().replace(/:/g, "");
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
      { threshold: 0.12 },
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
    maxOffset: 10,
    enabled: finePointer && !reduced && inView,
  });

  const gid = (name: string) => `${name}-${uid}`;

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
      {/* ——— Atmospheric depth ——— */}
      <div className={styles.noise} />
      <div className={styles.atmosphereDepth} />

      {/* Grid Layer — revealed by light */}
      <div className={styles.layerGrid} />

      {/* Glow Layer */}
      <div className={styles.layerGlow}>
        <div className={styles.bloom} />
        <div className={styles.specular} />
      </div>

      {/* Background plane */}
      <svg className={cn(styles.canvas, styles.layerBg)} viewBox="0 0 420 380" fill="none">
        <path
          className={styles.planeFar}
          d="M62 312 L210 48 L358 312 Z"
          stroke="rgba(130,170,220,0.07)"
          strokeWidth="1"
          strokeDasharray="3 10"
        />
        <path
          className={styles.planeMid}
          d="M96 286 L210 92 L324 286 Z"
          stroke="rgba(130,170,220,0.05)"
          strokeWidth="1"
        />
      </svg>

      {/* Particles Layer */}
      <svg className={cn(styles.canvas, styles.layerParticles)} viewBox="0 0 420 380" fill="none">
        <g className={styles.suspended}>
          <circle className={styles.dust} cx="148" cy="132" r="1.1" />
          <circle className={styles.dustB} cx="268" cy="118" r="0.9" />
          <circle className={styles.dustC} cx="188" cy="248" r="1" />
          <circle className={styles.dust} cx="302" cy="198" r="0.8" />
          <circle className={styles.dustB} cx="118" cy="208" r="0.85" />
          <circle className={styles.dustC} cx="246" cy="302" r="0.75" />
          <circle className={styles.dust} cx="176" cy="168" r="0.7" />
        </g>

        {/* Data pulses along connections — irregular begin/duration */}
        {!reduced && inView ? (
          <g className={styles.dataPulses}>
            <circle r="1.6" className={styles.packet} fill="var(--color-brand-cyan)">
              <animateMotion dur="5.4s" begin="0.2s" repeatCount="indefinite" path="M210 118 L210 210" />
              <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.12;0.82;1" dur="5.4s" begin="0.2s" repeatCount="indefinite" />
            </circle>
            <circle r="1.35" className={styles.packet} fill="var(--color-brand)">
              <animateMotion dur="6.8s" begin="1.7s" repeatCount="indefinite" path="M210 210 L132 268" />
              <animate attributeName="opacity" values="0;0.75;0.75;0" keyTimes="0;0.1;0.85;1" dur="6.8s" begin="1.7s" repeatCount="indefinite" />
            </circle>
            <circle r="1.35" className={styles.packet} fill="var(--color-brand)">
              <animateMotion dur="7.2s" begin="3.1s" repeatCount="indefinite" path="M210 210 L288 268" />
              <animate attributeName="opacity" values="0;0.75;0.75;0" keyTimes="0;0.1;0.85;1" dur="7.2s" begin="3.1s" repeatCount="indefinite" />
            </circle>
            <circle r="1.2" className={styles.packet} fill="var(--color-brand-cyan)">
              <animateMotion dur="8.6s" begin="4.4s" repeatCount="indefinite" path="M210 118 L210 210" />
              <animate attributeName="opacity" values="0;0.55;0.55;0" keyTimes="0;0.15;0.8;1" dur="8.6s" begin="4.4s" repeatCount="indefinite" />
            </circle>
          </g>
        ) : null}
      </svg>

      {/* Main Layer — modules, connections, core, product signals */}
      <svg className={cn(styles.canvas, styles.layerMain)} viewBox="0 0 420 380" fill="none">
        <defs>
          <linearGradient id={gid("line")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-brand-cyan)" stopOpacity="0.12" />
            <stop offset="45%" stopColor="var(--color-brand)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--color-brand-cyan)" stopOpacity="0.12" />
          </linearGradient>
          <radialGradient id={gid("nodeGlow")} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={gid("metal")} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(244,247,251,0.14)" />
            <stop offset="45%" stopColor="rgba(47,107,255,0.06)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <filter id={gid("soft")} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.1" />
          </filter>
        </defs>

        <g className={styles.connections}>
          <path
            className={styles.channel}
            d="M210 118 L210 210"
            stroke={`url(#${gid("line")})`}
            strokeWidth="1.35"
          />
          <path
            className={styles.channel}
            d="M210 210 L132 268"
            stroke={`url(#${gid("line")})`}
            strokeWidth="1.35"
          />
          <path
            className={styles.channel}
            d="M210 210 L288 268"
            stroke={`url(#${gid("line")})`}
            strokeWidth="1.35"
          />
          <path
            className={styles.channelGlow}
            d="M210 118 L210 210 M210 210 L132 268 M210 210 L288 268"
            stroke="var(--color-brand)"
            strokeWidth="3"
            filter={`url(#${gid("soft")})`}
          />
        </g>

        {/* Product emanations — color signals only, no icons/labels */}
        <g className={styles.signals}>
          <circle className={styles.signalA} cx="210" cy="210" r="1.4" />
          <circle className={styles.signalD} cx="210" cy="210" r="1.3" />
          <circle className={styles.signalS} cx="210" cy="210" r="1.25" />
          <circle className={styles.signalB} cx="210" cy="210" r="1.3" />
        </g>

        <g className={cn(styles.node, styles.nodeTop)}>
          <circle cx="210" cy="108" r="36" fill={`url(#${gid("nodeGlow")})`} />
          <circle cx="210" cy="108" r="28" fill={`url(#${gid("metal")})`} className={styles.metalWash} />
          <path
            d="M210 78 L236 108 L210 138 L184 108 Z"
            stroke="var(--color-brand)"
            strokeWidth="2.15"
            strokeLinejoin="round"
          />
          <circle cx="210" cy="108" r="3.4" fill="var(--color-brand-cyan)" />
        </g>

        <g className={cn(styles.node, styles.nodeLeft)}>
          <circle cx="128" cy="276" r="32" fill={`url(#${gid("nodeGlow")})`} />
          <circle cx="128" cy="276" r="24" fill={`url(#${gid("metal")})`} className={styles.metalWash} />
          <path
            d="M104 298 L128 248 L152 298 Z"
            stroke="var(--color-brand-cyan)"
            strokeWidth="2.15"
            strokeLinejoin="round"
          />
          <circle cx="128" cy="276" r="3.1" fill="var(--color-brand)" />
        </g>

        <g className={cn(styles.node, styles.nodeRight)}>
          <circle cx="292" cy="276" r="32" fill={`url(#${gid("nodeGlow")})`} />
          <circle cx="292" cy="276" r="24" fill={`url(#${gid("metal")})`} className={styles.metalWash} />
          <path
            d="M268 298 L292 248 L316 298 Z"
            stroke="var(--color-brand)"
            strokeWidth="2.15"
            strokeLinejoin="round"
          />
          <circle cx="292" cy="276" r="3.1" fill="var(--color-brand-cyan)" />
        </g>

        <g className={styles.core}>
          <circle className={styles.coreRing} cx="210" cy="210" r="9" stroke="rgba(244,247,251,0.28)" strokeWidth="1.1" />
          <circle className={styles.coreRingOuter} cx="210" cy="210" r="14" stroke="rgba(47,107,255,0.18)" strokeWidth="0.8" />
          <circle className={styles.coreDot} cx="210" cy="210" r="2.6" fill="var(--color-text)" />
        </g>
      </svg>

      {/* Foreground accents */}
      <svg className={cn(styles.canvas, styles.layerFg)} viewBox="0 0 420 380" fill="none">
        <circle className={styles.fgSpec} cx="196" cy="98" r="1.2" fill="rgba(244,247,251,0.35)" />
        <circle className={styles.fgSpecB} cx="302" cy="262" r="0.9" fill="rgba(25,184,242,0.3)" />
        <circle className={styles.fgSpec} cx="140" cy="262" r="0.85" fill="rgba(244,247,251,0.22)" />
      </svg>
    </div>
  );
}
