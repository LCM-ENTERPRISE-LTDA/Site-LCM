import { cn } from "@/lib/cn";

type IconProps = {
  name: "arrow-right" | "menu" | "close" | "chevron-down" | "check" | "spark" | "node" | "link";
  className?: string;
  size?: number;
};

const paths: Record<IconProps["name"], React.ReactNode> = {
  "arrow-right": (
    <path d="M5 12h14M13 6l6 6-6 6" />
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </>
  ),
  "chevron-down": <path d="M6 9l6 6 6-6" />,
  check: <path d="M5 12l4 4L19 6" />,
  spark: (
    <>
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  node: <circle cx="12" cy="12" r="4" />,
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 6 0l2-2a4 4 0 0 0-6-6l-1 1" />
      <path d="M14 10a4 4 0 0 0-6 0l-2 2a4 4 0 0 0 6 6l1-1" />
    </>
  ),
};

export function Icon({ name, className, size = 18 }: IconProps) {
  return (
    <svg
      className={cn(className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
