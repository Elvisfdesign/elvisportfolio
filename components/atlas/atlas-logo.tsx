import clsx from "clsx";

type AtlasLogoProps = {
  className?: string;
  /** Compact lockup for the homepage feature card. */
  compact?: boolean;
};

/**
 * Restrained text lockup for Atlas — geometric mark + mono/display hierarchy.
 */
export function AtlasLogo({ className, compact = false }: AtlasLogoProps) {
  return (
    <div
      className={clsx(
        "inline-flex flex-col items-start gap-2 text-ink",
        className,
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 20"
        className={clsx(
          "text-signal",
          compact ? "h-3.5 w-[1.05rem]" : "h-5 w-6",
        )}
        fill="currentColor"
      >
        <path d="M12 0 L24 20 H0 Z" />
      </svg>
      <div className="flex flex-col gap-0.5">
        <span
          className={clsx(
            "font-display font-medium tracking-[-0.03em] text-ink",
            compact ? "text-[1.35rem] leading-none" : "t-display-m leading-none",
          )}
        >
          ATLAS
        </span>
        <span
          className={clsx(
            "t-mono text-ink-quiet tabular",
            compact ? "text-[0.6875rem]" : undefined,
          )}
        >
          UI&nbsp;SYSTEM
        </span>
      </div>
    </div>
  );
}
