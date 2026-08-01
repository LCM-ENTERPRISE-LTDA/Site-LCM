# Milestone 5.1 — Technology refinement + Manifesto transition

## Objetivo

Corrigir a faixa vazia entre Manifesto e Tecnologia, enriquecer as composições visuais das três perspectivas e equilibrar a seção — sem redesign completo.

## Correções

### Ponte Manifesto → Tecnologia
- Última frase do Manifesto **mantém visibilidade** até o fim do track (evita sticky viewport vazio)
- Bridge do Philosophy: altura intencional + convergência azul para `#070b12`
- Technology: padding-top reduzido; entryBridge contínuo; conteúdo aparece cedo

### Composições
| Perspectiva | Natureza |
|-------------|----------|
| Experiência | Planos de interface + rota de foco + feedback |
| Sistemas | Módulos com detalhe interno + orquestração + rotas |
| IA | Campo de relações + núcleo de inferência + entrada/saída |

### Lista de camadas
Highlight sutil sincronizado com a perspectiva ativa (opacidade + sinal).

### Mobile
Texto primeiro, arte abaixo; pointer só com hover fino; stage 280–420px+.

## Escopo tocado
- `site/src/components/technology/**`
- `useManifestMotion` (hold da última frase) + bridge CSS do Philosophy
- docs + screenshots v5.1

## Validação
typecheck · lint · build · sem push
