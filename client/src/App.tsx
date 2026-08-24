import { ExpressionDisplay } from "./components/PropositionBuilder/Display/ExpressionDisplay";
import { OperatorKeyboard } from "./components/PropositionBuilder/Keyboard/OperatorKeyboard";
import { LanguageToggle } from "./components/LanguageToggle/LanguageToggle";
import { TruthTableGrid } from "./components/TruthTable/TruthTableGrid";
import { usePropositionBuilder } from "./hooks/usePropositionBuilder";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";
import { generateTruthTable } from "./domain/logic/evaluator";
import type { TruthTableData } from "./domain/logic/types";
import { StatusBar } from "./components/common/StatusBar";
import { LanguageProvider } from "./i18n/LanguageContext";
import { Footer } from "./components/common/Footer";
import type { TranslationKey } from "./i18n/types";
import { useLanguage } from "./i18n/useLanguage";
import { Icons } from "./components/common/Icon";
import { useTheme } from "./hooks/useTheme";
import { useState } from "react";

function MainApp() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const {
    tokens,
    cursorIndex,
    setCursorIndex,
    validation,
    insertToken,
    moveCursorLeft,
    moveCursorRight,
    deleteLeft,
    clearAll,
  } = usePropositionBuilder();

  const [truthTable, setTruthTable] = useState<TruthTableData | null>(null);

  const handleGenerateTable = () => {
    if (!validation.isValid) return;
    const table = generateTruthTable(tokens);
    setTruthTable(table);
  };

  const resolvedGuidanceMessage = validation.guidanceMessageKey
    ? t(validation.guidanceMessageKey as TranslationKey)
    : validation.guidanceMessage;

  return (
    <div className="min-h-screen font-mono flex flex-col items-center justify-between p-3 sm:p-4 bg-slate-100 text-slate-800 dark:bg-[#16161e] dark:text-[#a9b1d6] transition-colors duration-200 selection:bg-cyan-200 dark:selection:bg-[#3d59a1] overflow-x-hidden">
      <div className="max-w-3xl w-full min-w-0 flex flex-col gap-3 my-auto mx-auto">
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
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </header>

        <main className="w-full min-w-0 flex flex-col gap-3">
          <section className="relative p-3 pt-4 rounded-sm border bg-white border-slate-300 dark:bg-[#1a1b26] dark:border-[#38bdf8]/40 flex flex-col gap-2.5 shadow-xs">
            <span className="absolute -top-2.5 left-3 px-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-xs border bg-white text-cyan-700 border-cyan-300 dark:bg-[#1a1b26] dark:text-[#38bdf8] dark:border-[#38bdf8]/30">
              {t("inputSection")}
            </span>

            <ExpressionDisplay
              tokens={tokens}
              cursorIndex={cursorIndex}
              onSelectPosition={setCursorIndex}
            />

            <div className="flex flex-wrap justify-between items-center gap-2 p-1.5 rounded-xs border bg-slate-100 border-slate-200 dark:bg-[#13141c] dark:border-[#27293a]">
              <div className="flex gap-1.5 flex-1 min-w-32.5">
                <button
                  onClick={moveCursorLeft}
                  className="flex-1 py-1.5 px-2 rounded-xs border text-xs font-bold bg-white border-slate-300 text-cyan-700 hover:bg-slate-50 dark:bg-[#1a1b26] dark:border-[#3b4261] dark:text-[#7dcfff] dark:hover:bg-[#202330] transition-all active:translate-y-0.5 text-center"
                >
                  {t("btnLeft")}
                </button>
                <button
                  onClick={moveCursorRight}
                  className="flex-1 py-1.5 px-2 rounded-xs border text-xs font-bold bg-white border-slate-300 text-cyan-700 hover:bg-slate-50 dark:bg-[#1a1b26] dark:border-[#3b4261] dark:text-[#7dcfff] dark:hover:bg-[#202330] transition-all active:translate-y-0.5 text-center"
                >
                  {t("btnRight")}
                </button>
              </div>

              <div className="flex gap-1.5 flex-1 min-w-32.5">
                <button
                  onClick={deleteLeft}
                  className="flex-1 py-1.5 px-2 rounded-xs border text-xs font-bold bg-white border-rose-200 text-rose-600 hover:bg-rose-50 dark:bg-[#1a1b26] dark:border-[#f7768e]/50 dark:text-[#f7768e] dark:hover:bg-[#f7768e]/20 transition-all active:translate-y-0.5 text-center"
                >
                  {t("btnDel")}
                </button>
                <button
                  onClick={clearAll}
                  className="flex-1 py-1.5 px-2 rounded-xs border text-xs font-bold bg-white border-rose-200 text-rose-600 hover:bg-rose-50 dark:bg-[#1a1b26] dark:border-[#f7768e]/50 dark:text-[#f7768e] dark:hover:bg-[#f7768e]/20 transition-all active:translate-y-0.5 text-center"
                >
                  {t("btnClear")}
                </button>
              </div>
            </div>
          </section>

          <div className="p-2.5 rounded-sm border bg-amber-50 border-amber-200 text-amber-800 dark:bg-[#1a1b26] dark:border-[#e0af68]/40 dark:text-[#e0af68] flex items-start gap-2.5 text-xs shadow-xs">
            <Icons.HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="leading-relaxed wrap-break-word min-w-0">
              <span className="font-bold uppercase">[{t("guideLabel")}]:</span>{" "}
              {resolvedGuidanceMessage}
            </p>
          </div>

          <section className="relative p-3 pt-4 rounded-sm border bg-white border-slate-300 dark:bg-[#1a1b26] dark:border-[#2ac3de]/40 shadow-xs">
            <span className="absolute -top-2.5 left-3 px-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-xs border bg-white text-cyan-700 border-cyan-300 dark:bg-[#1a1b26] dark:text-[#2ac3de] dark:border-[#2ac3de]/30">
              {t("operatorsSection")}
            </span>
            <OperatorKeyboard validation={validation} onInsert={insertToken} />
          </section>

          <button
            disabled={!validation.isValid}
            onClick={handleGenerateTable}
            className="w-full py-2.5 px-3 rounded-xs border font-bold text-xs sm:text-sm tracking-wider uppercase bg-emerald-600 border-emerald-700 text-white hover:bg-emerald-500 dark:bg-[#202330] dark:border-[#9ece6a] dark:text-[#9ece6a] dark:hover:bg-[#9ece6a]/20 disabled:opacity-30 disabled:pointer-events-none transition-all active:translate-y-0.5 flex items-center justify-center gap-2 shadow-xs"
          >
            <Icons.Table className="w-4 h-4 shrink-0" />
            <span>{t("execute")}</span>
          </button>

          {truthTable && (
            <section className="relative p-3 pt-4 rounded-sm border bg-white border-slate-300 dark:bg-[#1a1b26] dark:border-[#7aa2f7]/40 mt-2 shadow-xs overflow-x-auto">
              <span className="absolute -top-2.5 left-3 px-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-xs border bg-white text-blue-700 border-blue-300 dark:bg-[#1a1b26] dark:text-[#7aa2f7] dark:border-[#7aa2f7]/30">
                {t("outputSection")}
              </span>
              <TruthTableGrid data={truthTable} />
            </section>
          )}
        </main>

        <StatusBar />

        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
