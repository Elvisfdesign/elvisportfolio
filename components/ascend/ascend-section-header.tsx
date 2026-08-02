import clsx from "clsx";
import type { ReactNode } from "react";

type AscendSectionHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  /** Optional level. `h2` (default) for chapter headers, `h3` for sub-sections. */
  level?: "h2" | "h3";
  /** DOM id — pairs with `<Section id>` so the chapter nav can anchor here. */
  id?: string;
  className?: string;
};

/**
 * Chapter title + supporting summary. Sits under a `Section` that already
 * owns the eyebrow / number / hairline chrome.
 *
 * Kept intentionally close to AtlasSectionHeader so the two flagship case
 * studies feel like siblings — ASCEND diverges only where the brand asks
 * for a warmer accent, which lives inside the individual chapter bodies.
 */
export function AscendSectionHeader({
  title,
  description,
  level = "h2",
  id,
  className,
}: AscendSectionHeaderProps) {
  const HeadingTag = level;
  return (
    <div className={clsx("max-w-[40rem]", className)}>
      <HeadingTag
        id={id}
        className="t-display-m font-display text-ink text-balance"
      >
        {title}
      </HeadingTag>
      {description ? (
        <p className="mt-6 max-w-prose t-body-l text-ink-mute leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
