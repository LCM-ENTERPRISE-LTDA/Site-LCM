# COMPONENTS — índice

Mapa vivo dos componentes. Docs detalhados por sprint em `docs/sprints/`.

## Layout

| Componente | Responsabilidade |
|------------|------------------|
| `Header` | Logo LCM, nav, CTA, scroll surface, menu mobile |
| `Footer` | Legal `LCM Enterprise LTDA`, links |
| `ScrollToTop` | Botão após scroll |
| `Container` | Largura máxima |

## Hero V3 (congelado)

| Componente | Papel |
|------------|-------|
| `HeroExperience` | Shell full-width + motion root |
| `HeroArtComposition` | Objeto visual único + camadas |
| `AnimatedTitle` | Entrada tipográfica por linha |
| `HeroContent` / `HeroActions` | Copy + CTAs |
| `useHeroMotion` | Pointer + scroll (só no Hero) |
| `PrinciplesBand` | Quatro princípios pós-hero |

Detalhes: `docs/sprints/02-hero/HERO-V3.md`

## Product Showcase

| Componente | Papel |
|------------|-------|
| `ProductShowcase` | Intro + stack editorial |
| `ProductFeature` | Capítulo full-width por produto |
| `ShowcaseVisuals` | SVGs por personalidade |
| `useFeaturePointer` | Pointer local |

Detalhes: `docs/sprints/03-product-showcase/PRODUCT-SHOWCASE.md`

## Philosophy — Cinematic Manifesto

| Componente | Papel |
|------------|-------|
| `PhilosophyExperience` | Sticky stage + scroll cinema |
| `ManifestAtmosphere` | Haze, mist, dust, grain, light wash |
| `PhilosophyStatementBlock` | Frase editorial (`--pv`) |
| `useManifestMotion` | Scroll + pointer atmosfera (≤4px) |

Detalhes: `docs/sprints/04-philosophy/CINEMATIC-MANIFESTO.md`

## Technology — Living Architecture

| Componente | Papel |
|------------|-------|
| `TechnologyExperience` | Seção Tecnologia (Home) |
| `TechnologyPerspectives` | Switcher Experiência / Sistemas / IA + dissolve |
| `TechArchitecture` | Composição SVG viva por perspectiva |
| `TechLayers` | Lista editorial de camadas |
| `useTechPointer` | Parallax/luz ≤5px |

Detalhes: `docs/sprints/05-technology/README.md`

## Ecosystem Experience

| Componente | Papel |
|------------|-------|
| `EcosystemExperience` | Seção Ecossistema (Home), pós-Technology |
| `EcosystemField` | Malha compartilhada + quatro regiões de acento |
| `useEcosystemMotion` | Pointer ≤5px + focus regional (CSS vars) |

Conteúdo: `site/src/content/ecosystem.ts`  
Detalhes: `docs/sprints/06-ecosystem/README.md`

## Navigation / UI / Product / Motion

`DesktopNavigation`, `MobileNavigation`, `ProductMenu` · `Button`, `Badge`, `Section`, `Tabs`… · `ProductCard`, `ProductHero` · `Reveal`
