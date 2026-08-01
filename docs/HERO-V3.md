# HERO V3 — Interactive full-width composition

## Problem removed

Previous versions either boxed the scene or scattered triad-like modules. Text sat in a narrow left column. Motion felt like a widget.

## Concept

One Hero section is one visual piece: centered institutional message + a single abstract construction object spanning the width. Pointer depth and ambient motion live only inside `overflow: hidden` on the Hero.

## Architecture

```
HeroExperience
├── background (hero-scoped colors)
├── HeroArtComposition (far / mid / main / near)
├── HeroContent
│   ├── eyebrow
│   ├── AnimatedTitle
│   ├── subtitle
│   └── HeroActions
└── exit fade → next section
```

## Motion bounds

- Starts: top of Hero section (below Header)
- Ends: bottom edge of Hero (`overflow: hidden` + IO pause)
- Outside Hero: no pointer rAF, no ambient loops, no special scroll effects

## Typography

Instrument Sans display; line reveal via clip/translate. Copy text unchanged (line breaks only).

## Reduced motion

Final static composition; no pointer/scroll/ambient/packets.

## Performance

- 1 pointer rAF (while in view + fine pointer)
- 1 scroll rAF throttle (while in view)
- No React state per frame
- No new dependencies
