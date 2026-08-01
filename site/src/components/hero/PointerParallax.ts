"use client";

import { useEffect, useRef } from "react";

type Options = {
  enabled?: boolean;
};

/** Hotspots in normalized 0–1 space — nucleus cluster center-right. */
const HOTSPOTS = {
  a: { x: 0.68, y: 0.3 },
  b: { x: 0.58, y: 0.58 },
  c: { x: 0.78, y: 0.58 },
  core: { x: 0.68, y: 0.44 },
} as const;

function proximity(nx: number, ny: number, hx: number, hy: number) {
  const dx = nx - hx;
  const dy = ny - hy;
  return Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 0.32);
}

/**
 * Single rAF loop → CSS variables on the Immersive Hero root.
 * Influences the entire environment (not a boxed scene).
 */
export function usePointerParallax(
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
            node.style.setProperty("--hero-light-x", "68%");
            node.style.setProperty("--hero-light-y", "42%");
            const zeroKeys = [
              "--hero-depth-bg",
              "--hero-depth-main",
              "--hero-depth-fg",
              "--px-atm",
              "--py-atm",
              "--px-grid",
              "--py-grid",
              "--px-light",
              "--py-light",
              "--px-bg",
              "--py-bg",
              "--px-main",
              "--py-main",
              "--px-part",
              "--py-part",
              "--px-fg",
              "--py-fg",
              "--px-sig",
              "--py-sig",
              "--near-a",
              "--near-b",
              "--near-c",
              "--near-core",
            ];
            for (const key of zeroKeys) node.style.setProperty(key, "0");
      }
      return;
    }

    let active = true;

    const tick = () => {
      if (!active) return;
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * 0.065;
      c.y += (t.y - c.y) * 0.065;
      c.nx += (t.nx - c.nx) * 0.09;
      c.ny += (t.ny - c.ny) * 0.09;

      // Independent depths (px). Base unit ~10.
      node.style.setProperty("--px-atm", (c.x * 0.12).toFixed(3));
      node.style.setProperty("--py-atm", (c.y * 0.12).toFixed(3));
      node.style.setProperty("--px-grid", (c.x * 0.28).toFixed(3));
      node.style.setProperty("--py-grid", (c.y * 0.28).toFixed(3));
      node.style.setProperty("--px-light", (c.x * 0.45).toFixed(3));
      node.style.setProperty("--py-light", (c.y * 0.45).toFixed(3));
      node.style.setProperty("--px-bg", (c.x * 0.25).toFixed(3));
      node.style.setProperty("--py-bg", (c.y * 0.25).toFixed(3));
      node.style.setProperty("--px-main", (c.x * 0.65).toFixed(3));
      node.style.setProperty("--py-main", (c.y * 0.65).toFixed(3));
      node.style.setProperty("--px-part", (c.x * 0.85).toFixed(3));
      node.style.setProperty("--py-part", (c.y * 0.85).toFixed(3));
      node.style.setProperty("--px-fg", (c.x * 1.2).toFixed(3));
      node.style.setProperty("--py-fg", (c.y * 1.2).toFixed(3));
      node.style.setProperty("--px-sig", (c.x * 0.4).toFixed(3));
      node.style.setProperty("--py-sig", (c.y * 0.4).toFixed(3));

      node.style.setProperty("--hero-depth-bg", (c.x * 0.25).toFixed(3));
      node.style.setProperty("--hero-depth-main", (c.x * 0.65).toFixed(3));
      node.style.setProperty("--hero-depth-fg", (c.x * 1.2).toFixed(3));

      const lx = 68 + c.nx * 12;
      const ly = 42 + c.ny * 10;
      node.style.setProperty("--hero-light-x", `${lx.toFixed(2)}%`);
      node.style.setProperty("--hero-light-y", `${ly.toFixed(2)}%`);

      const px = (c.nx + 1) / 2;
      const py = (c.ny + 1) / 2;
      node.style.setProperty("--near-a", proximity(px, py, HOTSPOTS.a.x, HOTSPOTS.a.y).toFixed(3));
      node.style.setProperty("--near-b", proximity(px, py, HOTSPOTS.b.x, HOTSPOTS.b.y).toFixed(3));
      node.style.setProperty("--near-c", proximity(px, py, HOTSPOTS.c.x, HOTSPOTS.c.y).toFixed(3));
      node.style.setProperty("--near-core", proximity(px, py, HOTSPOTS.core.x, HOTSPOTS.core.y).toFixed(3));

      frameRef.current = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1));
      const ny = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1));
      target.current = { x: nx * 10, y: ny * 10, nx, ny };
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
