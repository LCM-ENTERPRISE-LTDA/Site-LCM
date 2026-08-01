# NEW DEPENDENCIES — Milestone 2

Dependências da aplicação em `site/`. Nenhuma biblioteca WordPress/Elementor.

| Dependência | Finalidade | Por que foi escolhida | Alternativas consideradas |
| ----------- | ---------- | --------------------- | ------------------------- |
| `next` (15.5.22) | Framework App Router + SSG | Arquitetura recomendada na M1; SEO nativo; RSC | Remix, Astro, Vite SPA |
| `react` / `react-dom` (19) | UI | Peer do Next.js | Preact (incompatível com Next oficial) |
| `typescript` | Tipagem | Exigência da milestone; DX e contratos de produto | JS puro |
| `eslint` + `eslint-config-next` | Lint | Padrão Next; qualidade mínima | Biome (migração futura possível) |
| `@types/node`, `@types/react`, `@types/react-dom` | Tipos | Necessários ao TypeScript | — |

## O que **não** foi instalado (de propósito)

| Biblioteca | Motivo |
|------------|--------|
| Framer Motion / GSAP | Motion via CSS + Intersection Observer (`Reveal`) |
| jQuery | Proibido / desnecessário |
| Swiper / Owl / libs de carousel múltiplas | Sem necessidade nesta fundação |
| Três libs de ícones | SVGs/`next/og` ícone próprio |
| Pacotes WP/Elementor | Referência isolada |

## Fontes

Instrument Sans e Inter via `next/font/google` (provisório). Sem CDN externo em runtime além do self-host do `next/font`.
