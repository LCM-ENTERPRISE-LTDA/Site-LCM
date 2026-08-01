import { LinkButton } from "@/components/ui/Button";
import { ProductStatusBadge } from "@/components/product/ProductStatusBadge";
import type { Product } from "@/types/product";
import { cn } from "@/lib/cn";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <article
      className={cn(styles.card, className)}
      style={
        {
          "--product-accent": `var(--product-${product.colorKey === "studio" ? "studio" : product.colorKey})`,
          "--product-accent-soft": `var(--product-${product.colorKey === "studio" ? "studio" : product.colorKey}-soft)`,
        } as React.CSSProperties
      }
    >
      <div className={styles.visual} aria-hidden="true">
        <span className={styles.orb} />
        <span className={styles.grid} />
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <h3 className={styles.name}>{product.name}</h3>
          <ProductStatusBadge status={product.status} />
        </div>
        <p className={styles.tagline}>{product.tagline}</p>
        <p className={styles.description}>{product.description}</p>
        <LinkButton href={product.href} variant="secondary" size="sm">
          Ver produto
        </LinkButton>
      </div>
    </article>
  );
}
