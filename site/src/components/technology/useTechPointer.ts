"use client";

import { useEffect, useRef } from "react";

type Options = { enabled?: boolean };

/** Local pointer → CSS vars on technology root. Max 5px. One rAF. */
export function useTechPointer(
  targetRef: React.RefObject<HTMLElement | null>,
  { enabled = true }: Options = {},
) {
  const frameRef = useRef<number | null>(null);
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const node = targetRef.current;
    const finePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!node || !enabled || !finePointer) {
      if (node) {
        node.style.setProperty("--tx", "0");
        node.style.setProperty("--ty", "0");
        node.style.setProperty("--tlx", "62%");
        node.style.setProperty("--tly", "42%");
      }
      return;
    }

    let active = true;

    const tick = () => {
      if (!active) return;
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * 0.07;
      c.y += (t.y - c.y) * 0.07;
      node.style.setProperty("--tx", c.x.toFixed(3));
      node.style.setProperty("--ty", c.y.toFixed(3));
      node.style.setProperty("--tlx", `${(62 + c.x * 0.9).toFixed(2)}%`);
      node.style.setProperty("--tly", `${(42 + c.y * 0.7).toFixed(2)}%`);
      frameRef.current = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      target.current = {
        x: Math.max(-1, Math.min(1, nx)) * 5,
        y: Math.max(-1, Math.min(1, ny)) * 5,
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
