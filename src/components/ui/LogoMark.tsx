/**
 * LogoMark: the site's lettermark. An orange square carrying "PA" in the
 * display face, with a notch cut from the top-right corner so the shape
 * reads as a mark rather than a button. Inline SVG, no image request.
 * Replace the paths with Prashant's own SVG when supplied (brief section 8).
 */
import { site } from "@/data/site";

export function LogoMark({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
    >
      {/* Square with the top-right corner notched. */}
      <path d="M0 0h29l11 11v29H0z" fill="var(--color-accent)" />
      <text
        x="20"
        y="30.5"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="27"
        letterSpacing="0.5"
        fill="var(--color-on-accent)"
      >
        {site.monogram}
      </text>
    </svg>
  );
}
