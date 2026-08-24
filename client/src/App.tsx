import { PropositionInput } from "./components/PropositionBuilder/PropositionInput/PropositionInput";
import { OperatorKeyboard } from "./components/PropositionBuilder/Keyboard/OperatorKeyboard";
import { TruthTableSection } from "./components/TruthTable/TruthTableSection";
import { GuidanceMessage } from "./components/GuidanceMessage/GuidanceMessage";
import { usePropositionBuilder } from "./hooks/usePropositionBuilder";
import { generateTruthTable } from "./domain/logic/evaluator";
import type { TruthTableData } from "./domain/logic/types";
import { AppHeader } from "./components/AppHeader/AppHeader";
import { StatusBar } from "./components/common/StatusBar";
import { LanguageProvider } from "./i18n/LanguageContext";
import { Footer } from "./components/common/Footer";
import { useLanguage } from "./i18n/useLanguage";
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

  return (
    <div className="min-h-screen font-mono flex flex-col items-center justify-between p-3 sm:p-4 bg-slate-100 text-slate-800 dark:bg-[#16161e] dark:text-[#a9b1d6] transition-colors duration-200 selection:bg-cyan-200 dark:selection:bg-[#3d59a1] overflow-x-hidden">
      <div className="max-w-3xl w-full min-w-0 flex flex-col gap-3 my-auto mx-auto">
        <AppHeader theme={theme} onToggleTheme={toggleTheme} />

        <main className="w-full min-w-0 flex flex-col gap-3">
          <PropositionInput
            tokens={tokens}
            cursorIndex={cursorIndex}
            onSelectPosition={setCursorIndex}
            onMoveCursorLeft={moveCursorLeft}
            onMoveCursorRight={moveCursorRight}
            onDeleteLeft={deleteLeft}
            onClearAll={clearAll}
          />

          <GuidanceMessage validation={validation} />

          <section className="relative p-3 pt-4 rounded-sm border bg-white border-slate-300 dark:bg-[#1a1b26] dark:border-[#2ac3de]/40 shadow-xs">
            <span className="absolute -top-2.5 left-3 px-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-xs border bg-white text-cyan-700 border-cyan-300 dark:bg-[#1a1b26] dark:text-[#2ac3de] dark:border-[#2ac3de]/30">
              {t("operatorsSection")}
            </span>
            <OperatorKeyboard validation={validation} onInsert={insertToken} />
          </section>

          <TruthTableSection
            validation={validation}
            truthTable={truthTable}
            onGenerateTable={handleGenerateTable}
          />
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