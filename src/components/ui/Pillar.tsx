/**
 * Pillar: numbered row (01 / title / body) used for community pillars and
 * "How I work". Numbering is derived from position.
 */
import type { Pillar as PillarType } from "@/types/content";

export function Pillar({ index, title, body }: PillarType & { index: number }) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <li className="grid grid-cols-[48px_1fr] gap-4 border-t border-line py-6 first:border-t-0 first:pt-0 md:grid-cols-[64px_1fr]">
      <span className="font-display text-[22px] leading-none text-highlight md:text-[26px]">
        {number}
      </span>
      <div>
        <h3 className="type-h3 text-fg">{title}</h3>
        <p className="type-body mt-2 text-fg-muted">{body}</p>
      </div>
    </li>
  );
}
