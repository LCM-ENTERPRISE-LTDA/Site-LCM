import { Reveal } from "@/components/motion/Reveal";
import { EcosystemExperience } from "@/components/ecosystem/EcosystemExperience";
import { HeroExperience } from "@/components/hero/HeroExperience";
import { PrinciplesBand } from "@/components/hero/PrinciplesBand";
import { PhilosophyExperience } from "@/components/philosophy/PhilosophyExperience";
import { ProductShowcase } from "@/components/showcase/ProductShowcase";
import { CTASection } from "@/components/sections/CTASection";
import { TechnologyExperience } from "@/components/technology/TechnologyExperience";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeContent, principles } from "@/content/institutional";
import { buildMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = buildMetadata({
  title: "Home",
  description:
    "LCM — produtos digitais, automações e inteligência artificial com foco em usabilidade e performance.",
  path: "/",
});

export default function HomePage() {
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

      <EcosystemExperience />

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
