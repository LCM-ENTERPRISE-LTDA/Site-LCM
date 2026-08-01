import type { Principle } from "@/types/product";
import { FeatureCard } from "@/components/ui/FeatureCard";

type PrincipleCardProps = {
  principle: Principle;
};

export function PrincipleCard({ principle }: PrincipleCardProps) {
  return <FeatureCard title={principle.title} description={principle.description} />;
}
