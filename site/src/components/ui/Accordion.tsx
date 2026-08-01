"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import styles from "./Accordion.module.css";

export type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
  allowMultiple?: boolean;
};

export function Accordion({ items, className, allowMultiple = false }: AccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<string[]>(items[0] ? [items[0].id] : []);

  const toggle = (id: string) => {
    setOpen((current) => {
      const isOpen = current.includes(id);
      if (allowMultiple) {
        return isOpen ? current.filter((item) => item !== id) : [...current, id];
      }
      return isOpen ? [] : [id];
    });
  };

  return (
    <div className={cn(styles.accordion, className)}>
      {items.map((item) => {
        const expanded = open.includes(item.id);
        const panelId = `${baseId}-panel-${item.id}`;
        const buttonId = `${baseId}-button-${item.id}`;

        return (
          <div key={item.id} className={styles.item}>
            <h3 className={styles.heading}>
              <button
                id={buttonId}
                type="button"
                className={styles.trigger}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span>{item.title}</span>
                <span className={styles.icon} aria-hidden="true">
                  {expanded ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!expanded}
              className={styles.panel}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
