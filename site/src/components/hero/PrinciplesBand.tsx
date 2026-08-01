import type { Principle } from "@/types/product";
import { Container } from "@/components/ui/Container";
import styles from "./PrinciplesBand.module.css";

type PrinciplesBandProps = {
  principles: Principle[];
};

export function PrinciplesBand({ principles }: PrinciplesBandProps) {
  return (
    <section className={styles.band} aria-label="Princípios da LCM" id="principios">
      <Container>
        <ul className={styles.grid}>
          {principles.map((principle) => (
            <li key={principle.id} className={styles.item}>
              <h2 className={styles.title}>{principle.title}</h2>
              <p className={styles.description}>{principle.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
