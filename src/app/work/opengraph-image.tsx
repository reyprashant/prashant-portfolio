/** Open Graph image for this route. See src/lib/og.tsx. */
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Work of Prashant Adhikari";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    lines: ["I MAKE THINGS", "HAPPEN."],
    accentLine: 1,
    eyebrow: "Work",
  });
}
