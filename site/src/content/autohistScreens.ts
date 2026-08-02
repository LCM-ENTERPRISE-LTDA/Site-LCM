/**
 * AutoHist curated media catalog (V3.4.1).
 * Max 5 screenshots rendered. Other finals may remain on disk unused.
 *
 * See docs/sprints/08-autohist/FINAL-SCREEN-MAP.md
 */

export type MediaSlotId =
  | "flow-create-order"
  | "flow-add-photos"
  | "search-network"
  | "timeline-detail"
  | "trust-company"
  /* Kept for catalog completeness — not rendered in V3.4.1 */
  | "unused-dashboard"
  | "unused-login"
  | "unused-company-orders";

export type MediaObjectFit = "contain" | "cover";

export type MediaSlot = {
  id: MediaSlotId;
  chapter: "03" | "04" | "05" | "06" | "unused";
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
  "flow-create-order": {
    id: "flow-create-order",
    chapter: "03",
    label: "Nova ordem",
    alt: "Tela de criação de nova ordem de serviço no AutoHist",
    src: "/products/autohist/screens/final/autohist-create-order.webp",
    width: 720,
    height: 1600,
    variant: "portrait",
    aspectRatio: "9 / 16",
    objectFit: "contain",
    objectPosition: "top center",
    shotClass: "createOrderShot",
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
    aspectRatio: "9 / 16",
    objectFit: "contain",
    objectPosition: "center center",
    shotClass: "addPhotosShot",
    enabled: true,
  },
  "search-network": {
    id: "search-network",
    chapter: "04",
    label: "Busca na rede",
    alt: "Pesquisa do histórico de um veículo na rede AutoHist",
    src: "/products/autohist/screens/final/autohist-network-search.webp",
    width: 458,
    height: 830,
    variant: "portrait",
    aspectRatio: "9 / 16",
    objectFit: "contain",
    objectPosition: "top center",
    shotClass: "networkSearchShot",
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
    aspectRatio: "9 / 16",
    objectFit: "contain",
    objectPosition: "top center",
    shotClass: "companyPanelShot",
    enabled: true,
  },
  "unused-dashboard": {
    id: "unused-dashboard",
    chapter: "unused",
    label: "Dashboard",
    alt: "Tela inicial do painel AutoHist",
    src: "/products/autohist/screens/final/autohist-dashboard.webp",
    width: 720,
    height: 1600,
    variant: "portrait",
    aspectRatio: "9 / 16",
    objectFit: "contain",
    objectPosition: "top center",
    shotClass: "dashboardShot",
    enabled: false,
  },
  "unused-login": {
    id: "unused-login",
    chapter: "unused",
    label: "Login",
    alt: "Tela de login do AutoHist",
    src: "/products/autohist/screens/final/autohist-login.webp",
    width: 720,
    height: 1600,
    variant: "portrait",
    aspectRatio: "9 / 16",
    objectFit: "contain",
    objectPosition: "top center",
    shotClass: "loginShot",
    enabled: false,
  },
  "unused-company-orders": {
    id: "unused-company-orders",
    chapter: "unused",
    label: "Ordens da empresa",
    alt: "Lista e filtros das ordens de serviço da empresa",
    src: "/products/autohist/screens/final/autohist-company-orders.webp",
    width: 720,
    height: 1600,
    variant: "portrait",
    aspectRatio: "9 / 16",
    objectFit: "contain",
    objectPosition: "top center",
    shotClass: "companyOrdersShot",
    enabled: false,
  },
};

export const autohistScreens = autohistMediaSlots;
export type ScreenKey = MediaSlotId;
