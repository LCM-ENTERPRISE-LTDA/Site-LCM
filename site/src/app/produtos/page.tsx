import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { principles, productsIndexContent } from "@/content/institutional";
import { products } from "@/data/products";
import { buildMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = buildMetadata({
  title: "Produtos",
  description:
    "Portfólio LCM: AutoHist, Dyson, LCM Studio e BusinessZap — com status de desenvolvimento transparentes.",
  path: "/produtos",
});

export default function ProdutosPage() {
  return (
    <>
      <PageHero
        eyebrow="Produtos"
        title={productsIndexContent.hero.title}
        subtitle={productsIndexContent.hero.subtitle}
        primaryCta={{ label: "Falar com a LCM", href: "/contato" }}
      />

      <Section>
        <Container>
          <div className={styles.grid}>
            {products.map((product, index) => (
              <Reveal key={product.slug} delay={Math.min(index * 70, 210)}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="elevated">
        <Container>
          <SectionHeading
            eyebrow="Princípios"
            title="O que todos os produtos compartilham"
          />
          <Accordion
            items={principles.map((principle) => ({
              id: principle.id,
              title: principle.title,
              content: principle.description,
            }))}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              title={productsIndexContent.evaluation.title}
            />
            <p className={styles.copy}>{productsIndexContent.evaluation.body}</p>
          </Reveal>
        </Container>
      </Section>

      <CTASection
        title="Tem um problema real para resolver?"
        primaryCta={{ label: "Entrar em contato", href: "/contato" }}
        secondaryCta={{ label: "Conhecer a empresa", href: "/empresa" }}
      />
    </>
  );
}
