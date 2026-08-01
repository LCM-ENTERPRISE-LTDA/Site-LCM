import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import styles from "./Logo.module.css";

type LogoProps = {
  className?: string;
  href?: string;
  priority?: boolean;
};

/**
 * Official LCM mark: triad + wordmark "LCM" (no Enterprise).
 * Dark-ready transparent PNG derived from the approved file.
 */
export function Logo({ className, href = "/", priority = false }: LogoProps) {
  const mark = (
    <span className={cn(styles.wrap, className)}>
      <Image
        src="/brand/lcm-logo-dark.png"
        alt={siteConfig.shortName}
        width={140}
        height={50}
        className={styles.image}
        priority={priority}
        sizes="120px"
      />
    </span>
  );

  if (!href) return mark;

  return (
    <Link href={href} className={styles.link} aria-label={`${siteConfig.shortName} — início`}>
      {mark}
    </Link>
  );
}
