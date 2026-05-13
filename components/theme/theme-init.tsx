/**
 * Flash-free theme init.
 *
 * Renders an inline <script> that runs synchronously before any styles paint:
 *   1. Reads localStorage.theme ("system" | "light" | "dark", default "system").
 *   2. If preference is "system", resolves via matchMedia.
 *   3. Sets <html data-theme="..."> and the matching color-scheme.
 *
 * Lives in <head> as the first child so it fires before the body renders.
 * The runtime ThemeProvider mounts after hydration and matches this result.
 */

export const THEME_STORAGE_KEY = "theme";

const SCRIPT = `(function(){try{var k="${THEME_STORAGE_KEY}";var s=localStorage.getItem(k);var p=(s==="light"||s==="dark"||s==="system")?s:"system";var resolved=p;if(p==="system"){resolved=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}var d=document.documentElement;d.setAttribute("data-theme",resolved);d.style.colorScheme=resolved;}catch(_){}}());`;

export function ThemeInit() {
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: SCRIPT }}
    />
  );
}
