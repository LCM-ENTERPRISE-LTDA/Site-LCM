export const productTheme = {
  autohist: {
    key: "autohist",
    accent: "var(--product-autohist)",
    accentSoft: "var(--product-autohist-soft)",
  },
  dyson: {
    key: "dyson",
    accent: "var(--product-dyson)",
    accentSoft: "var(--product-dyson-soft)",
  },
  studio: {
    key: "studio",
    accent: "var(--product-studio)",
    accentSoft: "var(--product-studio-soft)",
  },
  businesszap: {
    key: "businesszap",
    accent: "var(--product-businesszap)",
    accentSoft: "var(--product-businesszap-soft)",
  },
} as const;

export type ProductThemeKey = keyof typeof productTheme;
