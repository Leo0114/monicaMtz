export type Theme = "light" | "dark";

const STORAGE_KEY = "mm-theme";

export function getTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* storage bloqueado: usar preferencia del sistema */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function toggleTheme() {
  const next: Theme = getTheme() === "dark" ? "light" : "dark";
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* noop */
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Cross-fade de toda la página para evitar un salto brusco de brillo.
  if (!reduceMotion && "startViewTransition" in document) {
    document.startViewTransition(() => applyTheme(next));
  } else {
    applyTheme(next);
  }
}
