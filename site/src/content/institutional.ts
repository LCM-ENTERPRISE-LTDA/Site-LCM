import type { Principle } from "@/types/product";

/** Rascunhos institucionais — ver docs/CONTENT-DRAFTS.md */
export const homeContent = {
  hero: {
    eyebrow: "Tecnologia construída com propósito",
    title: "Construímos tecnologia\npara quem resolve\nproblemas reais.",
    subtitle:
      "Criamos produtos digitais, automações e soluções inteligentes com foco em usabilidade, performance e impacto real no trabalho das empresas.",
    primaryCta: { label: "Conheça nossos produtos", href: "/produtos" },
    secondaryCta: { label: "Fale com a LCM", href: "/contato" },
  },
  principlesIntro: {
    eyebrow: "Princípios",
    title: "Como pensamos produtos",
    subtitle: "Quatro pilares que orientam o que construímos.",
  },
  technologyIntro: {
    eyebrow: "Tecnologia",
    title: "Camadas que sustentam a experiência",
    subtitle:
      "Da interface à infraestrutura, com linguagem institucional prudente e foco no que o usuário sente.",
  },
  ecosystem: {
    eyebrow: "Ecossistema",
    title: "Uma empresa. Diferentes produtos.",
    subtitle:
      "A mesma atenção à usabilidade e à performance — a integração plena entre produtos é uma visão de ecossistema, não uma funcionalidade já entregue.",
  },
  origin: {
    eyebrow: "Origem",
    title: "Construir fora dos grandes centros",
    body: "A LCM nasceu em Goiás a partir da iniciativa de três fundadores que decidiram transformar ideias ambiciosas em produtos reais. Em uma região com poucas oportunidades no desenvolvimento de tecnologia, escolhemos construir.",
    draftNote: "Rascunho institucional — sujeito a aprovação dos fundadores.",
  },
  finalCta: {
    title: "Tecnologia começa com um problema real.",
    primaryCta: { label: "Conhecer os produtos", href: "/produtos" },
    secondaryCta: { label: "Entrar em contato", href: "/contato" },
  },
} as const;

export const principles: Principle[] = [
  {
    id: "problemas-reais",
    title: "Problemas reais",
    description: "Produtos construídos a partir de necessidades concretas.",
  },
  {
    id: "performance",
    title: "Performance",
    description: "Velocidade e estabilidade fazem parte da experiência.",
  },
  {
    id: "usabilidade",
    title: "Usabilidade",
    description:
      "Interfaces claras para pessoas com diferentes níveis de familiaridade tecnológica.",
  },
  {
    id: "seguranca",
    title: "Segurança",
    description: "Práticas responsáveis para proteger dados e operações.",
  },
];

export const technologyLayers = [
  { id: "ux", label: "Experiência do usuário" },
  { id: "apps", label: "Aplicações" },
  { id: "apis", label: "APIs" },
  { id: "data", label: "Dados" },
  { id: "automation", label: "Automação" },
  { id: "ai", label: "Inteligência Artificial" },
  { id: "infra", label: "Infraestrutura" },
] as const;

export const companyContent = {
  hero: {
    title: "Empresa de tecnologia com produtos próprios",
    subtitle:
      "Desenvolvemos software, automações e iniciativas de inteligência artificial com foco em usabilidade e performance.",
  },
  origin: {
    title: "Origem",
    body: "A LCM nasceu em Goiás a partir da iniciativa de três fundadores que decidiram transformar ideias ambiciosas em produtos reais.",
  },
  problem: {
    title: "O problema que nos move",
    body: "Queremos tornar a tecnologia mais acessível e útil no dia a dia — especialmente onde as oportunidades de desenvolvimento ainda são limitadas.",
  },
  thinking: {
    title: "Forma de pensar",
    body: "Partimos de necessidades concretas. Preferimos clareza à complexidade desnecessária e tratamos usabilidade e performance como requisitos de engenharia.",
  },
  craft: {
    title: "Usabilidade e performance",
    body: "Interfaces compreensíveis e sistemas estáveis não são detalhes finais: são parte do produto desde o início.",
  },
  place: {
    title: "Tecnologia fora dos grandes centros",
    body: "Construir em Goiás é uma escolha: mostrar que produtos ambiciosos podem nascer longe dos hubs tradicionais.",
  },
} as const;

export const technologyPageContent = {
  hero: {
    title: "Tecnologia a serviço da experiência",
    subtitle:
      "Princípios de engenharia e produto — sem buzzwords vazios e sem afirmações que não podemos comprovar.",
  },
  sections: [
    {
      title: "Usabilidade como engenharia",
      body: "Fluxos claros, linguagem objetiva e interfaces que respeitam o tempo de quem usa.",
    },
    {
      title: "Performance como funcionalidade",
      body: "Tempo de resposta, estabilidade e eficiência fazem parte do valor entregue.",
    },
    {
      title: "Arquitetura moderna",
      body: "Preferimos componentes bem definidos, APIs explícitas e evolução incremental.",
    },
    {
      title: "Segurança",
      body: "Tratamos dados e acessos com cuidado. Não afirmamos certificações ou níveis que não estejam documentados.",
    },
    {
      title: "Dados e automação",
      body: "Automatizamos o que é repetitivo para liberar pessoas para decisões e trabalho de maior valor.",
    },
    {
      title: "Inteligência artificial",
      body: "Exploramos IA com responsabilidade, transparência de estágio e foco em problemas reais.",
    },
    {
      title: "Processo de desenvolvimento",
      body: "Iteração curta, validação com usuários e documentação suficiente para manter qualidade.",
    },
  ],
} as const;

export const contactContent = {
  hero: {
    title: "Fale com a LCM",
    subtitle:
      "Envie uma mensagem sobre produtos, parcerias ou dúvidas. Nesta etapa o formulário funciona em modo de desenvolvimento — sem envio real a um provedor externo.",
  },
  success:
    "Mensagem validada localmente. O envio real será conectado em uma etapa futura.",
  consentLabel:
    "Concordo com o tratamento dos dados informados para retorno do contato.",
} as const;

export const productsIndexContent = {
  hero: {
    title: "Produtos LCM",
    subtitle:
      "Portfólio em evolução. Cada produto possui estágio próprio — alguns em desenvolvimento, outros ainda em conceito.",
  },
  evaluation: {
    title: "Como avaliamos novos produtos",
    body: "Priorizamos problemas reais, clareza de público, viabilidade técnica e aderência aos princípios de usabilidade, performance e acessibilidade.",
  },
} as const;
