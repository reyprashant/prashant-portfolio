/**
 * Stat: number and label for the proof strip.
 */
import type { Stat as StatType } from "@/types/content";

export function Stat({ value, label }: StatType) {
  return (
    <div className="flex flex-col gap-2 border-t border-line pt-6">
      <span className="type-stat text-fg">{value}</span>
      <span className="type-small text-fg-muted">{label}</span>
    </div>
  );
}
