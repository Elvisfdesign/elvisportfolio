import clsx from "clsx";

export type MetadataItem = {
  label: string;
  value: string;
};

/**
 * Mono-set metadata strip — used on case study covers and the homepage practice framing block.
 * "ROLE · COMPANY · LOCATION · YEAR"
 *
 * `stacked` places label above value for longer profile rows (About),
 * keeping labels aligned and wrap intentional on narrow viewports.
 */
export function MetadataStrip({
  items,
  className,
  stacked = false,
}: {
  items: MetadataItem[];
  className?: string;
  stacked?: boolean;
}) {
  return (
    <dl
      className={clsx(
        "flex flex-wrap items-baseline gap-x-8 t-mono text-ink-mute tabular",
        stacked ? "gap-y-5" : "gap-y-3",
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className={
            stacked
              ? "flex w-full max-w-prose flex-col gap-1"
              : "flex items-baseline gap-2"
          }
        >
          <dt className="text-ink-quiet">{item.label}</dt>
          <dd className="text-ink leading-snug">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
