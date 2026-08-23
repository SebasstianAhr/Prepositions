import type { Token, ValidationResult, TokenType } from "./types";

export function validateState(
  tokens: Token[],
  cursorIndex: number,
): ValidationResult {
  if (tokens.length === 0) {
    return {
      isValid: false,
      guidanceMessage:
        "Comienza seleccionando una proposición (p, q, r), una negación (¬) o un paréntesis ( ( ).",
      allowedTokenTypes: ["PROP", "NOT", "OPEN_PAR"],
      canCloseParenthesis: false,
    };
  }

  // Contar paréntesis hasta el cursor
  let openParCount = 0;
  for (let i = 0; i < cursorIndex; i++) {
    if (tokens[i].type === "OPEN_PAR") openParCount++;
    if (tokens[i].type === "CLOSE_PAR") openParCount--;
  }

  const leftToken = cursorIndex > 0 ? tokens[cursorIndex - 1] : null;

  // Analizar lo que se permite a continuación
  let allowedTokenTypes: TokenType[] = [];
  let guidanceMessage = "";

  if (
    !leftToken ||
    leftToken.type === "OPEN_PAR" ||
    leftToken.type === "OP_BIN"
  ) {
    allowedTokenTypes = ["PROP", "NOT", "OPEN_PAR"];
    guidanceMessage =
      leftToken?.type === "OP_BIN"
        ? "Selecciona una proposición, negación o abre paréntesis tras el operador."
        : "Selecciona una proposición, negación o abre paréntesis.";
  } else if (leftToken.type === "NOT") {
    allowedTokenTypes = ["PROP", "NOT", "OPEN_PAR"];
    guidanceMessage =
      "La negación requiere una proposición o una expresión entre paréntesis.";
  } else if (leftToken.type === "PROP" || leftToken.type === "CLOSE_PAR") {
    allowedTokenTypes = ["OP_BIN"];
    if (openParCount > 0) {
      allowedTokenTypes.push("CLOSE_PAR");
      guidanceMessage =
        "Puedes agregar un operador lógico o cerrar el paréntesis ')'.";
    } else {
      guidanceMessage = "Puedes agregar un operador lógico (∧, ∨, →, ↔).";
    }
  }

  // Validar si la expresión completa está sintácticamente cerrada/válida
  let totalOpenPar = 0;
  let isSyntaxValid = true;

  for (const token of tokens) {
    if (token.type === "OPEN_PAR") totalOpenPar++;
    if (token.type === "CLOSE_PAR") totalOpenPar--;
    if (totalOpenPar < 0) {
      isSyntaxValid = false;
      break;
    }
  }

  if (totalOpenPar !== 0) isSyntaxValid = false;

  const lastToken = tokens[tokens.length - 1];
  if (
    lastToken &&
    (lastToken.type === "OP_BIN" ||
      lastToken.type === "NOT" ||
      lastToken.type === "OPEN_PAR")
  ) {
    isSyntaxValid = false;
  }

  return {
    isValid: isSyntaxValid && tokens.length > 0,
    guidanceMessage: isSyntaxValid
      ? "¡La expresión está completa! Puedes generar la tabla de verdad."
      : guidanceMessage,
    allowedTokenTypes,
    canCloseParenthesis:
      openParCount > 0 &&
      (leftToken?.type === "PROP" || leftToken?.type === "CLOSE_PAR"),
  };
}
