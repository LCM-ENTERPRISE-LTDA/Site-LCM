export type EcosystemProductId =
  | "autohist"
  | "dyson"
  | "studio"
  | "businesszap";

export type EcosystemProduct = {
  id: EcosystemProductId;
  name: string;
  accent: string;
  accentSoft: string;
  note: string;
};

export const ecosystemCopy = {
  eyebrow: "Ecossistema",
  title: "Produtos diferentes. Uma mesma engenharia.",
  subtitle:
    "Cada produto atende a uma necessidade própria, mas todos compartilham os mesmos princípios de usabilidade, performance e construção responsável.",
  cta: {
    label: "Explorar o ecossistema",
    href: "/produtos",
  },
  principles: [
    "Usabilidade",
    "Performance",
    "Clareza",
    "Segurança",
    "Problemas reais",
  ] as const,
} as const;

export const ecosystemProducts: readonly EcosystemProduct[] = [
  {
    id: "autohist",
    name: "AutoHist",
    accent: "#4d9be8",
    accentSoft: "rgba(47, 125, 209, 0.22)",
    note: "Organização e operação",
  },
  {
    id: "dyson",
    name: "Dyson",
    accent: "#8b7cf0",
    accentSoft: "rgba(107, 92, 224, 0.22)",
    note: "Inteligência e exploração",
  },
  {
    id: "studio",
    name: "LCM Studio",
    accent: "#f0a040",
    accentSoft: "rgba(217, 119, 6, 0.2)",
    note: "Criação com governança",
  },
  {
    id: "businesszap",
    name: "BusinessZap",
    accent: "#3ecf8e",
    accentSoft: "rgba(46, 160, 110, 0.22)",
    note: "Comunicação e fluxo",
  },
] as const;
