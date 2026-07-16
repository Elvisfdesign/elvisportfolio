import clsx from "clsx";
import type { AtlasCta } from "@/content/atlas/project";

type AtlasExternalLinksProps = {
  links: readonly AtlasCta[];
  className?: string;
};

/**
 * Atlas CTAs. Active when href exists; otherwise an honest inactive status.
 * Never renders "#" placeholders. Unpublished links are not focusable anchors.
 */
export function AtlasExternalLinks({
  links,
  className,
}: AtlasExternalLinksProps) {
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
          return (
            <li key={link.id}>
              <span
                className="t-mono text-ink-faint tabular"
                aria-label={`${link.label}: ${link.pendingLabel ?? "Publishing soon"}`}
              >
                {link.label}
                &nbsp;·&nbsp;
                {link.pendingLabel ?? "Publishing soon"}
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
