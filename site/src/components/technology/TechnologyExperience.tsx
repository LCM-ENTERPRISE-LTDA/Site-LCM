"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import {
  techPerspectives,
  technologyExperienceCopy,
  type TechPerspectiveId,
} from "@/content/technology";
import { TechArchitecture } from "./TechArchitecture";
import { TechLayers } from "./TechLayers";
import { TechnologyPerspectives } from "./TechnologyPerspectives";
import { useTechPointer } from "./useTechPointer";
import styles from "./TechnologyExperience.module.css";

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

export function TechnologyExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<TechPerspectiveId>("experiencia");
  const [visualMode, setVisualMode] = useState<TechPerspectiveId>("experiencia");
  const [leavingMode, setLeavingMode] = useState<TechPerspectiveId | null>(null);
  const [alive, setAlive] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const visualModeRef = useRef(visualMode);
  const timerRef = useRef<number | null>(null);

  visualModeRef.current = visualMode;

  useTechPointer(rootRef, { enabled: !reducedMotion });

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setAlive(entry.isIntersecting && entry.intersectionRatio > 0.15);
      },
      { threshold: [0, 0.15, 0.35] },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (active === visualModeRef.current) return;

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (reducedMotion) {
      setLeavingMode(null);
      setVisualMode(active);
      return;
    }

    setLeavingMode(visualModeRef.current);
    setVisualMode(active);
    timerRef.current = window.setTimeout(() => {
      setLeavingMode(null);
      timerRef.current = null;
    }, 300);

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [active, reducedMotion]);

  return (
    <section
      ref={rootRef}
      id="tecnologia"
      className={`${styles.root} ${styles[active]} ${alive ? styles.alive : ""}`}
      data-mode={active}
      style={
        {
          ["--tx"]: "0",
          ["--ty"]: "0",
          ["--tlx"]: "62%",
          ["--tly"]: "42%",
        } as CSSProperties
      }
    >
      <div className={styles.entryBridge} aria-hidden="true" />
      <div className={styles.atmosphere} aria-hidden="true">
        <div className={styles.haze} />
        <div className={styles.mist} />
        <div className={styles.grain} />
        <div className={styles.bloom} />
      </div>

      <Container className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>{technologyExperienceCopy.eyebrow}</p>
            <h2 className={styles.title}>{technologyExperienceCopy.title}</h2>
            <p className={styles.subtitle}>{technologyExperienceCopy.subtitle}</p>

            <TechLayers />

            <TechnologyPerspectives
              items={techPerspectives}
              active={active}
              onChange={setActive}
              reducedMotion={reducedMotion}
            />
          </div>

          <div className={styles.stage}>
            {leavingMode ? (
              <div className={`${styles.stageFrame} ${styles.stageLeaving}`} aria-hidden="true">
                <TechArchitecture mode={leavingMode} alive={false} />
              </div>
            ) : null}
            <div key={visualMode} className={`${styles.stageFrame} ${styles.stageEntering}`}>
              <TechArchitecture mode={visualMode} alive={alive && !reducedMotion} />
            </div>
          </div>
        </div>
      </Container>

      <div className={styles.exitBridge} aria-hidden="true" />
    </section>
  );
}
