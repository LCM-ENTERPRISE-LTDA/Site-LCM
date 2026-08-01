# Philosophy — Cinematic Manifesto (M4.3)

## Concept

A sticky cinematic stage. One phrase at a time emerges from mist, holds, then yields to the next with soft overlap. The field breathes; color energy shifts blue → violet → gold → green. No ribbons. No UI chrome.

## Architecture

```
PhilosophyExperience
├── track (4 × 100vh scroll length)
│   └── sticky viewport (100vh)
│       ├── ManifestAtmosphere
│       ├── intro eyebrow
│       └── stage → PhilosophyStatementBlock × 4 (--pv)
└── bridge → Tecnologia
```

## Scroll cinema

`--manifest-p` (0–1) drives per-phrase `--pv` via soft windows with ~overlap.
Opacity / blur / translate / scale from `--pv`. No enter-once IntersectionObserver for text.

## Atmosphere

Volumetric wash, mist, dust, grain, vignette. Pointer nudges atmosphere ≤4px. Slow ambient (24–36s).

## Typography

Contained editorial (`~1.2–1.75rem`, max ~36ch). Not billboard.

## Docs location

`docs/sprints/04-philosophy/`  
Screenshots: `docs/screenshots/philosophy/`
