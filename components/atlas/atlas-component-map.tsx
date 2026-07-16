import clsx from "clsx";
import type { AtlasComponentCategory } from "@/content/atlas/project";
import { AtlasStatusBadge } from "@/components/atlas/atlas-status-badge";

type AtlasComponentMapProps = {
  categories: readonly AtlasComponentCategory[];
  className?: string;
};

/**
 * Implementation status map — borders define the grid; equal cell insets
 * keep labels clear of every rule.
 */
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
          className={clsx(
            "flex flex-col gap-4",
            "border-b border-[var(--hairline)]",
            /* Consistent inset on every side — no first-column pl-0 exceptions. */
            "px-6 py-6 sm:border-r sm:px-6 sm:py-7 lg:px-7",
            "lg:[&:nth-child(4n)]:border-r-0",
            "sm:max-lg:[&:nth-child(2n)]:border-r-0",
          )}
          style={{ borderColor: "var(--hairline)" }}
        >
          <span className="t-mono text-ink tabular">
            {cat.label.toUpperCase()}
          </span>
          <AtlasStatusBadge state={cat.state} />
        </li>
      ))}
    </ul>
  );
}
