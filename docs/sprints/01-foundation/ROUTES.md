# ROUTES — Milestone 2

Base URL local: `http://localhost:3000`

| Rota | Arquivo | Tipo | Descrição |
|------|---------|------|-----------|
| `/` | `site/src/app/page.tsx` | SSG | Home institucional |
| `/empresa` | `site/src/app/empresa/page.tsx` | SSG | Empresa |
| `/produtos` | `site/src/app/produtos/page.tsx` | SSG | Índice de produtos |
| `/produtos/autohist` | `site/src/app/produtos/[slug]/page.tsx` | SSG | AutoHist |
| `/produtos/dyson` | idem | SSG | Dyson |
| `/produtos/lcm-studio` | idem | SSG | LCM Studio |
| `/produtos/businesszap` | idem | SSG | BusinessZap |
| `/tecnologia` | `site/src/app/tecnologia/page.tsx` | SSG | Tecnologia |
| `/contato` | `site/src/app/contato/page.tsx` | SSG | Contato |
| `not-found` | `site/src/app/not-found.tsx` | — | 404 |
| `/sitemap.xml` | `site/src/app/sitemap.ts` | — | Sitemap |
| `/robots.txt` | `site/src/app/robots.ts` | — | Robots |

Slugs de produto vêm de `generateStaticParams()` + `products.ts`.
