"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { HeroArtComposition } from "./HeroArtComposition";
import { HeroContent } from "./HeroContent";
import { useHeroPointer, useHeroScroll } from "./useHeroMotion";
import styles from "./HeroExperience.module.css";

type Cta = { label: string; href: string };

type HeroExperienceProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: Cta;
  secondaryCta: Cta;
};

type Phase = "idle" | "enter" | "ready";

/**
 * LCM Hero V3.2 — full-width interactive composition (frozen).
 * All motion is strictly contained inside this section (overflow: hidden).
 */
export function HeroExperience({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroExperienceProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [inView, setInView] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const [copyReady, setCopyReady] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(pointer: fine)");
    const sync = () => {
      setReduced(motion.matches);
      setFinePointer(pointer.matches);
    };
    sync();
    motion.addEventListener("change", sync);
    pointer.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      pointer.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05, rootMargin: "0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) {
      setPhase("ready");
      setCopyReady(true);
      return;
    }
    setPhase("enter");
    const tCopy = window.setTimeout(() => setCopyReady(true), 90);
    const t = window.setTimeout(() => setPhase("ready"), 220);
    return () => {
      window.clearTimeout(tCopy);
      window.clearTimeout(t);
    };
  }, [reduced]);

  useHeroPointer(rootRef, {
    enabled: finePointer && !reduced && inView,
  });

  useHeroScroll(rootRef, {
    enabled: !reduced && inView,
  });

  return (
    <section
      ref={rootRef}
      className={cn(styles.hero, !inView && styles.heroPaused)}
      aria-labelledby="hero-title"
    >
      <div className={styles.background} aria-hidden="true" />
      <HeroArtComposition phase={phase} alive={inView && !reduced} reduced={reduced} />

      <Container className={styles.shell}>
        <HeroContent
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
          ready={copyReady}
          reduced={reduced}
        />
      </Container>

      <div className={styles.exit} aria-hidden="true" />
    </section>
  );
}
