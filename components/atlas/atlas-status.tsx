import clsx from "clsx";
import type { AtlasStatusItem, AtlasStatusState } from "@/content/atlas/project";

const STATE_LABEL: Record<AtlasStatusState, string> = {
  Complete: "Complete",
  "In review": "In review",
  "In progress": "In progress",
  Next: "Next",
  Planned: "Planned",
};

function stateTone(state: AtlasStatusState) {
  switch (state) {
    case "Complete":
      return "text-ink";
    case "In review":
    case "In progress":
      return "text-signal";
    case "Next":
      return "text-ink-mute";
    default:
      return "text-ink-quiet";
  }
}

type AtlasStatusProps = {
  items: readonly AtlasStatusItem[];
  lastUpdated: string;
  statusLabel: string;
  className?: string;
};

export function AtlasStatus({
  items,
  lastUpdated,
  statusLabel,
  className,
}: AtlasStatusProps) {
  return (
    <div
      className={clsx(
        "rounded-sm border bg-canvas-raised p-6 md:p-8",
        className,
      )}
      style={{ borderColor: "var(--hairline)" }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="inline-flex items-center gap-2 t-mono text-ink-mute tabular">
          <span className="dot-live" aria-hidden />
          {statusLabel}
        </p>
        <p className="t-mono text-ink-faint tabular">
          Last&nbsp;updated&nbsp;{lastUpdated}
        </p>
      </div>

      <ul className="mt-8 space-y-0" role="list">
        {items.map((item) => (
          <li
            key={item.label}
            className="hairline-t flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-4 first:border-t-0 first:pt-0"
          >
            <span className="t-body text-ink">{item.label}</span>
            <span
              className={clsx(
                "t-mono tabular",
                stateTone(item.state),
              )}
            >
              {STATE_LABEL[item.state]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
