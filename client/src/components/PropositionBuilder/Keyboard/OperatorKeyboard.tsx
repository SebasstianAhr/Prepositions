import type { TokenType, ValidationResult } from "../../../domain/logic/types";
import type { TranslationKey } from "../../../i18n/types";
import { useLanguage } from "../../../i18n/useLanguage";
import type { FC } from "react";

interface Props {
  validation: ValidationResult;
  onInsert: (type: TokenType, value: string) => void;
}

export const OperatorKeyboard: FC<Props> = ({ validation, onInsert }) => {
  const { t } = useLanguage();
  const isAllowed = (type: TokenType): boolean =>
    validation.allowedTokenTypes.includes(type);

  const binaryOperators: Array<{ symbol: string; key: TranslationKey }> = [
    { symbol: "∧", key: "opAnd" },
    { symbol: "∨", key: "opOr" },
    { symbol: "→", key: "opCond" },
    { symbol: "↔", key: "opBicond" },
  ];

  return (
    <div className="grid grid-cols-4 gap-1 sm:gap-1.5 w-full">
      {["p", "q", "r"].map((proposition) => (
        <button
          key={proposition}
          disabled={!isAllowed("PROP")}
          onClick={() => onInsert("PROP", proposition)}
          className="h-10 text-xs sm:text-base px-0.5 sm:px-2 font-bold font-mono rounded-xs border bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100 dark:bg-[#1c2526] dark:border-[#73daca]/50 dark:text-[#73daca] dark:hover:bg-[#73daca]/20 dark:hover:border-[#73daca] disabled:opacity-30 disabled:pointer-events-none transition-all active:translate-y-0.5 shadow-xs flex items-center justify-center"
        >
          [{proposition}]
        </button>
      ))}

      <button
        disabled={!isAllowed("NOT")}
        onClick={() => onInsert("NOT", "¬")}
        className="h-10 text-xs sm:text-base px-0.5 sm:px-2 font-bold font-mono rounded-xs border bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100 dark:bg-[#26211c] dark:border-[#e0af68]/50 dark:text-[#e0af68] dark:hover:bg-[#e0af68]/20 dark:hover:border-[#e0af68] disabled:opacity-30 disabled:pointer-events-none transition-all active:translate-y-0.5 shadow-xs flex items-center justify-center"
      >
        [¬]
      </button>

      {binaryOperators.map((operator) => (
        <button
          key={operator.symbol}
          disabled={!isAllowed("OP_BIN")}
          onClick={() => onInsert("OP_BIN", operator.symbol)}
          className="h-10 text-xs sm:text-base px-0.5 sm:px-2 font-bold font-mono rounded-xs border bg-cyan-50 border-cyan-300 text-cyan-800 hover:bg-cyan-100 dark:bg-[#1a2332] dark:border-[#7dcfff]/50 dark:text-[#7dcfff] dark:hover:bg-[#7dcfff]/20 dark:hover:border-[#7dcfff] disabled:opacity-30 disabled:pointer-events-none transition-all active:translate-y-0.5 shadow-xs flex items-center justify-center"
          title={t(operator.key)}
        >
          [{operator.symbol}]
        </button>
      ))}

      <button
        disabled={!isAllowed("OPEN_PAR")}
        onClick={() => onInsert("OPEN_PAR", "(")}
        className="h-10 text-xs sm:text-base px-0.5 sm:px-2 font-bold font-mono rounded-xs border bg-purple-50 border-purple-300 text-purple-800 hover:bg-purple-100 dark:bg-[#231b2e] dark:border-[#bb9af7]/50 dark:text-[#bb9af7] dark:hover:bg-[#bb9af7]/20 dark:hover:border-[#bb9af7] disabled:opacity-30 disabled:pointer-events-none transition-all active:translate-y-0.5 shadow-xs flex items-center justify-center"
      >
        [(]
      </button>

      <button
        disabled={!validation.canCloseParenthesis}
        onClick={() => onInsert("CLOSE_PAR", ")")}
        className="h-10 text-xs sm:text-base px-0.5 sm:px-2 font-bold font-mono rounded-xs border bg-purple-50 border-purple-300 text-purple-800 hover:bg-purple-100 dark:bg-[#231b2e] dark:border-[#bb9af7]/50 dark:text-[#bb9af7] dark:hover:bg-[#bb9af7]/20 dark:hover:border-[#bb9af7] disabled:opacity-30 disabled:pointer-events-none transition-all active:translate-y-0.5 shadow-xs flex items-center justify-center"
      >
        [)]
      </button>
    </div>
  );
};
