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

/** Official logo — cropped for header (no square padding). */
export function Logo({ className, href = "/", priority = false }: LogoProps) {
  const mark = (
    <span className={cn(styles.wrap, className)}>
      <Image
        src="/brand/lcm-logo-header.png"
        alt={siteConfig.name}
        width={174}
        height={61}
        className={styles.image}
        priority={priority}
        sizes="140px"
      />
    </span>
  );

  if (!href) return mark;

  return (
    <Link href={href} className={styles.link} aria-label={`${siteConfig.name} — início`}>
      {mark}
    </Link>
  );
}
