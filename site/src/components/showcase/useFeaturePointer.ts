"use client";

import { useEffect, useRef } from "react";

type Options = {
  enabled?: boolean;
};

/**
 * Local pointer → CSS vars on a showcase feature root.
 * One rAF; paused when disabled.
 */
export function useFeaturePointer(
  targetRef: React.RefObject<HTMLElement | null>,
  { enabled = true }: Options = {},
) {
  const frameRef = useRef<number | null>(null);
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const node = targetRef.current;
    if (!node || !enabled) {
      if (node) {
        node.style.setProperty("--fx", "0");
        node.style.setProperty("--fy", "0");
        node.style.setProperty("--lx", "50%");
        node.style.setProperty("--ly", "45%");
      }
      return;
    }

    let active = true;

    const tick = () => {
      if (!active) return;
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * 0.08;
      c.y += (t.y - c.y) * 0.08;
      node.style.setProperty("--fx", c.x.toFixed(3));
      node.style.setProperty("--fy", c.y.toFixed(3));
      node.style.setProperty("--lx", `${(50 + c.x * 1.4).toFixed(2)}%`);
      node.style.setProperty("--ly", `${(45 + c.y * 1.2).toFixed(2)}%`);
      frameRef.current = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      target.current = {
        x: Math.max(-1, Math.min(1, nx)) * 8,
        y: Math.max(-1, Math.min(1, ny)) * 8,
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
