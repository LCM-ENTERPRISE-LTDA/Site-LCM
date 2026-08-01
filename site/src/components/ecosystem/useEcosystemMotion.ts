"use client";

import { useEffect, useRef } from "react";

type Options = {
  enabled?: boolean;
  onFocusChange?: (id: string | null) => void;
};

/**
 * Local pointer → CSS vars on ecosystem root.
 * Depth ≤6px. One rAF. Optional focus region for relation reveal.
 */
export function useEcosystemMotion(
  targetRef: React.RefObject<HTMLElement | null>,
  { enabled = true, onFocusChange }: Options = {},
) {
  const frameRef = useRef<number | null>(null);
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const focusRef = useRef<string | null>(null);
  const onFocusRef = useRef(onFocusChange);
  onFocusRef.current = onFocusChange;

  useEffect(() => {
    const node = targetRef.current;
    const fine =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!node || !enabled || !fine) {
      if (node) {
        node.style.setProperty("--ex", "0");
        node.style.setProperty("--ey", "0");
        node.style.setProperty("--elx", "50%");
        node.style.setProperty("--ely", "48%");
        node.dataset.focus = "";
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
      node.style.setProperty("--ex", c.x.toFixed(3));
      node.style.setProperty("--ey", c.y.toFixed(3));
      node.style.setProperty("--elx", `${(50 + c.x * 1.1).toFixed(2)}%`);
      node.style.setProperty("--ely", `${(48 + c.y * 0.9).toFixed(2)}%`);
      frameRef.current = requestAnimationFrame(tick);
    };

    const regions = () =>
      [...node.querySelectorAll<HTMLElement>("[data-eco-region]")].map((el) => ({
        id: el.dataset.ecoRegion ?? "",
        rect: el.getBoundingClientRect(),
      }));
    // Hit pads are HTML; distance check uses pad centers (no hover dependency).

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      target.current = {
        x: Math.max(-1, Math.min(1, nx)) * 5,
        y: Math.max(-1, Math.min(1, ny)) * 5,
      };

      let nearest: string | null = null;
      let best = Infinity;
      for (const r of regions()) {
        if (!r.id) continue;
        const cx = r.rect.left + r.rect.width / 2;
        const cy = r.rect.top + r.rect.height / 2;
        const d = (event.clientX - cx) ** 2 + (event.clientY - cy) ** 2;
        if (d < best && d < 180 ** 2) {
          best = d;
          nearest = r.id;
        }
      }
      if (nearest !== focusRef.current) {
        focusRef.current = nearest;
        node.dataset.focus = nearest ?? "";
        onFocusRef.current?.(nearest);
      }
    };

    const onLeave = () => {
      target.current = { x: 0, y: 0 };
      if (focusRef.current !== null) {
        focusRef.current = null;
        node.dataset.focus = "";
        onFocusRef.current?.(null);
      }
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
