"use client";

import { usePointerField } from "@/motion/usePointerField";

export {
  usePrefersReducedMotion,
  usePresence as useChapterPresence,
} from "@/motion/useMotion";

/** Layered light pointer — inertia, max ~5px base. CSS multiplies per layer. */
export function useAutoHistPointer(
  targetRef: React.RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  usePointerField(targetRef, enabled, {
    maxPx: 5,
    lerp: 0.04,
    listen: "element",
    varX: "--ax",
    varY: "--ay",
    lightVarX: "--alx",
    lightVarY: "--aly",
    lightBaseX: 52,
    lightBaseY: 48,
    lightRangeX: 0.55,
    lightRangeY: 0.45,
  });
}
