import { ExpressionDisplay } from "../Display/ExpressionDisplay";
import type { Token } from "../../../domain/logic/types";
import { useLanguage } from "../../../i18n/useLanguage";
import React from "react";

interface Props {
  tokens: Token[];
  cursorIndex: number;
  onSelectPosition: (index: number) => void;
  onMoveCursorLeft: () => void;
  onMoveCursorRight: () => void;
  onDeleteLeft: () => void;
  onClearAll: () => void;
}

export const PropositionInput: React.FC<Props> = ({
  tokens,
  cursorIndex,
  onSelectPosition,
  onMoveCursorLeft,
  onMoveCursorRight,
  onDeleteLeft,
  onClearAll,
}) => {
  const { t } = useLanguage();

  return (
    <section className="relative p-3 pt-4 rounded-sm border bg-white border-slate-300 dark:bg-[#1a1b26] dark:border-[#38bdf8]/40 flex flex-col gap-2.5 shadow-xs">
      <span className="absolute -top-2.5 left-3 px-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-xs border bg-white text-cyan-700 border-cyan-300 dark:bg-[#1a1b26] dark:text-[#38bdf8] dark:border-[#38bdf8]/30">
        {t("inputSection")}
      </span>

      <ExpressionDisplay
        tokens={tokens}
        cursorIndex={cursorIndex}
        onSelectPosition={onSelectPosition}
      />

      <div className="flex justify-between items-center gap-1 sm:gap-2 p-1.5 rounded-xs border bg-slate-100 border-slate-200 dark:bg-[#13141c] dark:border-[#27293a]">
        <div className="flex gap-1 sm:gap-1.5 shrink-0">
          <button
            onClick={onMoveCursorLeft}
            className="py-1.5 px-1.5 sm:px-2 rounded-xs border text-[11px] sm:text-xs font-bold bg-white border-slate-300 text-cyan-700 hover:bg-slate-50 dark:bg-[#1a1b26] dark:border-[#3b4261] dark:text-[#7dcfff] dark:hover:bg-[#202330] transition-all active:translate-y-0.5 text-center"
          >
            {t("btnLeft")}
          </button>
          <button
            onClick={onMoveCursorRight}
            className="py-1.5 px-1.5 sm:px-2 rounded-xs border text-[11px] sm:text-xs font-bold bg-white border-slate-300 text-cyan-700 hover:bg-slate-50 dark:bg-[#1a1b26] dark:border-[#3b4261] dark:text-[#7dcfff] dark:hover:bg-[#202330] transition-all active:translate-y-0.5 text-center"
          >
            {t("btnRight")}
          </button>
        </div>

        <div className="flex gap-1 sm:gap-1.5 shrink-0">
          <button
            onClick={onDeleteLeft}
            className="py-1.5 px-1.5 sm:px-2 rounded-xs border text-[11px] sm:text-xs font-bold bg-white border-rose-200 text-rose-600 hover:bg-rose-50 dark:bg-[#1a1b26] dark:border-[#f7768e]/50 dark:text-[#f7768e] dark:hover:bg-[#f7768e]/20 transition-all active:translate-y-0.5 text-center"
          >
            {t("btnDel")}
          </button>
          <button
            onClick={onClearAll}
            className="py-1.5 px-1.5 sm:px-2 rounded-xs border text-[11px] sm:text-xs font-bold bg-white border-rose-200 text-rose-600 hover:bg-rose-50 dark:bg-[#1a1b26] dark:border-[#f7768e]/50 dark:text-[#f7768e] dark:hover:bg-[#f7768e]/20 transition-all active:translate-y-0.5 text-center"
          >
            {t("btnClear")}
          </button>
        </div>
      </div>
    </section>
  );
};
