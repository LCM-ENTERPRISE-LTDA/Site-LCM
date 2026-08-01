"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { primaryNav } from "@/config/navigation";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DesktopNavigation } from "@/components/navigation/DesktopNavigation";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";
import { cn } from "@/lib/cn";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className={styles.header}>
      <Container className={styles.bar}>
        <Logo />

        <DesktopNavigation items={primaryNav} currentPath={pathname} />

        <div className={styles.actions}>
          <LinkButton href="/contato" size="sm" className={styles.cta}>
            Fale com a LCM
          </LinkButton>
          <button
            ref={toggleRef}
            type="button"
            className={cn(styles.toggle, open && styles.toggleOpen)}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </Container>

      <MobileNavigation
        id={menuId}
        open={open}
        items={primaryNav}
        currentPath={pathname}
        onNavigate={() => setOpen(false)}
      />
    </header>
  );
}
