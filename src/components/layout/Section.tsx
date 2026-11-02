/**
 * Section: a full-width band with a surface colour and vertical rhythm.
 *
 * The surface class sets CSS variables that every child reads (text, muted,
 * eyebrow, rule and accent colours), so children never pick light or dark
 * colours themselves. See globals.css section 3.
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type Surface = "black" | "ink" | "white" | "grey" | "warm";

type SectionProps = {
  children: ReactNode;
  surface: Surface;
  /** Optional id for deep links such as /community#events. */
  id?: string;
  className?: string;
  /** Set false when the section manages its own vertical padding (for example the hero). */
  padded?: boolean;
  /** Accessible name when the section has no visible heading of its own. */
  ariaLabel?: string;
};

export function Section({
  children,
  surface,
  id,
  className,
  padded = true,
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        `surface-${surface}`,
        padded && "section-y",
        "scroll-mt-(--header-h)",
        className,
      )}
    >
      {children}
    </section>
  );
}
