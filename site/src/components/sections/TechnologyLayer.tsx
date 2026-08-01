import { cn } from "@/lib/cn";
import styles from "./TechnologyLayer.module.css";

type TechnologyLayerProps = {
  layers: ReadonlyArray<{ id: string; label: string }>;
  className?: string;
};

export function TechnologyLayer({ layers, className }: TechnologyLayerProps) {
  return (
    <ol className={cn(styles.list, className)}>
      {layers.map((layer, index) => (
        <li key={layer.id} className={styles.item}>
          <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
          <span className={styles.label}>{layer.label}</span>
        </li>
      ))}
    </ol>
  );
}
