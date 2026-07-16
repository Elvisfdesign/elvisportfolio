import clsx from "clsx";
import type { AtlasComponentCategory } from "@/content/atlas/project";
import { AtlasStatusBadge } from "@/components/atlas/atlas-status-badge";

type AtlasComponentMapProps = {
  categories: readonly AtlasComponentCategory[];
  className?: string;
};

export function AtlasComponentMap({
  categories,
  className,
}: AtlasComponentMapProps) {
  return (
    <ul
      className={clsx(
        "grid grid-cols-1 border-t border-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
      role="list"
      style={{ borderColor: "var(--hairline)" }}
    >
      {categories.map((cat) => (
        <li
          key={cat.id}
          className="flex flex-col gap-3 border-b border-[var(--hairline)] px-0 py-5 sm:border-r sm:px-5 sm:odd:pl-0 lg:[&:nth-child(4n)]:border-r-0 lg:[&:nth-child(4n+1)]:pl-0"
          style={{ borderColor: "var(--hairline)" }}
        >
          <span className="t-mono text-ink tabular">{cat.label.toUpperCase()}</span>
          <AtlasStatusBadge state={cat.state} />
        </li>
      ))}
    </ul>
  );
}
