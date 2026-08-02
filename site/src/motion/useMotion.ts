"use client";

import { useEffect, useState } from "react";

/** Reactive prefers-reduced-motion flag. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Section presence via IntersectionObserver — gates all local motion. */
export function usePresence(
  ref: React.RefObject<HTMLElement | null>,
  threshold = 0.16,
) {
  const [alive, setAlive] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setAlive(entry.isIntersecting && entry.intersectionRatio >= threshold);
      },
      { threshold: [0, threshold, 0.4] },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [ref, threshold]);
  return alive;
}

/** Tab visibility — freezes global motion when the page is hidden. */
export function usePageVisibility() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return visible;
}
