"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { THEME_STORAGE_KEY } from "./theme-init";

export type ThemePreference = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  /** The user's chosen preference. */
  preference: ThemePreference;
  /** The currently rendered theme after resolving "system". */
  resolved: ResolvedTheme;
  /** Set a specific preference. Persists to localStorage. */
  setPreference: (next: ThemePreference) => void;
  /** Cycle: system → light → dark → system. */
  cycle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const ORDER: ThemePreference[] = ["system", "light", "dark"];

function readPreference(): ThemePreference {
  if (typeof window === "undefined") return "system";
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (raw === "light" || raw === "dark" || raw === "system") return raw;
  } catch {
    /* localStorage unavailable */
  }
  return "system";
}

function resolveSystem(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyResolved(resolved: ResolvedTheme) {
  if (typeof document === "undefined") return;
  const el = document.documentElement;
  el.setAttribute("data-theme", resolved);
  el.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // SSR renders with dark default. The inline init script in <head> flips
  // <html data-theme> before paint. We hydrate to that same value here.
  const [preference, setPreferenceState] = useState<ThemePreference>("system");
  const [resolved, setResolved] = useState<ResolvedTheme>("dark");

  // First mount: sync state to whatever the inline script (or localStorage) decided.
  useEffect(() => {
    const pref = readPreference();
    setPreferenceState(pref);
    const r = pref === "system" ? resolveSystem() : pref;
    setResolved(r);
    applyResolved(r);
  }, []);

  // While in "system" mode, follow OS preference changes live.
  useEffect(() => {
    if (preference !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      const next: ResolvedTheme = mq.matches ? "light" : "dark";
      setResolved(next);
      applyResolved(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [preference]);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* localStorage unavailable */
    }
    const r = next === "system" ? resolveSystem() : next;
    setResolved(r);
    applyResolved(r);
  }, []);

  const cycle = useCallback(() => {
    const idx = ORDER.indexOf(preference);
    const next = ORDER[(idx + 1) % ORDER.length];
    setPreference(next);
  }, [preference, setPreference]);

  const value = useMemo<ThemeContextValue>(
    () => ({ preference, resolved, setPreference, cycle }),
    [preference, resolved, setPreference, cycle]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return ctx;
}
