import { ProductFeature } from "./ProductFeature";
import { showcaseEntries, showcaseIntro } from "@/content/showcase";
import { getProductBySlug } from "@/data/products";
import styles from "./ProductShowcase.module.css";

export function ProductShowcase() {
  const entries = showcaseEntries
    .map((entry) => {
      const product = getProductBySlug(entry.slug);
      if (!product) return null;
      return { entry, product };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <section id="produtos" className={styles.showcase} aria-labelledby="showcase-heading">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{showcaseIntro.eyebrow}</p>
        <h2 id="showcase-heading" className={styles.title}>
          {showcaseIntro.title}
        </h2>
        <p className={styles.subtitle}>{showcaseIntro.subtitle}</p>
      </div>

      <div className={styles.stack}>
        {entries.map(({ entry, product }) => (
          <ProductFeature key={entry.slug} entry={entry} product={product} />
        ))}
      </div>
    </section>
  );
}
