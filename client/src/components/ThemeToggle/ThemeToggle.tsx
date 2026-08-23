import React from "react";
import { Icons } from "../common/Icon";
import type { Theme } from "../../hooks/useTheme";

interface Props {
  theme: Theme;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<Props> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2.5 rounded-xl border transition-all active:scale-95 bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700"
      title={
        theme === "dark" ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"
      }
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Icons.Sun className="w-5 h-5 text-amber-400" />
      ) : (
        <Icons.Moon className="w-5 h-5 text-indigo-600" />
      )}
    </button>
  );
};
