# MOTION POLICY — Sprint 02

## Estratégia

1. CSS transitions / transforms / keyframes leves
2. Intersection Observer (`Reveal`, `TriadScene` visibility)
3. `requestAnimationFrame` só para interpolar pointer → CSS variables
4. Sem Framer Motion / GSAP / Three.js nesta sprint

## Hero assemble

Fases: `enter` → `join` → `settle` (~320 ms / ~980 ms). Duração total alvo: 900–1600 ms.

Após settle: float de poucos pixels, pulsos nas conexões, respiração do bloom — só com a cena em viewport.

## Pointer parallax

- Desktop + `pointer: fine` + motion ok
- Offset máximo ~7px, interpolação 0.08
- Sem setState por frame

## `prefers-reduced-motion`

- Tokens de duração → 1 ms
- `Reveal` imediato
- TriadScene: composição final, sem loops/parallax
- Botões sem translate no hover
- `scroll-behavior: auto`

## Regras

1. Conteúdo no HTML desde o primeiro paint
2. Sem informação essencial só por movimento
3. Sem flashes / loops chamativos
4. Pausar ambient fora do viewport
5. Delays curtos — leitura imediata

## Cobertura

| Efeito | Onde |
|--------|------|
| Assemble tríade | `TriadScene` |
| Pointer depth | `PointerParallax` |
| Reveal seções | `Reveal` |
| Header scrolled | `Header` |
| CTA arrow | `HeroActions` |
