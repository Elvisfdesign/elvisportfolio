import clsx from "clsx";
import type { AtlasStatusState } from "@/content/atlas/project";

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

type AtlasStatusBadgeProps = {
  state: AtlasStatusState;
  className?: string;
};

export function AtlasStatusBadge({ state, className }: AtlasStatusBadgeProps) {
  return (
    <span
      className={clsx("t-mono text-[0.6875rem] tabular", stateTone(state), className)}
    >
      {STATE_LABEL[state].toUpperCase()}
    </span>
  );
}

export { STATE_LABEL, stateTone };
