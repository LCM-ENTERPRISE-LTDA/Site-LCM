# Site LCM — aplicação Next.js

Aplicação institucional da **LCM Enterprise LTDA**.

## Comandos (Windows PowerShell)

```powershell
cd site
npm install
npm run dev
```

Abra: http://localhost:3000

```powershell
npm run typecheck
npm run lint
npm run build
npm run start
```

## Stack

- Next.js (App Router)
- TypeScript
- React Server Components
- CSS Modules + tokens CSS
- `next/font` (Instrument Sans + Inter — provisório)
- Motion via Intersection Observer + CSS (`Reveal`)

Sem WordPress, Elementor, jQuery ou dependências do mirror Pemogan.

## Estrutura

```text
src/
  app/           # rotas
  components/    # UI, layout, navigation, motion, product, sections
  config/        # site, navigation, product themes
  content/       # textos institucionais
  data/          # produtos (fonte única)
  lib/           # helpers
  styles/        # design tokens
  types/
```

## Variáveis

Copie `.env.example` para `.env.local` se necessário:

```text
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
