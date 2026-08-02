"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { companyPageCopy } from "@/content/company";
import {
  CraftArt,
  FutureArt,
  HeroArchitecture,
  ProblemArt,
  ThinkingArt,
} from "./CompanyArts";
import {
  useChapterPresence,
  useCompanyHeroPointer,
  usePrefersReducedMotion,
} from "./useCompanyMotion";
import styles from "./CompanyExperience.module.css";

function Chapter({
  id,
  eyebrow,
  title,
  children,
  art,
  tone = "default",
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  art?: (alive: boolean) => ReactNode;
  tone?: "default" | "deep";
}) {
  const ref = useRef<HTMLElement>(null);
  const alive = useChapterPresence(ref);
  const titleId = `${id}-title`;

  return (
    <section
      ref={ref}
      id={id}
      className={`${styles.chapter} ${styles[tone]} ${alive ? styles.chapterIn : ""}`}
      aria-labelledby={titleId}
    >
      <Container className={styles.chapterInner}>
        <header className={styles.chapterCopy}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id={titleId} className={styles.chapterTitle}>
            {title}
          </h2>
          <div className={styles.chapterBody}>{children}</div>
        </header>
        {art ? <div className={styles.chapterArt}>{art(alive)}</div> : null}
      </Container>
    </section>
  );
}

export function CompanyExperience() {
  const heroRef = useRef<HTMLElement>(null);
  const heroAlive = useChapterPresence(heroRef, 0.12);
  const reduced = usePrefersReducedMotion();
  const copy = companyPageCopy;

  useCompanyHeroPointer(heroRef, !reduced && heroAlive);

  return (
    <div className={styles.page}>
      <section
        ref={heroRef}
        id="origem-empresa"
        className={`${styles.hero} ${heroAlive ? styles.heroIn : ""}`}
        aria-labelledby="company-hero-title"
        style={
          {
            ["--cx"]: "0",
            ["--cy"]: "0",
            ["--clx"]: "58%",
            ["--cly"]: "42%",
          } as CSSProperties
        }
      >
        <div className={styles.heroAtmosphere} aria-hidden="true">
          <div className={styles.heroMist} />
          <div className={styles.heroGrain} />
        </div>
        <Container className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
            <h1 id="company-hero-title" className={styles.heroTitle}>
              {copy.hero.title}
            </h1>
            <p className={styles.heroSubtitle}>{copy.hero.subtitle}</p>
            <div className={styles.heroCta}>
              <LinkButton href={copy.hero.cta.href}>{copy.hero.cta.label}</LinkButton>
            </div>
          </div>
          <HeroArchitecture alive={heroAlive && !reduced} />
        </Container>
      </section>

      <Chapter
        id="problema"
        eyebrow={copy.problem.eyebrow}
        title={copy.problem.title}
        art={(alive) => <ProblemArt alive={alive && !reduced} />}
        tone="deep"
      >
        <p>{copy.problem.body}</p>
      </Chapter>

      <Chapter
        id="pensar"
        eyebrow={copy.thinking.eyebrow}
        title={copy.thinking.title}
        art={(alive) => <ThinkingArt alive={alive && !reduced} />}
      >
        <ul className={styles.pillars}>
          {copy.thinking.pillars.map((p) => (
            <li key={p.id} className={styles.pillar}>
              <span className={styles.pillarLabel}>{p.label}</span>
              <span className={styles.pillarText}>{p.text}</span>
            </li>
          ))}
        </ul>
      </Chapter>

      <Chapter
        id="oficio"
        eyebrow={copy.craft.eyebrow}
        title={copy.craft.title}
        art={(alive) => <CraftArt alive={alive && !reduced} />}
        tone="deep"
      >
        <ol className={styles.stages}>
          {copy.craft.stages.map((s) => (
            <li key={s.id} className={styles.stage}>
              <span className={styles.stageLabel}>{s.label}</span>
              <span className={styles.stageText}>{s.text}</span>
            </li>
          ))}
        </ol>
      </Chapter>

      <Chapter
        id="futuro"
        eyebrow={copy.future.eyebrow}
        title={copy.future.title}
        art={(alive) => <FutureArt alive={alive && !reduced} />}
      >
        <p>{copy.future.body}</p>
      </Chapter>

      <section
        id="encerramento"
        className={styles.closing}
        aria-labelledby="company-closing-line"
      >
        <Container className={styles.closingInner}>
          <p id="company-closing-line" className={styles.closingLine}>
            {copy.closing.line}
          </p>
          <LinkButton href={copy.closing.cta.href}>{copy.closing.cta.label}</LinkButton>
        </Container>
      </section>
    </div>
  );
}
