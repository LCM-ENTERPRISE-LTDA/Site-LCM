import { cn } from "@/lib/cn";
import styles from "./Section.module.css";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "elevated" | "brand";
};

export function Section({ children, className, id, tone = "default" }: SectionProps) {
  return (
    <section id={id} className={cn(styles.section, styles[tone], className)}>
      {children}
    </section>
  );
}
