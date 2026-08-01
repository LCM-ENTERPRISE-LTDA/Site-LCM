# CURRENT DESIGN TOKENS — Milestone 1

Fonte principal: `wp-content/uploads/sites/38/elementor/css/post-399b4.css` (`.elementor-kit-3`).  
Tokens do **template Pemogan atual** — a paleta LCM **ainda não** foi aplicada.

---

## Cores principais

| Token | Valor | Uso |
|-------|-------|-----|
| `--e-global-color-primary` | `#17171A` | Quase preto / texto forte / fundos escuros |
| `--e-global-color-secondary` | `#DC4C1E` | Accent laranja (CTAs) |
| `--e-global-color-text` | `#4E4E4E` | Texto corpo |
| `--e-global-color-accent` | `#BCBCBC` | Neutro / muted |

## Cores secundárias / utilitárias

| Token | Valor |
|-------|-------|
| `--e-global-color-a0f8d63` | `#EDFBFF` (fundo frio claro) |
| `--e-global-color-b26646c` | `#746363` |
| `--e-global-color-5102508` | `#FFFFFF` |
| `--e-global-color-b5857ea` | `#17171A00` (transparente) |
| `--e-global-color-e706e17` | `#FFFFFF5E` |
| `--e-global-color-64677ae` | `#FFFFFF1C` |

## Fundos

- Fundos sólidos via tokens acima.
- Imagens de atmosfera em `uploads/sites/38/2025/08/` (`Background-Gradient-*.png`, `BG-Gradient-*.png`, `Frame-Hiro-*.png`).
- Não tratar gradientes decorativos PNG como “token nomeado” até o rebranding.

## Gradientes

- Presets WordPress embutidos no HTML (`--wp-preset--gradient-*`) — secundários.
- Gradientes de marca do template: majoritariamente **bitmaps**, não CSS variables.

---

## Tipografia

| Família | Papel |
|---------|-------|
| **Instrument Sans** | Display / headings |
| **Inter** | UI / corpo / labels |

Arquivos locais (pós-correção Milestone 1):  
`uploads/sites/38/elementor/google-fonts/fonts/*.woff2` + CSS em `.../google-fonts/css/`.

### Escala (tokens Elementor)

| Token tipográfico | Size | Weight | Family |
|-------------------|------|--------|--------|
| primary | 150px (desktop) / 105px (override tablet no kit) | 600 | Instrument Sans |
| secondary | 90px | 600 | Instrument Sans |
| text | 50px | 600 | Instrument Sans |
| accent | 36px | 600 | Instrument Sans |
| custom a039459 | 62px | 600 | Instrument Sans |
| custom ebe1b53 | 50px | 600 | Instrument Sans |
| custom a30a843 | 450px (decorativo) / 380px override | 600 | Instrument Sans |
| Inter 3ac8c2c | 32px | 600 | Inter |
| Inter b53a927 | 24px | 600 | Inter |
| Inter c2ed8ec | 16px | 600 | Inter |
| Inter dd5d50a | 16px | 400 | Inter |
| Inter b40715f / 39c7eca | 14px | 600 / 400 | Inter |

### Line-height

- Primary desktop: ~183px (acompanha 150px).
- Demais: definidos por widget/post CSS (inventariar por componente no rebrand).

---

## Border radius

Observados no CSS das páginas (home e shell):

- `20px`
- Assimétricos: `0 20px 0 20px`, `20px 20px 20px 0`
- Pill: `100px` (botões)
- Dropdown menu HFE: ~`12px`

## Sombras

- Variam por widget Elementor (box-shadow inline/post CSS).
- Sem escala de shadow tokens nomeados no kit — documentar na migração criando `--shadow-sm/md/lg`.

## Espaçamentos

- Grid Elementor flex/containers; paddings típicos de seções 40–120px (post CSS).
- Margens negativas no hero home: `-125px`, `-200px`, `-50px` (sobreposição visual).

## Larguras máximas

- Containers Elementor boxed + larguras de imagem (`max-width` ~300–800px).
- Alguns `width: 1024px` fixos em contextos específicos — monitorar overflow.

---

## Breakpoints

| Camada | Valores |
|--------|---------|
| Elementor config | xs 0 · sm 480 · md 768 · lg 1025 · xl 1440 · xxl 1600 |
| Responsive labels | mobile max 767 · tablet 1024 · widescreen 2400 |
| Home post CSS | max 1024 · max 767 · min 768 · banda 768–1024 |
| Woo smallscreen | max-width 768px |
| HFE menu | breakpoint tablet (hamburger) |

## Durations

| Uso | Valor |
|-----|-------|
| Hover shrink | ~0.3s |
| Accordion nested | 400ms |
| Counter | 2000ms |
| Scroll-top fade | 300ms |
| Animation delays | 0–1800ms |

## Easings

- Keyframes Elementor padrão (ease implícito do CSS animate).
- Sem curva cubic-bezier nomeada global no kit.

## Z-index

- Empilhamento típico Elementor/HFE para menu overlay / sticky / popups (valores altos no CSS de nav/offcanvas).
- Sem escala tokenizada — criar na reconstrução (`--z-header`, `--z-overlay`, `--z-modal`).

---

## Próximo passo (fora desta milestone)

Mapear tokens Pemogan → tokens LCM e substituir por variáveis CSS centralizadas, em vez de search-replace em centenas de arquivos.
