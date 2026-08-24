import { useLanguage } from "../../i18n/useLanguage";
import { Icons } from "./Icon";
import React from "react";

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full mt-4 pt-4 border-t border-slate-300 dark:border-[#27293a] flex flex-col gap-3 font-mono text-xs text-slate-600 dark:text-[#565f89] transition-colors">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex flex-col gap-1.5 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleScrollToTop}
              title={t("footerReturnTop")}
              className="font-bold text-slate-800 dark:text-[#7dcfff] hover:text-cyan-600 dark:hover:text-[#38bdf8] transition-all focus:outline-hidden focus:ring-1 focus:ring-cyan-500 rounded-xs flex items-center gap-2 group cursor-pointer"
            >
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-xs bg-slate-200/70 dark:bg-[#1f2335] border border-slate-300/80 dark:border-[#3b4261] group-hover:border-cyan-500/50 dark:group-hover:border-[#38bdf8]/50 transition-colors">
                <Icons.Terminal className="w-3.5 h-3.5 text-cyan-600 dark:text-[#38bdf8] group-hover:scale-110 transition-transform" />
                <span className="text-[11px] text-cyan-700 dark:text-[#38bdf8]">
                  SYS
                </span>
              </div>
              <span className="text-xs tracking-tight">{t("byAuthor")}</span>
            </button>
            <span className="text-[10px] opacity-40">•</span>
            <span className="text-[11px] text-slate-500 dark:text-[#565f89]">
              {t("devRole")}
            </span>
          </div>

          <p className="text-[11px] italic text-slate-500 dark:text-[#565f89] wrap-break-word">
            "{t("footerQuote")}"
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto ml-auto shrink-0">
          <a
            href="https://github.com/SebasstianAhr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub SebasstianAhr"
            className="p-1.5 rounded-xs border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-[#3b4261] dark:bg-[#1a1b26] dark:text-[#7dcfff] dark:hover:bg-[#202330] transition-colors focus:outline-hidden focus:ring-1 focus:ring-cyan-500 flex items-center gap-1 text-[11px]"
          >
            <Icons.Github className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">GitHub</span>
          </a>

          <a
            href="https://linkedin.com/in/sebastian-rengifo-792060331"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Sebastian Rengifo"
            className="p-1.5 rounded-xs border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-[#3b4261] dark:bg-[#1a1b26] dark:text-[#7dcfff] dark:hover:bg-[#202330] transition-colors focus:outline-hidden focus:ring-1 focus:ring-cyan-500 flex items-center gap-1 text-[11px]"
          >
            <Icons.Linkedin className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">LinkedIn</span>
          </a>

          <button
            onClick={handleScrollToTop}
            aria-label={t("footerReturnTop")}
            className="p-1.5 rounded-xs border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-[#3b4261] dark:bg-[#1a1b26] dark:text-[#7dcfff] dark:hover:bg-[#202330] transition-colors focus:outline-hidden focus:ring-1 focus:ring-cyan-500 flex items-center gap-1 text-[11px] active:translate-y-0.5 cursor-pointer"
          >
            <Icons.ArrowUp className="w-3.5 h-3.5" />
            <span className="uppercase text-[10px] font-bold hidden sm:inline">
              {t("footerReturnTop")}
            </span>
          </button>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-200 dark:border-[#1c1d2b] flex flex-col sm:flex-row justify-between items-end sm:items-center gap-1 text-[10px] opacity-80">
        <div>
          © {currentYear} SebasstianAhr. {t("footerRights")}.
        </div>
        <div className="flex items-center gap-2 font-mono self-end sm:self-auto">
          <span className="text-emerald-600 dark:text-[#9ece6a]">
            ● ENV: PROD
          </span>
          <span className="opacity-40">|</span>
          <span className="text-cyan-700 dark:text-[#7dcfff] font-bold">
            v_ssj
          </span>
        </div>
      </div>
    </footer>
  );
};