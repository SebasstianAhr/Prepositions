import { useLanguage } from "../../i18n/useLanguage";
import type { Theme } from "../../hooks/useTheme";
import { Icons } from "../common/Icon";
import React from "react";

interface Props {
  theme: Theme;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<Props> = ({ theme, onToggle }) => {
  const { t } = useLanguage();

  return (
    <button
      onClick={onToggle}
      className="px-2 py-1 rounded-xs border border-slate-300 dark:border-[#3b4261] bg-white dark:bg-[#1a1b26] hover:bg-slate-100 dark:hover:bg-[#202330] text-slate-700 dark:text-[#7dcfff] text-xs font-mono transition-all active:translate-y-0.5 flex items-center gap-1.5 shadow-xs"
      title="Toggle Theme"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <>
          <Icons.Sun className="w-3.5 h-3.5 text-amber-500 dark:text-[#e0af68]" />
          <span className="hidden sm:inline">{t("themeDark")}</span>
        </>
      ) : (
        <>
          <Icons.Moon className="w-3.5 h-3.5 text-cyan-700 dark:text-[#7aa2f7]" />
          <span className="hidden sm:inline">{t("themeLight")}</span>
        </>
      )}
    </button>
  );
};
