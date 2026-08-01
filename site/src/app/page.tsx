import { EcosystemExperience } from "@/components/ecosystem/EcosystemExperience";
import { HeroExperience } from "@/components/hero/HeroExperience";
import { PrinciplesBand } from "@/components/hero/PrinciplesBand";
import { OriginVisionExperience } from "@/components/origin/OriginVisionExperience";
import { PhilosophyExperience } from "@/components/philosophy/PhilosophyExperience";
import { ProductShowcase } from "@/components/showcase/ProductShowcase";
import { CTASection } from "@/components/sections/CTASection";
import { TechnologyExperience } from "@/components/technology/TechnologyExperience";
import { homeContent, principles } from "@/content/institutional";
import { buildMetadata } from "@/lib/metadata";

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

      <OriginVisionExperience />

      <CTASection
        title={homeContent.finalCta.title}
        primaryCta={homeContent.finalCta.primaryCta}
        secondaryCta={homeContent.finalCta.secondaryCta}
      />
    </>
  );
}
