"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  philosophyIntro,
  philosophyStatements,
} from "@/content/philosophy";
import { ManifestAtmosphere } from "./ManifestAtmosphere";
import { PhilosophyStatementBlock } from "./PhilosophyStatement";
import { useManifestScroll } from "./useManifestScroll";
import styles from "./PhilosophyExperience.module.css";

/**
 * Living Manifesto — continuous atmosphere + luminous narrative current.
 * Contemplative. No UI chrome. Typography over a breathing field.
 */
export function PhilosophyExperience() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.02 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useManifestScroll(rootRef, { enabled: !reduced && inView });

  return (
    <section
      ref={rootRef}
      id="filosofia"
      className={styles.experience}
      aria-labelledby="philosophy-label"
      style={
        {
          "--manifest-p": "0",
          "--manifest-alive": "0",
        } as CSSProperties
      }
    >
      <ManifestAtmosphere alive={inView && !reduced} />

      <header className={styles.intro}>
        <p id="philosophy-label" className={styles.eyebrow}>
          {philosophyIntro.eyebrow}
        </p>
      </header>

      <div className={styles.gallery}>
        {philosophyStatements.map((statement, index) => (
          <PhilosophyStatementBlock
            key={statement.id}
            statement={statement}
            index={index}
            total={philosophyStatements.length}
          />
        ))}
      </div>

      <div className={styles.bridge} aria-hidden="true" />
    </section>
  );
}
