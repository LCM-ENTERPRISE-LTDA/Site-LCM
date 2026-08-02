"use client";

import { useRef, type CSSProperties } from "react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { autohistCopy } from "@/content/autohist";
import {
  ContinuityArt,
  HistorySpineArt,
  ProblemScatterArt,
  SearchRevealArt,
  WorkshopFieldArt,
} from "./AutoHistArts";
import { AutoHistHeroVisual } from "./AutoHistHeroVisual";
import {
  useAutoHistPointer,
  useChapterPresence,
  usePrefersReducedMotion,
} from "./useAutoHistMotion";
import styles from "./AutoHistExperience.module.css";

export function AutoHistExperience() {
  const heroRef = useRef<HTMLElement>(null);
  const problemRef = useRef<HTMLElement>(null);
  const historyRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLElement>(null);
  const workshopRef = useRef<HTMLElement>(null);
  const continuityRef = useRef<HTMLElement>(null);

  const heroAlive = useChapterPresence(heroRef, 0.12);
  const problemAlive = useChapterPresence(problemRef);
  const historyAlive = useChapterPresence(historyRef);
  const searchAlive = useChapterPresence(searchRef);
  const workshopAlive = useChapterPresence(workshopRef);
  const continuityAlive = useChapterPresence(continuityRef);

  const reduced = usePrefersReducedMotion();
  const copy = autohistCopy;

  useAutoHistPointer(heroRef, !reduced && heroAlive);

  return (
    <div className={styles.page}>
      {/* 1 — Hero */}
      <section
        ref={heroRef}
        className={`${styles.hero} ${heroAlive ? styles.in : ""}`}
        aria-labelledby="ah-hero-title"
        style={
          {
            ["--ax"]: "0",
            ["--ay"]: "0",
            ["--alx"]: "58%",
            ["--aly"]: "48%",
          } as CSSProperties
        }
      >
        <div className={styles.atm} aria-hidden="true">
          <div className={styles.haze} />
          <div className={styles.grain} />
          <div className={styles.grid} />
        </div>
        <Container className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <div className={styles.heroTop}>
              <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
              <span className={styles.status}>{copy.hero.status}</span>
            </div>
            <h1 id="ah-hero-title" className={styles.heroTitle}>
              {copy.hero.title}
            </h1>
            <p className={styles.heroSubtitle}>{copy.hero.subtitle}</p>
            <p className={styles.note}>{copy.hero.note}</p>
            <div className={styles.heroCta}>
              <LinkButton href={copy.hero.cta.href}>{copy.hero.cta.label}</LinkButton>
            </div>
          </div>
          <div className={styles.heroArt}>
            <AutoHistHeroVisual alive={heroAlive} reduced={reduced} />
          </div>
        </Container>
      </section>

      {/* 2 — Problem: large phrase, small text, art ambient */}
      <section
        ref={problemRef}
        className={`${styles.problem} ${problemAlive ? styles.in : ""}`}
        aria-labelledby="ah-problem-title"
      >
        <div className={styles.atm} aria-hidden="true">
          <div className={styles.hazeSoft} />
          <div className={styles.grain} />
        </div>
        <div className={styles.problemArtBg} aria-hidden="true">
          <ProblemScatterArt alive={problemAlive && !reduced} />
        </div>
        <Container className={styles.problemLayout}>
          <p className={styles.eyebrow}>{copy.problem.eyebrow}</p>
          <h2 id="ah-problem-title" className={styles.problemTitle}>
            {copy.problem.title}
          </h2>
          <div className={styles.problemRow}>
            <p className={styles.problemBody}>{copy.problem.body}</p>
            <p className={styles.aside}>{copy.problem.aside}</p>
          </div>
          <ul className={styles.fragments} aria-label="Fragmentos de informação">
            {copy.problem.fragments.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 3 — History: art dominant + lateral text */}
      <section
        ref={historyRef}
        id="historico"
        className={`${styles.history} ${historyAlive ? styles.in : ""}`}
        aria-labelledby="ah-history-title"
      >
        <div className={styles.atm} aria-hidden="true">
          <div className={styles.haze} />
          <div className={styles.grain} />
        </div>
        <Container className={styles.historyLayout}>
          <div className={styles.historyArt}>
            <HistorySpineArt alive={historyAlive && !reduced} />
          </div>
          <div className={styles.historyCopy}>
            <p className={styles.eyebrow}>{copy.history.eyebrow}</p>
            <h2 id="ah-history-title" className={styles.historyTitle}>
              {copy.history.title}
            </h2>
            <p className={styles.body}>{copy.history.body}</p>
            <p className={styles.aside}>{copy.history.aside}</p>
            <ol className={styles.events}>
              {copy.history.events.map((e) => (
                <li key={e.label}>
                  <span className={styles.eventLabel}>{e.label}</span>
                  <span className={styles.eventDetail}>{e.detail}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* 4 — Search: centered composition */}
      <section
        ref={searchRef}
        className={`${styles.search} ${searchAlive ? styles.in : ""}`}
        aria-labelledby="ah-search-title"
      >
        <div className={styles.atm} aria-hidden="true">
          <div className={styles.hazeWide} />
          <div className={styles.grain} />
        </div>
        <Container className={styles.searchLayout}>
          <p className={styles.eyebrow}>{copy.search.eyebrow}</p>
          <h2 id="ah-search-title" className={styles.searchTitle}>
            {copy.search.title}
          </h2>
          <div className={styles.searchArt}>
            <SearchRevealArt alive={searchAlive && !reduced} plate={copy.search.plate} />
          </div>
          <p className={styles.searchBody}>{copy.search.body}</p>
          <p className={styles.asideCenter}>{copy.search.aside}</p>
        </Container>
      </section>

      {/* 5 — Workshop: asymmetric */}
      <section
        ref={workshopRef}
        className={`${styles.workshop} ${workshopAlive ? styles.in : ""}`}
        aria-labelledby="ah-workshop-title"
      >
        <div className={styles.atm} aria-hidden="true">
          <div className={styles.hazeSoft} />
          <div className={styles.grain} />
        </div>
        <Container className={styles.workshopLayout}>
          <div className={styles.workshopCopy}>
            <p className={styles.eyebrow}>{copy.workshop.eyebrow}</p>
            <h2 id="ah-workshop-title" className={styles.workshopTitle}>
              {copy.workshop.title}
            </h2>
            <p className={styles.body}>{copy.workshop.body}</p>
            <ul className={styles.nodes}>
              {copy.workshop.nodes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
          <div className={styles.workshopArt}>
            <WorkshopFieldArt alive={workshopAlive && !reduced} />
          </div>
        </Container>
      </section>

      {/* 6 — Continuity: editorial */}
      <section
        ref={continuityRef}
        className={`${styles.continuity} ${continuityAlive ? styles.in : ""}`}
        aria-labelledby="ah-continuity-title"
      >
        <div className={styles.atm} aria-hidden="true">
          <div className={styles.haze} />
          <div className={styles.grain} />
        </div>
        <Container className={styles.continuityLayout}>
          <p className={styles.eyebrow}>{copy.continuity.eyebrow}</p>
          <h2 id="ah-continuity-title" className={styles.continuityTitle}>
            {copy.continuity.title}
          </h2>
          <ContinuityArt alive={continuityAlive && !reduced} />
          <p className={styles.continuityBody}>{copy.continuity.body}</p>
          <dl className={styles.markers}>
            {copy.continuity.markers.map((m) => (
              <div key={m.label} className={styles.marker}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Closing */}
      <section className={styles.closing} aria-labelledby="ah-closing-line">
        <div className={styles.atm} aria-hidden="true">
          <div className={styles.closingGlow} />
          <div className={styles.grain} />
        </div>
        <Container className={styles.closingInner}>
          <p className={styles.note}>{copy.closing.note}</p>
          <p id="ah-closing-line" className={styles.closingLine}>
            {copy.closing.line.split("\n").map((line) => (
              <span key={line} className={styles.closingPart}>
                {line}
              </span>
            ))}
          </p>
          <div className={styles.closingActions}>
            <LinkButton href={copy.closing.primaryCta.href}>
              {copy.closing.primaryCta.label}
            </LinkButton>
            <LinkButton href={copy.closing.secondaryCta.href} variant="secondary">
              {copy.closing.secondaryCta.label}
            </LinkButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
