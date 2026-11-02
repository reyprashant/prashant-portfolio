/** Open Graph image for this route. See src/lib/og.tsx. */
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "About Prashant Adhikari";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    lines: ["HI, I'M", "PRASHANT."],
    accentLine: 1,
    eyebrow: "About",
  });
}
