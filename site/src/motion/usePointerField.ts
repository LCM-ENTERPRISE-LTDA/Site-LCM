"use client";

import { useEffect, useRef } from "react";

export type PointerFieldOptions = {
  /** Max displacement in px written to varX/varY (before CSS multipliers). */
  maxPx?: number;
  /** Inertia — lower is heavier. */
  lerp?: number;
  /** Track the element itself or the whole window (for fixed layers). */
  listen?: "element" | "window";
  varX?: string;
  varY?: string;
  /** Optional light-position vars, written as percentages. */
  lightVarX?: string;
  lightVarY?: string;
  lightBaseX?: number;
  lightBaseY?: number;
  lightRangeX?: number;
  lightRangeY?: number;
};

/**
 * Single-rAF pointer field with inertia.
 * Writes CSS variables only — never React state per frame.
 * Desktop fine-pointer only; resets vars when disabled.
 */
export function usePointerField(
  targetRef: React.RefObject<HTMLElement | null>,
  enabled: boolean,
  {
    maxPx = 4,
    lerp = 0.04,
    listen = "element",
    varX = "--mx",
    varY = "--my",
    lightVarX,
    lightVarY,
    lightBaseX = 52,
    lightBaseY = 48,
    lightRangeX = 0.55,
    lightRangeY = 0.45,
  }: PointerFieldOptions = {},
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
        node.style.setProperty(varX, "0");
        node.style.setProperty(varY, "0");
        if (lightVarX) node.style.setProperty(lightVarX, `${lightBaseX}%`);
        if (lightVarY) node.style.setProperty(lightVarY, `${lightBaseY}%`);
      }
      return;
    }

    let active = true;
    const tick = () => {
      if (!active) return;
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * lerp;
      c.y += (t.y - c.y) * lerp;
      node.style.setProperty(varX, c.x.toFixed(3));
      node.style.setProperty(varY, c.y.toFixed(3));
      if (lightVarX) {
        node.style.setProperty(
          lightVarX,
          `${(lightBaseX + c.x * lightRangeX).toFixed(2)}%`,
        );
      }
      if (lightVarY) {
        node.style.setProperty(
          lightVarY,
          `${(lightBaseY + c.y * lightRangeY).toFixed(2)}%`,
        );
      }
      frameRef.current = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      let nx: number;
      let ny: number;
      if (listen === "window") {
        nx = (event.clientX / window.innerWidth) * 2 - 1;
        ny = (event.clientY / window.innerHeight) * 2 - 1;
      } else {
        const rect = node.getBoundingClientRect();
        nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      }
      target.current = {
        x: Math.max(-1, Math.min(1, nx)) * maxPx,
        y: Math.max(-1, Math.min(1, ny)) * maxPx,
      };
    };

    const onLeave = () => {
      target.current = { x: 0, y: 0 };
    };

    if (listen === "window") {
      window.addEventListener("pointermove", onMove);
      window.addEventListener("blur", onLeave);
    } else {
      node.addEventListener("pointermove", onMove);
      node.addEventListener("pointerleave", onLeave);
    }
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (listen === "window") {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("blur", onLeave);
      } else {
        node.removeEventListener("pointermove", onMove);
        node.removeEventListener("pointerleave", onLeave);
      }
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [
    targetRef,
    enabled,
    maxPx,
    lerp,
    listen,
    varX,
    varY,
    lightVarX,
    lightVarY,
    lightBaseX,
    lightBaseY,
    lightRangeX,
    lightRangeY,
  ]);
}
