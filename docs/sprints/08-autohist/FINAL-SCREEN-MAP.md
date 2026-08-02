# AutoHist V3.4 — Final Screen Map

Integração das capturas reais já tratadas manualmente.
Sem anonimização, blur, tarja ou edição de conteúdo interno.
Originais permanecem em `docs/sprints/08-autohist/Imagens Reais AutoHist/`.
Derivados públicos em `site/public/products/autohist/screens/final/`.

## Auditoria dos originais

| Original | Extensão | Dimensões | Proporção | Orientação | Conteúdo | Área de interesse | Capítulo | Slot |
|---|---|---|---|---|---|---|---|---|
| Cadastrar Nova Ordem.jpeg | JPEG | 720×1600 | 0.450 | Portrait | Nova OS, placa, km, detalhes, responsável | Cabeçalho + formulário inicial / bloco de serviço | 03 | flow-create-vehicle, flow-add-service |
| Dashboard.jpeg | JPEG | 720×1600 | 0.450 | Portrait | Home, status, últimas ordens, nav | Cabeçalho + cards de status | 06 | trust-dashboard |
| Login.jpeg | JPEG | 720×1600 | 0.450 | Portrait | Login AutoHist | Identidade + formulário | closing | closing-login |
| OS DASHBOARD.png | PNG | 1123×1401 | 0.802 | Portrait | OS finalizada, PDF, edição, data | Detalhe completo + ações PDF | 04, 05 | search-pdf, timeline-detail |
| Pesquisa na Rede de Serviços.png | PNG | 458×830 | 0.552 | Portrait | Busca por placa, registros, PDF | Campo pesquisar + lista | 04 | search-plate |
| Aba Empresa.png | PNG | 929×1693 | 0.549 | Portrait | Painel empresa, saldo, ordens | Indicadores e resumo | 06 | trust-company |
| Aba Ordens Empresa.jpeg | JPEG | 720×1600 | 0.450 | Portrait | Filtros, lista, status, busca | Filtros + lista de OS | 03, 04 | flow-history, search-history |
| Adicionar fotos a OS.png | PNG | 459×833 | 0.551 | Portrait | Fotos, Tirar foto, Salvar OS | Bloco FOTOS | 03 | flow-add-photos |

## Derivados WebP

Qualidade ~90. Sem crop destrutivo. Metadados removidos na re-encode. Proporção preservada. Largura máx. 900 px.

| Derivado | Original | Dimensões | Peso | Slot(s) | Capítulo | Estratégia |
|---|---|---|---|---|---|---|
| autohist-create-order.webp | Cadastrar Nova Ordem.jpeg | 720×1600 | 40 KB | flow-create-vehicle, flow-add-service | 03 | cover + object-position distinto por etapa |
| autohist-add-photos.webp | Adicionar fotos a OS.png | 459×833 | 18 KB | flow-add-photos | 03 | contain, centralizado |
| autohist-company-orders.webp | Aba Ordens Empresa.jpeg | 720×1600 | 54 KB | flow-history, search-history | 03, 04 | cover top (filtros + lista) |
| autohist-network-search.webp | Pesquisa na Rede de Serviços.png | 458×830 | 21 KB | search-plate | 04 | contain top |
| autohist-order-detail.webp | OS DASHBOARD.png | 900×1123 | 61 KB | search-pdf, timeline-detail | 04, 05 | contain top |
| autohist-company-panel.webp | Aba Empresa.png | 900×1640 | 71 KB | trust-company | 06 | contain top |
| autohist-dashboard.webp | Dashboard.jpeg | 720×1600 | 37 KB | trust-dashboard | 06 | cover top (recorte complementar) |
| autohist-login.webp | Login.jpeg | 720×1600 | 38 KB | closing-login | closing | contain top (secundário) |

**Peso total dos 8 WebP:** ~340 KB.

## Enquadramento por classe CSS

| Classe | object-fit | object-position | aspect-ratio desktop |
|---|---|---|---|
| createOrderShot | cover | top center | 4 / 5 |
| addServiceShot | cover | center 70% | 4 / 5 |
| addPhotosShot | contain | center center | 4 / 5 |
| historyShot | cover | top center | 4 / 5 |
| networkSearchShot | contain | top center | 4 / 5 |
| companyOrdersShot | cover | top center | 4 / 5 |
| orderDetailShot | contain | top center | 4 / 5 |
| companyPanelShot | contain | top center | 4 / 5 |
| dashboardShot | cover | top center | 4 / 5 |
| loginShot | contain | top center | 4 / 5 |

Mobile (`≤639px`): aspect-ratio automático, `object-fit: contain`, altura natural, `max-width: 430px`.

## Componente

`AutoHistMediaFrame` — viewport + next/image + chrome técnico discreto + máscara inferior CSS + legenda externa.

## Layout responsivo

- **Desktop:** Cap 03 = 4 colunas iguais; Cap 04 = 3 colunas; Cap 05 = timeline + painel de prova; Cap 06 = texto + painel empresa + dashboard menor; Login no closing.
- **Tablet:** Cap 03 = 2×2; Cap 04 = 2 + 1 centralizado; Cap 05/06 empilhados.
- **Mobile:** sequência vertical; prova da timeline após “Revisão”; texto antes das imagens no Cap 06.

## Performance

- Todas as imagens via `next/image` com `width`/`height`.
- Lazy loading em todas (nenhuma `priority` abaixo da dobra nesta sprint).
- Sem vídeo, WebGL ou libs novas.
