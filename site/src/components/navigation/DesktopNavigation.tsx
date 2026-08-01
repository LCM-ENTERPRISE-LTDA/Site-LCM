"use client";

import Link from "next/link";
import { useId, useState } from "react";
import type { NavItem } from "@/config/navigation";
import { ProductMenu } from "@/components/navigation/ProductMenu";
import { cn } from "@/lib/cn";
import styles from "./DesktopNavigation.module.css";

type DesktopNavigationProps = {
  items: NavItem[];
  currentPath: string;
};

function isActive(href: string, currentPath: string) {
  if (href === "/") return currentPath === "/";
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export function DesktopNavigation({ items, currentPath }: DesktopNavigationProps) {
  return (
    <nav className={styles.nav} aria-label="Principal">
      <ul className={styles.list}>
        {items.map((item) =>
          item.children ? (
            <DesktopDropdown
              key={item.href}
              item={item}
              currentPath={currentPath}
            />
          ) : (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(styles.link, isActive(item.href, currentPath) && styles.active)}
                aria-current={isActive(item.href, currentPath) ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}

function DesktopDropdown({
  item,
  currentPath,
}: {
  item: NavItem;
  currentPath: string;
}) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const active = isActive(item.href, currentPath);

  return (
    <li
      className={styles.dropdown}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={cn(styles.link, styles.trigger, active && styles.active)}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
        }}
      >
        {item.label}
      </button>
      <div id={menuId} hidden={!open} className={styles.panel}>
        <ProductMenu items={item.children ?? []} currentPath={currentPath} />
      </div>
    </li>
  );
}
