/** Open Graph image for this route. See src/lib/og.tsx. */
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Contact Prashant Adhikari";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ lines: ["SAY", "NAMASTE."], accentLine: 1, eyebrow: "Contact" });
}
