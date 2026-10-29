import { useEffect, useState } from "react";

const torontoFmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Toronto",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function useTorontoTime() {
  const [t, setT] = useState(() => torontoFmt.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setT(torontoFmt.format(new Date())), 15_000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

type Theme = "light" | "dark";
const prefersDark = () => matchMedia("(prefers-color-scheme: dark)").matches;

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      /* storage blocked */
    }
    return prefersDark() ? "dark" : "light";
  });
  const [explicit, setExplicit] = useState(() => {
    try { return !!localStorage.getItem("theme"); } catch { return false; }
  });

  useEffect(() => {
    if (explicit) document.documentElement.dataset.theme = theme;
  }, [theme, explicit]);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setExplicit(true);
    setTheme(next);
    try { localStorage.setItem("theme", next); } catch { /* fine */ }
  };
  return { theme, toggle };
}
