import clsx from "clsx";
import { EditorialTextLink } from "@/components/primitives/editorial-text-link";
import type { AscendCta } from "@/content/ascend/project";

type AscendExternalLinksProps = {
  links: readonly AscendCta[];
  className?: string;
  /**
   * `inline` — compact mono row (default).
   * `resources` — stacked title + description for Project Resources.
   */
  variant?: "inline" | "resources";
};

/**
 * ASCEND external resource list.
 *
 * Only renders an anchor when `href` is present. Otherwise falls back to an
 * honest inline pending label — never dead `#` anchors.
 */
export function AscendExternalLinks({
  links,
  className,
  variant = "inline",
}: AscendExternalLinksProps) {
  if (variant === "resources") {
    return (
      <ul
        className={clsx("flex flex-col gap-6 md:gap-7", className)}
        role="list"
      >
        {links.map((link) => {
          const status = link.href ? link.statusLabel : link.pendingLabel;

          return (
            <li
              key={link.id}
              className="min-w-0 border-t pt-5"
              style={{ borderColor: "var(--hairline)" }}
            >
              {link.href ? (
                <EditorialTextLink
                  href={link.href}
                  label={link.label}
                  arrow={link.external ? "external" : "forward"}
                  tone="ink"
                  external={link.external}
                  ariaLabel={
                    link.ariaLabel ??
                    (link.external
                      ? `${link.label} (opens in a new tab)`
                      : link.label)
                  }
                />
              ) : (
                <span
                  className="t-mono text-ink-faint tabular"
                  aria-label={
                    link.pendingLabel
                      ? `${link.label}: ${link.pendingLabel}`
                      : link.label
                  }
                >
                  {link.label}
                </span>
              )}

              {status ? (
                <p className="mt-2 t-mono text-[0.6875rem] text-ink-quiet tabular">
                  {status}
                </p>
              ) : null}

              {link.description ? (
                <p className="mt-2 max-w-[40rem] t-body text-ink-mute leading-relaxed">
                  {link.description}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    );
  }

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
          <li key={link.id} className="inline-flex items-baseline gap-2">
            <EditorialTextLink
              href={link.href}
              label={link.label}
              arrow={link.external ? "external" : "forward"}
              tone="ink"
              external={link.external}
              ariaLabel={
                link.ariaLabel ??
                (link.external
                  ? `${link.label} (opens in a new tab)${
                      link.statusLabel ? `, ${link.statusLabel}` : ""
                    }`
                  : `${link.label}${
                      link.statusLabel ? `, ${link.statusLabel}` : ""
                    }`)
              }
            />
            {link.statusLabel ? (
              <span
                className="t-mono text-ink-faint tabular"
                aria-hidden="true"
              >
                ·&nbsp;{link.statusLabel}
              </span>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
