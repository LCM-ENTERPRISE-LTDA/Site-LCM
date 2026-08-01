"use client";

import Link from "next/link";
import { useId, useState } from "react";
import type { NavItem } from "@/config/navigation";
import { ProductMenu } from "@/components/navigation/ProductMenu";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import styles from "./MobileNavigation.module.css";

type MobileNavigationProps = {
  id: string;
  open: boolean;
  items: NavItem[];
  currentPath: string;
  onNavigate: () => void;
};

function isActive(href: string, currentPath: string) {
  if (href === "/") return currentPath === "/";
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export function MobileNavigation({
  id,
  open,
  items,
  currentPath,
  onNavigate,
}: MobileNavigationProps) {
  return (
    <div
      id={id}
      className={cn(styles.drawer, open && styles.open)}
      hidden={!open}
    >
      <nav aria-label="Principal móvel" className={styles.nav}>
        <ul className={styles.list}>
          {items.map((item) =>
            item.children ? (
              <MobileProducts
                key={item.href}
                item={item}
                currentPath={currentPath}
                onNavigate={onNavigate}
              />
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(styles.link, isActive(item.href, currentPath) && styles.active)}
                  aria-current={isActive(item.href, currentPath) ? "page" : undefined}
                  onClick={onNavigate}
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
        <div onClick={onNavigate}>
          <LinkButton href="/contato" className={styles.cta}>
            Fale com a LCM
          </LinkButton>
        </div>
      </nav>
    </div>
  );
}

function MobileProducts({
  item,
  currentPath,
  onNavigate,
}: {
  item: NavItem;
  currentPath: string;
  onNavigate: () => void;
}) {
  const panelId = useId();
  const [expanded, setExpanded] = useState(isActive(item.href, currentPath));

  return (
    <li>
      <button
        type="button"
        className={cn(styles.link, styles.trigger, isActive(item.href, currentPath) && styles.active)}
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((value) => !value)}
      >
        {item.label}
      </button>
      <div id={panelId} hidden={!expanded} className={styles.submenu}>
        <ProductMenu
          items={item.children ?? []}
          currentPath={currentPath}
          onNavigate={onNavigate}
        />
      </div>
    </li>
  );
}
