/** Open Graph image for this route. See src/lib/og.tsx. */
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Privacy policy, Prashant Adhikari";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    lines: ["PRIVACY", "POLICY."],
    accentLine: 1,
    eyebrow: "Privacy",
  });
}
