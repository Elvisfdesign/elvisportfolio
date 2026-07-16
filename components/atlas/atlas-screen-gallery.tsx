"use client";

import clsx from "clsx";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { AtlasGalleryThemeToggle } from "@/components/atlas/atlas-gallery-theme-toggle";
import { useReducedMotionPreference } from "@/components/motion/use-reduced-motion";
import {
  getCompleteGalleryThemes,
  resolveScreenAssets,
  type AtlasScreen,
  type AtlasThemeId,
} from "@/content/atlas/project";
import { duration, ease } from "@/lib/motion";

const GALLERY_THEME_KEY = "atlas-gallery-theme";

type AtlasScreenGalleryProps = {
  screens: readonly AtlasScreen[];
  className?: string;
};

function readSessionTheme(): AtlasThemeId | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(GALLERY_THEME_KEY);
    if (raw === "light" || raw === "dark") return raw;
  } catch {
    /* sessionStorage unavailable */
  }
  return null;
}

function writeSessionTheme(theme: AtlasThemeId) {
  try {
    window.sessionStorage.setItem(GALLERY_THEME_KEY, theme);
  } catch {
    /* ignore */
  }
}

/**
 * Product screenshot grid + fullscreen modal carousel for Atlas.
 * Light/Dark gallery theme is independent from the global portfolio theme.
 */
