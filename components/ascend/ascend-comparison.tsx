import clsx from "clsx";
import type { ReactNode } from "react";

export type AscendComparisonPane = {
  id: string;
  eyebrow: string;
  title?: ReactNode;
  body: ReactNode;
  /** Optional image below the body (rendered inside a hairline frame). */
  imageSrc?: string;
  imageAlt?: string;
};

type AscendComparisonProps = {
  /** Two-item comparison — before/after, product/system, etc. */
  left: AscendComparisonPane;
  right: AscendComparisonPane;
  className?: string;
};

/**
 * Two-column comparison. Panes are peers (equal weight, equal width on
 * `md+`), separated by a hairline rule. On mobile the panes stack with
 * a hairline divider between them so the relationship is still legible.
 *
 * Use for design-decision moments: before-after, options-considered,
 * product-vs-marketing, etc. Not for arbitrary two-image galleries — use
 * `AscendGallery` with `columns={2}` for that.
 */
export function AscendComparison({
  left,
  right,
  className,
}: AscendComparisonProps) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 md:grid-cols-2",
        "gap-8 md:gap-0",
        "hairline-y md:border-y-0",
        className,
      )}
    >
      <ComparisonPane pane={left} side="left" />
      <ComparisonPane pane={right} side="right" />
    </div>
  );
}

function ComparisonPane({
  pane,
  side,
}: {
  pane: AscendComparisonPane;
  side: "left" | "right";
}) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-6",
        side === "right"
          ? "md:border-l md:pl-8 lg:pl-10"
          : "md:pr-8 lg:pr-10",
        "py-8 md:py-10",
      )}
      style={side === "right" ? { borderColor: "var(--hairline)" } : undefined}
    >
      <p className="t-mono text-ink-quiet tabular">{pane.eyebrow}</p>
      {pane.title ? (
        <h3 className="t-heading font-display text-ink text-balance">
          {pane.title}
        </h3>
      ) : null}
      <div className="t-body text-ink-mute leading-relaxed">{pane.body}</div>
      {pane.imageSrc ? (
        <div
          className="mt-2 aspect-[4/3] overflow-hidden rounded-sm border"
          style={{ borderColor: "var(--hairline)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pane.imageSrc}
            alt={pane.imageAlt ?? ""}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}
    </div>
  );
}
