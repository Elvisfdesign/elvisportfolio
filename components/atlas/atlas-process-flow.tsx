import clsx from "clsx";
import type { AtlasWorkflowStep } from "@/content/atlas/project";

type AtlasProcessFlowProps = {
  steps: readonly AtlasWorkflowStep[];
  activeId?: string;
  className?: string;
};

/**
 * Editorial process sequence — one DOM tree, stacked on mobile / grid on lg+.
 */
export function AtlasProcessFlow({
  steps,
  activeId,
  className,
}: AtlasProcessFlowProps) {
  return (
    <ol
      className={clsx(
        "grid grid-cols-1 gap-0 border-t border-[var(--hairline)] lg:grid-cols-4 xl:grid-cols-8",
        className,
      )}
      role="list"
    >
      {steps.map((step, index) => {
        const active = activeId === step.id;
        return (
          <li
            key={step.id}
            className={clsx(
              "relative flex gap-6 border-b border-[var(--hairline)] py-6 lg:flex-col lg:gap-0 lg:border-b-0 lg:border-l lg:px-4 lg:py-8 lg:first:border-l-0 lg:first:pl-0",
              active && "bg-canvas-raised lg:bg-transparent",
            )}
          >
            <span
              className={clsx(
                "t-mono tabular",
                active ? "text-signal" : "text-ink-quiet",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1 lg:mt-4">
              <p
                className={clsx(
                  "font-display leading-snug t-subhead",
                  active ? "text-ink" : "text-ink",
                )}
              >
                {step.label}
              </p>
              {active ? (
                <p className="mt-2 t-mono text-[0.6875rem] text-signal tabular">
                  CURRENT&nbsp;STAGE
                </p>
              ) : null}
              {index < steps.length - 1 ? (
                <span
                  aria-hidden
                  className="mt-4 block t-mono text-ink-faint lg:absolute lg:-right-1.5 lg:top-8 lg:mt-0"
                >
                  <span className="lg:hidden">↓</span>
                  <span className="hidden lg:inline">→</span>
                </span>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
