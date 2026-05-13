"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { useTheme, type ThemePreference } from "./theme-provider";

const LABEL: Record<ThemePreference, string> = {
  system: "AUTO",
  light: "LIGHT",
  dark: "DARK",
};

const NEXT: Record<ThemePreference, ThemePreference> = {
  system: "light",
  light: "dark",
  dark: "system",
};

/**
 * Editorial three-state theme toggle. Cycles AUTO -> LIGHT -> DARK -> AUTO.
 * Single t-mono button with a quiet sliver indicator that hairlines the
 * current state. Respects reduced motion via Motion's MotionConfig already
 * wrapping the page.
 */
export function ThemeToggle({
  variant = "inline",
  className,
}: {
  variant?: "inline" | "stacked";
  className?: string;
}) {
  const { preference, resolved, cycle } = useTheme();

  // Avoid hydration mismatch: render a stable placeholder until mounted, then
  // swap to the real label. The inline init script has already painted the
  // correct theme, so this only affects the label text.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const label = mounted ? LABEL[preference] : "AUTO";
  const next = mounted ? LABEL[NEXT[preference]] : "LIGHT";

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${label}. Click to switch to ${next}.`}
      title={`Theme · ${label} (next: ${next})`}
      className={clsx(
        "group inline-flex min-h-11 items-center gap-2 rounded-sm px-1 t-mono text-ink-mute hover:text-ink transition-colors duration-300",
        variant === "stacked" && "py-1",
        className
      )}
    >
      <ThemeGlyph resolved={resolved} preference={preference} />
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={label}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="tabular"
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

/**
 * A tiny semantic glyph — half-circle for the resolved theme, with a small
 * dot to indicate AUTO when the user hasn't picked a side.
 */
function ThemeGlyph({
  resolved,
  preference,
}: {
  resolved: "light" | "dark";
  preference: ThemePreference;
}) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden
      className="shrink-0"
    >
      <circle
        cx="7"
        cy="7"
        r="6"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.5"
      />
      {/* Right half filled to indicate "resolved" theme polarity */}
      <path
        d={
          resolved === "light"
            ? "M7 1 a6 6 0 0 1 0 12 z"
            : "M7 1 a6 6 0 0 0 0 12 z"
        }
        fill="currentColor"
      />
      {preference === "system" && (
        <circle cx="7" cy="7" r="1.4" fill="var(--canvas)" />
      )}
    </svg>
  );
}
