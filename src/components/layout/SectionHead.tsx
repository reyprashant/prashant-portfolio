/**
 * SectionHead: eyebrow, two-line display heading and intro, in the brief's
 * 1.5fr / 1fr bottom-aligned grid with 44px below (brief 7.4).
 */
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { cn } from "@/lib/cn";

type SectionHeadProps = {
  eyebrow: string;
  lines: readonly string[];
  accentLine?: number;
  intro?: string;
  /** Slot for a button or link aligned with the intro. */
  aside?: ReactNode;
  className?: string;
  /** Heading level. Pages pass "h1" exactly once. */
  as?: "h1" | "h2";
  /** Optional id for the heading element so sections can be labelled by it. */
  headingId?: string;
};

export function SectionHead({
  eyebrow,
  lines,
  accentLine,
  intro,
  aside,
  className,
  as = "h2",
  headingId,
}: SectionHeadProps) {
  return (
    <div
      className={cn(
        "mb-11 grid grid-cols-1 items-end gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-16",
        className,
      )}
    >
      <div>
        <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
        <Heading
          as={as}
          lines={lines}
          accentLine={accentLine}
          size="display-2"
          id={headingId}
        />
      </div>
      {(intro || aside) && (
        <div className="flex flex-col gap-6">
          {intro && <p className="type-body-lg max-w-prose text-fg-muted">{intro}</p>}
          {aside}
        </div>
      )}
    </div>
  );
}
