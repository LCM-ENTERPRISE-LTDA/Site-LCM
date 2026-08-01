"use client";

import { useEffect, useRef, useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ProductStatusBadge } from "@/components/product/ProductStatusBadge";
import { getProductCssVars } from "@/config/productThemes";
import type { ShowcaseEntry } from "@/content/showcase";
import type { Product } from "@/types/product";
import { cn } from "@/lib/cn";
import {
  AutoHistVisual,
  BusinessZapVisual,
  DysonVisual,
  StudioVisual,
} from "./ShowcaseVisuals";
import { useFeaturePointer } from "./useFeaturePointer";
import styles from "./ProductFeature.module.css";

type Props = {
  entry: ShowcaseEntry;
  product: Product;
};

export function ProductFeature({ entry, product }: Props) {
  const rootRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(pointer: fine)");
    const sync = () => {
      setReduced(motion.matches);
      setFinePointer(pointer.matches);
    };
    sync();
    motion.addEventListener("change", sync);
    pointer.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      pointer.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    if (reduced) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entryObs]) => {
        if (entryObs?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.22, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [reduced]);

  useFeaturePointer(rootRef, {
    enabled: finePointer && !reduced && inView,
  });

  const Visual =
    entry.motion === "timeline"
      ? AutoHistVisual
      : entry.motion === "constellation"
        ? DysonVisual
        : entry.motion === "canvas"
          ? StudioVisual
          : BusinessZapVisual;

  const lines = entry.headline.split("\n");

  return (
    <article
      ref={rootRef}
      className={cn(
        styles.feature,
        styles[entry.motion],
        styles[entry.align],
        inView && styles.visible,
        reduced && styles.reduced,
      )}
      style={getProductCssVars(entry.colorKey)}
      aria-labelledby={`showcase-${entry.slug}-title`}
    >
      <div className={styles.atmosphere} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={styles.meta}>
            <span className={styles.index}>{entry.index}</span>
            <span className={styles.eyebrow}>{entry.eyebrow}</span>
            <ProductStatusBadge status={product.status} />
          </div>

          <h3 id={`showcase-${entry.slug}-title`} className={styles.headline}>
            {lines.map((line) => (
              <span key={line} className={styles.line}>
                {line}
              </span>
            ))}
          </h3>

          <p className={styles.support}>{entry.support}</p>

          <div className={styles.actions}>
            <LinkButton href={product.href} className={styles.cta}>
              {entry.cta}
              <Icon name="arrow-right" size={16} />
            </LinkButton>
          </div>
        </div>

        <div className={styles.stage}>
          <div className={styles.stageGlow} aria-hidden="true" />
          <Visual alive={inView} />
        </div>
      </div>
    </article>
  );
}
