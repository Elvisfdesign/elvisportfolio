import clsx from "clsx";
import type { ReactNode } from "react";

type AtlasSectionHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  id?: string;
};

/** Title + supporting copy under a Section that already owns the eyebrow/number chrome. */
export function AtlasSectionHeader({
  title,
  description,
  className,
  id,
}: AtlasSectionHeaderProps) {
  return (
    <div className={clsx("max-w-[40rem]", className)}>
      <h2 id={id} className="t-display-m font-display text-ink text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 max-w-prose t-body-l text-ink-mute leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
