/**
 * Eyebrow: small uppercase tracked label above headings (brief 7.3).
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn("type-eyebrow text-fg-eyebrow", className)}>{children}</p>;
}
