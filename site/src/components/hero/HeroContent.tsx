"use client";

import { cn } from "@/lib/cn";
import { AnimatedTitle } from "./AnimatedTitle";
import { HeroActions } from "./HeroActions";
import styles from "./HeroContent.module.css";

type Cta = { label: string; href: string };

type HeroContentProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  ready: boolean;
  reduced: boolean;
};

export function HeroContent({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  ready,
  reduced,
}: HeroContentProps) {
  return (
    <div className={cn(styles.copy, ready && styles.ready, reduced && styles.reduced)}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <AnimatedTitle id="hero-title" title={title} ready={ready} reduced={reduced} />
      <p className={styles.subtitle}>{subtitle}</p>
      <div className={styles.actions}>
        <HeroActions primary={primaryCta} secondary={secondaryCta} />
      </div>
    </div>
  );
}
