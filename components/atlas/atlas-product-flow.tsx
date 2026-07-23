import clsx from "clsx";
import type { AtlasProductFlowStep } from "@/content/atlas/project";

type AtlasProductFlowProps = {
  steps: readonly AtlasProductFlowStep[];
  className?: string;
};

/**
 * End-to-end product journey — a compact chained list that flows top-to-bottom
 * on mobile and wraps horizontally on wider viewports. Reuses hairline rules
 * and mono numbering so it slots into the existing Atlas editorial rhythm.
 */
export function AtlasProductFlow({ steps, className }: AtlasProductFlowProps) {
  return (
    <ol
      className={clsx(
        "grid grid-cols-1 gap-0 border-t border-[var(--hairline)]",
        "sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
      role="list"
      aria-label="End-to-end review workflow"
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li
            key={step.id}
            className={clsx(
              /* min-w-0: let long labels wrap inside the cell */
              "relative min-w-0",
              "flex flex-col gap-4",
              "border-b border-[var(--hairline)]",
              "px-5 py-6 sm:px-6 sm:py-7 lg:px-7 lg:py-8",
              "sm:border-r sm:[&:nth-child(2n)]:border-r-0",
              "lg:border-r lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0",
              "lg:[&:nth-child(n+5)]:border-t",
            )}
            style={{ borderColor: "var(--hairline)" }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="t-mono text-ink-quiet tabular">
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
          </li>
        );
      })}
    </ol>
  );
}
