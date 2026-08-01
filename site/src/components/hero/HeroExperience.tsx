import { Container } from "@/components/ui/Container";
import { HeroContent } from "./HeroContent";
import { TriadScene } from "./TriadScene";
import styles from "./HeroExperience.module.css";

type Cta = { label: string; href: string };

type HeroExperienceProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: Cta;
  secondaryCta: Cta;
};

export function HeroExperience({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroExperienceProps) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.atmosphere} aria-hidden="true" />
      <Container className={styles.layout}>
        <div className={styles.content}>
          <HeroContent
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            primaryCta={primaryCta}
            secondaryCta={secondaryCta}
          />
        </div>
        <div className={styles.scene}>
          <TriadScene />
        </div>
      </Container>
      <div className={styles.transition} aria-hidden="true" />
    </section>
  );
}
