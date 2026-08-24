import type { Token, TokenType } from "../domain/logic/types";
import { validateState } from "../domain/logic/validator";
import { useState, useMemo } from "react";

export function usePropositionBuilder() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [cursorIndex, setCursorIndex] = useState<number>(0);

  const validation = useMemo(
    () => validateState(tokens, cursorIndex),
    [tokens, cursorIndex],
  );

  const insertToken = (type: TokenType, value: string) => {
    if (
      !validation.allowedTokenTypes.includes(type) &&
      !(type === "CLOSE_PAR" && validation.canCloseParenthesis)
    ) {
      return;
    }

    const newToken: Token = { id: crypto.randomUUID(), type, value };
    const nextTokens = [
      ...tokens.slice(0, cursorIndex),
      newToken,
      ...tokens.slice(cursorIndex),
    ];

    setTokens(nextTokens);
    setCursorIndex(cursorIndex + 1);
  };

  const moveCursorLeft = () => setCursorIndex((prev) => Math.max(0, prev - 1));
  const moveCursorRight = () =>
    setCursorIndex((prev) => Math.min(tokens.length, prev + 1));

  const deleteLeft = () => {
    if (cursorIndex === 0) return;
    const nextTokens = [
      ...tokens.slice(0, cursorIndex - 1),
      ...tokens.slice(cursorIndex),
    ];
    setTokens(nextTokens);
    setCursorIndex(cursorIndex - 1);
  };

  const clearAll = () => {
    setTokens([]);
    setCursorIndex(0);
  };

  return {
    tokens,
    cursorIndex,
    setCursorIndex,
    validation,
    insertToken,
    moveCursorLeft,
    moveCursorRight,
    deleteLeft,
    clearAll,
  };
}
