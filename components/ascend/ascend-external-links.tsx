import clsx from "clsx";
import type { AscendCta } from "@/content/ascend/project";

type AscendExternalLinksProps = {
  links: readonly AscendCta[];
  className?: string;
};

/**
 * ASCEND external resource row.
 *
 * Only renders an anchor when `href` is present. Otherwise falls back to an
 * honest inline "pendingLabel" (e.g. "Planned", "In progress") — this
 * avoids the classic portfolio anti-pattern of dead `#` links, and gives
 * the case study a truthful "under construction" tone during Phase 1.
 *
 * Mirrors AtlasExternalLinks' schema so both flagship case studies can
 * evolve on the same footing.
 */
export function AscendExternalLinks({
  links,
  className,
}: AscendExternalLinksProps) {
  return (
    <ul
      className={clsx(
        "flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-4",
        className,
      )}
      role="list"
    >
      {links.map((link) => {
        if (!link.href) {
          if (!link.pendingLabel) return null;
          return (
            <li key={link.id}>
              <span
                className="t-mono text-ink-faint tabular"
                aria-label={`${link.label}: ${link.pendingLabel}`}
              >
                {link.label}
                &nbsp;·&nbsp;
                {link.pendingLabel}
              </span>
            </li>
          );
        }

        return (
          <li key={link.id} className="inline-flex items-baseline">
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="t-mono link-underline text-ink tabular touch-manipulation"
              aria-label={
                link.external
                  ? `${link.label} (opens in a new tab)${
                      link.statusLabel ? `, ${link.statusLabel}` : ""
                    }`
                  : `${link.label}${
                      link.statusLabel ? `, ${link.statusLabel}` : ""
                    }`
              }
            >
              {link.label}&nbsp;↗
            </a>
            {link.statusLabel ? (
              <span
                className="t-mono text-ink-faint tabular"
                aria-hidden="true"
              >
                &nbsp;·&nbsp;{link.statusLabel}
              </span>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
