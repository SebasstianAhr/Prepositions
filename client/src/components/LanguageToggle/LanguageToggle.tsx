import { useLanguage } from "../../i18n/useLanguage";
import React from "react";

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "es" ? "en" : "es")}
      className="px-2 py-1 rounded-xs border border-slate-300 dark:border-[#3b4261] bg-white dark:bg-[#1a1b26] hover:bg-slate-100 dark:hover:bg-[#202330] text-slate-700 dark:text-[#7dcfff] text-xs font-mono transition-all active:translate-y-0.5 flex items-center gap-1.5 shadow-xs"
      title="Switch Language / Cambiar Idioma"
    >
      <span className="font-bold uppercase text-[10px] px-1 rounded-xs bg-slate-200 dark:bg-[#27293a] text-slate-700 dark:text-[#7dcfff]">
        {language}
      </span>
      <span>{language === "es" ? "ESPAÑOL" : "ENGLISH"}</span>
    </button>
  );
};
