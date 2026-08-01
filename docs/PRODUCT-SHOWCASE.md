# Product Showcase — Premium editorial experience

## Concept

Four full-width product chapters stacked vertically. Not a grid. Not cards. Each block is a distinct atmosphere inside the same LCM dark universe established by the Hero.

## Architecture

```
ProductShowcase
├── intro (eyebrow / title / subtitle)
└── stack
    ├── ProductFeature AutoHist (timeline)
    ├── ProductFeature Dyson (constellation)
    ├── ProductFeature LCM Studio (canvas)
    └── ProductFeature BusinessZap (signal)
```

## Identity per product

| Product | Atmosphere | Visual language | Motion entrance |
|---------|-------------|-----------------|-----------------|
| AutoHist | Cool precision | Timeline + record strips | Lateral slide |
| Dyson | Deep / mysterious | Orbits + nodes + core | Scale + blur clear |
| LCM Studio | Creative warm | Editor frame + blocks | Vertical assemble |
| BusinessZap | Connected flow | Hubs + message paths | Opposite lateral |

## Interaction

- Intersection Observer → enter once
- Local pointer → `--fx` / `--fy` / `--lx` / `--ly` on feature root
- Hover deepens atmosphere glow and lifts visual slightly
- CTA arrow micro-shift
- `prefers-reduced-motion` → static final composition

## Constraints

- Does not modify Hero, Header, Logo, Footer, or global tokens
- No new dependencies
- CSS + SVG + IO + single rAF per active feature
