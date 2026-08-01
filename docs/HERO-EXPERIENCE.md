# HERO EXPERIENCE — Sprint 02

## Conceito

A Home abre em uma atmosfera escura de engenharia. Três módulos geométricos independentes (fundadores) convergem para um núcleo — união → construção → ecossistema — sem desenhar a logo oficial como ilustração.

## Estrutura

```
HeroExperience
├── atmosphere (grid/gradiente)
├── HeroContent
│   ├── eyebrow
│   ├── title (sans, forte)
│   ├── subtitle
│   └── HeroActions
├── TriadScene (+ PointerParallax)
└── transition (fade → PrinciplesBand)
PrinciplesBand
```

## Componentes

| Componente | Papel |
|------------|-------|
| `HeroExperience` | Shell escuro + layout + transição |
| `HeroContent` | Copy institucional |
| `HeroActions` | CTAs primário/secundário |
| `TriadScene` | Cena SVG + fases + ambient |
| `PointerParallax` | Hook rAF → CSS vars `--px/--py/--plight-*` |
| `PrinciplesBand` | Quatro princípios sob o hero |

## Interações (desktop)

- Pointer tracking com interpolação (~0.08)
- Deslocamento 2–7px por camada
- Leve perspectiva + luz acompanhando cursor
- Conexões com dash-offset na assemble
- Sem perseguição direta do cursor

## Mobile

- Texto primeiro, cena abaixo
- Sem pointer parallax (`pointer: fine` gate)
- Assemble + ambient leves
- CTAs empilham em viewports estreitas

## Reduced motion

- Fases pulam para `settle`
- Sem float/pulse/breathe
- Sem parallax
- Conteúdo sempre no HTML

## Performance

- Sem Three.js / vídeo / canvas HD
- Sem re-render no mouse (CSS variables)
- Intersection Observer pausa ambient fora da viewport
- Animação principal ~900–1100 ms

## Tokens

`--background-deep/base/elevated`, `--surface`, `--brand-blue`, `--brand-cyan`, texto claro, bordas `rgba(130,170,220,*)`.

## Limitações / próximos refinamentos

- Parallax ainda CSS-only (sem depth map)
- Cena ainda abstrata — pode ganhar sinais de produto sem virar diagrama
- Páginas internas usam `PageHero` (ainda válido; atmosfera global já escura)
- `TriadHero` legado permanece no repo, fora da Home
