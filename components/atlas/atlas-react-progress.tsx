import clsx from "clsx";
import type { AtlasProgressGroups } from "@/content/atlas/project";
import { AtlasStatusBadge } from "@/components/atlas/atlas-status-badge";

type AtlasReactProgressProps = {
  progress: AtlasProgressGroups;
  className?: string;
};

const GROUPS = [
  { key: "completed" as const, state: "Complete" as const, title: "Completed" },
  {
    key: "inProgress" as const,
    state: "In progress" as const,
    title: "In progress",
  },
  { key: "next" as const, state: "Next" as const, title: "Next" },
];

export function AtlasReactProgress({
  progress,
  className,
}: AtlasReactProgressProps) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-10",
        className,
      )}
    >
      {GROUPS.map((group) => (
        <div key={group.key}>
          <div className="flex items-baseline justify-between gap-3 hairline-b pb-3">
            <h3 className="t-mono text-ink tabular">{group.title.toUpperCase()}</h3>
            <AtlasStatusBadge state={group.state} />
          </div>
          <ul className="mt-4 space-y-3" role="list">
            {progress[group.key].map((item) => (
              <li key={item.label} className="t-body text-ink-mute">
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
