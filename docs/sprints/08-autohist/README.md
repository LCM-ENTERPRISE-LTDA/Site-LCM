# Milestone 8 — AutoHist Experience

## V3 — Narrativa visual (abaixo do Hero)

Experiência em 7 capítulos que responde: problema → centralização → como funciona → busca → timeline → confiança → CTA.

- Hero V2 **congelado** (Horizonte Técnico)
- Cap. 3: device frames premium (UI do sistema estilizada — sem screenshots reais no repositório)
- Cap. 5: timeline horizontal grande (lista vertical no mobile)
- Motion: CSS + SVG, IO + visibility, reduced motion completo
- Screenshots: `screenshots/autohist-v3-*.png`

## V2 — Hero "Horizonte Técnico" (arte oficial)

Key Visual "Horizonte Técnico" como **cena full-bleed** do Hero inteiro: a arte cobre a seção, o texto ocupa o espaço negativo à esquerda (desenhado para isso). Nenhum retângulo — máscaras irregulares + fusão de bordas nas cores do ambiente.

Camadas vivas: scanner atravessando a composição (14s), linha de dados SVG com 3 pulsos em velocidades primas (13/19/23s) alinhados ao caminho de luz pintado (viewBox 1536×1024 + `slice` espelhando o crop `cover`), glow de piso e haze de horizonte respirando, 4 partículas ocasionais, pointer 4px com inércia (rAF único da fundação), parallax leve (arte 0.5×, luz 0.75×, overlays 1×).

- Desktop: cena absoluta atrás da copy · Tablet: em fluxo abaixo da copy com motion · Mobile: estática, recorte fechado na placa
- Pausa fora da viewport (IO) e quando a aba perde foco (`usePageVisibility`)
- Reduced motion: remove scanner/pulsos/partículas, mantém iluminação estática
- Asset: `site/public/products/autohist/hero/autohist-horizon.webp` (1536×1024, ~67 KB)
- Screenshots: `screenshots/autohist-hero-v2-*.png`

## V1.1 — Hero living key visual (histórico)

Full-bleed integration do Key Visual anterior + overlays locais (scanner, pulsos, haze, partículas, reflexo, luz com inércia).

- Screenshots: `docs/sprints/08-autohist/screenshots/autohist-hero-v11-*.png`
- Escopo: **somente Hero** (`AutoHistHeroVisual` + layout do hero)

## Conceito

Página `/produtos/autohist` como **capítulo do universo LCM**, não landing SaaS.

Metáfora: **prontuário do veículo** — memória permanente, continuidade, precisão técnica.

Sensação: confiança → organização → clareza → continuidade.

## Capítulos

1. Hero — key visual / placa / registros  
2. Problema — fragmentos dispersos  
3. Histórico — espinha viva (não tabela)  
4. Busca — placa ilumina a história  
5. Oficina — campo compartilhado  
6. Continuidade — arco temporal  
7. Encerramento — frase + CTAs  

## Visual

Azul técnico profundo · ciano discreto · grids · haze · sem mockups · sem cards SaaS · sem FAQ/pricing.

## Motion

Lento, preciso, breathing. 1 rAF no Hero. IO por capítulo. `prefers-reduced-motion` completo.

## Arquivos

- `site/src/components/products/autohist/**`
- `site/src/content/autohist.ts`
- `site/src/app/produtos/[slug]/page.tsx` (branch só para `autohist`)

## Escopo preservado

Home, Empresa, listagem Produtos, demais produtos, Header, Footer: **inalterados**.
