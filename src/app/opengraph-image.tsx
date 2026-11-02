/** Open Graph image for this route. See src/lib/og.tsx. */
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt =
  "Prashant Adhikari, project manager and founder of Zenox Academy, Pokhara";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    lines: ["BUILDING POKHARA'S", "NEXT BUILDERS."],
    accentLine: 1,
    eyebrow: "Pokhara, Nepal",
  });
}
