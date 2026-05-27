"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { scrollToTop } from "@/components/motion/lenis-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const NAV_ITEMS = [
  { href: "/", label: "Index" },
  { href: "/work/voice-moderation", label: "Work" },
  { href: "/practice/ai-for-product-designers", label: "Practice" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const HOME_HREF = "/";
const PRACTICE_HREF = "/practice/ai-for-product-designers";

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pendingTopReset = useRef(false);

  const handleTopResetClick =
    (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      pendingTopReset.current = true;

      if (pathname === href) {
        event.preventDefault();
        pendingTopReset.current = false;
        scrollToTop({ immediate: false });
      }
    };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // After client navigation via logo or Practice, force top-of-page under Lenis.
  useEffect(() => {
    if (!pendingTopReset.current) return;
    if (pathname !== HOME_HREF && pathname !== PRACTICE_HREF) return;

    pendingTopReset.current = false;
    requestAnimationFrame(() => scrollToTop({ immediate: true }));
  }, [pathname]);

  // Lock scroll when mobile menu open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-40 transition-[backdrop-filter,background-color] duration-500",
          (scrolled || open) && "backdrop-blur-md"
        )}
        style={{
          backgroundColor:
            scrolled || open ? "var(--nav-scrim)" : "transparent",
        }}
      >
        <div
          className="mx-auto flex items-center justify-between px-[var(--gutter)] py-4"
          style={{ maxWidth: "var(--max-outer)" }}
        >
          <Link
            href="/"
            onClick={handleTopResetClick(HOME_HREF)}
            aria-label="Elvis Fernandes — home"
            className="t-mono text-ink hover:text-signal transition-colors duration-300"
          >
            ELVIS&nbsp;FERNANDES
            <span className="hidden sm:inline text-ink-quiet">&nbsp;/&nbsp;PORTFOLIO&nbsp;2026</span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.slice(1).map((item) => {
                const active = isActive(item.href, pathname);
                const topResetProps =
                  item.href === PRACTICE_HREF
                    ? { onClick: handleTopResetClick(PRACTICE_HREF) }
                    : {};
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      {...topResetProps}
                      className={clsx(
                        "t-mono link-underline transition-colors duration-300",
                        active ? "text-ink" : "text-ink-mute hover:text-ink"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            <Link
              href="/contact"
              className="t-mono link-underline text-ink-quiet hover:text-ink transition-colors duration-300 tabular"
            >
              SAY&nbsp;HELLO&nbsp;→
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex min-h-11 min-w-11 shrink-0 items-center justify-center py-2 t-mono text-ink md:hidden touch-manipulation"
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 bg-canvas pt-24 px-[var(--gutter)] md:hidden"
          >
            <nav aria-label="Primary mobile">
              <ul className="space-y-6 pt-8">
                {NAV_ITEMS.slice(1).map((item, i) => {
                  const active = isActive(item.href, pathname);
                  const topResetProps =
                    item.href === PRACTICE_HREF
                      ? { onClick: handleTopResetClick(PRACTICE_HREF) }
                      : {};
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.08 + i * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="hairline-b pb-6"
                    >
                      <Link
                        href={item.href}
                        {...topResetProps}
                        className={clsx(
                          "block t-display-m font-display transition-colors duration-300",
                          active ? "text-ink" : "text-ink-mute hover:text-ink"
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-12 flex items-center justify-between t-mono text-ink-quiet">
                <Link href="/contact" className="tabular link-underline text-ink">
                  SAY&nbsp;HELLO&nbsp;→
                </Link>
                <a
                  href="mailto:elvisfdesign@gmail.com"
                  className="link-underline text-ink-mute"
                >
                  ELVISFDESIGN@…
                </a>
              </div>

              <div className="mt-8 hairline-t pt-6 flex items-center justify-between t-mono text-ink-quiet">
                <span className="tabular">THEME</span>
                <ThemeToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  // Normalise to first two path segments for "Work" → /work/*
  const prefix = href.split("/").slice(0, 2).join("/");
  return pathname === href || pathname.startsWith(prefix + "/");
}
