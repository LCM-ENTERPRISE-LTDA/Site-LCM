"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import styles from "./Counter.module.css";

type CounterProps = {
  value: number;
  label: string;
  suffix?: string;
  className?: string;
  /** Only animate when a real metric is approved; defaults to static display. */
  animate?: boolean;
};

export function Counter({
  value,
  label,
  suffix = "",
  className,
  animate = false,
}: CounterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(animate ? 0 : value);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!animate || reduced) {
      setDisplay(value);
      return;
    }

    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 900;
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setDisplay(Math.round(value * progress));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [animate, reduced, value]);

  return (
    <div ref={ref} className={cn(styles.counter, className)}>
      <p className={styles.value}>
        {display}
        {suffix}
      </p>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
