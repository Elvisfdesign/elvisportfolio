import clsx from "clsx";
import type { AtlasWorkspaceEntry } from "@/content/atlas/project";

type AtlasWorkspaceProps = {
  entries: readonly AtlasWorkspaceEntry[];
  className?: string;
};

const ROLE_LABEL: Record<AtlasWorkspaceEntry["role"], string> = {
  package: "PACKAGE",
  app: "APP",
};

/**
 * Two-card monorepo diagram: `packages/atlas-ui` (design system) and
 * `apps/atlas-intelligence` (product). Keeps the technical split readable
 * for designers and recruiters — same border/inset language as foundations.
 */
export function AtlasWorkspace({ entries, className }: AtlasWorkspaceProps) {
  return (
    <ul
      className={clsx(
        "grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6",
        className,
      )}
      role="list"
      aria-label="Atlas monorepo"
    >
      {entries.map((entry) => (
        <li
          key={entry.path}
          className="rounded-sm border bg-canvas-raised p-6 md:p-7"
          style={{ borderColor: "var(--hairline)" }}
        >
          <div className="flex items-baseline justify-between gap-3">
            <code
              className="t-mono text-ink tabular"
              aria-label={`Path ${entry.path}`}
            >
              {entry.path}
            </code>
            <span className="t-mono text-[0.6875rem] text-ink-quiet tabular">
              {ROLE_LABEL[entry.role]}
            </span>
          </div>
          <p className="mt-4 t-body text-ink-mute leading-relaxed">
            {entry.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
