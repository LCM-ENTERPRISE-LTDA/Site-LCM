# Site-LCM

Repositório do site institucional da **LCM Enterprise LTDA**.

## Estágio atual

**Milestone 2** — fundação Next.js (App Router + TypeScript + SSG), arquitetura institucional e páginas iniciais.

A Milestone 1 (auditoria do espelho Pemogan) permanece documentada em `docs/`.

## Estrutura do repositório

| Caminho | Função |
|---------|--------|
| `site/` | **Aplicação de produção** (Next.js) |
| `reference/` | Documentação da referência visual |
| `nva.nirmanavisual.com/` | Espelho HTTrack Pemogan (referência, não produção) |
| `_backups/original-httrack-pemogan/` | Backup imutável da captura original |
| `docs/` | Documentação por sprint (`docs/sprints/`) + screenshots |
| `scripts/` | Servidor HTTP da referência |

## Como executar o site novo (Next.js)

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

## Como executar a referência Pemogan

Na raiz do repositório:

```powershell
.\scripts\serve.ps1
```

URL: http://127.0.0.1:8080/

Não misture assets do mirror com a aplicação em `site/`.

## Branch

`feature/lcm-rebranding`

## Limitações atuais

- Conteúdo institucional em rascunho (ver `docs/CONTENT-DRAFTS.md`)
- Formulário de contato em modo desenvolvimento (sem envio real)
- Paleta e tipografia provisórias
- Sem CMS, autenticação ou backend complexo
- Produtos com status conservadores (`development` / `concept`)

## Próximos passos (Milestone 3 — não iniciada)

- Identidade visual definitiva
- Copy aprovada pelos fundadores
- Mockups/screenshots reais
- Integração real do formulário
- Refinamento de motion e performance

## Documentação Milestone 2

- `docs/MILESTONE-2-REPORT.md`
- `docs/INFORMATION-ARCHITECTURE.md`
- `docs/ROUTES.md`
- `docs/COMPONENTS.md`
- `docs/MOTION-POLICY.md`
- `docs/NEW-DEPENDENCIES.md`
- `docs/CONTENT-DRAFTS.md`
- `docs/PERFORMANCE-BASELINE.md`
- `docs/MIGRATION-MAP.md`
