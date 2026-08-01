import { LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ProductStatusBadge } from "@/components/product/ProductStatusBadge";
import { getProductCssVars } from "@/config/productThemes";
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
      style={getProductCssVars(product.colorKey)}
    >
      <div className={styles.visual} aria-hidden="true">
        <span className={styles.orb} />
        <span className={styles.grid} />
        <span className={styles.mark}>{product.shortName ?? product.name}</span>
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
          <Icon name="arrow-right" size={16} />
        </LinkButton>
      </div>
    </article>
  );
}
