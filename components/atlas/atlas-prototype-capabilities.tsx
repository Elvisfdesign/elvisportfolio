import clsx from "clsx";
import type { AtlasPrototypeCapability } from "@/content/atlas/project";

type AtlasPrototypeCapabilitiesProps = {
  items: readonly AtlasPrototypeCapability[];
  className?: string;
};

/**
 * Compact capability grid for the Interactive Product Prototype section.
 * Uses the same bordered-cell language as `foundations` on /atlas so it feels
 * native to the page instead of introducing a new visual pattern.
 */
export function AtlasPrototypeCapabilities({
  items,
  className,
}: AtlasPrototypeCapabilitiesProps) {
  return (
    <ul
      className={clsx(
        "grid grid-cols-1 gap-3 content-start sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
      role="list"
      aria-label="Prototype capabilities"
    >
      {items.map((item) => (
        <li
          key={item.id}
          className="rounded-sm border px-4 py-4 md:py-5"
          style={{ borderColor: "var(--hairline)" }}
        >
          <span className="t-mono text-ink-mute tabular">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
