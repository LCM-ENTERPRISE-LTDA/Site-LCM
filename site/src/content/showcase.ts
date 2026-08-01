import type { ProductThemeKey } from "@/config/productThemes";

export type ShowcaseMotion = "timeline" | "constellation" | "canvas" | "signal";

export type ShowcaseEntry = {
  slug: string;
  colorKey: ProductThemeKey;
  index: string;
  eyebrow: string;
  headline: string;
  support: string;
  cta: string;
  motion: ShowcaseMotion;
  /** Optical layout: copy side on desktop */
  align: "start" | "end";
};

export const showcaseIntro = {
  eyebrow: "Ecossistema",
  title: "Quatro produtos. Quatro identidades.",
  subtitle:
    "Cada um resolve um problema distinto — com personalidade própria, mas a mesma exigência de usabilidade e performance.",
} as const;

export const showcaseEntries: ShowcaseEntry[] = [
  {
    slug: "autohist",
    colorKey: "autohist",
    index: "01",
    eyebrow: "AutoHist",
    headline: "O histórico do veículo,\norganizado para quem executa.",
    support:
      "Ordens de serviço, registros e busca em um fluxo pensado para o ritmo da oficina — clareza operacional sem ruído.",
    cta: "Conhecer o AutoHist",
    motion: "timeline",
    align: "start",
  },
  {
    slug: "dyson",
    colorKey: "dyson",
    index: "02",
    eyebrow: "Dyson",
    headline: "Inteligência com autonomia.\nAinda em exploração.",
    support:
      "Uma iniciativa de IA que investiga eficiência de recursos e menor dependência de plataformas centralizadas — com transparência de estágio.",
    cta: "Explorar a Dyson",
    motion: "constellation",
    align: "end",
  },
  {
    slug: "lcm-studio",
    colorKey: "studio",
    index: "03",
    eyebrow: "LCM Studio",
    headline: "Editar o visual\nsem desmontar a estrutura.",
    support:
      "Um construtor para textos, imagens e componentes com autonomia controlada — criatividade com governança técnica.",
    cta: "Ver o LCM Studio",
    motion: "canvas",
    align: "start",
  },
  {
    slug: "businesszap",
    colorKey: "businesszap",
    index: "04",
    eyebrow: "BusinessZap",
    headline: "Comunicação empresarial\ncom responsabilidade.",
    support:
      "Contatos, conversas e campanhas em um fluxo organizado — orientação a consentimento e boas práticas, sem ruído comercial agressivo.",
    cta: "Conhecer o BusinessZap",
    motion: "signal",
    align: "end",
  },
];
