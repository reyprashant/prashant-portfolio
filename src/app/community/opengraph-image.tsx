/** Open Graph image for this route. See src/lib/og.tsx. */
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Community and events led by Prashant Adhikari";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    lines: ["COMMUNITY", "FIRST."],
    accentLine: 1,
    eyebrow: "Community",
  });
}
