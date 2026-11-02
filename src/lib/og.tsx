/**
 * Shared Open Graph image template (1200 x 630).
 *
 * Typographic only: name in Bebas Neue, page title, accent word, location
 * (plan 6.4). Fonts are the OFL TTF files in src/assets/fonts, read once at
 * module load.
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fontsDir = join(process.cwd(), "src/assets/fonts");

async function loadFonts() {
  const [bebas, manrope] = await Promise.all([
    readFile(join(fontsDir, "bebas-neue-400.ttf")),
    readFile(join(fontsDir, "manrope-600.woff")),
  ]);
  return [
    { name: "Bebas Neue", data: bebas, style: "normal" as const, weight: 400 as const },
    { name: "Manrope", data: manrope, style: "normal" as const, weight: 600 as const },
  ];
}

type OgOptions = {
  /** Display lines, uppercase. */
  lines: readonly string[];
  /** Index of the accent-coloured line. */
  accentLine?: number;
  /** Small label above the title, e.g. the page name. */
  eyebrow?: string;
  /** "display" for two short uppercase lines; "title" wraps a sentence, for posts. */
  textSize?: "display" | "title";
};

export async function renderOgImage({
  lines,
  accentLine,
  eyebrow,
  textSize = "display",
}: OgOptions) {
  const isTitle = textSize === "title";
  const fonts = await loadFonts();
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#000000",
        color: "#FFFFFF",
        fontFamily: "Manrope",
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Bebas Neue",
            fontSize: 44,
            color: "#FFFFFF",
          }}
        >
          PA
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#B4BCC3",
          }}
        >
          {eyebrow ?? site.location}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {lines.map((line, index) => (
          <div
            key={line}
            style={{
              display: "flex",
              fontFamily: "Bebas Neue",
              fontSize: isTitle ? 92 : 148,
              lineHeight: isTitle ? 1.02 : 1,
              letterSpacing: isTitle ? -1 : -2,
              textTransform: "uppercase",
              width: "100%",
              color: index === accentLine ? "#FF6A00" : "#FFFFFF",
            }}
          >
            {line}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: "1px solid #2E3439",
          paddingTop: 24,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#FFFFFF" }}>{site.name}</div>
        <div style={{ display: "flex", fontSize: 22, color: "#B4BCC3" }}>
          {site.roles[0]} &middot; {site.location}
        </div>
      </div>
    </div>,
    { ...ogSize, fonts },
  );
}
