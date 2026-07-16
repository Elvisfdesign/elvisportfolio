"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import {
  useCallback,
  useId,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { useReducedMotionPreference } from "@/components/motion/use-reduced-motion";
import { ease } from "@/lib/motion";

export type ThemeSegmentedOption<T extends string = string> = {
  value: T;
  label: ReactNode;
  disabled?: boolean;
};

export type ThemeSegmentedControlProps<T extends string = string> = {
  value: T;
  onChange: (value: T) => void;
  options: readonly ThemeSegmentedOption<T>[];
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  /** Reserved for multi-instance pages; pill uses transform, not shared layout. */
  layoutId?: string;
};

const PILL_TRANSITION = {
  duration: 0.2,
  ease: ease.soft,
} as const;

/**
 * Segmented control with a sliding active pill behind equal-width tabs.
 *
 * Layering (critical):
 *   track (relative)
 *     └─ pill (absolute, z-0, pointer-events: none)
 *     └─ tabs row (relative, z-1)
 *          └─ Light / Dark buttons (labels always rendered)
 *
 * Active label uses inverse surface text (`text-canvas` on `bg-ink` pill).
 * Inactive label uses `text-ink-mute`. Never hide labels with opacity.
 */
export function ThemeSegmentedControl<T extends string>({
  value,
  onChange,
  options,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: ThemeSegmentedControlProps<T>) {
  const reactId = useId();
  const reduced = useReducedMotionPreference();

  const enabledOptions = options.filter((option) => !option.disabled);
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const columnCount = Math.max(options.length, 1);

  const focusTab = useCallback(
    (optionValue: T) => {
      const node = document.getElementById(
        `${reactId}-tab-${optionValue}`,
      ) as HTMLButtonElement | null;
      node?.focus({ preventScroll: true });
    },
    [reactId],
  );

  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const current = Math.max(
          0,
          enabledOptions.findIndex((option) => option.value === value),
        );
        const next = enabledOptions[(current + 1) % enabledOptions.length];
        if (!next) return;
        onChange(next.value);
        focusTab(next.value);
        return;
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const current = Math.max(
          0,
          enabledOptions.findIndex((option) => option.value === value),
        );
        const next =
          enabledOptions[
            (current - 1 + enabledOptions.length) % enabledOptions.length
          ];
        if (!next) return;
        onChange(next.value);
        focusTab(next.value);
        return;
      }
      if (e.key === "Home") {
        e.preventDefault();
        const first = enabledOptions[0];
        if (!first) return;
        onChange(first.value);
        focusTab(first.value);
        return;
      }
      if (e.key === "End") {
        e.preventDefault();
        const last = enabledOptions[enabledOptions.length - 1];
        if (!last) return;
        onChange(last.value);
        focusTab(last.value);
      }
    },
    [enabledOptions, focusTab, onChange, value],
  );

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-orientation="horizontal"
      onKeyDown={onKeyDown}
      className={clsx(
        "atlas-theme-segmented relative inline-block w-fit max-w-full shrink-0",
        "rounded-md border p-0.5",
        "bg-canvas-recessed",
        className,
      )}
      style={{ borderColor: "var(--hairline)" }}
    >
      {/*
        Pill is a direct child of the relative track, NOT a grid sibling of the
        tabs — so transform stacking cannot cover the labels.
      */}
      <motion.div
        aria-hidden
        className={clsx(
          "pointer-events-none absolute inset-y-0.5 left-0.5 z-0",
          "rounded-[0.3125rem] bg-ink",
          "shadow-[var(--shadow-press)]",
          "ring-1 ring-hairline-strong",
        )}
        style={{
          width: `calc((100% - 0.25rem) / ${columnCount})`,
        }}
        initial={false}
        animate={{
          x: `calc(${selectedIndex} * 100%)`,
        }}
        transition={reduced ? { duration: 0 } : PILL_TRANSITION}
      />

      <div
        className="relative z-[1] grid w-full"
        style={{
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        }}
      >
        {options.map((option) => {
          const selected = value === option.value;
          const disabled = Boolean(option.disabled);

          return (
            <button
              key={option.value}
              id={`${reactId}-tab-${option.value}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-disabled={disabled || undefined}
              disabled={disabled}
              tabIndex={disabled ? -1 : selected ? 0 : -1}
              onClick={() => {
                if (!disabled) onChange(option.value);
              }}
              onKeyDown={(e) => {
                if (disabled) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChange(option.value);
                }
              }}
              className={clsx(
                "atlas-theme-segmented__tab relative z-[1]",
                "inline-flex min-h-9 min-w-[3.5rem] items-center justify-center",
                "px-3 py-1.5 sm:min-w-[4.25rem] sm:px-3.5",
                "rounded-[0.3125rem] bg-transparent",
                "font-mono text-[0.6875rem] leading-none tracking-[0.08em]",
                "transition-[color,transform] duration-200 ease-[var(--ease-soft)]",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-signal",
                disabled && "cursor-not-allowed text-ink-faint",
                !disabled && "cursor-pointer active:scale-[0.98]",
                /* Inactive — primary readable mute; hover does not fight active color. */
                !disabled && !selected && "text-ink-mute hover:text-ink",
                /*
                  Active — inverse of the ink pill.
                  Use theme utility `text-canvas` (not arbitrary var) so it
                  reliably overrides `button { color: inherit }` from globals.
                */
                !disabled && selected && "text-canvas",
              )}
              style={
                !disabled && selected
                  ? { color: "var(--canvas)" }
                  : undefined
              }
            >
              <span className="relative z-[1]">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
