# DESIGN SYSTEM — Milestone 3A

Identidade visual premium light-first da LCM Enterprise.

## Princípio

O branco é protagonista. Neutros carregam hierarquia. O azul de sinal (`#1A56F0`) aparece com precisão — UI, foco, CTAs — não como decoração.

## Cor principal (proposta)

| Token | Valor | Justificativa |
|-------|-------|---------------|
| `--color-brand` | `#1A56F0` | Contraste em botões brancos/texto branco; gráficos; foco acessível; inversão previsível em dark mode futuro; evita clichê roxo “AI” |

Ainda **proposta oficial provisória** até aprovação da marca.

## Neutros

Escala `--neutral-0` … `--neutral-950`. Superfícies usam `0/25/50/75`. Texto usa `900` + muted `500`.

## Produtos (família)

| Produto | Accent | Personalidade |
|---------|--------|---------------|
| AutoHist | `#0B8FD9` | Clareza operacional |
| Dyson | `#5B5BD6` | Exploração técnica (contida) |
| LCM Studio | `#0D9F75` | Criação controlada |
| BusinessZap | `#D97706` | Comunicação responsável |

## Tipografia

- Display: Instrument Sans
- Body: Inter
- Escala fluida/contida (hero ≤ ~3.5rem) — sem 150px/450px

## Radius

`6 / 8 / 12 / 16 / 20` — equilíbrio; pills só em badges.

## Motion

Engineering-grade: delays curtos, `Reveal` discreto, hero com glow/conexões lentas, `prefers-reduced-motion` respeitado.

## Arquivos

- `site/src/styles/tokens.css`
- `site/src/app/globals.css`
- `site/src/config/productThemes.ts`
- `site/src/components/sections/EcosystemHero.tsx`
- `site/src/components/ui/Icon.tsx`
