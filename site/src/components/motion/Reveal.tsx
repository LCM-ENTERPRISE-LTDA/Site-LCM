"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import styles from "./Reveal.module.css";

export type RevealDirection = "up" | "down" | "left" | "right" | "fade" | "zoom";

type RevealProps = {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <Tag
      ref={ref as never}
      className={cn(
        styles.reveal,
        styles[direction],
        visible && styles.visible,
        reduced && styles.reduced,
        className,
      )}
      style={{ transitionDelay: reduced ? "0ms" : `${Math.min(delay, 400)}ms` }}
    >
      {children}
    </Tag>
  );
}
