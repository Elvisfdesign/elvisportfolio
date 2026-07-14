import clsx from "clsx";
import type { AtlasExternalLink } from "@/content/atlas/project";

type AtlasExternalLinksProps = {
  links: readonly AtlasExternalLink[];
  className?: string;
};

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
              <span className="t-mono text-ink-faint tabular">
                {link.label}&nbsp;·&nbsp;Coming&nbsp;soon
              </span>
            </li>
          );
        }

        return (
          <li key={link.id}>
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="t-mono link-underline text-ink tabular touch-manipulation"
              aria-label={
                link.external
                  ? `${link.label} (opens in a new tab)`
                  : link.label
              }
            >
              {link.label}&nbsp;↗
            </a>
          </li>
        );
      })}
    </ul>
  );
}
