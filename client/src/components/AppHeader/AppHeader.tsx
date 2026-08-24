import { LanguageToggle } from "../LanguageToggle/LanguageToggle";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { useLanguage } from "../../i18n/useLanguage";
import type { Theme } from "../../hooks/useTheme";
import React from "react";

interface Props {
  theme: Theme;
  onToggleTheme: () => void;
}

export const AppHeader: React.FC<Props> = ({ theme, onToggleTheme }) => {
  const { t } = useLanguage();

  return (
    <header className="w-full p-2.5 sm:p-3 rounded-sm border bg-white border-slate-300 dark:bg-[#1a1b26] dark:border-[#38bdf8]/40 flex flex-wrap justify-between items-center gap-2 shadow-xs">
      <div className="flex items-center gap-2 min-w-0">
        <span className="inline-block w-2.5 h-2.5 bg-emerald-500 dark:bg-[#9ece6a] rounded-full animate-pulse shrink-0" />
        <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-[#7aa2f7] tracking-wider uppercase truncate">
          {t("appTitle")}
        </span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
        <span className="hidden md:inline-block text-xs text-slate-500 dark:text-[#565f89]">
          [{t("modeLogic")}]
        </span>
        <LanguageToggle />
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
};