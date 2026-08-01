"use client";

import { useEffect, useRef } from "react";

type PointerParallaxOptions = {
  maxOffset?: number;
  enabled?: boolean;
};

/**
 * Writes interpolated pointer offsets to CSS variables on the target element.
 * Uses rAF — no React re-renders on mouse move.
 */
export function usePointerParallax(
  targetRef: React.RefObject<HTMLElement | null>,
  { maxOffset = 8, enabled = true }: PointerParallaxOptions = {},
) {
  const frameRef = useRef<number | null>(null);
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const node = targetRef.current;
    if (!node || !enabled) {
      if (node) {
        node.style.setProperty("--px", "0");
        node.style.setProperty("--py", "0");
        node.style.setProperty("--plight-x", "50%");
        node.style.setProperty("--plight-y", "40%");
      }
      return;
    }

    let active = true;

    const tick = () => {
      if (!active) return;
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      node.style.setProperty("--px", current.current.x.toFixed(3));
      node.style.setProperty("--py", current.current.y.toFixed(3));
      const lx = 50 + current.current.x * 3.2;
      const ly = 40 + current.current.y * 3.2;
      node.style.setProperty("--plight-x", `${lx.toFixed(2)}%`);
      node.style.setProperty("--plight-y", `${ly.toFixed(2)}%`);
      frameRef.current = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      target.current.x = Math.max(-1, Math.min(1, nx)) * maxOffset;
      target.current.y = Math.max(-1, Math.min(1, ny)) * maxOffset;
    };

    const onLeave = () => {
      target.current.x = 0;
      target.current.y = 0;
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
  }, [targetRef, maxOffset, enabled]);
}
