# MOTION POLICY — Milestone 2

## Estratégia

Uma única abordagem principal:

1. CSS transitions/transforms
2. Intersection Observer no componente `Reveal`
3. Sem Framer Motion / GSAP nesta fundação

### Milestone 3A

Motion refinado para parecer engenharia: menos deslocamento (12px), delays menores, hero com glow/conexões lentas (`EcosystemHero`), microinterações em botões/cards/nav/tabs/accordion. Sem espetáculo.

## Regras

1. Conteúdo permanece no fluxo normal do documento.
2. Sem `visibility: hidden` permanente.
3. Delays máximos práticos ~400 ms (não 1800 ms do template).
4. Não animar tudo — priorizar seções e cards.
5. SEO: texto no HTML desde o primeiro paint (RSC/SSG).
6. Evitar layout shift relevante.

## `prefers-reduced-motion`

Quando ativo:

- `Reveal` marca conteúdo como visível imediatamente
- tokens de duração caem para ~1 ms
- `html { scroll-behavior: auto }`
- sem translate/zoom de entrada
- tabs, accordions e menu continuam funcionais
- hover sem deslocamento acentuado

## Efeitos cobertos

| Efeito | Implementação |
|--------|---------------|
| fade / up / down / left / right / zoom | `Reveal` directions |
| delays escalonados | prop `delay` limitada |
| hover cards/botões | CSS modules |
| menu mobile | CSS + estado React |
| tabs / accordion | componentes acessíveis |
| scroll-to-top | `ScrollToTop` |
| counters | `Counter` (animação só se `animate`) |

## Referência

Inventário histórico: `docs/EFFECTS-INVENTORY.md` (Pemogan). Reimplementação consciente, não cópia do Elementor.
