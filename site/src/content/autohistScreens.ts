/**
 * AutoHist final media catalog (V3.4).
 * Public files live in site/public/products/autohist/screens/final/
 * Source originals remain in docs/sprints/08-autohist/Imagens Reais AutoHist/
 *
 * See docs/sprints/08-autohist/FINAL-SCREEN-MAP.md
 */

export type MediaSlotId =
  | "flow-create-vehicle"
  | "flow-add-service"
  | "flow-add-photos"
  | "flow-history"
  | "search-plate"
  | "search-history"
  | "search-pdf"
  | "timeline-detail"
  | "trust-company"
  | "trust-dashboard"
  | "closing-login";

export type MediaObjectFit = "contain" | "cover";

export type MediaSlot = {
  id: MediaSlotId;
  chapter: "03" | "04" | "05" | "06" | "closing";
  label: string;
  alt: string;
  src: string;
  width: number;
  height: number;
  variant: "portrait" | "landscape" | "wide" | "timeline";
  aspectRatio: string;
  objectFit: MediaObjectFit;
  objectPosition: string;
  shotClass: string;
  enabled: boolean;
};

export const autohistMediaSlots: Record<MediaSlotId, MediaSlot> = {
  "flow-create-vehicle": {
    id: "flow-create-vehicle",
    chapter: "03",
    label: "Cadastrar veículo",
    alt: "Tela de criação de nova ordem de serviço no AutoHist",
    src: "/products/autohist/screens/final/autohist-create-order.webp",
    width: 720,
    height: 1600,
    variant: "portrait",
    aspectRatio: "4 / 5",
    objectFit: "cover",
    objectPosition: "top center",
    shotClass: "createOrderShot",
    enabled: true,
  },
  "flow-add-service": {
    id: "flow-add-service",
    chapter: "03",
    label: "Adicionar serviço",
    alt: "Tela de criação de nova ordem de serviço no AutoHist",
    src: "/products/autohist/screens/final/autohist-create-order.webp",
    width: 720,
    height: 1600,
    variant: "portrait",
    aspectRatio: "4 / 5",
    objectFit: "cover",
    objectPosition: "center 70%",
    shotClass: "addServiceShot",
    enabled: true,
  },
  "flow-add-photos": {
    id: "flow-add-photos",
    chapter: "03",
    label: "Registrar fotos",
    alt: "Área para registrar fotos em uma ordem de serviço",
    src: "/products/autohist/screens/final/autohist-add-photos.webp",
    width: 459,
    height: 833,
    variant: "portrait",
    aspectRatio: "4 / 5",
    objectFit: "contain",
    objectPosition: "center center",
    shotClass: "addPhotosShot",
    enabled: true,
  },
  "flow-history": {
    id: "flow-history",
    chapter: "03",
    label: "Histórico permanente",
    alt: "Lista e filtros das ordens de serviço da empresa",
    src: "/products/autohist/screens/final/autohist-company-orders.webp",
    width: 720,
    height: 1600,
    variant: "portrait",
    aspectRatio: "4 / 5",
    objectFit: "cover",
    objectPosition: "top center",
    shotClass: "historyShot",
    enabled: true,
  },
  "search-plate": {
    id: "search-plate",
    chapter: "04",
    label: "Placa",
    alt: "Pesquisa do histórico de um veículo na rede AutoHist",
    src: "/products/autohist/screens/final/autohist-network-search.webp",
    width: 458,
    height: 830,
    variant: "portrait",
    aspectRatio: "4 / 5",
    objectFit: "contain",
    objectPosition: "top center",
    shotClass: "networkSearchShot",
    enabled: true,
  },
  "search-history": {
    id: "search-history",
    chapter: "04",
    label: "Histórico",
    alt: "Lista e filtros das ordens de serviço da empresa",
    src: "/products/autohist/screens/final/autohist-company-orders.webp",
    width: 720,
    height: 1600,
    variant: "portrait",
    aspectRatio: "4 / 5",
    objectFit: "cover",
    objectPosition: "top center",
    shotClass: "companyOrdersShot",
    enabled: true,
  },
  "search-pdf": {
    id: "search-pdf",
    chapter: "04",
    label: "PDF",
    alt: "Detalhes completos de uma ordem de serviço finalizada",
    src: "/products/autohist/screens/final/autohist-order-detail.webp",
    width: 900,
    height: 1123,
    variant: "portrait",
    aspectRatio: "4 / 5",
    objectFit: "contain",
    objectPosition: "top center",
    shotClass: "orderDetailShot",
    enabled: true,
  },
  "timeline-detail": {
    id: "timeline-detail",
    chapter: "05",
    label: "Registro detalhado",
    alt: "Detalhes completos de uma ordem de serviço finalizada",
    src: "/products/autohist/screens/final/autohist-order-detail.webp",
    width: 900,
    height: 1123,
    variant: "timeline",
    aspectRatio: "4 / 5",
    objectFit: "contain",
    objectPosition: "top center",
    shotClass: "orderDetailShot",
    enabled: true,
  },
  "trust-company": {
    id: "trust-company",
    chapter: "06",
    label: "Painel da empresa",
    alt: "Painel de indicadores da empresa no AutoHist",
    src: "/products/autohist/screens/final/autohist-company-panel.webp",
    width: 900,
    height: 1640,
    variant: "portrait",
    aspectRatio: "4 / 5",
    objectFit: "contain",
    objectPosition: "top center",
    shotClass: "companyPanelShot",
    enabled: true,
  },
  "trust-dashboard": {
    id: "trust-dashboard",
    chapter: "06",
    label: "Painel inicial",
    alt: "Tela inicial do painel AutoHist",
    src: "/products/autohist/screens/final/autohist-dashboard.webp",
    width: 720,
    height: 1600,
    variant: "portrait",
    aspectRatio: "4 / 5",
    objectFit: "cover",
    objectPosition: "top center",
    shotClass: "dashboardShot",
    enabled: true,
  },
  "closing-login": {
    id: "closing-login",
    chapter: "closing",
    label: "Acesso",
    alt: "Tela de login do AutoHist",
    src: "/products/autohist/screens/final/autohist-login.webp",
    width: 720,
    height: 1600,
    variant: "portrait",
    aspectRatio: "4 / 5",
    objectFit: "contain",
    objectPosition: "top center",
    shotClass: "loginShot",
    enabled: true,
  },
};

export const autohistScreens = autohistMediaSlots;
export type ScreenKey = MediaSlotId;
