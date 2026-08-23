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
    <div className="w-full min-h-14 px-3 py-2 bg-[#13141c] border border-[#27293a] rounded-sm flex items-center flex-nowrap cursor-pointer overflow-x-auto touch-pan-x whitespace-nowrap font-mono selection:bg-none">
      {/* Indicador de Línea Prompt */}
      <span className="text-[#38bdf8] font-bold mr-1.5 select-none text-xs sm:text-sm shrink-0">
        &gt;
      </span>

      {/* Cursor en la posición 0 */}
      <span
        onClick={() => onSelectPosition(0)}
        className={`w-2 h-5 sm:h-6 transition-all shrink-0 ${
          cursorIndex === 0
            ? "bg-[#38bdf8] animate-pulse shadow-[0_0_8px_#38bdf8]"
            : "bg-transparent hover:bg-[#38bdf8]/20"
        }`}
      />

      {tokens.length === 0 && (
        <p className="text-[#565f89] select-none text-xs sm:text-sm italic font-mono whitespace-normal">
          _Esperando tokens de expresión...
        </p>
      )}

      {tokens.map((token, idx) => (
        <React.Fragment key={token.id}>
          {/* Carácter Tipográfico Terminal */}
          <span
            onClick={() => onSelectPosition(idx + 1)}
            className="text-base sm:text-lg font-bold text-[#c0caf5] hover:text-[#7dcfff] transition-colors select-none px-0.5 shrink-0"
          >
            {token.value}
          </span>

          {/* Cursor entre caracteres */}
          <span
            onClick={() => onSelectPosition(idx + 1)}
            className={`w-2 h-5 sm:h-6 transition-all shrink-0 ${
              cursorIndex === idx + 1
                ? "bg-[#38bdf8] animate-pulse shadow-[0_0_8px_#38bdf8]"
                : "bg-transparent hover:bg-[#38bdf8]/20"
            }`}
          />
        </React.Fragment>
      ))}
    </div>
  );
};