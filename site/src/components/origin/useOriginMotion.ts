"use client";

import { useEffect, useRef } from "react";

type Options = {
  enabled?: boolean;
};

/**
 * Quiet light shift only — no object motion.
 * Depth ≤3px via CSS vars. One rAF while alive.
 */
export function useOriginMotion(
  targetRef: React.RefObject<HTMLElement | null>,
  { enabled = true }: Options = {},
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
        node.style.setProperty("--ox", "0");
        node.style.setProperty("--oy", "0");
        node.style.setProperty("--olx", "52%");
        node.style.setProperty("--oly", "46%");
      }
      return;
    }

    let active = true;

    const tick = () => {
      if (!active) return;
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * 0.045;
      c.y += (t.y - c.y) * 0.045;
      node.style.setProperty("--ox", c.x.toFixed(3));
      node.style.setProperty("--oy", c.y.toFixed(3));
      node.style.setProperty("--olx", `${(52 + c.x * 0.55).toFixed(2)}%`);
      node.style.setProperty("--oly", `${(46 + c.y * 0.45).toFixed(2)}%`);
      frameRef.current = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      target.current = {
        x: Math.max(-1, Math.min(1, nx)) * 2.5,
        y: Math.max(-1, Math.min(1, ny)) * 2.5,
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
