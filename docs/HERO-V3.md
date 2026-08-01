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

---

## V3.1 — Visual & motion refinement

Preserves V3 concept/layout/copy/architecture. Craft improvements only:

- Fewer peripheral ribbons (2 long, low-contrast); removed decorative side waves
- Central object as layered plates (far/mid/near) with differential parallax
- Softer nucleus bloom + longer falloff; contained blue/cyan
- Tighter vertical rhythm (eyebrow → title → subtitle → CTAs)
- Pointer amplitudes capped (~1–8px); smoother lerp
- Quieter ambient (glow + one ribbon + one plane)
- Shorter exit fade; optical lift of copy block
- Screenshots: `docs/screenshots/hero-v31-*.png`

---

## V3.2 — Final polish (Hero Freeze)

Last craft pass. No new direction, elements, or effects.

- Materials: plate gradients, rim highlights, cast shadow, clearer plane separation
- Nucleus: controlled energy (halo + bloom + nested rings) without neon brightness
- Local contrast: deeper edge haze, quieter fill light, object reads on static frame
- Lines: single peripheral ribbon; side leads removed
- Motion: heavier pointer inertia; light tracks more slowly
- Editorial spacing; CTA pair gap; taller exit fade before PrinciplesBand
- Screenshots: `docs/screenshots/hero-v32-*.png`

**Hero Freeze:** no further visual exploration of this Hero. Next work → remaining Home sections and internal pages.
