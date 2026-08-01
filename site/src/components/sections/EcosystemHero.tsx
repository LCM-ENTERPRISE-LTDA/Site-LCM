"use client";

import { getProductCssVars } from "@/config/productThemes";
import type { Product } from "@/types/product";
import { cn } from "@/lib/cn";
import styles from "./EcosystemHero.module.css";

type EcosystemHeroProps = {
  products: Product[];
  className?: string;
};

const slotClass = [styles.slot0, styles.slot1, styles.slot2, styles.slot3] as const;

export function EcosystemHero({ products, className }: EcosystemHeroProps) {
  return (
    <div className={cn(styles.wrap, className)} aria-hidden="true">
      <div className={styles.canvas}>
        <div className={styles.glow} />
        <svg className={styles.lines} viewBox="0 0 400 420" fill="none">
          <path
            className={styles.path}
            d="M200 72V128M200 128L78 190M200 128L322 190M200 128V248M200 248L78 310M200 248L322 310"
          />
        </svg>

        <div className={cn(styles.node, styles.core)}>
          <span className={styles.coreLabel}>LCM</span>
        </div>

        {products.slice(0, 4).map((product, index) => (
          <div
            key={product.slug}
            className={cn(styles.node, slotClass[index])}
            style={getProductCssVars(product.colorKey)}
          >
            <span className={styles.dot} />
            <span className={styles.nodeLabel}>{product.shortName ?? product.name}</span>
          </div>
        ))}
      </div>
      <p className={styles.caption}>Ecossistema de produtos — visão institucional</p>
    </div>
  );
}
