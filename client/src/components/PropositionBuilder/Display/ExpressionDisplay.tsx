import type { Token } from "../../../domain/logic/types";
import { useLanguage } from "../../../i18n/useLanguage";
import React from "react";

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
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-full min-w-0 min-h-14 px-3 py-2 bg-slate-50 border-slate-300 dark:bg-[#13141c] dark:border-[#27293a] border rounded-sm flex items-center cursor-pointer overflow-x-auto touch-pan-x font-mono selection:bg-none">
      <span className="text-cyan-600 dark:text-[#38bdf8] font-bold mr-1.5 select-none text-xs sm:text-sm shrink-0">
        &gt;
      </span>

      <span
        onClick={() => onSelectPosition(0)}
        className={`w-2 h-5 sm:h-6 transition-all shrink-0 ${
          cursorIndex === 0
            ? "bg-cyan-500 dark:bg-[#38bdf8] animate-pulse shadow-[0_0_8px_#38bdf8]"
            : "bg-transparent hover:bg-cyan-500/20 dark:hover:bg-[#38bdf8]/20"
        }`}
      />

      {tokens.length === 0 && (
        <p className="text-slate-400 dark:text-[#565f89] select-none text-xs sm:text-sm italic font-mono truncate min-w-0">
          {t("placeholderTokens")}
        </p>
      )}

      {tokens.map((token, idx) => (
        <React.Fragment key={token.id}>
          <span
            onClick={() => onSelectPosition(idx + 1)}
            className="text-base sm:text-lg font-bold text-slate-800 dark:text-[#c0caf5] hover:text-cyan-600 dark:hover:text-[#7dcfff] transition-colors select-none px-0.5 shrink-0"
          >
            {token.value}
          </span>

          <span
            onClick={() => onSelectPosition(idx + 1)}
            className={`w-2 h-5 sm:h-6 transition-all shrink-0 ${
              cursorIndex === idx + 1
                ? "bg-cyan-500 dark:bg-[#38bdf8] animate-pulse shadow-[0_0_8px_#38bdf8]"
                : "bg-transparent hover:bg-cyan-500/20 dark:hover:bg-[#38bdf8]/20"
            }`}
          />
        </React.Fragment>
      ))}
    </div>
  );
};
