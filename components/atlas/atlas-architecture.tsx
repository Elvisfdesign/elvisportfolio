import clsx from "clsx";

type AtlasArchitectureProps = {
  steps: readonly string[];
  className?: string;
};

/** Minimal editorial architecture diagram for Atlas. */
export function AtlasArchitecture({ steps, className }: AtlasArchitectureProps) {
  return (
    <ol
      className={clsx("max-w-md space-y-0", className)}
      role="list"
      aria-label="Atlas architecture"
    >
      {steps.map((step, index) => (
        <li key={step} className="flex flex-col">
          <div
            className="rounded-sm border px-5 py-4"
            style={{ borderColor: "var(--hairline)" }}
          >
            <span className="t-mono text-ink-quiet tabular">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 t-subhead font-display text-ink leading-snug">
              {step}
            </p>
          </div>
          {index < steps.length - 1 ? (
            <span
              aria-hidden
              className="flex justify-center py-2 t-mono text-ink-faint"
            >
              ↓
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
