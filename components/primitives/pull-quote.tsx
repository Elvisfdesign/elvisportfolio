import clsx from "clsx";
import type { ReactNode } from "react";

export function PullQuote({
  children,
  attribution,
  className,
}: {
  children: ReactNode;
  attribution?: string;
  className?: string;
}) {
  return (
    <figure
      className={clsx(
        "border-l-2 pl-6 md:pl-8",
        className
      )}
      style={{ borderColor: "var(--signal)" }}
    >
      <blockquote className="font-display t-display-m text-ink">
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="mt-4 t-mono text-ink-mute tabular">
          — {attribution}
        </figcaption>
      )}
    </figure>
  );
}
