import Link from "next/link";
import { TriadMark } from "@/components/brand/TriadMark";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import styles from "./Logo.module.css";

type LogoProps = {
  className?: string;
  href?: string;
};

/**
 * Light-surface lockup using the approved triad geometry + wordmark.
 * Official raster remains at /brand/lcm-logo.png (unchanged source).
 */
export function Logo({ className, href = "/" }: LogoProps) {
  const mark = (
    <span className={cn(styles.wrap, className)}>
      <TriadMark size={34} />
      <span className={styles.word}>LCM</span>
    </span>
  );

  if (!href) return mark;

  return (
    <Link href={href} className={styles.link} aria-label={`${siteConfig.name} — início`}>
      {mark}
    </Link>
  );
}
