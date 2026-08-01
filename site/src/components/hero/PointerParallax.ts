"use client";

import { useEffect, useRef } from "react";

type PointerParallaxOptions = {
  /** Base unit for main-layer parallax (px). Other layers scale from this. */
  maxOffset?: number;
  enabled?: boolean;
};

/** Normalized hotspot positions inside the scene (0–1). */
const HOTSPOTS = {
  top: { x: 0.5, y: 0.284 },
  left: { x: 0.305, y: 0.726 },
  right: { x: 0.695, y: 0.726 },
  core: { x: 0.5, y: 0.553 },
} as const;

function proximity(nx: number, ny: number, hx: number, hy: number) {
  const dx = nx - hx;
  const dy = ny - hy;
  const d = Math.sqrt(dx * dx + dy * dy);
  // Soft falloff — influence within ~28% of stage diagonal
  return Math.max(0, 1 - d / 0.28);
}

/**
 * Multi-layer pointer → CSS variables (no React re-renders).
 * Sets parallax depths, metallic light position, and module proximity.
 */
export function usePointerParallax(
  targetRef: React.RefObject<HTMLElement | null>,
  { maxOffset = 10, enabled = true }: PointerParallaxOptions = {},
) {
  const frameRef = useRef<number | null>(null);
  const current = useRef({ x: 0, y: 0, nx: 0, ny: 0 });
  const target = useRef({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    const node = targetRef.current;
    if (!node || !enabled) {
      if (node) {
        const reset = [
          ["--px", "0"],
          ["--py", "0"],
          ["--px-bg", "0"],
          ["--py-bg", "0"],
          ["--px-main", "0"],
          ["--py-main", "0"],
          ["--px-fg", "0"],
          ["--py-fg", "0"],
          ["--px-glow", "0"],
          ["--py-glow", "0"],
          ["--px-part", "0"],
          ["--py-part", "0"],
          ["--plight-x", "52%"],
          ["--plight-y", "38%"],
          ["--near-top", "0"],
          ["--near-left", "0"],
          ["--near-right", "0"],
          ["--near-core", "0"],
        ] as const;
        for (const [k, v] of reset) node.style.setProperty(k, v);
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
      c.nx += (t.nx - c.nx) * 0.1;
      c.ny += (t.ny - c.ny) * 0.1;

      const unit = maxOffset;
      node.style.setProperty("--px", c.x.toFixed(3));
      node.style.setProperty("--py", c.y.toFixed(3));
      // Independent layer depths (2–12px range)
      node.style.setProperty("--px-bg", (c.x * 0.22).toFixed(3));
      node.style.setProperty("--py-bg", (c.y * 0.22).toFixed(3));
      node.style.setProperty("--px-main", (c.x * 0.72).toFixed(3));
      node.style.setProperty("--py-main", (c.y * 0.72).toFixed(3));
      node.style.setProperty("--px-fg", (c.x * 1.15).toFixed(3));
      node.style.setProperty("--py-fg", (c.y * 1.15).toFixed(3));
      node.style.setProperty("--px-glow", (c.x * 0.45).toFixed(3));
      node.style.setProperty("--py-glow", (c.y * 0.45).toFixed(3));
      node.style.setProperty("--px-part", (c.x * 0.9).toFixed(3));
      node.style.setProperty("--py-part", (c.y * 0.9).toFixed(3));

      const lx = 50 + (c.x / unit) * 18;
      const ly = 40 + (c.y / unit) * 16;
      node.style.setProperty("--plight-x", `${lx.toFixed(2)}%`);
      node.style.setProperty("--plight-y", `${ly.toFixed(2)}%`);

      // Pointer as 0–1 for proximity (nx from -1..1 → 0..1)
      const px = (c.nx + 1) / 2;
      const py = (c.ny + 1) / 2;
      node.style.setProperty("--near-top", proximity(px, py, HOTSPOTS.top.x, HOTSPOTS.top.y).toFixed(3));
      node.style.setProperty("--near-left", proximity(px, py, HOTSPOTS.left.x, HOTSPOTS.left.y).toFixed(3));
      node.style.setProperty("--near-right", proximity(px, py, HOTSPOTS.right.x, HOTSPOTS.right.y).toFixed(3));
      node.style.setProperty("--near-core", proximity(px, py, HOTSPOTS.core.x, HOTSPOTS.core.y).toFixed(3));

      // Avoid writing when nearly settled and idle — still need continuous lerp while moving
      frameRef.current = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      const cx = Math.max(-1, Math.min(1, nx));
      const cy = Math.max(-1, Math.min(1, ny));
      target.current.x = cx * maxOffset;
      target.current.y = cy * maxOffset;
      target.current.nx = cx;
      target.current.ny = cy;
    };

    const onLeave = () => {
      target.current.x = 0;
      target.current.y = 0;
      target.current.nx = 0;
      target.current.ny = 0;
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
