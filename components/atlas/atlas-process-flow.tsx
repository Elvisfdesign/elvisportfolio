import clsx from "clsx";
import type { AtlasWorkflowStep } from "@/content/atlas/project";

type AtlasProcessFlowProps = {
  steps: readonly AtlasWorkflowStep[];
  className?: string;
};

/**
 * Editorial process sequence — stacked on mobile, six-column on large screens.
 */
export function AtlasProcessFlow({ steps, className }: AtlasProcessFlowProps) {
  return (
    <ol className={clsx("space-y-0 lg:hidden", className)} role="list">
      {steps.map((step, index) => (
        <li
          key={step.id}
          className="hairline-t flex gap-6 py-6 first:border-t-0 first:pt-0"
        >
          <span className="t-mono text-ink-quiet tabular">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1">
            <p className="t-subhead font-display text-ink leading-snug">
              {step.label}
            </p>
            {index < steps.length - 1 ? (
              <span aria-hidden className="mt-4 block t-mono text-ink-faint">
                ↓
              </span>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function AtlasProcessFlowDesktop({
  steps,
  className,
}: AtlasProcessFlowProps) {
  return (
    <ol
      className={clsx(
        "hidden grid-cols-6 gap-0 border-t border-[var(--hairline)] pt-10 lg:grid",
        className,
      )}
      role="list"
    >
      {steps.map((step, index) => (
        <li
          key={step.id}
          className="relative border-l border-[var(--hairline)] px-4 first:border-l-0 first:pl-0"
        >
          <span className="t-mono text-ink-quiet tabular">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="mt-4 t-body font-display text-ink leading-snug">
            {step.label}
          </p>
          {index < steps.length - 1 ? (
            <span
              aria-hidden
              className="absolute -right-1.5 top-0 t-mono text-ink-faint"
            >
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
