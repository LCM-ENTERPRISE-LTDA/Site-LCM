"use client";

import { useRef, type CSSProperties } from "react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { autohistCopy } from "@/content/autohist";
import { autohistMediaSlots, type MediaSlotId } from "@/content/autohistScreens";
import {
  ConvergeArt,
  GrandTimelineArt,
  ProblemScatterArt,
  TrustMarksArt,
} from "./AutoHistArts";
import { AutoHistHeroVisual } from "./AutoHistHeroVisual";
import { AutoHistMediaFrame } from "./AutoHistMediaFrame";
import styles from "./AutoHistMediaFrame.module.css";
import {
  useAutoHistPointer,
  useChapterPresence,
  usePrefersReducedMotion,
} from "./useAutoHistMotion";
import { usePageVisibility } from "@/motion/useMotion";
import pageStyles from "./AutoHistExperience.module.css";

function Shot({
  slotId,
  index,
  caption,
  priority = false,
  className = "",
}: {
  slotId: MediaSlotId;
  index?: string;
  caption?: string;
  priority?: boolean;
  className?: string;
}) {
  const slot = autohistMediaSlots[slotId];
  if (!slot.enabled) return null;
  return (
    <AutoHistMediaFrame
      className={className}
      variant={slot.variant}
      aspectRatio={slot.aspectRatio}
      index={index}
      label={slot.label}
      caption={caption}
      status="ready"
      src={slot.src}
      alt={slot.alt}
      intrinsicWidth={slot.width}
      intrinsicHeight={slot.height}
      objectFit={slot.objectFit}
      objectPosition={slot.objectPosition}
      shotClassName={styles[slot.shotClass as keyof typeof styles] ?? ""}
      priority={priority}
    />
  );
}

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
    <div className={pageStyles.page}>
      {/* ——— Hero (aprovado — não alterar) ——— */}
      <section
        ref={heroRef}
        className={`${pageStyles.hero} ${heroAlive ? pageStyles.in : ""}`}
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
        <div className={pageStyles.atm} aria-hidden="true">
          <div className={pageStyles.haze} />
          <div className={pageStyles.grain} />
          <div className={pageStyles.grid} />
        </div>
        <Container className={pageStyles.heroLayout}>
          <div className={pageStyles.heroCopy}>
            <div className={pageStyles.heroTop}>
              <p className={pageStyles.eyebrow}>{copy.hero.eyebrow}</p>
              <span className={pageStyles.status}>{copy.hero.status}</span>
            </div>
            <h1 id="ah-hero-title" className={pageStyles.heroTitle}>
              {copy.hero.title}
            </h1>
            <p className={pageStyles.heroSubtitle}>{copy.hero.subtitle}</p>
            <p className={pageStyles.note}>{copy.hero.note}</p>
            <div className={pageStyles.heroCta}>
              <LinkButton href={copy.hero.cta.href}>{copy.hero.cta.label}</LinkButton>
            </div>
          </div>
        </Container>
        <AutoHistHeroVisual alive={heroAlive && visible} reduced={reduced} />
      </section>

      {/* 01 — Problema */}
      <section
        ref={problemRef}
        className={`${pageStyles.chapter} ${pageStyles.problem} ${problemAlive ? pageStyles.in : ""}`}
        aria-labelledby="ah-problem-title"
      >
        <div className={pageStyles.atm} aria-hidden="true">
          <div className={pageStyles.hazeSoft} />
          <div className={pageStyles.grain} />
        </div>
        <Container className={pageStyles.problemGrid}>
          <div className={pageStyles.chapterCopy}>
            <p className={pageStyles.eyebrow}>{copy.problem.eyebrow}</p>
            <h2 id="ah-problem-title" className={pageStyles.chapterTitle}>
              {copy.problem.title}
            </h2>
            <p className={pageStyles.body}>{copy.problem.body}</p>
            <p className={pageStyles.aside}>{copy.problem.aside}</p>
            <ul className={pageStyles.fragmentList} aria-label="Fontes desconectadas">
              {copy.problem.fragments.map((f) => (
                <li key={f.id}>{f.label}</li>
              ))}
            </ul>
          </div>
          <div className={pageStyles.chapterArt}>
            <ProblemScatterArt alive={motion(problemAlive)} />
          </div>
        </Container>
      </section>

      {/* 02 — Centralização */}
      <section
        ref={convergeRef}
        id="centralizacao"
        className={`${pageStyles.chapter} ${pageStyles.converge} ${convergeAlive ? pageStyles.in : ""}`}
        aria-labelledby="ah-converge-title"
      >
        <div className={pageStyles.atm} aria-hidden="true">
          <div className={pageStyles.haze} />
          <div className={pageStyles.grain} />
        </div>
        <Container className={pageStyles.convergeGrid}>
          <div className={pageStyles.chapterArtWide}>
            <ConvergeArt alive={motion(convergeAlive)} />
          </div>
          <div className={pageStyles.chapterCopy}>
            <p className={pageStyles.eyebrow}>{copy.converge.eyebrow}</p>
            <h2 id="ah-converge-title" className={pageStyles.chapterTitle}>
              {copy.converge.title}
            </h2>
            <p className={pageStyles.body}>{copy.converge.body}</p>
            <p className={pageStyles.aside}>{copy.converge.aside}</p>
            <ul className={pageStyles.nodeList}>
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
        className={`${pageStyles.chapter} ${pageStyles.flow} ${flowAlive ? pageStyles.in : ""}`}
        aria-labelledby="ah-flow-title"
      >
        <div className={pageStyles.atm} aria-hidden="true">
          <div className={pageStyles.hazeWide} />
          <div className={pageStyles.grain} />
        </div>
        <Container>
          <div className={pageStyles.flowIntro}>
            <p className={pageStyles.eyebrow}>{copy.flow.eyebrow}</p>
            <h2 id="ah-flow-title" className={pageStyles.chapterTitle}>
              {copy.flow.title}
            </h2>
            <p className={pageStyles.bodyWide}>{copy.flow.body}</p>
          </div>
          <ol className={pageStyles.flowSteps}>
            {copy.flow.steps.map((step) => (
              <li key={step.id} className={pageStyles.flowStep}>
                <Shot slotId={step.slot} index={step.index} caption={step.caption} />
                <div className={pageStyles.flowMeta}>
                  <span className={pageStyles.flowIndex}>{step.index}</span>
                  <h3 className={pageStyles.flowTitle}>{step.title}</h3>
                  <p className={pageStyles.flowDetail}>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 04 — Busca */}
      <section
        ref={searchRef}
        className={`${pageStyles.chapter} ${pageStyles.search} ${searchAlive ? pageStyles.in : ""}`}
        aria-labelledby="ah-search-title"
      >
        <div className={pageStyles.atm} aria-hidden="true">
          <div className={pageStyles.hazeWide} />
          <div className={pageStyles.grain} />
        </div>
        <Container className={pageStyles.searchLayout}>
          <p className={pageStyles.eyebrow}>{copy.search.eyebrow}</p>
          <h2 id="ah-search-title" className={`${pageStyles.chapterTitle} ${pageStyles.center}`}>
            {copy.search.title}
          </h2>
          <p className={pageStyles.bodyCenter}>{copy.search.body}</p>
          <p className={pageStyles.asideCenter}>{copy.search.aside}</p>
          <p className={pageStyles.searchPlate} aria-label={`Placa de exemplo ${copy.search.plate}`}>
            {copy.search.plate}
          </p>
          <div className={`${pageStyles.searchDemo} ${searchAlive ? pageStyles.searchAlive : ""}`}>
            {copy.search.stages.map((stage, index) => (
              <div
                key={stage.id}
                className={pageStyles.searchStage}
                style={{ animationDelay: `${index * 0.35}s` }}
              >
                <span className={pageStyles.searchStageLabel}>{stage.label}</span>
                <Shot
                  slotId={stage.slot}
                  index={`0${index + 1}`}
                  caption={stage.caption}
                />
              </div>
            ))}
          </div>
          <ul className={pageStyles.resultTags} aria-label="Resultados da busca">
            {copy.search.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 05 — Timeline */}
      <section
        ref={timelineRef}
        className={`${pageStyles.chapter} ${pageStyles.timeline} ${timelineAlive ? pageStyles.in : ""}`}
        aria-labelledby="ah-timeline-title"
      >
        <div className={pageStyles.atm} aria-hidden="true">
          <div className={pageStyles.haze} />
          <div className={pageStyles.grain} />
        </div>
        <Container>
          <div className={pageStyles.timelineIntro}>
            <p className={pageStyles.eyebrow}>{copy.timeline.eyebrow}</p>
            <h2 id="ah-timeline-title" className={pageStyles.chapterTitle}>
              {copy.timeline.title}
            </h2>
            <p className={pageStyles.bodyWide}>{copy.timeline.body}</p>
          </div>
          <div className={pageStyles.timelineLayout}>
            <div className={pageStyles.timelineStage}>
              <GrandTimelineArt alive={motion(timelineAlive)} events={copy.timeline.events} />
            </div>
            <div className={pageStyles.timelineProofPanel}>
              <Shot
                slotId={copy.timeline.proofSlot}
                caption={copy.timeline.proofCaption}
              />
            </div>
          </div>
          <ol className={pageStyles.timelineMobile} aria-label="Eventos do histórico">
            {copy.timeline.events.map((e) => (
              <li key={e.id}>
                <span className={pageStyles.tmLabel}>{e.label}</span>
                <span className={pageStyles.tmDetail}>{e.detail}</span>
                <span className={pageStyles.tmKm}>{e.km}</span>
                {e.id === "e2" ? (
                  <div className={pageStyles.timelineMobileShot}>
                    <Shot
                      slotId={copy.timeline.proofSlot}
                      caption={copy.timeline.proofCaption}
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
        className={`${pageStyles.chapter} ${pageStyles.trust} ${trustAlive ? pageStyles.in : ""}`}
        aria-labelledby="ah-trust-title"
      >
        <div className={pageStyles.atm} aria-hidden="true">
          <div className={pageStyles.hazeSoft} />
          <div className={pageStyles.grain} />
        </div>
        <Container>
          <div className={pageStyles.trustLayout}>
            <div className={pageStyles.trustIntro}>
              <p className={pageStyles.eyebrow}>{copy.trust.eyebrow}</p>
              <h2 id="ah-trust-title" className={pageStyles.chapterTitle}>
                {copy.trust.title}
              </h2>
              <ul className={pageStyles.trustGrid}>
                {copy.trust.items.map((item) => (
                  <li key={item.id} className={pageStyles.trustItem}>
                    <TrustMarksArt alive={motion(trustAlive)} />
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={pageStyles.trustMedia}>
              <Shot
                slotId={copy.trust.panelSlot}
                caption={copy.trust.panelCaption}
              />
              <div className={pageStyles.trustMediaSecondary}>
                <Shot
                  slotId={copy.trust.dashboardSlot}
                  caption={copy.trust.dashboardCaption}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 07 — CTA */}
      <section className={pageStyles.closing} aria-labelledby="ah-closing-line">
        <div className={pageStyles.atm} aria-hidden="true">
          <div className={pageStyles.closingGlow} />
          <div className={pageStyles.grain} />
        </div>
        <Container className={pageStyles.closingGrid}>
          <div className={pageStyles.closingInner}>
            <p className={pageStyles.eyebrow}>{copy.closing.eyebrow}</p>
            <p id="ah-closing-line" className={pageStyles.closingLine}>
              {copy.closing.line.split("\n").map((line) => (
                <span key={line} className={pageStyles.closingPart}>
                  {line}
                </span>
              ))}
            </p>
            <p className={pageStyles.note}>{copy.closing.note}</p>
            <div className={pageStyles.closingActions}>
              <LinkButton href={copy.closing.primaryCta.href}>
                {copy.closing.primaryCta.label}
              </LinkButton>
              <LinkButton href={copy.closing.secondaryCta.href} variant="secondary">
                {copy.closing.secondaryCta.label}
              </LinkButton>
            </div>
          </div>
          <div className={pageStyles.closingMedia}>
            <Shot
              slotId={copy.closing.loginSlot}
              caption={copy.closing.loginCaption}
            />
          </div>
        </Container>
      </section>
    </div>
  );
}
