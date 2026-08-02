/**
 * Catalog of sanitized AutoHist product captures used on the experience page.
 * Source originals live only in docs/sprints/08-autohist/Imagens Reais AutoHist/
 * and must never be copied into public/.
 *
 * Regenerate with: node scripts/sanitize-autohist-screens.mjs (from site/)
 */
export const autohistScreens = {
  createOrder: {
    src: "/products/autohist/screens/autohist-screen-create-order.webp",
    width: 720,
    height: 900,
    alt: "Criação de ordem de serviço no AutoHist com campo de placa",
    objectPosition: "top center",
  },
  serviceDetails: {
    src: "/products/autohist/screens/autohist-screen-service-details.webp",
    width: 720,
    height: 900,
    alt: "Detalhes de serviço com quilometragem e responsável na ordem do AutoHist",
    objectPosition: "top center",
  },
  addPhotos: {
    src: "/products/autohist/screens/autohist-screen-add-photos.webp",
    width: 720,
    height: 900,
    alt: "Área de captura de fotos anexadas à ordem de serviço no AutoHist",
    objectPosition: "top center",
  },
  orderHistory: {
    src: "/products/autohist/screens/autohist-screen-order-history.webp",
    width: 720,
    height: 900,
    alt: "Histórico geral de ordens com filtros e status no AutoHist",
    objectPosition: "top center",
  },
  networkSearch: {
    src: "/products/autohist/screens/autohist-screen-network-search.webp",
    width: 720,
    height: 900,
    alt: "Pesquisa de histórico por placa na rede AutoHist",
    objectPosition: "top center",
  },
  exportPdf: {
    src: "/products/autohist/screens/autohist-screen-export-pdf.webp",
    width: 720,
    height: 280,
    alt: "Resumo de ordens e botão Exportar PDF no AutoHist",
    objectPosition: "center",
  },
  orderValue: {
    src: "/products/autohist/screens/autohist-screen-order-value.webp",
    width: 720,
    height: 900,
    alt: "Detalhe de ordem com valor, descrição e exportação PDF no AutoHist",
    objectPosition: "top center",
  },
  companyDashboard: {
    src: "/products/autohist/screens/autohist-screen-company-dashboard.webp",
    width: 720,
    height: 900,
    alt: "Painel da empresa com saldo de serviços no AutoHist",
    objectPosition: "top center",
  },
} as const;

export type ScreenKey = keyof typeof autohistScreens;
