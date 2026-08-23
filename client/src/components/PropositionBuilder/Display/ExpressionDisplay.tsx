import React from "react";
import type { Token } from "../../../domain/logic/types";

interface Props {
  tokens: Token[];
  cursorIndex: number;
  onSelectPosition: (index: number) => void;
}

export const ExpressionDisplay: React.FC<Props> = ({
  tokens,
  cursorIndex,
  onSelectPosition,
}) => {
  return (
    <div className="w-full min-h-20 p-4 bg-slate-100 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-2xl flex items-center flex-nowrap gap-1 cursor-pointer transition-all shadow-inner overflow-x-auto touch-pan-x whitespace-nowrap">
      {/* Cursor en la posición 0 */}
      <span
        onClick={() => onSelectPosition(0)}
        className={`w-0.5 h-7 sm:h-8 rounded-full transition-all shrink-0 ${
          cursorIndex === 0
            ? "bg-cyan-500 dark:bg-cyan-400 animate-pulse scale-110 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
            : "bg-transparent hover:bg-slate-400/50 dark:hover:bg-slate-600/50"
        }`}
      />

      {tokens.length === 0 && (
        <p className="text-slate-400 dark:text-slate-500 select-none text-base sm:text-lg italic font-sans whitespace-normal">
          Construye tu expresión usando los botones...
        </p>
      )}

      {tokens.map((token, idx) => (
        <React.Fragment key={token.id}>
          {/* Carácter de la Expresión */}
          <span
            onClick={() => onSelectPosition(idx + 1)}
            className="text-xl sm:text-2xl font-bold font-mono tracking-wide text-slate-800 dark:text-slate-100 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors select-none px-0.5 shrink-0"
          >
            {token.value}
          </span>

          {/* Cursor entre caracteres */}
          <span
            onClick={() => onSelectPosition(idx + 1)}
            className={`w-0.5 h-7 sm:h-8 rounded-full transition-all shrink-0 ${
              cursorIndex === idx + 1
                ? "bg-cyan-500 dark:bg-cyan-400 animate-pulse scale-110 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                : "bg-transparent hover:bg-slate-400/50 dark:hover:bg-slate-600/50"
            }`}
          />
        </React.Fragment>
      ))}
    </div>
  );
};
