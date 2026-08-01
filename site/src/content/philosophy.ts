export type PhilosophyStatement = {
  id: string;
  lines: readonly [string, string] | readonly [string];
};

/**
 * Institutional narrative — why LCM builds technology.
 * Not marketing. Not promises. Principles in plain language.
 */
export const philosophyIntro = {
  eyebrow: "Filosofia",
} as const;

export const philosophyStatements: readonly PhilosophyStatement[] = [
  {
    id: "ferramentas",
    lines: [
      "Não construímos software por construir.",
      "Construímos ferramentas que removem atrito do trabalho real.",
    ],
  },
  {
    id: "resultado",
    lines: [
      "Tecnologia bem feita quase desaparece.",
      "O que permanece é o resultado.",
    ],
  },
  {
    id: "problema",
    lines: [
      "Cada produto nasce de um problema concreto.",
      "Nunca de uma tendência.",
    ],
  },
  {
    id: "clareza",
    lines: ["A complexidade fica no sistema.", "A experiência fica clara."],
  },
  {
    id: "pessoas",
    lines: [
      "Automação não substitui julgamento.",
      "Libera tempo para o que exige pessoas.",
    ],
  },
] as const;
