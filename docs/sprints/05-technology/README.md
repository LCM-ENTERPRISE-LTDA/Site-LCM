# Milestone 5 — Technology Experience

## Objetivo

Transformar a seção **Tecnologia** da Home em uma experiência de arquitetura viva — sem alterar Hero, Showcase, Manifesto, Header, Footer ou tokens globais.

## Entrega

| Peça | Caminho |
|------|---------|
| Experience | `site/src/components/technology/TechnologyExperience.tsx` |
| Perspectivas (tabs premium) | `site/src/components/technology/TechnologyPerspectives.tsx` |
| Arquitetura SVG | `site/src/components/technology/TechArchitecture.tsx` |
| Camadas editoriais | `site/src/components/technology/TechLayers.tsx` |
| Conteúdo | `site/src/content/technology.ts` |
| Wire Home | `site/src/app/page.tsx` → `<TechnologyExperience />` |

## Experiência

- **Esquerda:** copy editorial + camadas + Perspectivas (Experiência / Sistemas / IA)
- **Direita:** composição abstrata viva (nós, fluxos, módulos, campos) — sem ícones clichê
- **Transição de tabs:** dissolve (opacity → blur → translate) + rebuild; nunca corte seco
- **Universos:** Experiência (azul) · Sistemas (azul + dourado) · IA (violeta)
- **Motion:** breathing, nodes, path pulses, ambient glow; pointer ≤5px em luz/parallax
- **Ponte Manifesto → Tecnologia:** energia converge ao azul de engenharia
- **Saída:** intensidade cai antes do Ecossistema

## Stack

CSS · SVG · rAF · CSS Variables · Intersection Observer  
Sem Three.js / WebGL / GSAP / Lottie / libs novas

## A11y

Conteúdo em HTML · arte `aria-hidden` · `prefers-reduced-motion` preservado · contraste AA no tema escuro
