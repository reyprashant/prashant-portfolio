/**
 * Global MDX element mapping (required by @next/mdx in the App Router).
 *
 * Headings, paragraphs and lists take their type from .prose-site in
 * globals.css. Links use next/link for internal paths and open external
 * ones in a new tab. Images go through next/image: give each a width and
 * height in the MDX (<img src width height alt />) for zero layout shift,
 * or use markdown syntax and accept the 3:2 default until it loads.
 *
 * <Figure image="periodicalQuantum" caption="..." /> renders an entry from
 * src/data/images.ts with a caption; no import is needed in the MDX file.
 */
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { images, type ImageKey } from "@/data/images";

function Anchor({ href = "", children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const internal = href.startsWith("/") || href.startsWith("#");
  if (internal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}

function Img({ src = "", alt = "", width, height }: ImgHTMLAttributes<HTMLImageElement>) {
  const w = Number(width) || 1440;
  const h = Number(height) || 960;
  return (
    <Image
      src={typeof src === "string" ? src : ""}
      alt={alt}
      width={w}
      height={h}
      sizes="(min-width: 768px) 720px, 100vw"
      style={{ width: "100%", height: "auto" }}
    />
  );
}

/** A captioned image from the central image registry. Narrow (portrait) files sit at a smaller width. */
function Figure({ image, caption }: { image: ImageKey; caption?: string }) {
  const asset = images[image];
  const portrait = asset.height > asset.width;
  return (
    <figure className={portrait ? "mx-auto max-w-md" : undefined}>
      <SmartImage asset={asset} sizes="(min-width: 768px) 720px, 100vw" />
      {caption && (
        <figcaption className="type-small mt-3 text-fg-muted">{caption}</figcaption>
      )}
    </figure>
  );
}

const components: MDXComponents = {
  a: Anchor,
  img: Img,
  Figure,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
