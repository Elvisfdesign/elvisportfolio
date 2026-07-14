import clsx from "clsx";
import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
  /** Vertical breathing — landing acts use 'movement', case studies use 'beat'. */
  rhythm?: "movement" | "movementDense" | "beat" | "tight" | "editorial" | "none";
  /** Narrower eyebrow/header band → first heading (same hairline divider). */
  tightHeader?: boolean;
  /** Container width clamp. Defaults to 'outer' (1440px). */
  width?: "outer" | "reading" | "prose" | "full";
  className?: string;
  /** Optional editorial label (mono caption) rendered above content. */
  eyebrow?: string;
  /** Optional numbering for movements/beats. */
  number?: string;
  as?: "section" | "article" | "header" | "footer" | "div";
};

const rhythmClass: Record<NonNullable<SectionProps["rhythm"]>, string> = {
  movement: "py-28 md:py-48 lg:py-64",
  movementDense: "py-24 md:py-44 lg:py-56",
  /** Flagship doc pages (Atlas) — spacious but not cinematic dead air. */
  editorial: "py-16 md:py-24 lg:py-36",
  beat: "py-20 md:py-28 lg:py-32",
  tight: "py-12 md:py-16",
  none: "",
};

const widthStyle: Record<NonNullable<SectionProps["width"]>, string | undefined> = {
  outer: "var(--max-outer)",
  reading: "var(--max-reading)",
  prose: "var(--max-prose)",
  full: undefined,
};

/**
 * Editorial section primitive — handles rhythm, width clamp, gutter,
 * optional eyebrow + number metadata. The skeleton of every page.
 */
export function Section({
  children,
  id,
  rhythm = "movement",
  width = "outer",
  className,
  eyebrow,
  number,
  tightHeader = false,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={clsx(rhythmClass[rhythm], "relative px-[var(--gutter)]", className)}
      style={
        widthStyle[width]
          ? { maxWidth: widthStyle[width], marginInline: "auto" }
          : undefined
      }
    >
      {(eyebrow || number) && (
        <header
          className={clsx(
            "hairline-b flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2",
            tightHeader ? "mb-9 pb-3 md:mb-10" : "mb-12 pb-4",
          )}
        >
          {number && (
            <span className="t-mono text-ink-quiet tabular">{number}</span>
          )}
          {eyebrow && (
            <span className="t-mono text-ink-mute">{eyebrow}</span>
          )}
        </header>
      )}
      {children}
    </Tag>
  );
}
