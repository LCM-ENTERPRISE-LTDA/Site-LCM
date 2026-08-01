export type TechPerspectiveId = "experiencia" | "sistemas" | "ia";

export type TechPerspective = {
  id: TechPerspectiveId;
  label: string;
  body: string;
};

export const technologyExperienceCopy = {
  eyebrow: "Tecnologia",
  title: "Camadas que sustentam a experiência",
  subtitle:
    "Da interface à infraestrutura — com linguagem prudente e foco no que o usuário sente.",
} as const;

export const techPerspectives: readonly TechPerspective[] = [
  {
    id: "experiencia",
    label: "Experiência",
    body: "Interfaces claras e fluxos objetivos. A tecnologia só importa se as pessoas conseguem usá-la com confiança.",
  },
  {
    id: "sistemas",
    label: "Sistemas",
    body: "Aplicações, APIs e dados organizados para evoluir com segurança — sem promessas de escala não documentadas.",
  },
  {
    id: "ia",
    label: "IA",
    body: "Inteligência artificial tratada com responsabilidade e transparência de estágio, sempre ligada a problemas reais.",
  },
] as const;
