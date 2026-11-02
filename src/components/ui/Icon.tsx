/**
 * Icon: the only icons on the site, hand-drawn inline SVG.
 * No icon library is used (plan section 2, constraint 5).
 */
type IconName = "menu" | "close" | "external" | "chevron-down" | "chevron-up";

const paths: Record<IconName, string> = {
  menu: "M3 6h18M3 12h18M3 18h18",
  close: "M5 5l14 14M19 5L5 19",
  external: "M7 17L17 7M9 7h8v8",
  "chevron-down": "M6 9l6 6 6-6",
  "chevron-up": "M6 15l6-6 6 6",
};

export function Icon({
  name,
  size = 20,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="square"
      className={className}
    >
      <path d={paths[name]} />
    </svg>
  );
}
