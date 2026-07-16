"use client";

import clsx from "clsx";
import type { AtlasThemeId } from "@/content/atlas/project";

type AtlasGalleryThemeToggleProps = {
  value: AtlasThemeId;
  onChange: (theme: AtlasThemeId) => void;
  available: readonly AtlasThemeId[];
  className?: string;
};

const OPTIONS: { id: AtlasThemeId; label: string }[] = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

/**
 * Segmented Light/Dark control for the Atlas product gallery.
 * Independent from the global portfolio theme.
 */
export function AtlasGalleryThemeToggle({
  value,
  onChange,
  available,
  className,
}: AtlasGalleryThemeToggleProps) {
  return (
    <div className={clsx("flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", className)}>
      <p className="t-mono text-ink-quiet tabular">
        Compare the same product system across Light and Dark themes.
      </p>

      <div
        role="group"
        aria-label="Product mockup theme"
        className="inline-flex rounded-sm border p-0.5"
        style={{ borderColor: "var(--hairline)" }}
      >
        {OPTIONS.map((option) => {
          const enabled = available.includes(option.id);
          const selected = value === option.id;

          return (
            <button
              key={option.id}
              type="button"
              disabled={!enabled}
              aria-pressed={selected}
              aria-disabled={!enabled}
              title={
                enabled
                  ? `Show ${option.label} mockups`
                  : `${option.label} mockups publishing soon`
              }
              onClick={() => {
                if (enabled) onChange(option.id);
              }}
              className={clsx(
                "t-mono min-h-10 min-w-[4.5rem] px-4 py-2 tabular transition-colors duration-200",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
                !enabled && "cursor-not-allowed text-ink-faint",
                enabled && !selected && "text-ink-mute hover:text-ink",
                enabled && selected && "bg-ink text-canvas",
              )}
            >
              {option.label}
              {!enabled ? (
                <span className="sr-only"> — publishing soon</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
