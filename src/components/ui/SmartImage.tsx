"use client";

/**
 * SmartImage: next/image with two guarantees.
 *
 *   1. If the file fails to load, a flat surface with the alt text replaces
 *      it, so a broken remote image never leaves a hole or a browser icon.
 *   2. While `asset.placeholder` is true, a small "Placeholder image" label
 *      is shown so stock photographs are never mistaken for real ones.
 *
 * Pass `fill` to cover a sized parent, otherwise intrinsic width and height
 * from the asset are used. The wrapper has a neutral background so there is
 * no flash while the image decodes.
 */
import Image from "next/image";
import { useState } from "react";
import type { ImageAsset } from "@/types/content";
import { cn } from "@/lib/cn";

type SmartImageProps = {
  asset: ImageAsset;
  /** Cover a positioned parent instead of using intrinsic size. */
  fill?: boolean;
  /** Required for responsive images; describes the rendered width per breakpoint. */
  sizes: string;
  /** True for the LCP image only. */
  preload?: boolean;
  className?: string;
  imgClassName?: string;
  quality?: 60 | 75 | 85;
  /** Hide the placeholder label, for example on tiny thumbnails. Alt text still carries it. */
  hideBadge?: boolean;
};

export function SmartImage({
  asset,
  fill = false,
  sizes,
  preload = false,
  className,
  imgClassName,
  quality = 75,
  hideBadge = false,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  const wrapperClasses = cn(
    "relative overflow-hidden bg-line/40",
    fill ? "h-full w-full" : "w-full",
    className,
  );

  if (failed) {
    return (
      <div
        role="img"
        aria-label={asset.alt}
        className={cn(wrapperClasses, "flex items-end p-4")}
        style={fill ? undefined : { aspectRatio: `${asset.width} / ${asset.height}` }}
      >
        <span className="type-small text-fg-muted">
          {asset.alt || "Image unavailable"}
        </span>
      </div>
    );
  }

  return (
    <div className={wrapperClasses}>
      <Image
        src={asset.src}
        alt={asset.alt}
        width={fill ? undefined : asset.width}
        height={fill ? undefined : asset.height}
        fill={fill}
        sizes={sizes}
        quality={quality}
        preload={preload}
        loading={preload ? "eager" : "lazy"}
        fetchPriority={preload ? "high" : "auto"}
        onError={() => setFailed(true)}
        style={{ objectFit: "cover", objectPosition: asset.position ?? "50% 50%" }}
        className={cn(fill ? "" : "h-auto w-full", imgClassName)}
      />
      {asset.placeholder && !hideBadge && <PlaceholderBadge />}
    </div>
  );
}

/** Small corner label. Contrast: on-dark text over 75% black. */
function PlaceholderBadge() {
  return (
    <span
      aria-hidden="true"
      className="type-eyebrow pointer-events-none absolute top-3 left-3 bg-black/75 px-2 py-1 text-on-dark"
    >
      Placeholder image
    </span>
  );
}
