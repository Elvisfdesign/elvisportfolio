"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import {
  AscendChapterGallery,
  AscendGalleryImage,
  type AscendGalleryImageItem,
} from "@/components/ascend/ascend-chapter-gallery";

export type AscendGalleryItem = {
  id: string;
  label: string;
  caption?: string;
  /** Aspect ratio for the placeholder tile. Defaults to `4/3`. */
  aspect?: "16/9" | "4/3" | "3/2" | "1/1" | "3/4" | "9/16";
  /**
   * When the image is available, provide the src (relative to `/public`).
   * When absent, an editorial placeholder tile with the item's label is
   * rendered instead — Phase-1-honest.
   */
  imageSrc?: string;
  /** Explicit alt copy — required whenever `imageSrc` is set. */
  alt?: string;
  width?: number;
  height?: number;
};

type AscendGalleryProps = {
  /**
   * Chapter / gallery group id. Images that share this id browse together
   * in the lightbox. Examples: `"brand"`, `"architecture"`, `"product"`.
   */
  galleryId?: string;
  /** Gallery header / caption (optional). */
  header?: ReactNode;
  items: readonly AscendGalleryItem[];
  /** Column count on `md+`. Defaults to `2`. */
  columns?: 1 | 2 | 3;
  className?: string;
};

const aspectClass: Record<NonNullable<AscendGalleryItem["aspect"]>, string> = {
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
  "9/16": "aspect-[9/16]",
};

const aspectRatioCss: Record<
  NonNullable<AscendGalleryItem["aspect"]>,
  string
> = {
  "16/9": "16 / 9",
  "4/3": "4 / 3",
  "3/2": "3 / 2",
  "1/1": "1 / 1",
  "3/4": "3 / 4",
  "9/16": "9 / 16",
};

const columnsClass: Record<NonNullable<AscendGalleryProps["columns"]>, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

/**
 * Gallery scaffold — accepts real images when available, otherwise renders
 * editorial placeholder tiles so the visual hierarchy doesn't collapse
 * while the case study is being written.
 *
 * Real images (with `imageSrc`) automatically join the shared ASCEND
 * lightbox via AscendChapterGallery. Pass `galleryId` so each chapter’s
 * images stay in their own browse sequence.
 */
export function AscendGallery({
  galleryId = "gallery",
  header,
  items,
  columns = 2,
  className,
}: AscendGalleryProps) {
  const lightboxItems: AscendGalleryImageItem[] = items.flatMap((item) => {
    if (!item.imageSrc) return [];
    return [
      {
        id: item.id,
        src: item.imageSrc,
        alt: item.alt ?? item.label,
        width: item.width ?? 1600,
        height: item.height ?? 1200,
        label: item.label,
        caption: item.caption,
      },
    ];
  });

  const lightboxIndexById = new Map(
    lightboxItems.map((item, index) => [item.id, index]),
  );

  const grid = (
    <ul
      className={clsx(
        "grid grid-cols-1 gap-4 md:gap-6",
        columnsClass[columns],
      )}
      role="list"
    >
      {items.map((item) => {
        const lightboxIndex = lightboxIndexById.get(item.id);
        const hasImage = lightboxIndex !== undefined;

        return (
          <li key={item.id} className="min-w-0">
            {hasImage ? (
              <AscendGalleryImage
                index={lightboxIndex}
                sizes="(min-width: 768px) 40vw, 100vw"
                aspectRatio={aspectRatioCss[item.aspect ?? "4/3"]}
                framePaddingClassName="p-0"
                className={clsx(aspectClass[item.aspect ?? "4/3"])}
              />
            ) : (
              <div
                className={clsx(
                  aspectClass[item.aspect ?? "4/3"],
                  "relative overflow-hidden rounded-sm border",
                )}
                style={{
                  borderColor: "var(--hairline)",
                  background: "var(--stub-bg-screen)",
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-between p-5">
                  <span className="t-mono text-[var(--ascend-gold)] tabular">
                    {item.label}
                  </span>
                  {item.caption ? (
                    <span className="t-mono text-ink-faint tabular">
                      {item.caption}
                    </span>
                  ) : null}
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <figure className={clsx("m-0", className)}>
      {header ? (
        <figcaption className="mb-6 t-mono text-ink-quiet tabular">
          {header}
        </figcaption>
      ) : null}

      {lightboxItems.length > 0 ? (
        <AscendChapterGallery galleryId={galleryId} items={lightboxItems}>
          {grid}
        </AscendChapterGallery>
      ) : (
        grid
      )}
    </figure>
  );
}
