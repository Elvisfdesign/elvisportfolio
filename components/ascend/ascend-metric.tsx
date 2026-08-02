import clsx from "clsx";

type AscendMetricProps = {
  /** Large display value (e.g. "7", "11 chapters", "0 → 1"). */
  value: string;
  /** Compact mono label under the value. */
  label: string;
  /** Optional supporting caption. */
  caption?: string;
  className?: string;
};

/**
 * A single editorial metric. Rendered as an unbordered stack — value on
 * top in Fraunces display, label as mono caption below. Metrics compose
 * naturally in a horizontal `AscendMetricRow` (see below) so they line up
 * on a shared baseline.
 */
export function AscendMetric({
  value,
  label,
  caption,
  className,
}: AscendMetricProps) {
  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      <span className="t-display-l font-display text-ink leading-none tracking-[-0.02em]">
        {value}
      </span>
      <span className="t-mono text-ink-quiet tabular">{label}</span>
      {caption ? (
        <span className="mt-2 t-body text-ink-mute">{caption}</span>
      ) : null}
    </div>
  );
}

type AscendMetricRowProps = {
  items: readonly {
    id: string;
    value: string;
    label: string;
    caption?: string;
  }[];
  className?: string;
};

/**
 * Horizontal metric group with hairline dividers between items. Wraps on
 * narrow viewports so the strip never overflows.
 */
export function AscendMetricRow({ items, className }: AscendMetricRowProps) {
  return (
    <dl
      className={clsx(
        "grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {items.map((m) => (
        <div key={m.id} className="flex flex-col gap-2">
          <dt className="order-2 t-mono text-ink-quiet tabular">{m.label}</dt>
          <dd className="order-1 t-display-l font-display text-ink leading-none tracking-[-0.02em]">
            {m.value}
          </dd>
          {m.caption ? (
            <dd className="order-3 mt-2 t-body text-ink-mute">{m.caption}</dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
