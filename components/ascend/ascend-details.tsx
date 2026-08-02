import clsx from "clsx";
import type { ReactNode } from "react";

type AscendDetailsProps = {
  /** Summary label — always visible, controls disclosure state. */
  summary: ReactNode;
  children: ReactNode;
  /** Compact mono eyebrow above the summary. */
  eyebrow?: string;
  /** Open by default (rare — most detail blocks stay collapsed). */
  defaultOpen?: boolean;
  className?: string;
};

/**
 * Progressive-disclosure block — native `<details>` styled to match the
 * editorial system. Level-1 content lives in the chapter body; Level-2
 * process notes, links, and deeper explanations go here.
 *
 * Uses the native element specifically so:
 *   - Keyboard support (Space + Enter) works with zero JS.
 *   - Reduced-motion + no-JS environments still expose the content.
 *   - Screen readers announce the state automatically.
 *
 * The chevron rotation is a pure CSS transform on `[open]` (see globals.css)
 * so it respects `prefers-reduced-motion` via the global kill-switch.
 */
export function AscendDetails({
  summary,
  children,
  eyebrow,
  defaultOpen = false,
  className,
}: AscendDetailsProps) {
  return (
    <details
      open={defaultOpen}
      className={clsx(
        "ascend-details group rounded-sm border bg-canvas-raised",
        className,
      )}
      style={{ borderColor: "var(--hairline)" }}
    >
      <summary
        className={clsx(
          "ascend-details-summary flex cursor-pointer items-baseline justify-between gap-4",
          "px-5 py-4 md:px-6 md:py-5",
          "text-ink transition-colors duration-200 hover:text-ink",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
        )}
      >
        <span className="flex flex-col gap-1">
          {eyebrow ? (
            <span className="t-mono text-ink-quiet tabular">{eyebrow}</span>
          ) : null}
          <span className="t-subhead font-display text-ink">{summary}</span>
        </span>
        <span
          aria-hidden
          className="ascend-details-chevron shrink-0 t-mono text-ink-mute tabular"
        >
          ↓
        </span>
      </summary>
      <div
        className="border-t px-5 pb-5 pt-4 md:px-6 md:pb-6 md:pt-5"
        style={{ borderColor: "var(--hairline)" }}
      >
        <div className="t-body text-ink-mute leading-relaxed">{children}</div>
      </div>
    </details>
  );
}
