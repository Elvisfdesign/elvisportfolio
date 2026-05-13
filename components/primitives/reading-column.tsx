import clsx from "clsx";
import type { ReactNode } from "react";

/**
 * Constrains long-form prose to 60–75ch for editorial reading rhythm.
 */
export function ReadingColumn({
  children,
  className,
  size = "prose",
}: {
  children: ReactNode;
  className?: string;
  size?: "prose" | "reading";
}) {
  return (
    <div
      className={clsx("mx-auto", className)}
      style={{
        maxWidth:
          size === "prose" ? "var(--max-prose)" : "var(--max-reading)",
      }}
    >
      {children}
    </div>
  );
}
