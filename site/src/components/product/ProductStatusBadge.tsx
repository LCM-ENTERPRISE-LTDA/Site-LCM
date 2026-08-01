import { Badge } from "@/components/ui/Badge";
import { getStatusLabel } from "@/data/products";
import type { ProductStatus } from "@/types/product";

type ProductStatusBadgeProps = {
  status: ProductStatus;
};

export function ProductStatusBadge({ status }: ProductStatusBadgeProps) {
  const tone =
    status === "available"
      ? "success"
      : status === "beta"
        ? "brand"
        : status === "development"
          ? "warning"
          : "neutral";

  return <Badge tone={tone}>{getStatusLabel(status)}</Badge>;
}
