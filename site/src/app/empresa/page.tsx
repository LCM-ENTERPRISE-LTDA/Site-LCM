import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { companyContent } from "@/content/institutional";
import { products } from "@/data/products";
import { buildMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = buildMetadata({
  title: "Empresa",
  description:
    "Conheça a LCM Enterprise: origem em Goiás, foco em produtos próprios, usabilidade e performance.",
  path: "/empresa",
});

export default function EmpresaPage() {
  return (
    <>
      <PageHero
        eyebrow="Empresa"
        title={companyContent.hero.title}
        subtitle={companyContent.hero.subtitle}
        primaryCta={{ label: "Ver produtos", href: "/produtos" }}
        secondaryCta={{ label: "Fale conosco", href: "/contato" }}
      />

      <Section>
        <Container>
          <div className={styles.grid}>
            <Reveal>
              <FeatureCard title={companyContent.origin.title} description={companyContent.origin.body} />
            </Reveal>
            <Reveal delay={80}>
              <FeatureCard title={companyContent.problem.title} description={companyContent.problem.body} />
            </Reveal>
            <Reveal delay={120}>
              <FeatureCard title={companyContent.thinking.title} description={companyContent.thinking.body} />
            </Reveal>
            <Reveal delay={160}>
              <FeatureCard title={companyContent.craft.title} description={companyContent.craft.body} />
            </Reveal>
            <Reveal delay={200}>
              <FeatureCard title={companyContent.place.title} description={companyContent.place.body} />
            </Reveal>
          </div>
          <p className="draft-note">Textos institucionais em rascunho — sujeitos a aprovação.</p>
        </Container>
      </Section>

      <Section tone="elevated">
        <Container>
          <SectionHeading
            eyebrow="Produtos"
            title="O que estamos construindo"
            subtitle="Portfólio com status transparentes. Nenhum produto é apresentado como disponível sem confirmação."
          />
          <div className={styles.products}>
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        title="Quer conhecer a LCM de perto?"
        primaryCta={{ label: "Entrar em contato", href: "/contato" }}
        secondaryCta={{ label: "Ver tecnologia", href: "/tecnologia" }}
      />
    </>
  );
}
