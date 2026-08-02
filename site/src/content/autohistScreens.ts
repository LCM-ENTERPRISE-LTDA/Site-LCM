/**
 * Catalog of real AutoHist product captures used on the experience page.
 * Source originals live in docs/sprints/08-autohist/Imagens Reais AutoHist/
 */
export const autohistScreens = {
  cropPlaca: {
    src: "/products/autohist/screens/crop-placa.webp",
    width: 720,
    height: 448,
    alt: "Campo de placa na criação de ordem de serviço do AutoHist",
  },
  cropServico: {
    src: "/products/autohist/screens/crop-servico.webp",
    width: 720,
    height: 608,
    alt: "Campos de quilometragem, tipo de serviço e funcionário na ordem de serviço do AutoHist",
  },
  cropBusca: {
    src: "/products/autohist/screens/crop-busca.webp",
    width: 720,
    height: 512,
    alt: "Filtros e campo de busca por placa no painel de ordens do AutoHist",
  },
  cropHistorico: {
    src: "/products/autohist/screens/crop-historico.webp",
    width: 720,
    height: 672,
    alt: "Lista do histórico geral de ordens de serviço com placas e status",
  },
  cropPdf: {
    src: "/products/autohist/screens/crop-pdf.webp",
    width: 720,
    height: 192,
    alt: "Botão Exportar PDF e resumo de ordens no AutoHist",
  },
} as const;

export type ScreenKey = keyof typeof autohistScreens;
