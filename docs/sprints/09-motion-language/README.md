# Sprint 09 — LCM Global Motion Language V1

## Fases 1 + 2 (concluídas)

### Fase 1 — Fundação técnica (`site/src/motion/`)

| Arquivo | Função |
|---|---|
| `tokens.css` | Tokens de motion: durações primas (13/17/23/29s respiração, 31/37/41s drift), easings orgânicos, limite de pointer (4px), multiplicadores de profundidade, tetos de opacidade |
| `useMotion.ts` | `usePrefersReducedMotion` · `usePresence` (IO por seção) · `usePageVisibility` |
| `usePointerField.ts` | 1 rAF único com inércia → CSS variables. Nunca React state por frame. Desktop fine-pointer apenas |

`useAutoHistMotion.ts` migrado: agora re-exporta a fundação (`useChapterPresence` = `usePresence`) e `useAutoHistPointer` vira wrapper de `usePointerField` com os parâmetros exatos do V1.1. **Comportamento idêntico.**

### Fase 2 — Atmosfera Global (`site/src/motion/Atmosphere/`)

Montada no `layout.tsx`, `position: fixed`, `z-index: -1` — acima do fundo do body, abaixo de todo conteúdo (main/footer em z≥1). Presente em todas as rotas, idêntica sempre.

Lâminas (trás → frente):

1. **Gradiente vivo** — clima azul LCM, deriva de opacidade em 29s
2. **Haze A** (topo-direita, 23s) + **Haze B** (base-esquerda, 17s, defasada) — respiração em períodos primos: o ciclo composto nunca repete perceptivelmente
3. **Glow ambiente** — pointer com inércia (máx. 2px, lerp 0.03) no wrapper + drift autônomo ±6px/37s no interno (sem conflito de transform)
4. **Partículas** — 6 pontos, 1–2.5px, opacidade ≤ 0.28, drift de 31–41s, delays negativos (nascem "no meio" do ciclo)
5. **Vinheta** — estática, ancora profundidade
6. **Grain** — permanece o existente em `globals.css` (`body::before`), acima da atmosfera

### Regras aplicadas

- Pausa total com aba oculta (`visibilitychange` → `animation-play-state: paused`)
- Reduced motion: partículas removidas do DOM; gradiente/haze/vinheta estáticos
- Só `transform` + `opacity` animados; blur estático rasterizado
- Mobile: metade das partículas, blur reduzido
- Superfícies congeladas da Home: intactas (fundos próprios opacos; atmosfera visível nos respiros)

## Próximas fases

3. Universos leves: Tecnologia (órbitas) e Empresa (planos tectônicos)
4. Universos de produto: Dyson (campo neural), LCM Studio (construção), BusinessZap (rede)
5. Auditoria 60fps + reduced motion + documentação final

## Screenshots

`screenshots/atmosphere-*.png` — home, empresa, tecnologia, autohist, mobile, reduced-motion.
