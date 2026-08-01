import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import styles from "./CTASection.module.css";

type CTASectionProps = {
  title: string;
  subtitle?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function CTASection({ title, subtitle, primaryCta, secondaryCta }: CTASectionProps) {
  return (
    <Section tone="brand">
      <Container>
        <div className={styles.wrap}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
          <div className={styles.actions}>
            <LinkButton href={primaryCta.href}>{primaryCta.label}</LinkButton>
            {secondaryCta ? (
              <LinkButton href={secondaryCta.href} variant="secondary">
                {secondaryCta.label}
              </LinkButton>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
