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

---

## Milestone 3 — Living Hero Experience

Expansão da cena (sem alterar layout, copy, logo, paleta ou tipografia).

### Camadas

| Camada | Papel | Parallax |
|--------|-------|----------|
| Grid Layer | Malha 60° revelada pela luz | ~2px |
| Glow Layer | Bloom + specular metálico | ~4–5px |
| Background | Planos estruturais distantes | ~2px |
| Particles | Poeira suspensa + pacotes nas conexões | ~9px |
| Main | Módulos, conexões, núcleo, sinais de produto | ~7px |
| Foreground | Speculares de superfície | ~11–12px |

### Vida do sistema

- Núcleo respira `1.00 → 1.03`
- Módulos oscilam em tempos dessincronizados
- Pulsos de dados percorrem conexões (intervalos irregulares, SMIL `animateMotion`)
- Quatro sinais de cor emanam do núcleo (sem cards/ícones/labels)
- Proximidade do cursor: brilho + escala ≤ 4% no módulo próximo
- Grid quase invisível até a luz passar

### Performance

- Variáveis CSS multicamada via um único rAF
- Sem re-render React no pointer
- Ambient pausa fora da viewport
- Reduced motion: composição final, sem pulses/parallax/loops

---

## Milestone 4 — Immersive continuous environment

A `TriadScene` em caixa foi **eliminada**. `ImmersiveHero` + `HeroEnvironment` espalham camadas por todo o Hero. Ver `docs/IMMERSIVE-HERO.md`.

### Hotfix de composição

- Estrutura principal **concentrada** no centro-direita (núcleo + 3 módulos conectados)
- Ambiente (grid, luz, poeira) irradia a partir do núcleo — sem dispersão de módulos
- Copy no `Container` institucional: **480–680px** (ideal ~520–620)
- Hero `min-height` ~720–860px (sem espalhar verticalmente)
