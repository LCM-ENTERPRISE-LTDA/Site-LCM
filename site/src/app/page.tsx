import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { CTASection } from "@/components/sections/CTASection";
import { EcosystemHero } from "@/components/sections/EcosystemHero";
import { PageHero } from "@/components/sections/PageHero";
import { PrincipleCard } from "@/components/sections/PrincipleCard";
import { TechnologyLayer } from "@/components/sections/TechnologyLayer";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tabs } from "@/components/ui/Tabs";
import {
  homeContent,
  principles,
  technologyLayers,
} from "@/content/institutional";
import { getProductCssVars } from "@/config/productThemes";
import { getFeaturedProducts } from "@/data/products";
import { buildMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = buildMetadata({
  title: "Home",
  description:
    "LCM Enterprise — produtos digitais, automações e inteligência artificial com foco em usabilidade e performance.",
  path: "/",
});

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      <PageHero
        eyebrow="LCM Enterprise"
        title={homeContent.hero.title}
        subtitle={homeContent.hero.subtitle}
        primaryCta={{
          label: homeContent.hero.primaryCta.label,
          href: homeContent.hero.primaryCta.href,
        }}
        secondaryCta={homeContent.hero.secondaryCta}
      >
        <EcosystemHero products={featured} />
      </PageHero>

      <Section id="produtos">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Produtos"
              title="Portfólio em evolução"
              subtitle="Cada produto tem estágio próprio. Status transparentes e editáveis em uma fonte central de dados."
            />
          </Reveal>
          <div className={styles.productGrid}>
            {featured.map((product, index) => (
              <Reveal key={product.slug} delay={Math.min(index * 70, 210)}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="elevated" id="principios">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={homeContent.principlesIntro.eyebrow}
              title={homeContent.principlesIntro.title}
              subtitle={homeContent.principlesIntro.subtitle}
            />
          </Reveal>
          <div className={styles.principleGrid}>
            {principles.map((principle, index) => (
              <Reveal key={principle.id} delay={Math.min(index * 60, 180)}>
                <PrincipleCard principle={principle} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="tecnologia">
        <Container>
          <div className={styles.split}>
            <Reveal direction="right">
              <SectionHeading
                eyebrow={homeContent.technologyIntro.eyebrow}
                title={homeContent.technologyIntro.title}
                subtitle={homeContent.technologyIntro.subtitle}
              />
              <TechnologyLayer layers={technologyLayers} />
            </Reveal>
            <Reveal direction="left" delay={80}>
              <Tabs
                label="Perspectivas tecnológicas"
                items={[
                  {
                    id: "experiencia",
                    label: "Experiência",
                    content:
                      "Interfaces claras e fluxos objetivos. A tecnologia só importa se as pessoas conseguem usá-la com confiança.",
                  },
                  {
                    id: "sistemas",
                    label: "Sistemas",
                    content:
                      "Aplicações, APIs e dados organizados para evoluir com segurança — sem promessas de escala não documentadas.",
                  },
                  {
                    id: "ia",
                    label: "IA",
                    content:
                      "Inteligência artificial tratada com responsabilidade e transparência de estágio, sempre ligada a problemas reais.",
                  },
                ]}
              />
            </Reveal>
          </div>
        </Container>
      </Section>

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
          <div className={styles.ecosystemRow}>
            <div className={styles.coreChip}>
              <Icon name="spark" size={16} />
              LCM
            </div>
            <span className={styles.connector} aria-hidden="true" />
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
