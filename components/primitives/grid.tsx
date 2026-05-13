import clsx from "clsx";
import type { ReactNode, CSSProperties } from "react";

type GridProps = {
  children: ReactNode;
  className?: string;
  /** Column count at desktop. Default 12. */
  cols?: 12 | 6 | 4;
  /** Override gap. Defaults to gutter var. */
  gap?: string;
  style?: CSSProperties;
};

/**
 * 12 / 6 / 4 column responsive grid. Asymmetric layouts are built
 * by passing GridSpan children with `start` and `span` props.
 */
export function Grid({
  children,
  className,
  cols = 12,
  gap = "var(--gutter)",
  style,
}: GridProps) {
  return (
    <div
      className={clsx("grid", className)}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

type GridSpanProps = {
  children: ReactNode;
  /** Span at desktop (1-12). */
  span?: number;
  /** Column start at desktop (1-13). */
  start?: number;
  /** Span on tablet (defaults to span). */
  spanMd?: number;
  /** Span on mobile (defaults to full). */
  spanSm?: number;
  className?: string;
  style?: CSSProperties;
};

export function GridSpan({
  children,
  span = 12,
  start,
  spanMd,
  spanSm,
  className,
  style,
}: GridSpanProps) {
  const desktopSpan = `span ${span}`;
  const tabletSpan = `span ${spanMd ?? Math.min(span, 6)}`;
  const mobileSpan = `span ${spanSm ?? 4}`;

  return (
    <div
      className={clsx(className)}
      style={{
        gridColumn: start ? `${start} / span ${span}` : desktopSpan,
        ...style,
        // CSS variables drive responsive overrides via media-query selectors
        // applied through utility classes (keeps logic out of inline style).
        ["--col-md" as string]: tabletSpan,
        ["--col-sm" as string]: mobileSpan,
      }}
    >
      {children}
    </div>
  );
}
