import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";

export type EditorialArrow = "none" | "forward" | "down" | "up" | "external";
export type EditorialTone = "ink" | "mute" | "quiet";

type EditorialTextLinkProps = {
  href: string;
  /** Visible label. Prefer plain text so the underline matches the interactive width. */
  label: ReactNode;
  ariaLabel?: string;
  arrow?: EditorialArrow;
  tone?: EditorialTone;
  /** Label type scale. Mono is the editorial default; subhead suits contact rows. */
  size?: "mono" | "subhead";
  /**
   * Force external `<a target="_blank">`. Defaults to true for http(s), mailto,
   * and `arrow="external"`.
   */
  external?: boolean;
  className?: string;
};

const ARROW_GLYPH: Record<Exclude<EditorialArrow, "none">, string> = {
  forward: "→",
  down: "↓",
  up: "↑",
  external: "↗",
};

function resolveExternal(
  href: string,
  external: boolean | undefined,
  arrow: EditorialArrow,
): boolean {
  if (external != null) return external;
  if (arrow === "external") return true;
  if (href.startsWith("mailto:")) return true;
  if (href.startsWith("http://") || href.startsWith("https://")) return true;
  return false;
}

/**
 * Shared editorial / resource text link.
 *
 * Outer element owns the touch target; the underline rides the inner label so
 * tall hit areas never push the line far below the text. Arrow motion follows
 * direction (→ right, ↓ down, ↗ up-right, ↑ up).
 */
export function EditorialTextLink({
  href,
  label,
  ariaLabel,
  arrow = "none",
  tone = "ink",
  size = "mono",
  external,
  className,
}: EditorialTextLinkProps) {
  const isExternal = resolveExternal(href, external, arrow);
  const glyph = arrow === "none" ? null : ARROW_GLYPH[arrow];

  const classes = clsx(
    "editorial-text-link inline-flex min-h-11 items-center touch-manipulation",
    className,
  );

  const inner = (
    <span
      className={clsx(
        "editorial-text-link-label leading-none",
        size === "subhead" ? "t-subhead" : "t-mono tabular",
        `editorial-text-link-label--${tone}`,
      )}
    >
      {label}
      {glyph ? (
        <span
          aria-hidden
          className={clsx(
            "editorial-text-link-icon",
            `editorial-text-link-icon--${arrow}`,
          )}
        >
          &nbsp;{glyph}
        </span>
      ) : null}
    </span>
  );

  if (isExternal) {
    const newTab = !href.startsWith("mailto:");
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(newTab
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {inner}
    </Link>
  );
}
