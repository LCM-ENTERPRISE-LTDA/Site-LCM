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
 * Official approved LCM logo (raster).
 * Never redrawn — only background adapted from black to site gray for light UI.
 */
export function Logo({ className, href = "/", priority = false }: LogoProps) {
  const mark = (
    <span className={cn(styles.wrap, className)}>
      <Image
        src="/brand/lcm-logo.png"
        alt={siteConfig.name}
        width={160}
        height={160}
        className={styles.image}
        priority={priority}
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
