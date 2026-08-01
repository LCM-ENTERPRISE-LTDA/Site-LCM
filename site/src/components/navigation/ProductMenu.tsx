import Link from "next/link";
import type { NavItem } from "@/config/navigation";
import { cn } from "@/lib/cn";
import styles from "./ProductMenu.module.css";

type ProductMenuProps = {
  items: NavItem[];
  currentPath: string;
  onNavigate?: () => void;
};

export function ProductMenu({ items, currentPath, onNavigate }: ProductMenuProps) {
  return (
    <ul className={styles.list}>
      <li>
        <Link
          href="/produtos"
          className={cn(styles.link, currentPath === "/produtos" && styles.active)}
          onClick={onNavigate}
        >
          Visão geral
        </Link>
      </li>
      {items.map((item) => {
        const active = currentPath === item.href;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(styles.link, active && styles.active)}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
