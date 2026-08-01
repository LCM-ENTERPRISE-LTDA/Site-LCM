"use client";

import { useEffect, useRef } from "react";

type Options = {
  enabled?: boolean;
};

/**
 * Single rAF → CSS variables on the Hero root only.
 * Drives art depth, light, and subtle copy parallax.
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
          "--copy-x",
          "--copy-y",
          "--copy-rx",
          "--copy-ry",
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
      // Responsive but still physical
      c.x += (t.x - c.x) * 0.072;
      c.y += (t.y - c.y) * 0.072;
      c.nx += (t.nx - c.nx) * 0.08;
      c.ny += (t.ny - c.ny) * 0.08;

      node.style.setProperty("--pointer-x", c.x.toFixed(3));
      node.style.setProperty("--pointer-y", c.y.toFixed(3));
      node.style.setProperty("--depth-far-x", (c.x * 0.22).toFixed(3));
      node.style.setProperty("--depth-far-y", (c.y * 0.22).toFixed(3));
      node.style.setProperty("--depth-mid-x", (c.x * 0.48).toFixed(3));
      node.style.setProperty("--depth-mid-y", (c.y * 0.48).toFixed(3));
      node.style.setProperty("--depth-main-x", (c.x * 0.7).toFixed(3));
      node.style.setProperty("--depth-main-y", (c.y * 0.7).toFixed(3));
      node.style.setProperty("--depth-near-x", (c.x * 0.95).toFixed(3));
      node.style.setProperty("--depth-near-y", (c.y * 0.95).toFixed(3));
      // Copy moves opposite & softer — depth cue without fighting readability
      node.style.setProperty("--copy-x", (c.x * -0.28).toFixed(3));
      node.style.setProperty("--copy-y", (c.y * -0.22).toFixed(3));
      node.style.setProperty("--copy-rx", (c.ny * -1.2).toFixed(3));
      node.style.setProperty("--copy-ry", (c.nx * 1.4).toFixed(3));
      node.style.setProperty("--light-x", `${(50 + c.nx * 12).toFixed(2)}%`);
      node.style.setProperty("--light-y", `${(44 + c.ny * 9).toFixed(2)}%`);

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
