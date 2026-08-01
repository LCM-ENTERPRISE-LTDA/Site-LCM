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
