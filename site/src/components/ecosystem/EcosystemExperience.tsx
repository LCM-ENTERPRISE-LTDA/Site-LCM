"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ecosystemCopy, ecosystemProducts } from "@/content/ecosystem";
import { EcosystemField } from "./EcosystemField";
import { useEcosystemMotion } from "./useEcosystemMotion";
import styles from "./EcosystemExperience.module.css";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function EcosystemExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const [alive, setAlive] = useState(false);
  const [focusId, setFocusId] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();

  useEcosystemMotion(rootRef, {
    enabled: !reduced && alive,
    onFocusChange: setFocusId,
  });

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setAlive(entry.isIntersecting && entry.intersectionRatio > 0.12);
      },
      { threshold: [0, 0.12, 0.3] },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      id="ecossistema"
      className={`${styles.root} ${alive ? styles.alive : ""}`}
      aria-labelledby="ecosystem-title"
      style={
        {
          ["--ex"]: "0",
          ["--ey"]: "0",
          ["--elx"]: "50%",
          ["--ely"]: "48%",
        } as CSSProperties
      }
    >
      <div className={styles.entryBridge} aria-hidden="true" />
      <div className={styles.atmosphere} aria-hidden="true">
        <div className={styles.mist} />
        <div className={styles.grain} />
      </div>

      <Container className={styles.container}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>{ecosystemCopy.eyebrow}</p>
          <h2 id="ecosystem-title" className={styles.title}>
            {ecosystemCopy.title}
          </h2>
          <p className={styles.subtitle}>{ecosystemCopy.subtitle}</p>
        </header>

        <EcosystemField alive={alive && !reduced} focusId={focusId} />

        {/* Accessible product list — always available without hover */}
        <ul className={styles.srProducts}>
          {ecosystemProducts.map((p) => (
            <li key={p.id}>
              <strong>{p.name}</strong> — {p.note}
            </li>
          ))}
        </ul>

        <ul className={styles.principles} aria-label="Princípios compartilhados">
          {ecosystemCopy.principles.map((item) => (
            <li key={item} className={styles.principle}>
              {item}
            </li>
          ))}
        </ul>

        <div className={styles.outro}>
          <LinkButton href={ecosystemCopy.cta.href} variant="secondary">
            {ecosystemCopy.cta.label}
          </LinkButton>
        </div>
      </Container>

      <div className={styles.exitBridge} aria-hidden="true" />
    </section>
  );
}
