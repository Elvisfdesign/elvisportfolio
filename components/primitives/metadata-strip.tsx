import clsx from "clsx";

export type MetadataItem = {
  label: string;
  value: string;
};

/**
 * Mono-set metadata strip — used on case study covers and the homepage practice framing block.
 * "ROLE · COMPANY · LOCATION · YEAR"
 */
export function MetadataStrip({
  items,
  className,
}: {
  items: MetadataItem[];
  className?: string;
}) {
  return (
    <dl
      className={clsx(
        "flex flex-wrap items-baseline gap-x-8 gap-y-3 t-mono text-ink-mute tabular",
        className
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="flex items-baseline gap-2">
          <dt className="text-ink-quiet">{item.label}</dt>
          <dd className="text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
