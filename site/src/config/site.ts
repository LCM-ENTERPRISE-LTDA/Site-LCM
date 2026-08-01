export const siteConfig = {
  name: "LCM Enterprise",
  legalName: "LCM Enterprise LTDA",
  shortName: "LCM",
  description:
    "A LCM Enterprise desenvolve produtos digitais, automações e soluções de inteligência artificial com foco em usabilidade, performance e acesso à tecnologia.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "pt_BR",
  regionLabel: "Goiás, Brasil",
  contactEmail: undefined as string | undefined,
  phone: undefined as string | undefined,
  address: undefined as string | undefined,
  social: {
    linkedin: undefined as string | undefined,
    github: undefined as string | undefined,
    instagram: undefined as string | undefined,
  },
} as const;

export type SiteConfig = typeof siteConfig;
