import type { Product, ProductStatus } from "@/types/product";

export const products: Product[] = [
  {
    slug: "autohist",
    name: "AutoHist",
    shortName: "AutoHist",
    status: "development",
    tagline: "Prontuário digital do veículo para oficinas.",
    description:
      "Organiza ordens de serviço, histórico e busca de informações do veículo em um fluxo pensado para o dia a dia da oficina.",
    colorKey: "autohist",
    href: "/produtos/autohist",
    featured: true,
    capabilities: [
      "Registro de ordens de serviço",
      "Histórico do veículo",
      "Busca e organização de informações",
      "Visão clara do andamento do serviço",
    ],
    audience: ["Oficinas", "Gestores de serviço", "Equipes técnicas"],
    availabilityLabel: "Em desenvolvimento",
    problem:
      "Informações de veículos e serviços costumam ficar espalhadas em cadernos, planilhas e sistemas desconectados.",
    approach:
      "O AutoHist concentra o prontuário do veículo e o fluxo de ordens de serviço em uma experiência objetiva para a oficina.",
  },
  {
    slug: "dyson",
    name: "Dyson",
    shortName: "Dyson",
    status: "concept",
    tagline: "Iniciativa de IA com foco em autonomia e uso eficiente de recursos.",
    description:
      "Explora inteligência artificial, reaproveitamento de infraestrutura e redução de barreiras de custo — ainda em estágio conceitual e de desenvolvimento.",
    colorKey: "dyson",
    href: "/produtos/dyson",
    featured: true,
    capabilities: [
      "Visão de autonomia tecnológica",
      "Uso mais eficiente de recursos computacionais",
      "Exploração de infraestrutura descentralizada",
      "Redução da dependência de plataformas centralizadas",
    ],
    audience: ["Times técnicos", "Pesquisadores", "Parceiros estratégicos"],
    availabilityLabel: "Em desenvolvimento",
    problem:
      "Acesso a capacidade computacional e a modelos avançados ainda é caro, centralizado e pouco transparente para muitas equipes.",
    approach:
      "A Dyson investiga caminhos para aproveitar melhor equipamentos existentes e construir maior autonomia tecnológica com responsabilidade.",
    principles: [
      "Transparência sobre o estágio atual",
      "Eficiência energética e reaproveitamento",
      "Autonomia tecnológica responsável",
    ],
  },
  {
    slug: "lcm-studio",
    name: "LCM Studio",
    shortName: "Studio",
    status: "development",
    tagline: "Construtor visual para sites com autonomia controlada.",
    description:
      "Permite editar textos, imagens e componentes com uma experiência mais simples, preservando estrutura e qualidade técnica.",
    colorKey: "studio",
    href: "/produtos/lcm-studio",
    featured: true,
    capabilities: [
      "Criação visual de sites",
      "Edição de textos, imagens e componentes",
      "Manutenção de estrutura",
      "Autonomia controlada para o cliente",
    ],
    audience: ["Empresas", "Equipes de marketing", "Parceiros de implementação"],
    availabilityLabel: "Em desenvolvimento",
    problem:
      "Muitos clientes precisam atualizar conteúdo sem depender de um ciclo longo de desenvolvimento a cada alteração simples.",
    approach:
      "O LCM Studio busca oferecer edição visual clara, sem abrir mão de estrutura, performance e governança técnica.",
  },
  {
    slug: "businesszap",
    name: "BusinessZap",
    shortName: "BusinessZap",
    status: "concept",
    tagline: "Organização de contatos e comunicação empresarial responsável.",
    description:
      "Plataforma para organização de contatos, comunicação empresarial e acompanhamento de campanhas, respeitando consentimento e boas práticas.",
    colorKey: "businesszap",
    href: "/produtos/businesszap",
    featured: true,
    capabilities: [
      "Organização de contatos",
      "Comunicação empresarial estruturada",
      "Acompanhamento de campanhas",
      "Orientação a uso responsável e consentimento",
    ],
    audience: ["Equipes comerciais", "Atendimento", "Operações"],
    availabilityLabel: "Em desenvolvimento",
    problem:
      "Contatos e conversas empresariais costumam ficar dispersos, dificultando acompanhamento e conformidade com boas práticas.",
    approach:
      "O BusinessZap organiza contatos e comunicação com foco em clareza operacional e uso responsável — sem práticas abusivas.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getStatusLabel(status: ProductStatus): string {
  switch (status) {
    case "available":
      return "Disponível";
    case "beta":
      return "Beta";
    case "development":
      return "Em desenvolvimento";
    case "concept":
      return "Conceito";
    default:
      return status;
  }
}
