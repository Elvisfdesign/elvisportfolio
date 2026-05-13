"use client";

import clsx from "clsx";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useReducedMotionPreference } from "@/components/motion/use-reduced-motion";
import { useTheme } from "@/components/theme/theme-provider";

const PORTRAIT_SRC = "/images/elvis-portrait.png";
const THUMB_WIDTH = 280;
const THUMB_HEIGHT = 350;
const VIEW_WIDTH = 1120;
const VIEW_HEIGHT = 1400;

type AboutPortraitLightboxProps = {
  thumbSizes?: string;
};

export function AboutPortraitLightbox({
  thumbSizes = "(max-width: 768px) 7rem, 7.25rem",
}: AboutPortraitLightboxProps) {
  const reduced = useReducedMotionPreference();
  const { resolved: theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  const headingId = useId();
  const panelId = `${headingId}-portrait-overlay`;

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open || !mounted) return;
    const closeBtn = closeBtnRef.current;
    if (!closeBtn) return;

    queueMicrotask(() => {
      closeBtn.focus({ preventScroll: true });
    });
  }, [open, mounted]);

  useEffect(() => {
    if (wasOpenRef.current && !open) {
      triggerRef.current?.focus({ preventScroll: true });
    }
    wasOpenRef.current = open;
  }, [open]);

  const onPanelKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;

    const root = panelRef.current;
    if (!root) return;

    const selectors = [
      "button:not([disabled])",
      "[href]",
      'input:not([disabled]):not([type="hidden"])',
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(",");

    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>(selectors),
    );

    if (focusables.length === 0) return;

    if (focusables.length === 1) {
      e.preventDefault();
      focusables[0].focus({ preventScroll: true });
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (e.shiftKey) {
      if (active === first || !focusables.some((node) => node.contains(active ?? null))) {
        e.preventDefault();
        last.focus({ preventScroll: true });
      }
    } else if (active === last) {
      e.preventDefault();
      first.focus({ preventScroll: true });
    }
  }, []);

  const transition = reduced
    ? { duration: 0 }
    : ({ duration: 0.22, ease: [0.22, 1, 0.36, 1] as const });

  const portal =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open ? (
          <motion.div
            key="about-portrait-lightbox-shell"
            className="fixed inset-0 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
          >
            <div
              role="presentation"
              className="absolute inset-0 cursor-default"
              style={{
                backgroundColor:
                  "color-mix(in oklab, var(--canvas) 92%, transparent)",
              }}
              onClick={() => close()}
            />

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-[max(1rem,var(--gutter))] pb-[max(6.5rem,2rem)] pt-[max(5.75rem,var(--gutter))] md:pb-[max(2rem,var(--gutter))] md:pt-[max(6.5rem,var(--gutter))]">
              <motion.div
                ref={panelRef}
                id={panelId}
                role="dialog"
                aria-modal="true"
                aria-labelledby={headingId}
                onKeyDown={onPanelKeyDown}
                className={clsx(
                  "pointer-events-auto relative flex w-full max-w-[min(calc(100vw-2*var(--gutter)),40rem)] flex-col outline-none md:-translate-x-[2%]",
                )}
                initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.988 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.988 }}
                transition={transition}
              >
                <h2 id={headingId} className="sr-only">
                  Elvis Fernandes — portrait
                </h2>

                <div className="mb-6 flex shrink-0 justify-end">
                  <button
                    ref={closeBtnRef}
                    type="button"
                    onClick={() => close()}
                    className={clsx(
                      "t-mono inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center px-4 py-2 tabular",
                      "border border-transparent text-ink-quiet transition-colors hover:text-ink",
                      "focus-visible:border-signal focus-visible:outline-none",
                    )}
                    aria-label="Close portrait view"
                  >
                    CLOSE
                  </button>
                </div>

                <div
                  className="relative w-full overflow-hidden rounded-sm border bg-canvas-recessed"
                  style={{ borderColor: "var(--hairline)" }}
                >
                  <Image
                    src={PORTRAIT_SRC}
                    alt="Elvis Fernandes — portrait"
                    width={VIEW_WIDTH}
                    height={VIEW_HEIGHT}
                    priority
                    className="block h-auto w-full max-h-[min(74dvh,calc(100svh-10rem))] object-contain brightness-[0.98]"
                    sizes="(max-width: 768px) calc(100vw - 2 * max(1rem, var(--gutter))), min(560px, 40rem)"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
    );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label="View larger portrait of Elvis Fernandes"
        className={clsx(
          "group relative block w-full touch-manipulation rounded-sm text-left outline-none focus-visible:outline-none",
          /* Avoid default white ring offset (reads as a bright halo in dark mode). */
          "[--tw-ring-offset-color:var(--canvas)]",
          "focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2",
        )}
      >
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-sm border bg-canvas-recessed"
          style={{ borderColor: "var(--hairline)" }}
        >
          <Image
            src={PORTRAIT_SRC}
            alt=""
            width={THUMB_WIDTH}
            height={THUMB_HEIGHT}
            sizes={thumbSizes}
            loading="lazy"
            className="h-full w-full object-cover brightness-[0.98]"
          />

          {/* Hover / focus-visible hint — decorative; actionable name stays on button. */}
          <span
            aria-hidden="true"
            className={clsx(
              "pointer-events-none absolute inset-0 flex flex-col justify-end opacity-0 transition-opacity duration-300 ease-out motion-reduce:transition-none motion-reduce:duration-0",
              "[@media(hover:hover)]:group-hover:opacity-100",
              "group-focus-visible:opacity-100",
            )}
          >
            <span
              className={clsx(
                "relative w-full bg-gradient-to-t pb-3 pt-11 pl-[max(0.75rem,12px)] pr-[max(0.75rem,12px)]",
                theme === "dark"
                  ? "from-[color-mix(in_oklab,var(--canvas)_92%,transparent)] via-[color-mix(in_oklab,var(--canvas)_42%,transparent)] to-transparent"
                  : "from-[color-mix(in_oklab,var(--ink)_62%,transparent)] via-[color-mix(in_oklab,var(--ink)_24%,transparent)] to-transparent",
              )}
            >
              <span
                className={clsx(
                  "block pb-px text-center font-mono text-[0.5625rem] uppercase leading-none tracking-[0.085em] tabular sm:text-[0.625rem]",
                  theme === "dark"
                    ? "text-ink-mute opacity-95"
                    : "text-[var(--canvas)] opacity-95",
                )}
              >
                VIEW&nbsp;FULL&nbsp;SIZE
              </span>
            </span>
          </span>
        </div>
      </button>

      {portal}
    </>
  );
}
