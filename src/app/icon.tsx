/**
 * Favicon generated from the temporary PA monogram. Replace with the real
 * mark (app/icon.svg) when supplied.
 */
import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000000",
        color: "#FF6A00",
        fontSize: 34,
        fontWeight: 700,
        letterSpacing: -1,
        fontFamily: "Arial Narrow, Arial, sans-serif",
      }}
    >
      PA
    </div>,
    size,
  );
}
