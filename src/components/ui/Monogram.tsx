/**
 * Monogram: the header logo link. Lettermark plus the name as a wordmark.
 * Below the md breakpoint the name is visually hidden rather than removed,
 * so the link keeps its accessible name ("Prashant Adhikari, home") without
 * an aria-label that would have to mirror the visible text exactly.
 */
import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

export function Monogram({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex h-11 items-center gap-3 text-fg", className)}>
      <LogoMark size={36} className="shrink-0" />
      <span className="type-button sr-only leading-tight md:not-sr-only">{site.name}</span>
      <span className="sr-only">, home</span>
    </Link>
  );
}
