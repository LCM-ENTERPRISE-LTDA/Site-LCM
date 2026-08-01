# IMMERSIVE HERO — Milestone 4

## Problema anterior

O Hero da Sprint 02 / Milestone 3 ainda separava **texto à esquerda** e **TriadScene em painel à direita**. A geometria vivia em um retângulo visual — widget / SVG encaixado — mesmo com parallax e partículas sofisticados.

## Nova direção

O Hero inteiro é o ambiente. Camadas atmosféricas, grid, luz, partículas, conexões e módulos ocupam `inset: 0` sobre a seção. O conteúdo flutuá em zona protegida (~40% esquerda) sem card. Texto e geometria compartilham o mesmo espaço.

## Arquitetura

```
ImmersiveHero
├── HeroEnvironment (full-bleed)
│   ├── AtmosphereLayer
│   ├── StructuralGridLayer
│   ├── LightFieldLayer
│   ├── ParticleFieldLayer
│   ├── ConnectionFieldLayer + TriadModules + ProductSignals + Core
│   ├── ForegroundDepthLayer
│   └── readVeil (legibilidade, não painel)
├── HeroContent + HeroActions
└── transition → PrinciplesBand
```

`TriadScene` e o shell antigo `HeroExperience` estão legados / reexport.

## Interação

Um único `requestAnimationFrame` em `PointerParallax` escreve variáveis CSS no root do Hero. Intensidades por camada (atm → foreground). Proximidade `--near-a/b/c/core`. Texto não se move.

## Mobile

Ambiente full-bleed atrás do texto; sem caixa abaixo; parallax desligado; menos partículas.

## Reduced motion

Composição final; sem parallax / drift / pulses / animateMotion; veil e profundidade estáticos.

## Tokens

`--hero-light-x/y`, `--hero-depth-*`, `--hero-grid-opacity`, `--hero-particle-opacity`, `--hero-connection-opacity`, `--hero-safe-zone`, `--hero-atmosphere-strength`.

## Tipografia

Hero força Instrument Sans (`--font-instrument`) no título — alinhado ao Design System. A referência visual serifada da mockup **não** foi adotada.

## Limitações / próximos

- Assimetria da geometria ainda pode ganhar escala maior em 1920+
- Transição PrinciplesBand é sutil; pode aprofundar
- `docs/CREATIVE_EXPLORATION.md` permanece untracked (exploração, fora do escopo desta entrega)
