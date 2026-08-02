import clsx from "clsx";
import type { ReactNode } from "react";

type AscendIntroProps = {
  /** Compact eyebrow — mono, uppercase (e.g. "OVERVIEW"). */
  eyebrow?: string;
  /** Serif display headline. */
  title: ReactNode;
  /** Body copy (Level 1 — scannable). */
  children: ReactNode;
  className?: string;
};

/**
 * Chapter intro — used at the top of narrative chapters that need a
 * paragraph or two of copy before galleries, metrics, or comparisons.
 *
 * Kept as a distinct primitive (rather than reusing AscendSectionHeader)
 * because intro copy tends to be longer and reads like editorial body
 * rather than a section summary.
 */
export function AscendIntro({
  eyebrow,
  title,
  children,
  className,
}: AscendIntroProps) {
  return (
    <div className={clsx("max-w-[46rem]", className)}>
      {eyebrow ? (
        <p className="t-mono text-ink-quiet tabular">{eyebrow}</p>
      ) : null}
      <h2
        className={clsx(
          "t-display-m font-display text-ink text-balance",
          eyebrow ? "mt-4" : undefined,
        )}
      >
        {title}
      </h2>
      <div className="mt-6 t-body-l text-ink-mute leading-relaxed [&_p+p]:mt-4">
        {children}
      </div>
    </div>
  );
}
