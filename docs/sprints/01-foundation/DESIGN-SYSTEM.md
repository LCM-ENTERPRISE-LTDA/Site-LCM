# DESIGN SYSTEM — Sprint 02 (dark engineering)

Identidade visual da LCM centrada em atmosfera escura, precisão e geometria da tríade.

## Princípio

O fundo profundo (navy/grafite) carrega a presença. Azul da marca e ciano aparecem com precisão — CTAs, foco, conexões, sinais — nunca como “glow show”.

## Atmosfera

| Token | Valor | Uso |
|-------|-------|-----|
| `--background-deep` | `#050912` | Hero / profundidade |
| `--background-base` | `#080E1A` | Body |
| `--background-elevated` | `#0D1626` | Faixas / header scrolled |
| `--surface` | `#101B2D` | Cards / painéis |
| `--border-subtle` | `rgba(130,170,220,0.12)` | Separadores |
| `--text-primary` | `#F4F7FB` | Títulos / corpo |
| `--text-secondary` | `#AAB6C8` | Apoio |
| `--brand-blue` | `#2F6BFF` | Marca / CTA |
| `--brand-cyan` | `#19B8F2` | Sinais / eyebrow |

Aliases `--color-*` mapeiam para esses valores no `tokens.css`.

## Produtos

| Produto | Accent (dark-tuned) |
|---------|---------------------|
| AutoHist | `#4D9BE8` |
| Dyson | `#8B7CF0` |
| LCM Studio | `#F0A040` |
| BusinessZap | `#2FBF86` |

## Tipografia

- Display / Hero: Instrument Sans (peso 600–700, tracking negativo)
- Body: Inter
- Wordmark visual: **LCM** (sem “Enterprise”)
- Nome jurídico: **LCM Enterprise LTDA** (footer / metadados)

## Radius

`--radius-triad: 10px` como assinatura. Pills só em badges.

## Header

Transparente no topo → superfície translúcida + blur após scroll. Logo oficial compacta (`lcm-logo-dark.png`).

## Arquivos

- `site/src/styles/tokens.css`
- `site/src/app/globals.css`
- `site/src/components/hero/*`
- `docs/HERO-EXPERIENCE.md`
- `docs/MOTION-POLICY.md`

---

## Milestone 3

A atmosfera escura permanece. O Hero evolui para ecossistema vivo (camadas, parallax independente, iluminação metálica discreta) sem mudança de tokens de cor ou tipografia.

---

## Milestone 4 — Immersive Hero tokens

Tokens exclusivos do Hero (`--hero-*`) documentados em `docs/IMMERSIVE-HERO.md`. Paleta global inalterada. Tipografia do título do Hero confirmada como Instrument Sans.
