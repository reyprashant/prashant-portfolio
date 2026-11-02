/**
 * TimelineRow: a year and its beats. Rendered on a dark band on About.
 */
import type { TimelineEntry } from "@/types/content";

export function TimelineRow({ year, beats }: TimelineEntry) {
  return (
    <li className="grid grid-cols-1 gap-3 border-t border-line py-7 md:grid-cols-[120px_1fr] md:gap-10">
      <span className="type-stat text-highlight">{year}</span>
      <ul className="flex flex-col gap-2">
        {beats.map((beat) => (
          <li key={beat} className="type-body text-fg">
            {beat}
          </li>
        ))}
      </ul>
    </li>
  );
}
