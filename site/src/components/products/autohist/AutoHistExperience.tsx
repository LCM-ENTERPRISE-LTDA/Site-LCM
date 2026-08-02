"use client";

import { useRef, type CSSProperties } from "react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { autohistCopy } from "@/content/autohist";
import {
  ConvergeArt,
  GrandTimelineArt,
  ProblemScatterArt,
  TrustMarksArt,
} from "./AutoHistArts";
import { AutoHistHeroVisual } from "./AutoHistHeroVisual";
import { AutoHistProductShot } from "./AutoHistProductShot";
import {
  useAutoHistPointer,
  useChapterPresence,
  usePrefersReducedMotion,
} from "./useAutoHistMotion";
import { usePageVisibility } from "@/motion/useMotion";
import type { ScreenKey } from "@/content/autohistScreens";
import styles from "./AutoHistExperience.module.css";

export function AutoHistExperience() {
  const heroRef = useRef<HTMLElement>(null);
  const problemRef = useRef<HTMLElement>(null);
  const convergeRef = useRef<HTMLElement>(null);
  const flowRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const trustRef = useRef<HTMLElement>(null);

  const heroAlive = useChapterPresence(heroRef, 0.12);
  const problemAlive = useChapterPresence(problemRef);
  const convergeAlive = useChapterPresence(convergeRef);
  const flowAlive = useChapterPresence(flowRef);
  const searchAlive = useChapterPresence(searchRef);
  const timelineAlive = useChapterPresence(timelineRef);
  const trustAlive = useChapterPresence(trustRef);

  const reduced = usePrefersReducedMotion();
  const visible = usePageVisibility();
  const copy = autohistCopy;
  const motion = (alive: boolean) => alive && !reduced && visible;

  useAutoHistPointer(heroRef, !reduced && heroAlive && visible);

  return (
    <div className={styles.page}>
      {/* ——— Hero (aprovado — não alterar) ——— */}
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
        </Container>
        <AutoHistHeroVisual alive={heroAlive && visible} reduced={reduced} />
      </section>

      {/* 01 — Problema */}
      <section
        ref={problemRef}
        className={`${styles.chapter} ${styles.problem} ${problemAlive ? styles.in : ""}`}
        aria-labelledby="ah-problem-title"
      >
        <div className={styles.atm} aria-hidden="true">
          <div className={styles.hazeSoft} />
          <div className={styles.grain} />
        </div>
        <Container className={styles.problemGrid}>
          <div className={styles.chapterCopy}>
            <p className={styles.eyebrow}>{copy.problem.eyebrow}</p>
            <h2 id="ah-problem-title" className={styles.chapterTitle}>
              {copy.problem.title}
            </h2>
            <p className={styles.body}>{copy.problem.body}</p>
            <p className={styles.aside}>{copy.problem.aside}</p>
            <ul className={styles.fragmentList} aria-label="Fontes desconectadas">
              {copy.problem.fragments.map((f) => (
                <li key={f.id}>{f.label}</li>
              ))}
            </ul>
          </div>
          <div className={styles.chapterArt}>
            <ProblemScatterArt alive={motion(problemAlive)} />
          </div>
        </Container>
      </section>

      {/* 02 — Centralização */}
      <section
        ref={convergeRef}
        id="centralizacao"
        className={`${styles.chapter} ${styles.converge} ${convergeAlive ? styles.in : ""}`}
        aria-labelledby="ah-converge-title"
      >
        <div className={styles.atm} aria-hidden="true">
          <div className={styles.haze} />
          <div className={styles.grain} />
        </div>
        <Container className={styles.convergeGrid}>
          <div className={styles.chapterArtWide}>
            <ConvergeArt alive={motion(convergeAlive)} />
          </div>
          <div className={styles.chapterCopy}>
            <p className={styles.eyebrow}>{copy.converge.eyebrow}</p>
            <h2 id="ah-converge-title" className={styles.chapterTitle}>
              {copy.converge.title}
            </h2>
            <p className={styles.body}>{copy.converge.body}</p>
            <p className={styles.aside}>{copy.converge.aside}</p>
            <ul className={styles.nodeList}>
              {copy.converge.nodes.map((n) => (
                <li key={n.id}>{n.label}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 03 — Como funciona */}
      <section
        ref={flowRef}
        className={`${styles.chapter} ${styles.flow} ${flowAlive ? styles.in : ""}`}
        aria-labelledby="ah-flow-title"
      >
        <div className={styles.atm} aria-hidden="true">
          <div className={styles.hazeWide} />
          <div className={styles.grain} />
        </div>
        <Container>
          <div className={styles.flowIntro}>
            <p className={styles.eyebrow}>{copy.flow.eyebrow}</p>
            <h2 id="ah-flow-title" className={styles.chapterTitle}>
              {copy.flow.title}
            </h2>
            <p className={styles.bodyWide}>{copy.flow.body}</p>
          </div>
          <ol className={styles.flowSteps}>
            {copy.flow.steps.map((step) => (
              <li key={step.id} className={styles.flowStep}>
                <AutoHistProductShot
                  screen={step.screen as ScreenKey}
                  caption={step.caption}
                  frame="flow"
                />
                <div className={styles.flowMeta}>
                  <span className={styles.flowIndex}>{step.index}</span>
                  <h3 className={styles.flowTitle}>{step.title}</h3>
                  <p className={styles.flowDetail}>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 04 — Busca */}
      <section
        ref={searchRef}
        className={`${styles.chapter} ${styles.search} ${searchAlive ? styles.in : ""}`}
        aria-labelledby="ah-search-title"
      >
        <div className={styles.atm} aria-hidden="true">
          <div className={styles.hazeWide} />
          <div className={styles.grain} />
        </div>
        <Container className={styles.searchLayout}>
          <p className={styles.eyebrow}>{copy.search.eyebrow}</p>
          <h2 id="ah-search-title" className={`${styles.chapterTitle} ${styles.center}`}>
            {copy.search.title}
          </h2>
          <p className={styles.bodyCenter}>{copy.search.body}</p>
          <p className={styles.asideCenter}>{copy.search.aside}</p>
          <p className={styles.searchPlate} aria-label={`Placa de exemplo ${copy.search.plate}`}>
            {copy.search.plate}
          </p>
          <div className={`${styles.searchDemo} ${searchAlive ? styles.searchAlive : ""}`}>
            {copy.search.stages.map((stage, index) => (
              <div
                key={stage.id}
                className={styles.searchStage}
                style={{ animationDelay: `${index * 0.35}s` }}
              >
                <span className={styles.searchStageLabel}>{stage.label}</span>
                <AutoHistProductShot
                  screen={stage.screen as ScreenKey}
                  caption={stage.caption}
                  frame={stage.id === "pdf" ? "wide" : "search"}
                />
              </div>
            ))}
          </div>
          <ul className={styles.resultTags} aria-label="Resultados da busca">
            {copy.search.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 05 — Timeline */}
      <section
        ref={timelineRef}
        className={`${styles.chapter} ${styles.timeline} ${timelineAlive ? styles.in : ""}`}
        aria-labelledby="ah-timeline-title"
      >
        <div className={styles.atm} aria-hidden="true">
          <div className={styles.haze} />
          <div className={styles.grain} />
        </div>
        <Container>
          <div className={styles.timelineIntro}>
            <p className={styles.eyebrow}>{copy.timeline.eyebrow}</p>
            <h2 id="ah-timeline-title" className={styles.chapterTitle}>
              {copy.timeline.title}
            </h2>
            <p className={styles.bodyWide}>{copy.timeline.body}</p>
          </div>
          <div className={styles.timelineStage}>
            <GrandTimelineArt alive={motion(timelineAlive)} events={copy.timeline.events} />
          </div>
          <ul className={styles.timelineProofs} aria-label="Evidências reais do histórico">
            {copy.timeline.events
              .filter((e) => e.proof)
              .map((e) => (
                <li key={e.id} className={styles.timelineProof}>
                  <div className={styles.timelineProofMeta}>
                    <span className={styles.tmLabel}>{e.label}</span>
                    <span className={styles.tmDetail}>{e.detail}</span>
                    <span className={styles.tmKm}>{e.km}</span>
                  </div>
                  <AutoHistProductShot
                    screen={e.proof as ScreenKey}
                    caption={`Prova — ${e.label}`}
                    frame={e.proof === "exportPdf" ? "wide" : "proof"}
                  />
                </li>
              ))}
          </ul>
          <ol className={styles.timelineMobile} aria-label="Eventos do histórico">
            {copy.timeline.events.map((e) => (
              <li key={e.id}>
                <span className={styles.tmLabel}>{e.label}</span>
                <span className={styles.tmDetail}>{e.detail}</span>
                <span className={styles.tmKm}>{e.km}</span>
                {e.proof ? (
                  <div className={styles.timelineMobileShot}>
                    <AutoHistProductShot
                      screen={e.proof as ScreenKey}
                      frame={e.proof === "exportPdf" ? "wide" : "proof"}
                    />
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 06 — Confiança */}
      <section
        ref={trustRef}
        className={`${styles.chapter} ${styles.trust} ${trustAlive ? styles.in : ""}`}
        aria-labelledby="ah-trust-title"
      >
        <div className={styles.atm} aria-hidden="true">
          <div className={styles.hazeSoft} />
          <div className={styles.grain} />
        </div>
        <Container>
          <div className={styles.trustIntro}>
            <p className={styles.eyebrow}>{copy.trust.eyebrow}</p>
            <h2 id="ah-trust-title" className={styles.chapterTitle}>
              {copy.trust.title}
            </h2>
          </div>
          <ul className={styles.trustGrid}>
            {copy.trust.items.map((item) => (
              <li key={item.id} className={styles.trustItem}>
                <TrustMarksArt alive={motion(trustAlive)} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 07 — CTA */}
      <section className={styles.closing} aria-labelledby="ah-closing-line">
        <div className={styles.atm} aria-hidden="true">
          <div className={styles.closingGlow} />
          <div className={styles.grain} />
        </div>
        <Container className={styles.closingInner}>
          <p className={styles.eyebrow}>{copy.closing.eyebrow}</p>
          <p id="ah-closing-line" className={styles.closingLine}>
            {copy.closing.line.split("\n").map((line) => (
              <span key={line} className={styles.closingPart}>
                {line}
              </span>
            ))}
          </p>
          <p className={styles.note}>{copy.closing.note}</p>
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
