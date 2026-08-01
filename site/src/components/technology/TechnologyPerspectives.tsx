"use client";

import { useCallback, useId, useRef, useState } from "react";
import type { TechPerspective, TechPerspectiveId } from "@/content/technology";
import styles from "./TechnologyPerspectives.module.css";

type Phase = "idle" | "out" | "in";

type Props = {
  items: readonly TechPerspective[];
  active: TechPerspectiveId;
  onChange: (id: TechPerspectiveId) => void;
  reducedMotion: boolean;
};

export function TechnologyPerspectives({
  items,
  active,
  onChange,
  reducedMotion,
}: Props) {
  const baseId = useId();
  const [phase, setPhase] = useState<Phase>("idle");
  const [displayId, setDisplayId] = useState(active);
  const locked = useRef(false);

  const display = items.find((i) => i.id === displayId) ?? items[0];

  const switchTo = useCallback(
    (next: TechPerspectiveId) => {
      if (next === active || locked.current) return;
      onChange(next);

      if (reducedMotion) {
        setDisplayId(next);
        setPhase("idle");
        return;
      }

      locked.current = true;
      setPhase("out");
      window.setTimeout(() => {
        setDisplayId(next);
        setPhase("in");
        window.setTimeout(() => {
          setPhase("idle");
          locked.current = false;
        }, 420);
      }, 280);
    },
    [active, onChange, reducedMotion],
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const index = items.findIndex((item) => item.id === active);
    if (index < 0) return;

    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % items.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index - 1 + items.length) % items.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = items.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    switchTo(items[next].id);
    document.getElementById(`${baseId}-tab-${items[next].id}`)?.focus();
  };

  return (
    <div className={styles.root}>
      <div
        role="tablist"
        aria-label="Perspectivas tecnológicas"
        className={styles.list}
        onKeyDown={onKeyDown}
      >
        {items.map((item) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              id={`${baseId}-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              className={`${styles.tab} ${selected ? styles.active : ""}`}
              data-mode={item.id}
              onClick={() => switchTo(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${displayId}`}
        className={`${styles.panel} ${styles[phase]}`}
      >
        <p className={styles.body}>{display.body}</p>
      </div>
    </div>
  );
}
