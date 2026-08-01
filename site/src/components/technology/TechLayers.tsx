import { technologyLayers } from "@/content/institutional";
import styles from "./TechLayers.module.css";

export function TechLayers() {
  return (
    <ol className={styles.list} aria-label="Camadas tecnológicas">
      {technologyLayers.map((layer, index) => (
        <li key={layer.id} className={styles.item}>
          <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
          <span className={styles.label}>{layer.label}</span>
        </li>
      ))}
    </ol>
  );
}
