import clsx from "clsx";
import type { ReactNode } from "react";

type AscendCalloutProps = {
  /** Compact mono eyebrow (e.g. "NOTE", "PROCESS", "DECISION"). */
  eyebrow?: string;
  title?: ReactNode;
  children: ReactNode;
  /** Visual weight — `soft` uses hairlines only, `emphasis` adds a gold left rule. */
  tone?: "soft" | "emphasis";
  className?: string;
};

/**
 * Aside / callout surface. Used inside chapter bodies to flag decisions,
 * trade-offs, or process notes without letting them dominate the flow.
 *
 * `emphasis` variant adds a 2px gold left border — reserved for the one
 * or two most important takeaways per chapter. Everything else should use
 * `soft`.
 */
export function AscendCallout({
  eyebrow,
  title,
  children,
  tone = "soft",
  className,
}: AscendCalloutProps) {
  return (
    <aside
      className={clsx(
        "relative rounded-sm border bg-canvas-raised p-6 md:p-8",
        tone === "emphasis"
          ? "border-l-0 pl-8 md:pl-10"
          : "",
        className,
      )}
      style={{ borderColor: "var(--hairline)" }}
    >
      {tone === "emphasis" ? (
        <span
          aria-hidden
          className="absolute inset-y-6 left-0 w-[2px] rounded-full bg-[var(--ascend-gold)] md:inset-y-8"
        />
      ) : null}
      {eyebrow ? (
        <p className="t-mono text-ink-quiet tabular">{eyebrow}</p>
      ) : null}
      {title ? (
        <h3
          className={clsx(
            "t-subhead font-display text-ink",
            eyebrow ? "mt-4" : undefined,
          )}
        >
          {title}
        </h3>
      ) : null}
      <div
        className={clsx(
          "t-body text-ink-mute leading-relaxed",
          title ? "mt-3" : eyebrow ? "mt-4" : undefined,
        )}
      >
        {children}
      </div>
    </aside>
  );
}
