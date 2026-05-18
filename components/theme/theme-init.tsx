/**
 * Flash-free theme init.
 *
 * Runs before React hydrates (`next/script` + `beforeInteractive`):
 *   1. Reads localStorage.theme ("system" | "light" | "dark", default "system").
 *   2. If preference is "system", resolves via matchMedia.
 *   3. Sets <html data-theme="..."> and the matching color-scheme.
 *
 * Kept in root `app/layout.tsx` <head> before other scripts so correct tokens
 * paint on first frame. Runtime `ThemeProvider` matches this after hydration.
 */

import Script from "next/script";

export const THEME_STORAGE_KEY = "theme";

const SCRIPT = `(function(){try{var k="${THEME_STORAGE_KEY}";var s=localStorage.getItem(k);var p=(s==="light"||s==="dark"||s==="system")?s:"system";var resolved=p;if(p==="system"){resolved=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}var d=document.documentElement;d.setAttribute("data-theme",resolved);d.style.colorScheme=resolved;}catch(_){}}());`;

export function ThemeInit() {
  return (
    <Script id="flash-free-theme-init" strategy="beforeInteractive">
      {SCRIPT}
    </Script>
  );
}
