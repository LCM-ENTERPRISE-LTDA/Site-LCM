import { HeroActions } from "./HeroActions";
import styles from "./HeroContent.module.css";

type Cta = { label: string; href: string };

type HeroContentProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: Cta;
  secondaryCta: Cta;
};

export function HeroContent({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroContentProps) {
  const lines = title.split("\n");

  return (
    <div className={styles.copy}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 id="hero-title" className={styles.title}>
        {lines.map((line, index) => (
          <span key={line}>
            {line}
            {index < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </h1>
      <p className={styles.subtitle}>{subtitle}</p>
      <HeroActions primary={primaryCta} secondary={secondaryCta} />
    </div>
  );
}
