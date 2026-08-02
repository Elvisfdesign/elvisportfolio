import clsx from "clsx";
import type { AscendAtAGlanceItem } from "@/content/ascend/project";

type AscendAtAGlanceProps = {
  items: readonly AscendAtAGlanceItem[];
  className?: string;
};

/**
 * At-a-Glance — the compact scannable strip that sits directly beneath
 * the hero. Four editorial cards on a hairline grid: eyebrow (mono), a
 * short body (`t-body-l`), no CTAs.
 *
 * The whole block is intentionally quiet — recruiters should be able to
 * ingest all four items in ~15 seconds. Layout wraps to 2×2 on md, 1×4
 * on lg — never more than four cards visible in a row.
 */
export function AscendAtAGlance({
  items,
  className,
}: AscendAtAGlanceProps) {
  return (
    <dl
      className={clsx(
        "grid grid-cols-1 gap-px overflow-hidden rounded-sm border md:grid-cols-2 lg:grid-cols-4",
        className,
      )}
      style={{
        borderColor: "var(--hairline)",
        backgroundColor: "var(--hairline)",
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-3 p-6 md:p-8"
          style={{ background: "var(--canvas-raised)" }}
        >
          <dt className="t-mono text-ink-quiet tabular">{item.eyebrow}</dt>
          <dd className="t-body-l text-ink-mute leading-relaxed">
            {item.body}
          </dd>
        </div>
      ))}
    </dl>
  );
}
