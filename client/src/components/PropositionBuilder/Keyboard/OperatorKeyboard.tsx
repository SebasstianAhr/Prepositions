import type { FC } from "react";
import type { TokenType, ValidationResult } from "../../../domain/logic/types";

interface Props {
  validation: ValidationResult;
  onInsert: (type: TokenType, value: string) => void;
}

export const OperatorKeyboard: FC<Props> = ({ validation, onInsert }) => {
  const isAllowed = (type: TokenType): boolean =>
    validation.allowedTokenTypes.includes(type);

  return (
    <div className="grid grid-cols-4 gap-1.5 w-full">
      {/* Proposiciones (Verde Terminal) */}
      {["p", "q", "r"].map((proposition) => (
        <button
          key={proposition}
          disabled={!isAllowed("PROP")}
          onClick={() => onInsert("PROP", proposition)}
          className="h-10 text-base font-bold font-mono rounded-xs border bg-[#1c2526] border-[#73daca]/50 text-[#73daca] hover:bg-[#73daca]/20 hover:border-[#73daca] disabled:opacity-20 disabled:pointer-events-none transition-all active:translate-y-0.5"
        >
          [{proposition}]
        </button>
      ))}

      {/* Negación (Ámbar) */}
      <button
        disabled={!isAllowed("NOT")}
        onClick={() => onInsert("NOT", "¬")}
        className="h-10 text-base font-bold font-mono rounded-xs border bg-[#26211c] border-[#e0af68]/50 text-[#e0af68] hover:bg-[#e0af68]/20 hover:border-[#e0af68] disabled:opacity-20 disabled:pointer-events-none transition-all active:translate-y-0.5"
      >
        [¬]
      </button>

      {/* Operadores binarios (Cian / Azul Terminal) */}
      {[
        { symbol: "∧", label: "Conjunción" },
        { symbol: "∨", label: "Disyunción" },
        { symbol: "→", label: "Condicional" },
        { symbol: "↔", label: "Bicondicional" },
      ].map((operator) => (
        <button
          key={operator.symbol}
          disabled={!isAllowed("OP_BIN")}
          onClick={() => onInsert("OP_BIN", operator.symbol)}
          className="h-10 text-base font-bold font-mono rounded-xs border bg-[#1a2332] border-[#7dcfff]/50 text-[#7dcfff] hover:bg-[#7dcfff]/20 hover:border-[#7dcfff] disabled:opacity-20 disabled:pointer-events-none transition-all active:translate-y-0.5"
          title={operator.label}
        >
          [{operator.symbol}]
        </button>
      ))}

      {/* Paréntesis (Púrpura / Violeta) */}
      <button
        disabled={!isAllowed("OPEN_PAR")}
        onClick={() => onInsert("OPEN_PAR", "(")}
        className="h-10 text-base font-bold font-mono rounded-xs border bg-[#231b2e] border-[#bb9af7]/50 text-[#bb9af7] hover:bg-[#bb9af7]/20 hover:border-[#bb9af7] disabled:opacity-20 disabled:pointer-events-none transition-all active:translate-y-0.5"
      >
        [(]
      </button>

      <button
        disabled={!validation.canCloseParenthesis}
        onClick={() => onInsert("CLOSE_PAR", ")")}
        className="h-10 text-base font-bold font-mono rounded-xs border bg-[#231b2e] border-[#bb9af7]/50 text-[#bb9af7] hover:bg-[#bb9af7]/20 hover:border-[#bb9af7] disabled:opacity-20 disabled:pointer-events-none transition-all active:translate-y-0.5"
      >
        [)]
      </button>
    </div>
  );
};