import { useState, useMemo } from "react";
import type { Token, TokenType } from "../domain/logic/types";
import { validateState } from "../domain/logic/validator";

export function usePropositionBuilder() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [cursorIndex, setCursorIndex] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const validation = useMemo(
    () => validateState(tokens, cursorIndex),
    [tokens, cursorIndex],
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const insertToken = (type: TokenType, value: string) => {
    if (
      !validation.allowedTokenTypes.includes(type) &&
      !(type === "CLOSE_PAR" && validation.canCloseParenthesis)
    ) {
      showToast(`No puedes agregar "${value}" en esta posición.`);
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
    toastMessage,
    insertToken,
    moveCursorLeft,
    moveCursorRight,
    deleteLeft,
    clearAll,
  };
}
