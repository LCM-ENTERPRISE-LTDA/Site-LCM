# BROKEN ASSETS — Milestone 1

Registro de recursos quebrados, ausentes ou dependentes da origem.

---

## Erros do HTTrack (`hts-log.txt`)

| Recurso | Status | Impacto |
|---------|--------|---------|
| `themesflat-addons-for-elementor/assets/css/owl.video.play.png` | 404 na origem | Baixo (botão play de vídeo Owl); no disco há stub HTML HTTrack |

---

## Páginas não espelhadas (links de menu)

| Rota original | Tratamento Milestone 1 |
|---------------|------------------------|
| `/template-kit/industries/` | `#page-not-mirrored-industries` |
| `/template-kit/industry-details/` | `#page-not-mirrored-industry-details` |
| `/template-kit/case-study/` | `#page-not-mirrored-case-study` |
| `/template-kit/case-study-details/` | `#page-not-mirrored-case-study-details` |
| `/template-kit/pricing-plan/` | `#page-not-mirrored-pricing-plan` |
| `/template-kit/404/` | `#page-not-mirrored-404` |
| Blog / Blog Details | Não presentes no mirror |

---

## Fontes

| Item | Situação |
|------|----------|
| CSS Instrument Sans / Inter | Presentes na captura |
| Arquivos `.woff2` do kit Elementor | **Ausentes no HTTrack** → baixados na Milestone 1 (18 arquivos) + paths relativos |
| Fontes WooCommerce Inter variáveis | Referenciadas no HTML; arquivo variável pode faltar — tipografia principal já coberta pelo kit Elementor |
| `cardo_normal_400.woff2` | Obtido; demais Cardo/Inter WC falharam (404) |
| `WooCommerce.woff2` (ícones rating) | Baixado; paths CSS WC relativizados |

---

## Imagens / srcset

| Item | Situação |
|------|----------|
| `src` principal das imagens de conteúdo | Relativo e presente (~27 PNG em `uploads/.../2025/08/`) |
| Variantes `srcset` (291x300, 768x…, etc.) | Em geral **não** baixadas → removidas do `srcset` ou filtradas para arquivos existentes |
| Dependência remota em `srcset` | Eliminada nas 8 páginas |

---

## Formulários e endpoints

| Endpoint | Situação |
|----------|----------|
| MetForm `.../wp-json/metform/v1/entries/insert/295` | Neutralizado (`#metform-disabled-local`) |
| MetForm `restURI` | Neutralizado |
| `admin-ajax.php` (Woo/Ekit) | Esvaziado / tracking off |
| `jkit_ajax_url` | Esvaziado |
| ElementsKit `resturl` | Esvaziado |
| Cart URL Woo | `#` |

---

## Bibliotecas duplicadas / ruído

| Item | Nota |
|------|------|
| Chart.js | cdnjs 3.5.1 **e** events-addon Chart — duplicata |
| Swiper | rkit + themesflat |
| WooCommerce stack | Presente sem loja real — peso morto para LCM |

---

## Ainda dependente de comportamento WP (esperado)

- Submit real de formulário
- Carrinho / AJAX Woo
- Qualquer widget que chame REST dinamicamente
- Sticky JetSticky (config vazia)

Estes não são “404 de arquivo”, mas **limitações estruturais** do espelho estático.
