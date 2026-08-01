import { technologyLayers } from "@/content/institutional";
import type { TechPerspectiveId } from "@/content/technology";
import styles from "./TechLayers.module.css";

const HIGHLIGHTS: Record<TechPerspectiveId, ReadonlySet<string>> = {
  experiencia: new Set(["ux", "apps"]),
  sistemas: new Set(["apps", "apis", "data", "automation", "infra"]),
  ia: new Set(["data", "ai", "infra"]),
};

type Props = {
  active: TechPerspectiveId;
};

export function TechLayers({ active }: Props) {
  const lit = HIGHLIGHTS[active];

  return (
    <ol className={styles.list} aria-label="Camadas tecnológicas" data-mode={active}>
      {technologyLayers.map((layer, index) => {
        const on = lit.has(layer.id);
        return (
          <li
            key={layer.id}
            className={`${styles.item} ${on ? styles.on : styles.off}`}
          >
            <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.label}>{layer.label}</span>
            {on ? <span className={styles.signal} aria-hidden="true" /> : null}
          </li>
        );
      })}
    </ol>
  );
}
