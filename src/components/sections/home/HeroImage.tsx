"use client";

/**
 * HeroImage: art-directed LCP image for the home hero.
 *
 * One <picture> element serves the portrait crop under 768px and the
 * landscape crop from 768px up, so a phone never downloads the desktop
 * file. Each source gets its own media-scoped preload so the browser
 * starts the right one from the document head. Failure falls back to a
 * flat surface, and the placeholder label is shown while the asset is a
 * stock stand-in, matching SmartImage.
 */
import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { useState } from "react";
import type { ImageAsset } from "@/types/content";

const DESKTOP_MEDIA = "(min-width: 768px)";
const MOBILE_MEDIA = "(max-width: 767px)";

type HeroImageProps = {
  desktop: ImageAsset;
  mobile: ImageAsset;
};

export function HeroImage({ desktop, mobile }: HeroImageProps) {
  const [failed, setFailed] = useState(false);

  const common = {
    alt: desktop.alt,
    sizes: "100vw",
    loading: "eager" as const,
    fetchPriority: "high" as const,
  };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    src: desktop.src,
    width: desktop.width,
    height: desktop.height,
    quality: 75,
    sizes: "60vw",
  });
  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({
    ...common,
    src: mobile.src,
    width: mobile.width,
    height: mobile.height,
    quality: 60,
  });

  // Media-scoped preloads: only the matching source is fetched early.
  preload(desktop.src, {
    as: "image",
    imageSrcSet: desktopSrcSet,
    imageSizes: "60vw",
    media: DESKTOP_MEDIA,
    fetchPriority: "high",
  });
  preload(mobile.src, {
    as: "image",
    imageSrcSet: mobileSrcSet,
    imageSizes: "100vw",
    media: MOBILE_MEDIA,
    fetchPriority: "high",
  });

  if (failed) {
    return (
      <div role="img" aria-label={desktop.alt} className="absolute inset-0 bg-ink" />
    );
  }

  return (
    <>
      <picture className="absolute inset-0 block">
        <source media={DESKTOP_MEDIA} srcSet={desktopSrcSet} sizes="60vw" />
        <source media={MOBILE_MEDIA} srcSet={mobileSrcSet} sizes="100vw" />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is spread from imgProps */}
        <img
          {...imgProps}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover [object-position:var(--pos-mobile)] md:[object-position:var(--pos-desktop)]"
          style={
            {
              "--pos-mobile": mobile.position ?? "50% 50%",
              "--pos-desktop": desktop.position ?? "50% 50%",
            } as React.CSSProperties
          }
        />
      </picture>
      {(desktop.placeholder || mobile.placeholder) && (
        <span
          aria-hidden="true"
          className="type-eyebrow pointer-events-none absolute top-3 left-3 bg-black/75 px-2 py-1 text-on-dark md:hidden"
        >
          Placeholder image
        </span>
      )}
    </>
  );
}
