# COMPONENTS — Sprint 02

## Layout

| Componente | Responsabilidade |
|------------|------------------|
| `Header` | Logo LCM, nav, CTA, scroll surface, menu mobile |
| `Footer` | Legal `LCM Enterprise LTDA`, links |
| `ScrollToTop` | Botão após scroll |
| `Container` | Largura máxima |

## Hero Experience

| Componente | Responsabilidade |
|------------|------------------|
| `HeroExperience` | Shell escuro, layout, transição |
| `HeroContent` | Eyebrow, título, subtítulo |
| `HeroActions` | CTAs |
| `TriadScene` | Cena interativa da tríade |
| `PointerParallax` | Hook de profundidade por pointer |
| `PrinciplesBand` | Quatro princípios pós-hero |

## Navigation

`DesktopNavigation`, `MobileNavigation`, `ProductMenu`

## UI

`Button`, `LinkButton`, `Badge`, `Section`, `SectionHeading`, `FeatureCard`, `Tabs`, `Accordion`, `Counter`

## Product

`ProductCard`, `ProductStatusBadge`, `ProductHero`

## Sections (legado / páginas internas)

`PageHero`, `CTASection`, `PrincipleCard`, `TechnologyLayer`, `ContactForm`, `TriadHero` (não usado na Home)

## Brand

`Logo` (oficial, wordmark LCM), `TriadMark` (geometria estrutural, não substitui a logo)

## Motion

`Reveal`

## Critério

Reutilizar quando houver variação ou comportamento. A cena do hero fica isolada em `components/hero/` para refinamentos futuros.

---

## Milestone 3 — Living Hero

`TriadScene` ganhou camadas físicas (grid / glow / bg / particles / main / fg) e `PointerParallax` passou a escrever profundidades e proximidades independentes. Estrutura de componentes da Sprint 02 permanece.

---

## Milestone 4 — Immersive Hero

| Componente | Papel |
|------------|-------|
| `ImmersiveHero` | Shell contínuo + pointer root |
| `HeroEnvironment` | Camadas full-bleed |
| `HeroContent` / `HeroActions` | Copy + CTAs (inalterados em texto) |
| `PrinciplesBand` | Continuação visual do ambiente |
| `TriadScene` | Legado (não usado na Home) |
| `HeroExperience` | Reexport legado → `ImmersiveHero` |

---

## Hero V3

| Componente | Papel |
|------------|-------|
| `HeroExperience` | Shell full-width + motion root |
| `HeroArtComposition` | Objeto visual único + camadas |
| `AnimatedTitle` | Entrada tipográfica por linha |
| `HeroContent` / `HeroActions` | Copy + CTAs |
| `useHeroMotion` | Pointer + scroll (só no Hero) |
