# PERFORMANCE BASELINE — Milestone 2

Medido após `npm run build` (Next.js 15.5.22) em ambiente local Windows.

## Build

- Compilação: sucesso
- Rotas: 16 páginas geradas (todas estáticas / SSG)
- First Load JS compartilhado: ~103 kB
- Páginas típicas: ~108 kB first load

## Observações

| Tema | Estado |
|------|--------|
| SSG | Todas as rotas institucionais e de produto |
| Imagens | Sem assets pesados ainda; `next/image` pronto |
| Fontes | `next/font` Instrument Sans + Inter (pesos limitados) |
| Client Components | Header/nav, Reveal, Tabs, Accordion, Counter, ContactForm, ScrollToTop |
| Server Components | Páginas e a maior parte das sections |
| Trackers | Nenhum |
| WP/Elementor CSS/JS | Ausentes em `site/` |

## Riscos futuros

- Adicionar motion library aumentaria JS client
- Screenshots reais exigirão otimização `next/image`
- Formulário com provider remoto precisará de boundary de erro e rate limit

## Testes automatizados

Não foi adicionada suite de testes nesta milestone para evitar complexidade precoce. Checklist manual em `MILESTONE-2-REPORT.md`.
