"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { originVisionCopy } from "@/content/originVision";
import { OriginField } from "./OriginField";
import { useOriginMotion } from "./useOriginMotion";
import styles from "./OriginVisionExperience.module.css";

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

export function OriginVisionExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const [alive, setAlive] = useState(false);
  const reduced = usePrefersReducedMotion();

  useOriginMotion(rootRef, { enabled: !reduced && alive });

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setAlive(entry.isIntersecting && entry.intersectionRatio > 0.14);
      },
      { threshold: [0, 0.14, 0.35] },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      id="origem"
      className={`${styles.root} ${alive ? styles.alive : ""}`}
      aria-labelledby="origin-vision-title"
      style={
        {
          ["--ox"]: "0",
          ["--oy"]: "0",
          ["--olx"]: "52%",
          ["--oly"]: "46%",
        } as CSSProperties
      }
    >
      <div className={styles.entryBridge} aria-hidden="true" />
      <div className={styles.atmosphere} aria-hidden="true">
        <div className={styles.mist} />
        <div className={styles.grain} />
      </div>

      <Container className={styles.container}>
        <div className={styles.layout}>
          <header className={styles.intro}>
            <p className={styles.eyebrow}>{originVisionCopy.eyebrow}</p>
            <h2 id="origin-vision-title" className={styles.title}>
              {originVisionCopy.title}
            </h2>
            <p className={styles.subtitle}>{originVisionCopy.subtitle}</p>
          </header>

          <OriginField alive={alive && !reduced} />
        </div>

        <p className={styles.signature}>
          <span className={styles.signatureLead}>
            {originVisionCopy.signatureLead}
          </span>{" "}
          <span className={styles.signatureClose}>
            {originVisionCopy.signatureClose}
          </span>
        </p>
      </Container>

      <div className={styles.exitBridge} aria-hidden="true" />
    </section>
  );
}
