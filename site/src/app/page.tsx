import { Reveal } from "@/components/motion/Reveal";
import { HeroExperience } from "@/components/hero/HeroExperience";
import { PrinciplesBand } from "@/components/hero/PrinciplesBand";
import { PhilosophyExperience } from "@/components/philosophy/PhilosophyExperience";
import { ProductShowcase } from "@/components/showcase/ProductShowcase";
import { CTASection } from "@/components/sections/CTASection";
import { TechnologyExperience } from "@/components/technology/TechnologyExperience";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeContent, principles } from "@/content/institutional";
import { getProductCssVars } from "@/config/productThemes";
import { getFeaturedProducts } from "@/data/products";
import { buildMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = buildMetadata({
  title: "Home",
  description:
    "LCM — produtos digitais, automações e inteligência artificial com foco em usabilidade e performance.",
  path: "/",
});

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      <HeroExperience
        eyebrow={homeContent.hero.eyebrow}
        title={homeContent.hero.title}
        subtitle={homeContent.hero.subtitle}
        primaryCta={homeContent.hero.primaryCta}
        secondaryCta={homeContent.hero.secondaryCta}
      />

      <PrinciplesBand principles={principles} />

      <ProductShowcase />

      <PhilosophyExperience />

      <TechnologyExperience />

      <Section tone="elevated" id="ecossistema">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={homeContent.ecosystem.eyebrow}
              title={homeContent.ecosystem.title}
              subtitle={homeContent.ecosystem.subtitle}
              align="center"
            />
          </Reveal>
          <div className={styles.triadRow}>
            <div className={styles.coreChip}>
              <Icon name="spark" size={16} />
              Três partes
            </div>
            <span className={styles.connector} aria-hidden="true" />
            <div className={styles.coreChip}>Uma estrutura</div>
            <span className={styles.connector} aria-hidden="true" />
            <div className={styles.coreChip}>Um ecossistema</div>
          </div>
          <div className={styles.ecosystemRow}>
            {featured.map((product) => (
              <div
                key={product.slug}
                className={styles.productChip}
                style={getProductCssVars(product.colorKey)}
              >
                {product.name}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="origem">
        <Container>
          <Reveal direction="up">
            <div className={styles.originBlock}>
              <SectionHeading
                eyebrow={homeContent.origin.eyebrow}
                title={homeContent.origin.title}
              />
              <p className={styles.origin}>{homeContent.origin.body}</p>
              <p className="draft-note">{homeContent.origin.draftNote}</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTASection
        title={homeContent.finalCta.title}
        primaryCta={homeContent.finalCta.primaryCta}
        secondaryCta={homeContent.finalCta.secondaryCta}
      />
    </>
  );
}
