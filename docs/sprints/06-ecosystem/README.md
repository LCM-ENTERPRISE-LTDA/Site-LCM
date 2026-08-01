# Milestone 6 — Ecosystem Experience

## Conceito

Uma seção premium que demonstra que AutoHist, Dyson, LCM Studio e BusinessZap **não são produtos desconectados** — todos pertencem ao mesmo ecossistema LCM, unidos por engenharia, princípios e visão compartilhados.

Não é um Product Showcase. Não há mockups, status, CTAs por produto nem fluxograma.

Mensagem central: **Produtos diferentes. Uma mesma engenharia.**

## Posição narrativa

```
Hero → quem somos
Product Showcase → o que construímos
Manifesto → por que construímos
Technology → como construímos
Ecosystem → como tudo se conecta
Origem / CTA → fechamento
```

Inserida **depois** de `TechnologyExperience`, antes da seção Origem.

## Arquitetura

```
EcosystemExperience
├── entryBridge (continuidade visual da Tecnologia)
├── EcosystemIntro (eyebrow / título / subtítulo)
├── EcosystemField
│   ├── SharedFoundation (malha / planos / pulsos)
│   ├── ProductRegion ×4 (acentos assimétricos)
│   ├── ConnectionSignals (circulação na base, não setas produto↔produto)
│   ├── hit pads (pointer focus)
│   └── labels editoriais
├── SharedPrinciples (linha tipográfica contida)
└── EcosystemOutro (CTA único → /produtos)
```

Hook: `useEcosystemMotion` — um rAF, CSS vars, focus regional.

Conteúdo: `site/src/content/ecosystem.ts`

## Copy

| Peça | Texto |
|------|-------|
| Eyebrow | Ecossistema |
| Título | Produtos diferentes. Uma mesma engenharia. |
| Subtexto | Cada produto atende a uma necessidade própria, mas todos compartilham os mesmos princípios de usabilidade, performance e construção responsável. |
| CTA | Explorar o ecossistema → `/produtos` |
| Princípios | Usabilidade · Performance · Clareza · Segurança · Problemas reais |

## Relação entre produtos (conceitual)

| Produto | Acento | Expressão |
|---------|--------|-----------|
| AutoHist | azul `#4d9be8` | Organização e operação |
| Dyson | violeta `#8b7cf0` | Inteligência e exploração |
| LCM Studio | âmbar `#f0a040` | Criação com governança |
| BusinessZap | verde `#3ecf8e` | Comunicação e fluxo |

**Não afirmamos** integrações técnicas, compartilhamento de dados, interoperabilidade ou infraestrutura unificada.

## Motion

- Convergência / circulação / equilíbrio
- Pulsos na malha compartilhada
- Planos com respiração leve
- Diferente de Hero, Showcase, Manifesto e Technology tabs
- Pausado fora do viewport (`IntersectionObserver`)

## Pointer

- Desktop fine pointer apenas
- Deslocamento ≤5px via CSS vars
- Proximidade a regiões eleva clareza local e atenua as demais
- Sem magnetismo, sem rotação global, sem clique obrigatório

## Mobile

- Copy primeiro
- Composição redesenhada para largura estreita
- Labels legíveis
- Sem pointer / transform de profundidade

## Reduced motion

- Composição final estática
- Sem pulsos SMIL, dash, breathe
- Sem pointer
- Nomes, cores e copy preservados

## Performance

- Sem libs novas (CSS / SVG / rAF / IO)
- Um rAF enquanto vivo + fine pointer
- Sem React state por frame (focus só em mudança de região)
- Pausado fora do viewport

## Limites factuais

Unidade de visão e engenharia — **não** integração de produção não documentada.

## Arquivos

| Caminho | Papel |
|---------|-------|
| `site/src/components/ecosystem/**` | Seção |
| `site/src/content/ecosystem.ts` | Copy / produtos |
| `site/src/app/page.tsx` | Wire `<EcosystemExperience />` |
| `docs/screenshots/ecosystem/` | Capturas |

## Pendências

Nenhuma para M6. Próximas milestones não iniciadas.
