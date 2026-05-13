import clsx from "clsx";
import type { ReactNode } from "react";

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 t-mono text-ink-mute tabular",
        className
      )}
    >
      <span className="dot-live" aria-hidden />
      {children}
    </span>
  );
}
