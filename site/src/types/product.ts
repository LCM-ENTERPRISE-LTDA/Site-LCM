export type ProductStatus =
  | "available"
  | "beta"
  | "development"
  | "concept";

export type Product = {
  slug: string;
  name: string;
  shortName?: string;
  status: ProductStatus;
  tagline: string;
  description: string;
  colorKey: "autohist" | "dyson" | "studio" | "businesszap";
  href: string;
  featured: boolean;
  capabilities: string[];
  audience: string[];
  availabilityLabel: string;
  problem: string;
  approach: string;
  principles?: string[];
};

export type Principle = {
  id: string;
  title: string;
  description: string;
};
