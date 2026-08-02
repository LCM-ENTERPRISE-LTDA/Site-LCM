# AutoHist V3.2 — Inventário e auditoria de capturas

Gerado para a sprint de padronização + anonimização.  
**Este relatório não reproduz dados pessoais encontrados nas fontes.**

## Inventário (fontes em docs/)

| Chave fonte | Dimensão nativa | Capítulo | Categorias sensíveis | Método | Derivado |
| --- | --- | --- | --- | --- | --- |
| create-order | 720×1600 | 03-01 | campo de placa | cover+replace+crop | autohist-screen-create-order.webp |
| create-order | 720×1600 | 03-02 | formulário vazio | crop | autohist-screen-service-details.webp |
| add-photos | 459×833 | 03-03 / 05 | nenhuma relevante | crop | autohist-screen-add-photos.webp |
| export-orders | 457×838 | 03-04 / 04 | placa, nome, valor, id | cover+replace+crop | autohist-screen-order-history.webp |
| network-search | 458×830 | 04 / 05 | placa | cover+replace+crop | autohist-screen-network-search.webp |
| export-orders | 457×838 | 04 / 05 | valor, contagem | cover+replace+crop | autohist-screen-export-pdf.webp |
| order-card | 454×568 | 05 | placa, nome, texto livre, valor, veículo | cover+replace | autohist-screen-order-value.webp |
| company-values | 457×831 | painel | empresa, documento, nome, valor | cover+replace+crop | autohist-screen-company-dashboard.webp |

Outras fontes no diretório de originais (login, assinatura, dashboard completo, etc.) **não** foram publicadas nesta sprint.

## Auditoria de `site/public/products/autohist/screens/`

| Arquivo | Categorias tratadas | Método | Status |
| --- | --- | --- | --- |
| autohist-screen-create-order.webp | placa (demo) | replace+crop | ok |
| autohist-screen-service-details.webp | — | crop | ok |
| autohist-screen-add-photos.webp | — | crop | ok |
| autohist-screen-order-history.webp | placa, nome, valor, id | raster cover+replace | ok |
| autohist-screen-network-search.webp | placa | raster cover+replace | ok |
| autohist-screen-export-pdf.webp | valor, contagem | raster cover+crop | ok |
| autohist-screen-order-value.webp | placa, nome, texto, valor, veículo | raster cover+replace | ok |
| autohist-screen-company-dashboard.webp | empresa, documento, nome, valor | raster cover+replace | ok |

### Confirmações

- Nenhum original JPEG/PNG de fonte em `public/`
- Nomes de arquivo públicos são neutros (`autohist-screen-*`)
- Alt texts sem dados reais
- Código de conteúdo usa chaves neutras e placa demo `AUT0H25`
- Metadados removidos via re-encoding WebP

## Contact sheet

`docs/sprints/08-autohist/sanitization/sanitized-contact-sheet.png` — somente derivados.
