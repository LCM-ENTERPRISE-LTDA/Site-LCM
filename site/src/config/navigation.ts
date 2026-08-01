export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Empresa", href: "/empresa" },
  {
    label: "Produtos",
    href: "/produtos",
    children: [
      { label: "AutoHist", href: "/produtos/autohist" },
      { label: "Dyson", href: "/produtos/dyson" },
      { label: "LCM Studio", href: "/produtos/lcm-studio" },
      { label: "BusinessZap", href: "/produtos/businesszap" },
    ],
  },
  { label: "Tecnologia", href: "/tecnologia" },
  { label: "Contato", href: "/contato" },
];
