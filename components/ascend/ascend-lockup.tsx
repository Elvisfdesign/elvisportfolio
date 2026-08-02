import clsx from "clsx";
import { AscendMark } from "@/components/ascend/ascend-mark";

type AscendLockupProps = {
  className?: string;
  /** Compact variant for feature cards. */
  compact?: boolean;
  /** Optional subtitle line (e.g. "Premium Lifestyle Operating System"). */
  subtitle?: string;
};

/**
 * ASCEND text lockup — gold mark + Fraunces wordmark + optional subtitle.
 *
 * Mirrors the AtlasLogo composition: mark stacked above wordmark on
 * `default`, sized down on `compact`. Icon and wordmark share an optical
 * baseline; the subtitle drops below aligned to the wordmark's left edge.
 */
export function AscendLockup({
  className,
  compact = false,
  subtitle,
}: AscendLockupProps) {
  return (
    <div
      className={clsx(
        "inline-flex flex-col items-start gap-3 text-ink",
        compact ? "gap-2" : "gap-3",
        className,
      )}
    >
      <AscendMark
        className={clsx(compact ? "h-4 w-auto" : "h-7 w-auto md:h-9")}
      />
      <div className="flex flex-col gap-1">
        <span
          className={clsx(
            "font-display font-medium tracking-[-0.03em] italic text-ink leading-none",
            compact ? "text-[1.35rem]" : "t-display-m",
          )}
        >
          ASCEND
        </span>
        {subtitle ? (
          <span
            className={clsx(
              "t-mono text-ink-quiet tabular",
              compact ? "text-[0.6875rem]" : undefined,
            )}
          >
            {subtitle}
          </span>
        ) : null}
      </div>
    </div>
  );
}
