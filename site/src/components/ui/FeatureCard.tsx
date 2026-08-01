import { cn } from "@/lib/cn";
import styles from "./FeatureCard.module.css";

type FeatureCardProps = {
  title: string;
  description: string;
  className?: string;
};

export function FeatureCard({ title, description, className }: FeatureCardProps) {
  return (
    <article className={cn(styles.card, className)}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </article>
  );
}
