"use client";

import { useEffect } from "react";

type Options = {
  enabled?: boolean;
};

/**
 * Scroll progress through the Manifesto → CSS vars on the section root.
 * One throttled rAF; paused when out of view / reduced motion.
 */
export function useManifestScroll(
  targetRef: React.RefObject<HTMLElement | null>,
  { enabled = true }: Options = {},
) {
  useEffect(() => {
    const node = targetRef.current;
    if (!node || !enabled) {
      node?.style.setProperty("--manifest-p", "0");
      node?.style.setProperty("--manifest-alive", "0");
      return;
    }

    let frame = 0;
    let inView = true;

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const span = Math.max(rect.height - window.innerHeight * 0.35, 1);
      const raw = (-rect.top + window.innerHeight * 0.15) / span;
      const p = Math.max(0, Math.min(1, raw));
      node.style.setProperty("--manifest-p", p.toFixed(4));
      node.style.setProperty("--manifest-alive", inView ? "1" : "0");
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = Boolean(entry?.isIntersecting);
        if (inView) update();
        else node.style.setProperty("--manifest-alive", "0");
      },
      { threshold: 0.02 },
    );

    io.observe(node);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [targetRef, enabled]);
}
