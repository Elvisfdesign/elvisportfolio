import clsx from "clsx";
import type { AscendEcosystemNode } from "@/content/ascend/project";

type AscendEcosystemStripProps = {
  nodes: readonly AscendEcosystemNode[];
  className?: string;
};

/**
 * Ecosystem chip strip — communicates that ASCEND spans more than one
 * screen (Brand → Marketing → Product → System → Code).
 *
 * Rendered as a horizontal row: mono chip · gold arrow · mono chip. On
 * narrow viewports the strip becomes scrollable so nothing wraps mid-arrow.
 * Purely visual — the site's real navigation lives elsewhere.
 */
export function AscendEcosystemStrip({
  nodes,
  className,
}: AscendEcosystemStripProps) {
  return (
    <ol
      role="list"
      aria-label="ASCEND ecosystem"
      className={clsx(
        "flex items-center gap-3 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {nodes.map((node, i) => (
        <li key={node.id} className="flex items-center gap-3">
          <span className="t-mono text-ink tabular">{node.label}</span>
          {i < nodes.length - 1 ? (
            <span
              aria-hidden
              className="t-mono tabular"
              style={{ color: "var(--ascend-gold)" }}
            >
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
