import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { TechnologyLayer } from "@/components/sections/TechnologyLayer";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { technologyLayers, technologyPageContent } from "@/content/institutional";
import { buildMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = buildMetadata({
  title: "Tecnologia",
  description:
    "Princípios de engenharia e produto da LCM: usabilidade, performance, segurança, dados, automação e IA responsável.",
  path: "/tecnologia",
});

export default function TecnologiaPage() {
  return (
    <>
      <PageHero
        eyebrow="Tecnologia"
        title={technologyPageContent.hero.title}
        subtitle={technologyPageContent.hero.subtitle}
        primaryCta={{ label: "Ver produtos", href: "/produtos" }}
      />

      <Section>
        <Container>
          <SectionHeading title="Camadas da experiência" />
          <TechnologyLayer layers={technologyLayers} />
        </Container>
      </Section>

      <Section tone="elevated">
        <Container>
          <div className={styles.grid}>
            {technologyPageContent.sections.map((section, index) => (
              <Reveal key={section.title} delay={Math.min(index * 60, 240)}>
                <FeatureCard title={section.title} description={section.body} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        title="Vamos conversar sobre o seu próximo produto?"
        primaryCta={{ label: "Entrar em contato", href: "/contato" }}
        secondaryCta={{ label: "Conhecer a empresa", href: "/empresa" }}
      />
    </>
  );
}
