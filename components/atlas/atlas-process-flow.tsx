import clsx from "clsx";
import type { AtlasWorkflowStep } from "@/content/atlas/project";

type AtlasProcessFlowProps = {
  steps: readonly AtlasWorkflowStep[];
  activeId?: string;
  className?: string;
};

/**
 * Editorial process sequence.
 * Desktop uses a 4-column × 2-row grid (not 8 skinny columns) so titles
 * wrap inside each cell and never cross vertical dividers.
 */
export function AtlasProcessFlow({
  steps,
  activeId,
  className,
}: AtlasProcessFlowProps) {
  return (
    <ol
      className={clsx(
        "grid grid-cols-1 gap-0 border-t border-[var(--hairline)]",
        "sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
      role="list"
    >
      {steps.map((step, index) => {
        const active = activeId === step.id;
        const isLast = index === steps.length - 1;

        return (
          <li
            key={step.id}
            className={clsx(
              /* min-w-0: allow grid items to shrink so long words wrap
                 instead of overflowing into the next column. */
              "relative min-w-0",
              "flex flex-col gap-4",
              "border-b border-[var(--hairline)]",
              "px-5 py-6 sm:px-6 sm:py-7 lg:px-7 lg:py-8",
              /* Column rules — clear at end of each row. */
              "sm:border-r sm:[&:nth-child(2n)]:border-r-0",
              "lg:border-r lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0",
              /* Top rule between the two desktop rows. */
              "lg:[&:nth-child(n+5)]:border-t",
              active && "bg-canvas-raised",
            )}
            style={{ borderColor: "var(--hairline)" }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <span
                className={clsx(
                  "t-mono tabular",
                  active ? "text-signal" : "text-ink-quiet",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {!isLast ? (
                <span
                  aria-hidden
                  className="t-mono text-ink-faint tabular"
                >
                  <span className="sm:hidden">↓</span>
                  <span className="hidden sm:inline">→</span>
                </span>
              ) : null}
            </div>

            <p className="t-body font-display leading-snug text-ink break-words">
              {step.label}
            </p>

            {active ? (
              <p className="t-mono text-[0.6875rem] text-signal tabular">
                CURRENT&nbsp;STAGE
              </p>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
