"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  philosophyIntro,
  philosophyStatements,
} from "@/content/philosophy";
import { ManifestAtmosphere } from "./ManifestAtmosphere";
import { PhilosophyStatementBlock } from "./PhilosophyStatement";
import { phraseVisibility, useManifestMotion } from "./useManifestMotion";
import styles from "./PhilosophyExperience.module.css";

const TOTAL = philosophyStatements.length;

/**
 * Cinematic Manifesto — sticky stage, scroll-driven phrase cinema.
 * One phrase dominates; soft overlap; atmosphere breathes behind.
 */
export function PhilosophyExperience() {
  const rootRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
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
      { threshold: 0.01 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useManifestMotion(rootRef, { enabled: !reduced && inView });

  // Drive per-phrase --pv from --manifest-p without React re-renders
  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    if (reduced) {
      stage.querySelectorAll<HTMLElement>("[data-phrase]").forEach((el, i) => {
        el.style.setProperty("--pv", i === 0 ? "1" : "0");
      });
      return;
    }

    let frame = 0;
    const apply = () => {
      frame = 0;
      const p = Number.parseFloat(root.style.getPropertyValue("--manifest-p") || "0");
      const nodes = stage.querySelectorAll<HTMLElement>("[data-phrase]");
      nodes.forEach((el, i) => {
        const v = phraseVisibility(p, i, TOTAL);
        el.style.setProperty("--pv", v.toFixed(3));
        el.setAttribute("aria-hidden", v < 0.12 ? "true" : "false");
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced, inView]);

  return (
    <section
      ref={rootRef}
      id="filosofia"
      className={`${styles.experience}${reduced ? ` ${styles.reduced}` : ""}`}
      aria-labelledby="philosophy-label"
      style={
        {
          "--manifest-p": "0",
          "--mx": "0",
          "--my": "0",
          "--lx": "50%",
          "--ly": "45%",
          "--story-lx": "50%",
          "--story-ly": "42%",
        } as CSSProperties
      }
    >
      <div
        className={styles.track}
        style={{ height: `${Math.max(TOTAL, 1) * 100}vh` }}
      >
        <div className={styles.sticky}>
          <ManifestAtmosphere alive={inView && !reduced} />

          <header className={styles.intro}>
            <p id="philosophy-label" className={styles.eyebrow}>
              {philosophyIntro.eyebrow}
            </p>
          </header>

          <div ref={stageRef} className={styles.stage}>
            {philosophyStatements.map((statement, index) => (
              <PhilosophyStatementBlock
                key={statement.id}
                statement={statement}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bridge} aria-hidden="true" />
    </section>
  );
}
