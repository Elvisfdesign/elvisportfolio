import clsx from "clsx";
import type { ReactNode } from "react";

type AscendPullQuoteProps = {
  children: ReactNode;
  attribution?: string;
  className?: string;
};

/**
 * Editorial pull quote — large Fraunces italic, a warm gold opening mark,
 * hairline top/bottom rules. Meant to punctuate long chapters, not carry
 * the reasoning.
 */
export function AscendPullQuote({
  children,
  attribution,
  className,
}: AscendPullQuoteProps) {
  return (
    <figure
      className={clsx(
        "hairline-y my-16 py-12 md:my-24 md:py-16",
        className,
      )}
    >
      <blockquote>
        <span
          aria-hidden
          className="mb-4 block t-display-l font-display italic leading-none text-[var(--ascend-gold)]"
        >
          &ldquo;
        </span>
        <p className="max-w-[36ch] t-display-m font-display italic text-ink leading-tight text-balance">
          {children}
        </p>
      </blockquote>
      {attribution ? (
        <figcaption className="mt-8 t-mono text-ink-quiet tabular">
          — {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}
