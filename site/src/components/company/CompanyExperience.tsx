"use client";

import { useRef, type CSSProperties } from "react";
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

function FactList({
  items,
}: {
  items: readonly { label: string; value: string }[];
}) {
  return (
    <dl className={styles.facts}>
      {items.map((item) => (
        <div key={item.label} className={styles.fact}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CompanyExperience() {
  const heroRef = useRef<HTMLElement>(null);
  const problemRef = useRef<HTMLElement>(null);
  const thinkingRef = useRef<HTMLElement>(null);
  const craftRef = useRef<HTMLElement>(null);
  const futureRef = useRef<HTMLElement>(null);
  const closingRef = useRef<HTMLElement>(null);

  const heroAlive = useChapterPresence(heroRef, 0.12);
  const problemAlive = useChapterPresence(problemRef);
  const thinkingAlive = useChapterPresence(thinkingRef);
  const craftAlive = useChapterPresence(craftRef);
  const futureAlive = useChapterPresence(futureRef);
  const closingAlive = useChapterPresence(closingRef, 0.2);

  const reduced = usePrefersReducedMotion();
  const copy = companyPageCopy;

  useCompanyHeroPointer(heroRef, !reduced && heroAlive);

  return (
    <div className={styles.page}>
      {/* A — Hero: copy left / art right + facts + note */}
      <section
        ref={heroRef}
        id="origem-empresa"
        className={`${styles.hero} ${heroAlive ? styles.in : ""}`}
        aria-labelledby="company-hero-title"
        style={
          {
            ["--cx"]: "0",
            ["--cy"]: "0",
            ["--clx"]: "62%",
            ["--cly"]: "40%",
          } as CSSProperties
        }
      >
        <div className={styles.atm} aria-hidden="true">
          <div className={styles.haze} />
          <div className={styles.grain} />
          <div className={styles.techGrid} />
        </div>
        <Container className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
            <h1 id="company-hero-title" className={styles.heroTitle}>
              {copy.hero.title}
            </h1>
            <p className={styles.heroSubtitle}>{copy.hero.subtitle}</p>
            <div className={styles.heroMeta}>
              <FactList items={copy.hero.facts} />
              <p className={styles.note}>{copy.hero.note}</p>
            </div>
            <div className={styles.heroCta}>
              <LinkButton href={copy.hero.cta.href}>{copy.hero.cta.label}</LinkButton>
            </div>
          </div>
          <div className={styles.heroArt}>
            <HeroArchitecture alive={heroAlive && !reduced} />
            <span className={styles.coord} aria-hidden="true">
              16.68°S · 49.25°W
            </span>
          </div>
        </Container>
      </section>

      {/* B — Problem: large split title, small body, aside phrase, tall wireframe */}
      <section
        ref={problemRef}
        id="problema"
        className={`${styles.problem} ${problemAlive ? styles.in : ""}`}
        aria-labelledby="company-problem-title"
      >
        <div className={styles.atm} aria-hidden="true">
          <div className={styles.hazeSoft} />
          <div className={styles.grain} />
        </div>
        <Container className={styles.problemLayout}>
          <p className={styles.eyebrow}>{copy.problem.eyebrow}</p>
          <h2 id="company-problem-title" className={styles.problemTitle}>
            {copy.problem.title.split("\n").map((line) => (
              <span key={line} className={styles.problemLine}>
                {line}
              </span>
            ))}
          </h2>
          <div className={styles.problemGrid}>
            <p className={styles.problemBody}>{copy.problem.body}</p>
            <p className={styles.aside}>{copy.problem.aside}</p>
            <div className={styles.problemArt}>
              <ProblemArt alive={problemAlive && !reduced} />
            </div>
            <p className={styles.noteEnd}>{copy.problem.note}</p>
          </div>
        </Container>
      </section>

      {/* C — Thinking: art full-width, then pillars + lateral aside + facts */}
      <section
        ref={thinkingRef}
        id="pensar"
        className={`${styles.thinking} ${thinkingAlive ? styles.in : ""}`}
        aria-labelledby="company-thinking-title"
      >
        <div className={styles.atm} aria-hidden="true">
          <div className={styles.haze} />
          <div className={styles.grain} />
        </div>
        <Container className={styles.thinkingInner}>
          <div className={styles.thinkingArt}>
            <ThinkingArt alive={thinkingAlive && !reduced} />
          </div>
          <div className={styles.thinkingHead}>
            <p className={styles.eyebrow}>{copy.thinking.eyebrow}</p>
            <h2 id="company-thinking-title" className={styles.thinkingTitle}>
              {copy.thinking.title}
            </h2>
          </div>
          <div className={styles.thinkingBody}>
            <ul className={styles.pillars}>
              {copy.thinking.pillars.map((p) => (
                <li key={p.id} className={styles.pillar}>
                  <span className={styles.pillarLabel}>{p.label}</span>
                  <span className={styles.pillarText}>{p.text}</span>
                </li>
              ))}
            </ul>
            <aside className={styles.thinkingAside}>
              <p className={styles.asideLarge}>{copy.thinking.aside}</p>
              <FactList items={copy.thinking.facts} />
            </aside>
          </div>
        </Container>
      </section>

      {/* D — Craft: oversized title, object band, stages sparse below */}
      <section
        ref={craftRef}
        id="oficio"
        className={`${styles.craft} ${craftAlive ? styles.in : ""}`}
        aria-labelledby="company-craft-title"
      >
        <div className={styles.atm} aria-hidden="true">
          <div className={styles.hazeSoft} />
          <div className={styles.grain} />
          <div className={styles.techGridDim} />
        </div>
        <Container className={styles.craftLayout}>
          <p className={styles.eyebrow}>{copy.craft.eyebrow}</p>
          <h2 id="company-craft-title" className={styles.craftTitle}>
            {copy.craft.title}
          </h2>
          <div className={styles.craftArt}>
            <CraftArt alive={craftAlive && !reduced} />
          </div>
          <p className={styles.asideCenter}>{copy.craft.aside}</p>
          <ol className={styles.stages}>
            {copy.craft.stages.map((s) => (
              <li key={s.id} className={styles.stage}>
                <span className={styles.stageLabel}>{s.label}</span>
                <span className={styles.stageText}>{s.text}</span>
              </li>
            ))}
          </ol>
          <p className={styles.noteEnd}>{copy.craft.note}</p>
        </Container>
      </section>

      {/* E — Future: open field, text left, fact + aside floating */}
      <section
        ref={futureRef}
        id="futuro"
        className={`${styles.future} ${futureAlive ? styles.in : ""}`}
        aria-labelledby="company-future-title"
      >
        <div className={styles.atm} aria-hidden="true">
          <div className={styles.hazeWide} />
          <div className={styles.grain} />
        </div>
        <Container className={styles.futureLayout}>
          <div className={styles.futureCopy}>
            <p className={styles.eyebrow}>{copy.future.eyebrow}</p>
            <h2 id="company-future-title" className={styles.futureTitle}>
              {copy.future.title}
            </h2>
            <p className={styles.futureBody}>{copy.future.body}</p>
            <FactList items={copy.future.facts} />
          </div>
          <div className={styles.futureSide}>
            <p className={styles.asideLarge}>{copy.future.aside}</p>
            <div className={styles.futureArt}>
              <FutureArt alive={futureAlive && !reduced} />
            </div>
          </div>
        </Container>
      </section>

      {/* Closing — void with detail */}
      <section
        ref={closingRef}
        id="encerramento"
        className={`${styles.closing} ${closingAlive ? styles.in : ""}`}
        aria-labelledby="company-closing-line"
      >
        <div className={styles.atm} aria-hidden="true">
          <div className={styles.closingGlow} />
          <div className={styles.grain} />
        </div>
        <Container className={styles.closingInner}>
          <p className={styles.note}>{copy.closing.note}</p>
          <p id="company-closing-line" className={styles.closingLine}>
            {copy.closing.line}
          </p>
          <LinkButton href={copy.closing.cta.href}>{copy.closing.cta.label}</LinkButton>
        </Container>
      </section>
    </div>
  );
}
