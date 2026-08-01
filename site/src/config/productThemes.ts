import type { CSSProperties } from "react";

export const productTheme = {
  autohist: {
    key: "autohist",
    label: "AutoHist",
    accent: "var(--product-autohist)",
    accentSoft: "var(--product-autohist-soft)",
    glow: "var(--product-autohist-glow)",
    personality: "clareza operacional",
  },
  dyson: {
    key: "dyson",
    label: "Dyson",
    accent: "var(--product-dyson)",
    accentSoft: "var(--product-dyson-soft)",
    glow: "var(--product-dyson-glow)",
    personality: "exploração técnica",
  },
  studio: {
    key: "studio",
    label: "LCM Studio",
    accent: "var(--product-studio)",
    accentSoft: "var(--product-studio-soft)",
    glow: "var(--product-studio-glow)",
    personality: "criação controlada",
  },
  businesszap: {
    key: "businesszap",
    label: "BusinessZap",
    accent: "var(--product-businesszap)",
    accentSoft: "var(--product-businesszap-soft)",
    glow: "var(--product-businesszap-glow)",
    personality: "comunicação responsável",
  },
} as const;

export type ProductThemeKey = keyof typeof productTheme;

export function getProductCssVars(colorKey: ProductThemeKey): CSSProperties {
  const theme = productTheme[colorKey];
  return {
    "--product-accent": theme.accent,
    "--product-accent-soft": theme.accentSoft,
    "--product-glow": theme.glow,
  } as CSSProperties;
}
