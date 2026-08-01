# AUDIT — Milestone 1

**Projeto:** Site-LCM / SiteTLCM  
**Data:** 2026-08-01  
**Escopo:** Auditoria, estabilização e preparação do template-base Pemogan (HTTrack)  
**Rebranding visual:** não realizado (intencional)

---

## 1. Estado inicial

| Item | Valor |
|------|-------|
| Natureza | Espelho estático HTTrack 3.49-2 de template WordPress/Elementor (Pemogan) |
| Origem | `https://nva.nirmanavisual.com/pemogan/template-kit/*` |
| Captura | 2026-07-26 (~2 min 14 s) |
| Arquivos (captura) | ~248–259 arquivos / ~17,7 MB |
| Páginas template-kit | 8 |
| Tema | Hello Elementor 3.4.4 |
| Builder | Elementor 3.31.2 |

### Páginas disponíveis

| Página | Caminho local | Título |
|--------|---------------|--------|
| Home | `nva.nirmanavisual.com/pemogan/template-kit/home/` | Home – Pemogan – Software Developer Platform |
| About Us | `.../about-us/` | About Us – Pemogan – … |
| Services | `.../services/` | Services – Pemogan – … |
| Service Detail | `.../service-detail/` | Service Detail – Pemogan – … |
| Our Team | `.../our-team/` | Our Team – Pemogan – … |
| Testimonial | `.../testimonial/` | Testimonial – Pemogan – … |
| FAQ | `.../faq/` | FAQ – Pemogan – … |
| Contacts | `.../contacts/` | Contacts – Pemogan – … |

### Páginas linkadas mas **não** espelhadas

Industries, Industry Details, Case Study, Case Study Details, Pricing Plan, 404, Blog / Blog Details.

---

## 2. Entrada real

- `index.html` na raiz era a tela padrão do HTTrack.
- **Entrada de desenvolvimento atual:** `index.html` → redireciona para `template-kit/home/index.html`.
- Assets das páginas: prefixo relativo `../../wp-content/` e `../../wp-includes/`.

---

## 3. Problemas principais encontrados

1. Dependência silenciosa do domínio original em `srcset`, fontes, MetForm, AJAX/REST.
2. Fontes Instrument Sans / Inter não baixadas pelo HTTrack (só CSS).
3. Formulário MetForm enviava para API remota.
4. WooCommerce order-attribution com `allowTracking: true`.
5. Menu com links absolutos para páginas não espelhadas.
6. 1 erro 404 no log HTTrack: `owl.video.play.png`.
7. Stack extremamente pesado (~70–110 CSS/JS por página) herdado de plugins WP.
8. Animações críticas dependem de Elementor frontend (`.elementor-invisible`).

---

## 4. Correções realizadas (somente estabilização)

| Correção | Detalhe |
|----------|---------|
| Backup imutável | `_backups/original-httrack-pemogan/` + `BACKUP-RECORD.md` |
| Entrada local | `index.html` com redirect para Home |
| Servidor local | `scripts/serve.ps1`, `serve.sh`, `serve.mjs` |
| Fontes | Download de 18× `.woff2` + paths relativos no CSS |
| `srcset` | URLs absolutas → relativas; variantes inexistentes removidas |
| Links mortos do menu | Remotos → `#page-not-mirrored-*` |
| MetForm | `data-action` / `restURI` neutralizados |
| Tracking Woo | `allowTracking: false`; ajaxurl esvaziado |
| AJAX JEG/ElementsKit | URLs remotas neutralizadas |
| Meta discovery WP | pingback/rss/oEmbed/shortlink removidos do HTML |

**Não feito:** rebranding, troca de conteúdo, remoção de seções, limpeza agressiva de plugins, migração React/Next.

---

## 5. Segurança e integridade

| Achado | Status |
|--------|--------|
| Google Analytics / GTM / FB Pixel | Não encontrados |
| MetForm → origem remota | Desativado localmente |
| Woo order-attribution | Tracking desligado |
| Scripts suspeitos / malware | Não observados |
| Mixed content | Baixo (xmlns / dns-prefetch históricos) |
| Comentários HTTrack no HTML | Mantidos (proveniência) |

Detalhes de assets quebrados: [BROKEN-ASSETS.md](./BROKEN-ASSETS.md).

---

## 6. Critérios de aceite (Milestone 1)

| # | Critério | Status |
|---|----------|--------|
| 1 | Home abre localmente sem erro fatal | OK (servidor HTTP) |
| 2 | Páginas principais acessíveis | OK (8/8) |
| 3 | Sem erros críticos que impeçam experiência | OK (AJAX remoto silenciado) |
| 4 | Efeitos principais preservados | OK (stack Elementor intacto) |
| 5 | Menu desktop/mobile | OK (HFE) |
| 6 | Tabs / accordions / carrosséis | OK (widgets presentes; ver EFFECTS) |
| 7 | Sem dependência silenciosa crítica do domínio original | Mitigado |
| 8–10 | Documentação | OK (`docs/*`) |
| 11 | Sem rebranding prematuro | OK |
| 12 | Backup intacto | OK |

---

## 7. Referências internas

- [EFFECTS-INVENTORY.md](./EFFECTS-INVENTORY.md)
- [DEPENDENCIES-MAP.md](./DEPENDENCIES-MAP.md)
- [CONTENT-MAP.md](./CONTENT-MAP.md)
- [CURRENT-DESIGN-TOKENS.md](./CURRENT-DESIGN-TOKENS.md)
- [ARCHITECTURE-RECOMMENDATION.md](./ARCHITECTURE-RECOMMENDATION.md)
- [RESPONSIVE-AUDIT.md](./RESPONSIVE-AUDIT.md)
