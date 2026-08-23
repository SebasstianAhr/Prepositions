import type { FC } from 'react';

import type {
  TokenType,
  ValidationResult,
} from '../../../domain/logic/types';

interface Props {
  validation: ValidationResult;
  onInsert: (type: TokenType, value: string) => void;
}

export const OperatorKeyboard: FC<Props> = ({
  validation,
  onInsert,
}) => {
  const isAllowed = (type: TokenType): boolean =>
    validation.allowedTokenTypes.includes(type);

  return (
    <div className="grid grid-cols-4 gap-2.5 w-full max-w-md mx-auto">
      {/* Proposiciones */}
      {['p', 'q', 'r'].map((proposition) => (
        <button
          key={proposition}
          disabled={!isAllowed('PROP')}
          onClick={() => onInsert('PROP', proposition)}
          className="h-13 text-xl font-bold rounded-xl border bg-emerald-600/20 border-emerald-500/40 text-emerald-300 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
        >
          {proposition}
        </button>
      ))}

      {/* Negación */}
      <button
        disabled={!isAllowed('NOT')}
        onClick={() => onInsert('NOT', '¬')}
        className="h-13 text-xl font-bold rounded-xl border bg-amber-600/20 border-amber-500/40 text-amber-300 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
      >
        ¬
      </button>

      {/* Operadores binarios */}
      {[
        { symbol: '∧', label: 'Conjunción' },
        { symbol: '∨', label: 'Disyunción' },
        { symbol: '→', label: 'Condicional' },
        { symbol: '↔', label: 'Bicondicional' },
      ].map((operator) => (
        <button
          key={operator.symbol}
          disabled={!isAllowed('OP_BIN')}
          onClick={() => onInsert('OP_BIN', operator.symbol)}
          className="h-13 text-xl font-bold rounded-xl border bg-blue-600/20 border-blue-500/40 text-blue-300 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
          title={operator.label}
        >
          {operator.symbol}
        </button>
      ))}

      {/* Paréntesis */}
      <button
        disabled={!isAllowed('OPEN_PAR')}
        onClick={() => onInsert('OPEN_PAR', '(')}
        className="h-13 text-xl font-bold rounded-xl border bg-purple-600/20 border-purple-500/40 text-purple-300 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
      >
        (
      </button>

      <button
        disabled={!validation.canCloseParenthesis}
        onClick={() => onInsert('CLOSE_PAR', ')')}
        className="h-13 text-xl font-bold rounded-xl border bg-purple-600/20 border-purple-500/40 text-purple-300 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
      >
        )
      </button>
    </div>
  );
};