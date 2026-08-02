# Site-LCM

Site institucional da **LCM Enterprise LTDA**.

Aplicação Next.js 15 (App Router + TypeScript) em `site/`.

## Estrutura

| Caminho | Função |
|---------|--------|
| `site/` | Aplicação de produção (Next.js) |
| `docs/` | Documentação por sprint + screenshots |

## Desenvolvimento local

```powershell
cd site
npm install
npm run dev
```

URL: http://localhost:3000

```powershell
npm run typecheck
npm run lint
npm run build
npm run start
```

## Deploy (Vercel / GitHub)

1. Conecte este repositório no Vercel (ou similar).
2. Defina **Root Directory** como `site`.
3. Build: `npm run build` · Install: `npm install`.
4. Framework preset: Next.js.

## Branch de trabalho

`feature/lcm-rebranding`
