import clsx from "clsx";
import type { ReactNode } from "react";

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
};

type AscendGalleryProps = {
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
 * Placeholder tiles use `--stub-bg-screen` (theme-aware) with a soft gold
 * eyebrow inside so the ASCEND accent shows through even before the real
 * screenshots ship. Aspect-ratio containers keep the layout stable when
 * images finally drop in — no reflow.
 *
 * A lightbox is intentionally deferred to a later phase; when the images
 * are ready we can adapt AtlasScreenGallery for ASCEND.
 */
export function AscendGallery({
  header,
  items,
  columns = 2,
  className,
}: AscendGalleryProps) {
  return (
    <figure className={clsx("m-0", className)}>
      {header ? (
        <figcaption className="mb-6 t-mono text-ink-quiet tabular">
          {header}
        </figcaption>
      ) : null}
      <ul
        className={clsx(
          "grid grid-cols-1 gap-4 md:gap-6",
          columnsClass[columns],
        )}
        role="list"
      >
        {items.map((item) => (
          <li
            key={item.id}
            className={clsx(
              aspectClass[item.aspect ?? "4/3"],
              "relative overflow-hidden rounded-sm border",
            )}
            style={{
              borderColor: "var(--hairline)",
              background: "var(--stub-bg-screen)",
            }}
          >
            {item.imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.imageSrc}
                alt={item.alt ?? item.label}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
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
            )}
          </li>
        ))}
      </ul>
    </figure>
  );
}
