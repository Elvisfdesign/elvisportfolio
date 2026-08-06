"use client";

import Image from "next/image";
import clsx from "clsx";

type ThemeAwareImageProps = {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  /** Applied to the positioning wrapper (defaults to fill parent). */
  className?: string;
  /** Extra classes on both `<Image>` elements. */
  imageClassName?: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
};

/**
 * Theme-aware raster preview.
 *
 * Both assets render; visibility follows `<html data-theme>` — the same
 * source of truth as ThemeProvider / the inline theme-init script — so
 * light, dark, and Auto (system) swap without hydration flash or a
 * duplicate matchMedia listener.
 *
 * Uses opacity/visibility (not display:none) so Next/Image `fill` layout
 * stays intact in both theme states.
 */
export function ThemeAwareImage({
  lightSrc,
  darkSrc,
  alt,
  className,
  imageClassName,
  sizes = "100vw",
  quality = 92,
  priority = false,
}: ThemeAwareImageProps) {
  const shared = clsx(
    "theme-aware-image absolute inset-0 h-full w-full",
    imageClassName,
  );

  return (
    <div className={clsx("theme-aware-image-root absolute inset-0", className)}>
      <Image
        src={lightSrc}
        alt={`${alt} (Light theme.)`}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        className={clsx(shared, "theme-aware-image--light")}
      />
      <Image
        src={darkSrc}
        alt={`${alt} (Dark theme.)`}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        className={clsx(shared, "theme-aware-image--dark")}
      />
    </div>
  );
}
