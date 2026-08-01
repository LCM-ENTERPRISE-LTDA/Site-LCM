import { PageHero } from "@/components/sections/PageHero";
import { ProductStatusBadge } from "@/components/product/ProductStatusBadge";
import { getProductCssVars } from "@/config/productThemes";
import type { Product } from "@/types/product";
import styles from "./ProductHero.module.css";

type ProductHeroProps = {
  product: Product;
};

export function ProductHero({ product }: ProductHeroProps) {
  return (
    <PageHero
      eyebrow="Produto LCM"
      title={product.name}
      subtitle={product.tagline}
      primaryCta={{ label: "Falar com a LCM", href: "/contato" }}
      secondaryCta={{ label: "Ver todos os produtos", href: "/produtos" }}
    >
      <div className={styles.panel} style={getProductCssVars(product.colorKey)}>
        <div className={styles.status}>
          <ProductStatusBadge status={product.status} />
          <span>{product.availabilityLabel}</span>
        </div>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.mock} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className={styles.caption}>Espaço reservado para mockups e screenshots reais.</p>
      </div>
    </PageHero>
  );
}
