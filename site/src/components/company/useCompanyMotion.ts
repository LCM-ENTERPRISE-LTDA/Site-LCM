"use client";

import { useEffect, useRef, useState } from "react";

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

/** Chapter enters when sufficiently visible — pauses motion off-screen. */
export function useChapterPresence(
  ref: React.RefObject<HTMLElement | null>,
  threshold = 0.18,
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

/**
 * Soft light pointer for Company Hero only.
 * ≤3px via CSS vars. One rAF. No object magnetics.
 */
export function useCompanyHeroPointer(
  targetRef: React.RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  const frameRef = useRef<number | null>(null);
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const node = targetRef.current;
    const fine =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!node || !enabled || !fine) {
      if (node) {
        node.style.setProperty("--cx", "0");
        node.style.setProperty("--cy", "0");
        node.style.setProperty("--clx", "58%");
        node.style.setProperty("--cly", "42%");
      }
      return;
    }

    let active = true;
    const tick = () => {
      if (!active) return;
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * 0.04;
      c.y += (t.y - c.y) * 0.04;
      node.style.setProperty("--cx", c.x.toFixed(3));
      node.style.setProperty("--cy", c.y.toFixed(3));
      node.style.setProperty("--clx", `${(58 + c.x * 0.6).toFixed(2)}%`);
      node.style.setProperty("--cly", `${(42 + c.y * 0.5).toFixed(2)}%`);
      frameRef.current = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      target.current = {
        x: Math.max(-1, Math.min(1, nx)) * 2.8,
        y: Math.max(-1, Math.min(1, ny)) * 2.8,
      };
    };
    const onLeave = () => {
      target.current = { x: 0, y: 0 };
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [targetRef, enabled]);
}
