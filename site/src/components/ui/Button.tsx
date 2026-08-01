import Link from "next/link";
import { cn } from "@/lib/cn";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

type Common = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
};

type ButtonAsButton = Common &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = Common & {
  href: string;
  external?: boolean;
};

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonAsButton) {
  return (
    <button
      className={cn(styles.button, styles[variant], styles[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  external,
}: ButtonAsLink) {
  const classNames = cn(styles.button, styles[variant], styles[size], className);

  if (external) {
    return (
      <a className={classNames} href={href} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    );
  }

  return (
    <Link className={classNames} href={href}>
      {children}
    </Link>
  );
}