export function AtlasScreenGallery({
  screens,
  className,
}: AtlasScreenGalleryProps) {
  const reduced = useReducedMotionPreference();
  const availableThemes = useMemo(
    () => getCompleteGalleryThemes(screens),
    [screens],
  );

  const [galleryTheme, setGalleryTheme] = useState<AtlasThemeId>("light");
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  const lastTriggerIndex = useRef(0);
  const pointerOrigin = useRef<{ x: number; y: number } | null>(null);

  const headingId = useId();
  const panelId = `${headingId}-atlas-gallery`;
  const open = activeIndex !== null;

  const activeScreen =
    activeIndex !== null ? (screens[activeIndex] ?? null) : null;
  const activeAssets = activeScreen
    ? resolveScreenAssets(activeScreen, galleryTheme)
    : null;

  useEffect(() => {
    setMounted(true);
    const complete = getCompleteGalleryThemes(screens);
    const saved = readSessionTheme();
    const htmlTheme = document.documentElement.getAttribute("data-theme");
    const resolvedSite: AtlasThemeId =
      htmlTheme === "light" || htmlTheme === "dark" ? htmlTheme : "light";

    let preferred: AtlasThemeId = "light";
    if (saved && complete.includes(saved)) {
      preferred = saved;
    } else if (resolvedSite === "dark" && complete.includes("dark")) {
      preferred = "dark";
    } else if (complete.includes("light")) {
      preferred = "light";
    } else {
      preferred = complete[0] ?? "light";
    }

    setGalleryTheme(preferred);
    // Run once on mount so later site-theme toggles don't override gallery choice.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onThemeChange = useCallback(
    (theme: AtlasThemeId) => {
      if (!availableThemes.includes(theme)) return;
      setGalleryTheme(theme);
      writeSessionTheme(theme);
    },
    [availableThemes],
  );

  // Preload every theme asset set so Light ↔ Dark switches do not flicker.
  useEffect(() => {
    if (!mounted) return;

    for (const theme of availableThemes) {
      for (const screen of screens) {
        const assets = screen.themes[theme];
        if (!assets) continue;
        const full = new window.Image();
        full.src = assets.fullSrc;
        if (assets.thumbnailSrc !== assets.fullSrc) {
          const thumb = new window.Image();
          thumb.src = assets.thumbnailSrc;
        }
      }
    }
  }, [mounted, availableThemes, screens]);

  const close = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const openAt = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current - 1 + screens.length) % screens.length;
    });
  }, [screens.length]);

  const goNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + 1) % screens.length;
    });
  }, [screens.length]);

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
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, goPrev, goNext]);

  useEffect(() => {
    if (!open || !mounted) return;
    const closeBtn = closeBtnRef.current;
    if (!closeBtn) return;
    queueMicrotask(() => {
      closeBtn.focus({ preventScroll: true });
    });
  }, [open, mounted]);

  useEffect(() => {
    if (open && activeIndex !== null) {
      lastTriggerIndex.current = activeIndex;
    }
  }, [open, activeIndex]);

  useEffect(() => {
    if (wasOpenRef.current && !open) {
      triggerRefs.current[lastTriggerIndex.current]?.focus({
        preventScroll: true,
      });
    }
    wasOpenRef.current = open;
  }, [open]);

  const onPanelKeyDown = useCallback((e: ReactKeyboardEvent) => {
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
      if (
        active === first ||
        !focusables.some((node) => node.contains(active ?? null))
      ) {
        e.preventDefault();
        last.focus({ preventScroll: true });
      }
    } else if (active === last) {
      e.preventDefault();
      first.focus({ preventScroll: true });
    }
  }, []);

  const onPointerDown = useCallback((e: ReactPointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointerOrigin.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPointerUp = useCallback(
    (e: ReactPointerEvent) => {
      const origin = pointerOrigin.current;
      pointerOrigin.current = null;
      if (!origin) return;

      const dx = e.clientX - origin.x;
      const dy = e.clientY - origin.y;
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;

      if (dx < 0) goNext();
      else goPrev();
    },
    [goNext, goPrev],
  );

  const transition = reduced
    ? { duration: 0 }
    : { duration: duration.base, ease: ease.entrance };

  const crossfade = reduced
    ? { duration: 0 }
    : { duration: duration.fast, ease: ease.soft };

  const portal =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && activeScreen && activeAssets ? (
          <motion.div
            key="atlas-screen-gallery-shell"
            className="atlas-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
          >
            <div
              role="presentation"
              className="atlas-lightbox-backdrop"
              onClick={close}
            />

            <motion.div
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-labelledby={headingId}
              onKeyDown={onPanelKeyDown}
              onClick={(e) => e.stopPropagation()}
              className="atlas-lightbox-panel outline-none"
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
              transition={transition}
            >
              <header className="atlas-lightbox-header">
                <div className="min-w-0">
                  <h2
                    id={headingId}
                    className="truncate t-mono text-ink tabular"
                  >
                    {activeScreen.label}
                  </h2>
                  <p
                    className="mt-1 t-mono text-ink-quiet tabular"
                    aria-live="polite"
                  >
                    {(activeIndex ?? 0) + 1}&nbsp;/&nbsp;{screens.length}
                    <span className="text-ink-faint">
                      &nbsp;·&nbsp;
                      {galleryTheme === "light" ? "Light" : "Dark"}
                    </span>
                  </p>
                </div>

                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={close}
                  className={clsx(
                    "t-mono inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center px-4 py-2 tabular",
                    "border border-transparent text-ink-quiet transition-colors hover:text-ink",
                    "focus-visible:border-signal focus-visible:outline-none",
                  )}
                  aria-label="Close gallery"
                >
                  CLOSE
                </button>
              </header>

              <div
                className="atlas-lightbox-stage"
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${activeScreen.id}-${galleryTheme}`}
                    initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0 }}
                    transition={crossfade}
                    className="atlas-lightbox-frame"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeAssets.fullSrc}
                      alt={`${activeScreen.alt} (${galleryTheme === "light" ? "Light" : "Dark"} mode)`}
                      width={activeAssets.width}
                      height={activeAssets.height}
                      decoding="async"
                      draggable={false}
                      className="atlas-lightbox-image"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <footer className="atlas-lightbox-footer">
                <button
                  type="button"
                  onClick={goPrev}
                  className={clsx(
                    "t-mono inline-flex min-h-11 items-center gap-2 px-3 py-2 tabular text-ink-mute transition-colors hover:text-ink",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
                  )}
                  aria-label="Previous screenshot"
                >
                  ←&nbsp;PREV
                </button>

                <ul
                  className="hidden items-center gap-2 sm:flex"
                  role="list"
                  aria-label="Screenshots"
                >
                  {screens.map((screen, index) => (
                    <li key={screen.id}>
                      <button
                        type="button"
                        onClick={() => openAt(index)}
                        aria-label={`Show ${screen.label}`}
                        aria-current={
                          index === activeIndex ? "true" : undefined
                        }
                        className={clsx(
                          "h-1.5 w-6 rounded-full transition-colors duration-300",
                          index === activeIndex
                            ? "bg-signal"
                            : "bg-[var(--hairline-strong)] hover:bg-ink-quiet",
                          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
                        )}
                      />
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={goNext}
                  className={clsx(
                    "t-mono inline-flex min-h-11 items-center gap-2 px-3 py-2 tabular text-ink-mute transition-colors hover:text-ink",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
                  )}
                  aria-label="Next screenshot"
                >
                  NEXT&nbsp;→
                </button>
              </footer>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
    );

  return (
    <div className={clsx("space-y-6 md:space-y-8", className)}>
      <AtlasGalleryThemeToggle
        value={galleryTheme}
        onChange={onThemeChange}
        available={availableThemes}
      />

      <ul
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
      >
        {screens.map((screen, index) => {
          const assets = resolveScreenAssets(screen, galleryTheme);
          if (!assets) return null;

          return (
            <li key={screen.id} className="relative">
              <figure
                className="atlas-screen-card relative overflow-hidden rounded-sm border bg-canvas-raised transition-[border-color] duration-300"
                style={{ borderColor: "var(--hairline)" }}
              >
                <div className="relative aspect-[16/12] bg-canvas-recessed">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`${screen.id}-${galleryTheme}`}
                      className="absolute inset-0"
                      initial={reduced ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={reduced ? undefined : { opacity: 0 }}
                      transition={crossfade}
                    >
                      <Image
                        src={assets.thumbnailSrc}
                        alt=""
                        width={assets.thumbWidth}
                        height={assets.thumbHeight}
                        loading={index < 3 ? "eager" : "lazy"}
                        priority={index === 0}
                        quality={95}
                        className="pointer-events-none h-full w-full object-contain object-top transition-transform duration-500 ease-[var(--ease-soft)] motion-reduce:transition-none"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <figcaption
                  className="pointer-events-none flex items-center justify-between gap-3 border-t px-4 py-3 md:px-5"
                  style={{ borderColor: "var(--hairline)" }}
                >
                  <span className="t-mono text-ink tabular">{screen.label}</span>
                  <span className="t-mono text-[0.6875rem] text-ink-quiet tabular transition-colors duration-300">
                    VIEW&nbsp;FULL&nbsp;SCREEN
                  </span>
                </figcaption>
              </figure>

              <button
                ref={(el) => {
                  triggerRefs.current[index] = el;
                }}
                type="button"
                onClick={() => openAt(index)}
                aria-haspopup="dialog"
                aria-expanded={open && activeIndex === index}
                aria-controls={open ? panelId : undefined}
                aria-label={`View ${screen.label} fullscreen`}
                className={clsx(
                  "atlas-screen-card-hit group absolute inset-0 z-10 rounded-sm touch-manipulation",
                  "[--tw-ring-offset-color:var(--canvas)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2",
                )}
              />
            </li>
          );
        })}
      </ul>

      {portal}
    </div>
  );
}
