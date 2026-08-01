"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { HeroContent } from "./HeroContent";
import { HeroEnvironment } from "./HeroEnvironment";
import { usePointerParallax } from "./PointerParallax";
import styles from "./ImmersiveHero.module.css";

type Cta = { label: string; href: string };

type ImmersiveHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: Cta;
  secondaryCta: Cta;
};

type Phase = "idle" | "enter" | "join" | "settle";

/**
 * Continuous immersive hero — content and environment share one space.
 * No boxed scene / widget / panel.
 */
export function ImmersiveHero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: ImmersiveHeroProps) {
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
      { threshold: 0.08 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) {
      setPhase("settle");
      setCopyReady(true);
      return;
    }
    setPhase("enter");
    setCopyReady(true);
    const t1 = window.setTimeout(() => setPhase("join"), 380);
    const t2 = window.setTimeout(() => setPhase("settle"), 1400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [reduced]);

  usePointerParallax(rootRef, {
    enabled: finePointer && !reduced && inView,
  });

  return (
    <section
      ref={rootRef}
      className={cn(styles.hero, copyReady && styles.copyReady)}
      aria-labelledby="hero-title"
    >
      <HeroEnvironment phase={phase} alive={inView} reduced={reduced} />

      <Container className={styles.shell}>
        <div className={styles.copyZone}>
          <HeroContent
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            primaryCta={primaryCta}
            secondaryCta={secondaryCta}
          />
        </div>
      </Container>

      <div className={styles.transition} aria-hidden="true" />
    </section>
  );
}
