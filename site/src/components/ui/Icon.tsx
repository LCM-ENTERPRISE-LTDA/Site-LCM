import { cn } from "@/lib/cn";

type IconProps = {
  name: "arrow-right" | "menu" | "close" | "chevron-down" | "check" | "spark" | "node" | "link";
  className?: string;
  size?: number;
};

const paths: Record<IconProps["name"], React.ReactNode> = {
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
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
      <path d="M12 4 L14.8 9.2 L20 12 L14.8 14.8 L12 20 L9.2 14.8 L4 12 L9.2 9.2 Z" />
    </>
  ),
  node: <path d="M12 5 L19 12 L12 19 L5 12 Z" />,
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 6 0l2-2a4 4 0 0 0-6-6l-1 1" />
      <path d="M14 10a4 4 0 0 0-6 0l-2 2a4 4 0 0 0 6 6l1-1" />
    </>
  ),
};

/** Single icon language: triad-soft corners, consistent stroke. */
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
