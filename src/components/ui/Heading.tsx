/**
 * Heading: display heading rendered as stacked lines, with one optional
 * accent-coloured line. Level is a prop so each page controls its single H1.
 */
import { cn } from "@/lib/cn";

type HeadingProps = {
  lines: readonly string[];
  /** Index of the line shown in the accent colour. Omit for none. */
  accentLine?: number;
  as?: "h1" | "h2" | "h3";
  size?: "display-1" | "display-2";
  className?: string;
  id?: string;
};

export function Heading({
  lines,
  accentLine,
  as: Tag = "h2",
  size = "display-2",
  className,
  id,
}: HeadingProps) {
  return (
    <Tag id={id} className={cn(`type-${size}`, "text-fg", className)}>
      {lines.map((line, index) => (
        <span key={line} className={cn("block", index === accentLine && "accent-word")}>
          {line}
        </span>
      ))}
    </Tag>
  );
}
