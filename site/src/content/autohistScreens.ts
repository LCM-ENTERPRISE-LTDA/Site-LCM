/**
 * AutoHist media slots — catalog for future manual screenshot insertion.
 * V3.3: no assets are rendered. Keep public WebP files on disk but unlinked.
 *
 * See docs/sprints/08-autohist/SCREEN-FRAMES.md
 */

export type MediaSlotId =
  | "flow-create-vehicle"
  | "flow-add-service"
  | "flow-add-photos"
  | "flow-history"
  | "search-plate"
  | "search-history"
  | "search-pdf"
  | "timeline-review"
  | "timeline-replacement"
  | "timeline-inspection"
  | "timeline-document"
  | "timeline-continuity";

export type MediaSlot = {
  id: MediaSlotId;
  chapter: "03" | "04" | "05";
  label: string;
  variant: "portrait" | "landscape" | "wide" | "timeline";
  aspectRatio: string;
  /** Future public path — do not import until manually approved */
  futureSrc: string;
  recommendedWidth: number;
  recommendedHeight: number;
  objectPosition: string;
  /** When true, Experience may render media; V3.3 keeps all false */
  enabled: boolean;
};

export const autohistMediaSlots: Record<MediaSlotId, MediaSlot> = {
  "flow-create-vehicle": {
    id: "flow-create-vehicle",
    chapter: "03",
    label: "Cadastrar veículo",
    variant: "portrait",
    aspectRatio: "4 / 5",
    futureSrc: "/products/autohist/screens/autohist-screen-create-order.webp",
    recommendedWidth: 720,
    recommendedHeight: 900,
    objectPosition: "top center",
    enabled: false,
  },
  "flow-add-service": {
    id: "flow-add-service",
    chapter: "03",
    label: "Adicionar serviço",
    variant: "portrait",
    aspectRatio: "4 / 5",
    futureSrc: "/products/autohist/screens/autohist-screen-service-details.webp",
    recommendedWidth: 720,
    recommendedHeight: 900,
    objectPosition: "top center",
    enabled: false,
  },
  "flow-add-photos": {
    id: "flow-add-photos",
    chapter: "03",
    label: "Registrar fotos",
    variant: "portrait",
    aspectRatio: "4 / 5",
    futureSrc: "/products/autohist/screens/autohist-screen-add-photos.webp",
    recommendedWidth: 720,
    recommendedHeight: 900,
    objectPosition: "top center",
    enabled: false,
  },
  "flow-history": {
    id: "flow-history",
    chapter: "03",
    label: "Histórico permanente",
    variant: "portrait",
    aspectRatio: "4 / 5",
    futureSrc: "/products/autohist/screens/autohist-screen-order-history.webp",
    recommendedWidth: 720,
    recommendedHeight: 900,
    objectPosition: "top center",
    enabled: false,
  },
  "search-plate": {
    id: "search-plate",
    chapter: "04",
    label: "Placa",
    variant: "portrait",
    aspectRatio: "4 / 5",
    futureSrc: "/products/autohist/screens/autohist-screen-network-search.webp",
    recommendedWidth: 720,
    recommendedHeight: 900,
    objectPosition: "top center",
    enabled: false,
  },
  "search-history": {
    id: "search-history",
    chapter: "04",
    label: "Histórico",
    variant: "portrait",
    aspectRatio: "4 / 5",
    futureSrc: "/products/autohist/screens/autohist-screen-order-history.webp",
    recommendedWidth: 720,
    recommendedHeight: 900,
    objectPosition: "top center",
    enabled: false,
  },
  "search-pdf": {
    id: "search-pdf",
    chapter: "04",
    label: "PDF",
    variant: "portrait",
    aspectRatio: "4 / 5",
    futureSrc: "/products/autohist/screens/autohist-screen-export-pdf.webp",
    recommendedWidth: 720,
    recommendedHeight: 900,
    objectPosition: "center",
    enabled: false,
  },
  "timeline-review": {
    id: "timeline-review",
    chapter: "05",
    label: "Revisão",
    variant: "timeline",
    aspectRatio: "4 / 5",
    futureSrc: "/products/autohist/screens/autohist-screen-order-value.webp",
    recommendedWidth: 720,
    recommendedHeight: 900,
    objectPosition: "top center",
    enabled: false,
  },
  "timeline-replacement": {
    id: "timeline-replacement",
    chapter: "05",
    label: "Troca",
    variant: "timeline",
    aspectRatio: "4 / 5",
    futureSrc: "/products/autohist/screens/autohist-screen-service-details.webp",
    recommendedWidth: 720,
    recommendedHeight: 900,
    objectPosition: "top center",
    enabled: false,
  },
  "timeline-inspection": {
    id: "timeline-inspection",
    chapter: "05",
    label: "Inspeção",
    variant: "timeline",
    aspectRatio: "4 / 5",
    futureSrc: "/products/autohist/screens/autohist-screen-add-photos.webp",
    recommendedWidth: 720,
    recommendedHeight: 900,
    objectPosition: "top center",
    enabled: false,
  },
  "timeline-document": {
    id: "timeline-document",
    chapter: "05",
    label: "Documento",
    variant: "wide",
    aspectRatio: "16 / 10",
    futureSrc: "/products/autohist/screens/autohist-screen-export-pdf.webp",
    recommendedWidth: 720,
    recommendedHeight: 450,
    objectPosition: "center",
    enabled: false,
  },
  "timeline-continuity": {
    id: "timeline-continuity",
    chapter: "05",
    label: "Continuidade",
    variant: "timeline",
    aspectRatio: "4 / 5",
    futureSrc: "/products/autohist/screens/autohist-screen-network-search.webp",
    recommendedWidth: 720,
    recommendedHeight: 900,
    objectPosition: "top center",
    enabled: false,
  },
};

/** @deprecated Use autohistMediaSlots — kept empty so nothing renders by accident */
export const autohistScreens = {} as const;
export type ScreenKey = never;
