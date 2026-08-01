import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import styles from "./PageHero.module.css";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  children?: React.ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  children,
}: PageHeroProps) {
  return (
    <div className={styles.hero}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.copy}>
            {eyebrow ? <Badge tone="brand">{eyebrow}</Badge> : null}
            <h1 className={styles.title}>{title}</h1>
            {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
            {(primaryCta || secondaryCta) && (
              <div className={styles.actions}>
                {primaryCta ? (
                  <LinkButton href={primaryCta.href}>
                    {primaryCta.label}
                    <Icon name="arrow-right" size={16} />
                  </LinkButton>
                ) : null}
                {secondaryCta ? (
                  <LinkButton href={secondaryCta.href} variant="secondary">
                    {secondaryCta.label}
                  </LinkButton>
                ) : null}
              </div>
            )}
          </div>
          {children ? <div className={styles.aside}>{children}</div> : null}
        </div>
      </Container>
    </div>
  );
}
