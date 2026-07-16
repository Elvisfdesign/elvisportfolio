"use client";

import clsx from "clsx";
import { useId } from "react";
import { ThemeSegmentedControl } from "@/components/atlas/theme-segmented-control";
import type { AtlasThemeId } from "@/content/atlas/project";

type AtlasGalleryThemeToggleProps = {
  value: AtlasThemeId;
  onChange: (theme: AtlasThemeId) => void;
  available: readonly AtlasThemeId[];
  className?: string;
};

const THEME_OPTIONS: { value: AtlasThemeId; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

/**
 * Gallery chrome around the reusable ThemeSegmentedControl —
 * explanatory copy + Light/Dark mockup switching.
 */
export function AtlasGalleryThemeToggle({
  value,
  onChange,
  available,
  className,
}: AtlasGalleryThemeToggleProps) {
  const labelId = useId();

  const options = THEME_OPTIONS.map((option) => ({
    ...option,
    disabled: !available.includes(option.value),
  }));

  return (
    <div
      className={clsx(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6",
        className,
      )}
    >
      <p
        id={labelId}
        className="max-w-prose font-mono text-[0.6875rem] leading-snug tracking-[0.06em] text-ink-quiet"
      >
        Compare the same product system across Light and Dark themes.
      </p>

      <ThemeSegmentedControl
        value={value}
        onChange={onChange}
        options={options}
        aria-labelledby={labelId}
        aria-label="Product mockup theme"
        layoutId="atlas-gallery-theme-pill"
        className="self-start sm:self-auto"
      />
    </div>
  );
}
