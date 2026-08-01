"use client";

import { useEffect, useRef } from "react";

type Options = {
  enabled?: boolean;
};

/**
 * Single rAF → CSS variables on the Hero root only.
 * Paused when `enabled` is false (out of view / reduced motion / coarse pointer).
 */
export function useHeroPointer(
  targetRef: React.RefObject<HTMLElement | null>,
  { enabled = true }: Options = {},
) {
  const frameRef = useRef<number | null>(null);
  const current = useRef({ x: 0, y: 0, nx: 0, ny: 0 });
  const target = useRef({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    const node = targetRef.current;
    if (!node || !enabled) {
      if (node) {
        const zeros = [
          "--pointer-x",
          "--pointer-y",
          "--depth-far-x",
          "--depth-far-y",
          "--depth-mid-x",
          "--depth-mid-y",
          "--depth-near-x",
          "--depth-near-y",
          "--depth-main-x",
          "--depth-main-y",
        ];
        for (const k of zeros) node.style.setProperty(k, "0");
        node.style.setProperty("--light-x", "50%");
        node.style.setProperty("--light-y", "44%");
      }
      return;
    }

    let active = true;

    const tick = () => {
      if (!active) return;
      const c = current.current;
      const t = target.current;
      // Heavier inertia — object feels physical, not cursor-chasing
      c.x += (t.x - c.x) * 0.055;
      c.y += (t.y - c.y) * 0.055;
      c.nx += (t.nx - c.nx) * 0.065;
      c.ny += (t.ny - c.ny) * 0.065;

      node.style.setProperty("--pointer-x", c.x.toFixed(3));
      node.style.setProperty("--pointer-y", c.y.toFixed(3));
      // Far 1–2 · mid 2–4 · main 3–6 · near 4–8 (base unit 7.5)
      node.style.setProperty("--depth-far-x", (c.x * 0.2).toFixed(3));
      node.style.setProperty("--depth-far-y", (c.y * 0.2).toFixed(3));
      node.style.setProperty("--depth-mid-x", (c.x * 0.42).toFixed(3));
      node.style.setProperty("--depth-mid-y", (c.y * 0.42).toFixed(3));
      node.style.setProperty("--depth-main-x", (c.x * 0.62).toFixed(3));
      node.style.setProperty("--depth-main-y", (c.y * 0.62).toFixed(3));
      node.style.setProperty("--depth-near-x", (c.x * 0.88).toFixed(3));
      node.style.setProperty("--depth-near-y", (c.y * 0.88).toFixed(3));
      node.style.setProperty("--light-x", `${(50 + c.nx * 8).toFixed(2)}%`);
      node.style.setProperty("--light-y", `${(44 + c.ny * 6).toFixed(2)}%`);

      frameRef.current = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1));
      const ny = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1));
      target.current = { x: nx * 7.5, y: ny * 7.5, nx, ny };
    };

    const onLeave = () => {
      target.current = { x: 0, y: 0, nx: 0, ny: 0 };
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

/** Maps scroll progress through the Hero (0–1) into --scroll-p while visible. */
export function useHeroScroll(
  targetRef: React.RefObject<HTMLElement | null>,
  { enabled = true }: Options = {},
) {
  useEffect(() => {
    const node = targetRef.current;
    if (!node || !enabled) {
      node?.style.setProperty("--scroll-p", "0");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const span = Math.max(rect.height, 1);
      const p = Math.max(0, Math.min(1, -rect.top / span));
      node.style.setProperty("--scroll-p", p.toFixed(4));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [targetRef, enabled]);
}
