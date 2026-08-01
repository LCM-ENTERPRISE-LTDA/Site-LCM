import { cn } from "@/lib/cn";
import styles from "./Badge.module.css";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "brand" | "success" | "warning";
};

export function Badge({ children, className, tone = "neutral" }: BadgeProps) {
  return <span className={cn(styles.badge, styles[tone], className)}>{children}</span>;
}
