import clsx from "clsx";
import type { ReactNode } from "react";

type ArtifactSurfaceProps = {
  children: ReactNode;
  /** Tag the surface (e.g. "PROMPT", "MODEL OUTPUT", "PROCESS NOTE"). */
  label?: string;
  /** Optional metadata strip on the right (model name, token count, etc.). */
  meta?: string;
  className?: string;
  /** Use streaming carat after content (renders a blinking cursor). */
  streaming?: boolean;
  /**
   * When true, body uses normal block layout (no `pre-wrap`) for structured JSX —
   * labels, lists, and paragraphs with consistent alignment. Plain strings should
   * keep the default `pre-wrap` behavior.
   */
  structuredBody?: boolean;
};

/**
 * The AI Artifact Surface — the visual signature of AI on this site.
 *
 * A slightly recessed monospaced pane used exclusively for prompts,
 * model outputs, and process notes. NEVER decoration, always evidence.
 */
export function ArtifactSurface({
  children,
  label,
  meta,
  className,
  streaming,
  structuredBody,
}: ArtifactSurfaceProps) {
  return (
    <figure
      className={clsx(
        "relative rounded-sm border bg-artifact text-artifact-ink",
        className
      )}
      style={{
        borderColor: "var(--artifact-border)",
        boxShadow: "var(--shadow-press)",
      }}
    >
      {(label || meta) && (
        <header
          className="flex items-center justify-between px-5 py-3"
          style={{ borderBottom: "1px solid var(--artifact-border)" }}
        >
          <span className="t-mono text-ink-quiet tabular">
            {label ?? "ARTIFACT"}
          </span>
          {meta && (
            <span className="t-mono text-ink-faint tabular">{meta}</span>
          )}
        </header>
      )}
      <div
        className={clsx(
          "px-5 py-5 font-mono text-[0.9375rem] leading-[1.65] text-pretty",
          structuredBody && "text-artifact-ink"
        )}
        style={
          structuredBody ? undefined : { whiteSpace: "pre-wrap" as const }
        }
      >
        {children}
        {streaming && (
          <span
            aria-hidden
            className="ml-1 inline-block h-[1em] w-[0.5ch] align-middle bg-signal"
            style={{ animation: "pulse 1.1s ease-in-out infinite" }}
          />
        )}
      </div>
    </figure>
  );
}
