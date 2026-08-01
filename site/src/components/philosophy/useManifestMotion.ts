"use client";

import { useEffect, useRef } from "react";

type Options = {
  enabled?: boolean;
};

/**
 * Scroll + subtle pointer → CSS vars on the manifesto root.
 * One rAF while in view. Pointer only nudges atmosphere (≤4px).
 */
export function useManifestMotion(
  targetRef: React.RefObject<HTMLElement | null>,
  { enabled = true }: Options = {},
) {
  const frameRef = useRef<number | null>(null);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const node = targetRef.current;
    if (!node || !enabled) {
      if (node) {
        node.style.setProperty("--manifest-p", "0");
        node.style.setProperty("--handoff", "0");
        node.style.setProperty("--mx", "0");
        node.style.setProperty("--my", "0");
        node.style.setProperty("--lx", "50%");
        node.style.setProperty("--ly", "45%");
      }
      return;
    }

    let active = true;
    let inView = true;

    const updateScroll = () => {
      const rect = node.getBoundingClientRect();
      const span = Math.max(rect.height - window.innerHeight, 1);
      const p = Math.max(0, Math.min(1, -rect.top / span));
      node.style.setProperty("--manifest-p", p.toFixed(4));

      // 0→1 from mid-late cinema: sinks final phrase + pulls Technology up
      // so sticky exit never leaves an empty dark panel.
      const handoff = Math.max(0, Math.min(1, (p - 0.62) / 0.38));
      node.style.setProperty("--handoff", handoff.toFixed(4));

      // Atmosphere light bias along narrative continuum → engineering blue
      const lx = 42 + p * 16;
      const ly = 38 + p * 22 + handoff * 18;
      node.style.setProperty("--story-lx", `${lx.toFixed(1)}%`);
      node.style.setProperty("--story-ly", `${ly.toFixed(1)}%`);
    };

    const tick = () => {
      if (!active) return;
      const c = pointer.current;
      c.x += (c.tx - c.x) * 0.06;
      c.y += (c.ty - c.y) * 0.06;
      node.style.setProperty("--mx", c.x.toFixed(3));
      node.style.setProperty("--my", c.y.toFixed(3));
      node.style.setProperty("--lx", `${(50 + c.x * 0.8).toFixed(2)}%`);
      node.style.setProperty("--ly", `${(45 + c.y * 0.6).toFixed(2)}%`);

      if (inView) frameRef.current = requestAnimationFrame(tick);
      else frameRef.current = null;
    };

    const onScroll = () => {
      if (!inView) return;
      updateScroll();
    };

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      // Max 4px atmosphere nudge
      pointer.current.tx = Math.max(-1, Math.min(1, nx)) * 4;
      pointer.current.ty = Math.max(-1, Math.min(1, ny)) * 4;
    };

    const onLeave = () => {
      pointer.current.tx = 0;
      pointer.current.ty = 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = Boolean(entry?.isIntersecting);
        if (inView) {
          updateScroll();
          if (frameRef.current === null) frameRef.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.01 },
    );

    io.observe(node);
    updateScroll();
    frameRef.current = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);

    return () => {
      active = false;
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [targetRef, enabled]);
}

/** Maps global --manifest-p to per-phrase visibility (0–1) with soft overlap. */
export function phraseVisibility(progress: number, index: number, total: number): number {
  if (total <= 0) return 0;
  const start = index / total;
  const end = (index + 1) / total;
  const span = end - start;
  // Enter early, hold long, exit late — ~overlap with neighbors
  const inStart = start - span * 0.08;
  const fullA = start + span * 0.18;
  // Final phrase holds through track end so Technology can carry the exit —
  // avoids an empty sticky viewport before the engineering section.
  const isLast = index === total - 1;
  const fullB = isLast ? 1 : end - span * 0.18;
  const outEnd = isLast ? 1.12 : end + span * 0.08;

  if (progress <= inStart || progress >= outEnd) return 0;
  if (progress < fullA) {
    return Math.max(0, Math.min(1, (progress - inStart) / (fullA - inStart || 0.001)));
  }
  if (progress > fullB) {
    return Math.max(0, Math.min(1, 1 - (progress - fullB) / (outEnd - fullB || 0.001)));
  }
  return 1;
}
