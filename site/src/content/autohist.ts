export const autohistCopy = {
  hero: {
    eyebrow: "AutoHist",
    title: "O histórico começa antes do problema.",
    subtitle:
      "Toda manutenção conta uma história. Quando essa história se perde, o veículo também perde valor.",
    cta: { label: "Conhecer o AutoHist", href: "#historico" },
    status: "Em desenvolvimento",
    note: "Prontuário digital do veículo.",
  },
  problem: {
    eyebrow: "O problema",
    title: "A memória do veículo está espalhada.",
    body: "Fotos no celular. Mensagens no WhatsApp. Anotações no papel. O que o mecânico lembra. O que o cliente descreve. Cada oficina vê um fragmento. Nenhuma vê o todo.",
    aside: "Informação existe.\nContinuidade não.",
    fragments: [
      "Foto",
      "WhatsApp",
      "Papel",
      "Planilha",
      "Memória",
      "Cliente",
    ],
  },
  history: {
    eyebrow: "O histórico",
    title: "Uma linha viva. Não uma tabela.",
    body: "Cada intervenção permanece. Quilometragem, peças, fotos, ordens e inspeções se encadeiam — como um prontuário que cresce sem apagar o que veio antes.",
    aside: "Registro que acumula.\nNunca substitui.",
    events: [
      { label: "Entrada", detail: "Leitura inicial" },
      { label: "Diagnóstico", detail: "Achados" },
      { label: "Peças", detail: "Trocas" },
      { label: "Fotos", detail: "Evidência" },
      { label: "Entrega", detail: "Continuidade" },
    ],
  },
  search: {
    eyebrow: "Buscar um veículo",
    title: "Uma placa. Toda a história.",
    body: "Digitar. Encontrar. Ver o que já foi feito — com a mesma clareza de um arquivo clínico. A busca não é um filtro. É o primeiro ato de confiança.",
    aside: "Encontrar é preservar.",
    plate: "ABC1D23",
  },
  workshop: {
    eyebrow: "A oficina",
    title: "Todos enxergam a mesma informação.",
    body: "Equipe, fotos, cliente e veículo compartilhar a mesma memória. Sem fluxograma. Sem ruído. Um fluxo único de leitura — sincronizado pelo histórico, não por planilhas paralelas.",
    nodes: ["Equipe", "Fotos", "Cliente", "Veículo", "Registro"],
  },
  continuity: {
    eyebrow: "Continuidade",
    title: "O veículo permanece anos. O histórico também.",
    body: "Revisões, trocas, inspeções e quilometragem se acumulam com o tempo. O AutoHist foi pensado para acompanhar a vida útil — não apenas o serviço da semana.",
    markers: [
      { label: "Tempo", value: "Anos de registro" },
      { label: "Percurso", value: "Quilometragem" },
      { label: "Evidência", value: "Fotos e peças" },
      { label: "Cuidado", value: "Inspeções" },
    ],
  },
  closing: {
    line: "O veículo muda.\nO histórico permanece.",
    note: "Precisão. Longevidade. Confiança.",
    primaryCta: { label: "Solicitar demonstração", href: "/contato" },
    secondaryCta: { label: "Ver todos os produtos", href: "/produtos" },
  },
} as const;
