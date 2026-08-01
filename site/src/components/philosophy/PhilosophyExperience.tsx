import {
  philosophyIntro,
  philosophyStatements,
} from "@/content/philosophy";
import { PhilosophyStatementBlock } from "./PhilosophyStatement";
import styles from "./PhilosophyExperience.module.css";

/**
 * Editorial philosophy chapter — silence, type, rhythm.
 * No cards. No icons. No product sell.
 */
export function PhilosophyExperience() {
  return (
    <section
      id="filosofia"
      className={styles.experience}
      aria-labelledby="philosophy-label"
    >
      <div className={styles.atmosphere} aria-hidden="true" />

      <header className={styles.intro}>
        <p id="philosophy-label" className={styles.eyebrow}>
          {philosophyIntro.eyebrow}
        </p>
      </header>

      <div className={styles.gallery}>
        {philosophyStatements.map((statement, index) => (
          <PhilosophyStatementBlock
            key={statement.id}
            statement={statement}
            index={index}
          />
        ))}
      </div>

      <div className={styles.bridge} aria-hidden="true" />
    </section>
  );
}
