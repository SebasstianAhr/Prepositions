import { useState, useEffect, useCallback } from "react";

export type Theme = "dark" | "light";

const LOCAL_STORAGE_KEY = "theme";

export function useTheme() {
  const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY) as Theme | null;
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const applyThemeToDocument = useCallback((targetTheme: Theme) => {
    const root = document.documentElement;
    if (targetTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    applyThemeToDocument(theme);
    localStorage.setItem(LOCAL_STORAGE_KEY, theme);
  }, [theme, applyThemeToDocument]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme };
}
