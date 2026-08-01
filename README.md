# Site-LCM / SiteTLCM

Base estática do futuro site institucional da **LCM Enterprise LTDA**, partindo da captura HTTrack do template **Pemogan** (WordPress + Elementor).

> **Milestone 1 (atual):** auditoria, estabilização local e documentação.  
> **Não** há rebranding visual completo nesta etapa.

## Pré-requisitos

- **Python 3** (`py -m http.server` no Windows) **ou** **Node.js** (fallback em `scripts/serve.mjs`)
- Navegador moderno

Não é necessário npm install, WordPress nem PHP para visualizar o espelho estático.

## Como iniciar

Na raiz do repositório (recomendado no Windows):

```powershell
.\scripts\serve.ps1
```

Alternativas:

```powershell
py -m http.server 8080
node scripts/serve.mjs 8080
```

Em bash:

```bash
./scripts/serve.sh
# ou: python3 -m http.server 8080
```

## URLs locais

| Destino | URL |
|--------|-----|
| Entrada de desenvolvimento | http://127.0.0.1:8080/ |
| Home (página real) | http://127.0.0.1:8080/nva.nirmanavisual.com/pemogan/template-kit/home/ |
| About Us | http://127.0.0.1:8080/nva.nirmanavisual.com/pemogan/template-kit/about-us/ |
| Services | http://127.0.0.1:8080/nva.nirmanavisual.com/pemogan/template-kit/services/ |
| Service Detail | http://127.0.0.1:8080/nva.nirmanavisual.com/pemogan/template-kit/service-detail/ |
| Our Team | http://127.0.0.1:8080/nva.nirmanavisual.com/pemogan/template-kit/our-team/ |
| Testimonial | http://127.0.0.1:8080/nva.nirmanavisual.com/pemogan/template-kit/testimonial/ |
| FAQ | http://127.0.0.1:8080/nva.nirmanavisual.com/pemogan/template-kit/faq/ |
| Contacts | http://127.0.0.1:8080/nva.nirmanavisual.com/pemogan/template-kit/contacts/ |

O `index.html` da raiz redireciona automaticamente para a Home.

**Não abra os arquivos via `file://`** — isso mascara CORS, caminhos e comportamentos de scripts.

## Estrutura das pastas

```text
SiteTLCM / Site-LCM
├── index.html                 # Entrada local → Home
├── README.md
├── scripts/serve.ps1|.sh      # Servidor HTTP mínimo
├── docs/                      # Auditoria Milestone 1
├── _backups/
│   ├── BACKUP-RECORD.md
│   └── original-httrack-pemogan/   # Cópia imutável da captura
├── nva.nirmanavisual.com/
│   └── pemogan/
│       ├── template-kit/      # 8 páginas HTML
│       └── wp-content/        # CSS, JS, plugins, uploads
├── cdnjs.cloudflare.com/      # Chart.js espelhado
└── hts-cache/ + hts-log.txt   # Metadados HTTrack
```

## Documentação Milestone 1

| Documento | Conteúdo |
|-----------|----------|
| [docs/AUDIT-MILESTONE-1.md](docs/AUDIT-MILESTONE-1.md) | Auditoria geral |
| [docs/EFFECTS-INVENTORY.md](docs/EFFECTS-INVENTORY.md) | Inventário de efeitos |
| [docs/CONTENT-MAP.md](docs/CONTENT-MAP.md) | Mapa de conteúdo → LCM |
| [docs/CURRENT-DESIGN-TOKENS.md](docs/CURRENT-DESIGN-TOKENS.md) | Tokens atuais |
| [docs/DEPENDENCIES-MAP.md](docs/DEPENDENCIES-MAP.md) | Matriz de dependências |
| [docs/BROKEN-ASSETS.md](docs/BROKEN-ASSETS.md) | Assets quebrados / ausentes |
| [docs/RESPONSIVE-AUDIT.md](docs/RESPONSIVE-AUDIT.md) | Auditoria responsiva |
| [docs/ARCHITECTURE-RECOMMENDATION.md](docs/ARCHITECTURE-RECOMMENDATION.md) | Opções A/B/C |

## Limitações conhecidas da captura HTTrack

- Páginas não espelhadas no menu: Industries, Case Study, Pricing Plan, 404, Blog.
- Formulário MetForm desativado localmente (apontava para a API remota original).
- WooCommerce / AJAX / REST do WordPress não funcionam offline (esperado).
- Alguns tamanhos de imagem do `srcset` não foram baixados; o `src` principal local é usado.
- `owl.video.play.png` retornou 404 no mirror original.
- Código ainda é o stack WordPress/Elementor exportado — pesado e difícil de manter a longo prazo.

## Git

Repositório: **[LCM-ENTERPRISE-LTDA/Site-LCM](https://github.com/LCM-ENTERPRISE-LTDA/Site-LCM)** (privado).  
Branch de trabalho: `feature/lcm-rebranding`.

Não fazer merge em produção ou deploy sem autorização explícita.

## Próximos passos

Milestone 2 (não iniciada automaticamente): rebranding, conteúdo LCM, produtos (AutoHist, Dyson, LCM Studio) e eventual migração de arquitetura conforme a recomendação em `docs/ARCHITECTURE-RECOMMENDATION.md`.
