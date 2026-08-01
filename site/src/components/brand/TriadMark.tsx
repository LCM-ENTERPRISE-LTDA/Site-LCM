import { cn } from "@/lib/cn";
import styles from "./TriadMark.module.css";

type TriadMarkProps = {
  className?: string;
  size?: number;
  title?: string;
};

/**
 * Structural application of the approved triad geometry.
 * Not a redesign: same three parts, same gaps, same upward structure.
 */
export function TriadMark({ className, size = 36, title = "LCM" }: TriadMarkProps) {
  return (
    <svg
      className={cn(styles.mark, className)}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {/* Top diamond */}
      <path
        className={styles.stroke}
        d="M32 6.5 L42.2 18.8 L32 31.1 L21.8 18.8 Z"
        strokeLinejoin="round"
      />
      {/* Bottom-left triangle */}
      <path
        className={styles.stroke}
        d="M8.5 55.5 L29.2 55.5 L18.85 36.2 Z"
        strokeLinejoin="round"
      />
      {/* Bottom-right triangle */}
      <path
        className={styles.stroke}
        d="M35.8 55.5 L56.5 55.5 L45.15 36.2 Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}
