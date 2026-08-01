import { cn } from "@/lib/cn";
import styles from "./Container.module.css";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
};

export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return <Tag className={cn(styles.container, className)}>{children}</Tag>;
}
