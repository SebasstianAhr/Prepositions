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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center p-4 sm:p-6 font-sans transition-colors duration-200">
      {/* Barra Superior */}
      <header className="max-w-2xl w-full flex justify-between items-center my-4">
        <div className="text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-linear-to-r from-cyan-600 to-emerald-600 dark:from-cyan-400 dark:to-emerald-400 bg-clip-text text-transparent">
            Simulador de Tablas de Verdad
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
            Construye expresiones lógicas con p, q, r.
          </p>
        </div>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      {/* Toast Alerta */}
      {toastMessage && (
        <div className="fixed top-5 right-5 bg-rose-600 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-rose-400 animate-bounce z-50">
          <Icons.AlertCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <main className="max-w-2xl w-full flex flex-col gap-5">
        {/* Visualizador de Expresión */}
        <section className="flex flex-col gap-3">
          <ExpressionDisplay
            tokens={tokens}
            cursorIndex={cursorIndex}
            onSelectPosition={setCursorIndex}
          />

          {/* Controles del Cursor */}
          <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-300 dark:border-slate-800 shadow-sm">
            <div className="flex gap-2">
              <button
                onClick={moveCursorLeft}
                className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                title="Mover cursor izquierda"
              >
                <Icons.ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              </button>
              <button
                onClick={moveCursorRight}
                className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                title="Mover cursor derecha"
              >
                <Icons.ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={deleteLeft}
                className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950/50 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                <Icons.Delete className="w-5 h-5" /> Borrar
              </button>
              <button
                onClick={clearAll}
                className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-900/60 rounded-lg transition-colors"
                title="Limpiar todo"
              >
                <Icons.Trash2 className="w-5 h-5 text-rose-500 dark:text-rose-400" />
              </button>
            </div>
          </div>
        </section>

        {/* Mensaje Pedagógico Fijo */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 flex items-start gap-3 shadow-sm">
          <Icons.HelpCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {validation.guidanceMessage}
          </p>
        </div>

        {/* Teclado */}
        <OperatorKeyboard validation={validation} onInsert={insertToken} />

        {/* Botón Generar Tabla */}
        <button
          disabled={!validation.isValid}
          onClick={handleGenerateTable}
          className="w-full py-4 bg-linear-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-lg rounded-2xl shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Icons.Table className="w-6 h-6" />
          Generar Tabla de Verdad
        </button>

        {/* Resultados de la Tabla */}
        {truthTable && (
          <section className="mt-4 flex flex-col gap-3">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
              Resultado de la Tabla de Verdad
            </h2>
            <TruthTableGrid data={truthTable} />
          </section>
        )}
      </main>
    </div>
  );
}
