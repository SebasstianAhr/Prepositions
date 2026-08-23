import { useState } from "react";
import { usePropositionBuilder } from "./hooks/usePropositionBuilder";
import { useTheme } from "./hooks/useTheme";
import { generateTruthTable } from "./domain/logic/evaluator";
import type { TruthTableData } from "./domain/logic/types";
import { ExpressionDisplay } from "./components/PropositionBuilder/Display/ExpressionDisplay";
import { OperatorKeyboard } from "./components/PropositionBuilder/Keyboard/OperatorKeyboard";
import { TruthTableGrid } from "./components/TruthTable/TruthTableGrid";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";
import { Icons } from "./components/common/Icon";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const {
    tokens,
    cursorIndex,
    setCursorIndex,
    validation,
    toastMessage,
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
    <div className="min-h-screen bg-[#16161e] text-[#a9b1d6] font-mono flex flex-col items-center p-2 sm:p-4 selection:bg-[#3d59a1]">
      {/* Shell / Main Terminal Container */}
      <div className="max-w-3xl w-full flex flex-col gap-3 my-auto">
        
        {/* Top TUI Bar */}
        <header className="w-full bg-[#1a1b26] border border-[#38bdf8]/40 p-2 sm:p-2.5 rounded-sm flex justify-between items-center shadow-md">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 bg-[#9ece6a] rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-[#7aa2f7] tracking-wider uppercase">
              SYS::TRUTH_TABLE_MONITOR v2.6
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs text-[#565f89]">
              [MODE: LOGIC_EVAL]
            </span>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </header>

        {/* Alerta Toast */}
        {toastMessage && (
          <div className="bg-[#1a1b26] border border-[#f7768e] text-[#f7768e] p-2.5 rounded-sm flex items-center justify-between shadow-lg text-xs sm:text-sm animate-fade-in">
            <div className="flex items-center gap-2">
              <Icons.AlertCircle className="w-4 h-4 shrink-0" />
              <span>[ERR] {toastMessage}</span>
            </div>
            <span className="text-[10px] text-[#565f89]">HALT</span>
          </div>
        )}

        {/* Main Panel */}
        <main className="w-full flex flex-col gap-3">
          {/* Visualizador de Expresión */}
          <section className="relative bg-[#1a1b26] border border-[#38bdf8]/40 rounded-sm p-3 pt-4 flex flex-col gap-2">
            <span className="absolute -top-2.5 left-3 bg-[#1a1b26] px-2 text-[10px] sm:text-xs font-bold text-[#38bdf8] uppercase tracking-wider border border-[#38bdf8]/30">
              [01]-INPUT_EXPRESSION
            </span>

            <ExpressionDisplay
              tokens={tokens}
              cursorIndex={cursorIndex}
              onSelectPosition={setCursorIndex}
            />

            {/* Controles de Navegación del Cursor */}
            <div className="flex justify-between items-center bg-[#13141c] p-1.5 rounded-sm border border-[#27293a]">
              <div className="flex gap-1.5">
                <button
                  onClick={moveCursorLeft}
                  className="px-2.5 py-1 bg-[#1a1b26] hover:bg-[#202330] border border-[#3b4261] text-[#7dcfff] rounded-xs text-xs font-bold transition-all active:translate-y-0.5"
                  title="Mover cursor izquierda"
                >
                  &lt; LEFT
                </button>
                <button
                  onClick={moveCursorRight}
                  className="px-2.5 py-1 bg-[#1a1b26] hover:bg-[#202330] border border-[#3b4261] text-[#7dcfff] rounded-xs text-xs font-bold transition-all active:translate-y-0.5"
                  title="Mover cursor derecha"
                >
                  RIGHT &gt;
                </button>
              </div>

              <div className="flex gap-1.5">
                <button
                  onClick={deleteLeft}
                  className="px-2.5 py-1 bg-[#1a1b26] hover:bg-[#f7768e]/20 border border-[#f7768e]/50 text-[#f7768e] rounded-xs text-xs font-bold transition-all active:translate-y-0.5"
                >
                  DEL
                </button>
                <button
                  onClick={clearAll}
                  className="px-2.5 py-1 bg-[#1a1b26] hover:bg-[#f7768e]/20 border border-[#f7768e]/50 text-[#f7768e] rounded-xs text-xs font-bold transition-all active:translate-y-0.5"
                  title="Limpiar todo"
                >
                  CLR
                </button>
              </div>
            </div>
          </section>

          {/* Panel Informativo / Guía */}
          <div className="bg-[#1a1b26] border border-[#e0af68]/40 p-2.5 rounded-sm flex items-start gap-2.5 text-xs text-[#e0af68]">
            <Icons.HelpCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#e0af68]" />
            <p className="leading-relaxed">
              <span className="font-bold uppercase">[GUIDE]:</span> {validation.guidanceMessage}
            </p>
          </div>

          {/* Teclado */}
          <section className="relative bg-[#1a1b26] border border-[#2ac3de]/40 rounded-sm p-3 pt-4">
            <span className="absolute -top-2.5 left-3 bg-[#1a1b26] px-2 text-[10px] sm:text-xs font-bold text-[#2ac3de] uppercase tracking-wider border border-[#2ac3de]/30">
              [02]-OPERATORS_PAD
            </span>
            <OperatorKeyboard validation={validation} onInsert={insertToken} />
          </section>

          {/* Botón de Ejecución */}
          <button
            disabled={!validation.isValid}
            onClick={handleGenerateTable}
            className="w-full py-2.5 bg-[#202330] hover:bg-[#9ece6a]/20 border border-[#9ece6a] text-[#9ece6a] font-bold text-xs sm:text-sm tracking-wider uppercase rounded-sm shadow-md disabled:opacity-30 disabled:pointer-events-none transition-all active:translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Icons.Table className="w-4 h-4" />
            [EXECUTE_EVALUATION]
          </button>

          {/* Resultados */}
          {truthTable && (
            <section className="relative bg-[#1a1b26] border border-[#7aa2f7]/40 rounded-sm p-3 pt-4 mt-2">
              <span className="absolute -top-2.5 left-3 bg-[#1a1b26] px-2 text-[10px] sm:text-xs font-bold text-[#7aa2f7] uppercase tracking-wider border border-[#7aa2f7]/30">
                [03]-TRUTH_TABLE_OUTPUT
              </span>
              <TruthTableGrid data={truthTable} />
            </section>
          )}
        </main>

        {/* Bottom Status Bar */}
        <footer className="w-full bg-[#13141c] border border-[#27293a] px-3 py-1.5 rounded-sm flex justify-between items-center text-[10px] text-[#565f89]">
          <div>STATUS: READY</div>
          <div className="flex gap-3">
            <span>MEM: OPTIMAL</span>
            <span>UTF-8</span>
          </div>
        </footer>
      </div>
    </div>
  );
}