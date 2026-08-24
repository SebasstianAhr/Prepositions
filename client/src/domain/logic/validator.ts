import type { Token, ValidationResult, TokenType } from "./types";
import type { TranslationKey } from "../../i18n/types";

export function validateState(
  tokens: Token[],
  cursorIndex: number,
): ValidationResult {
  if (tokens.length === 0) {
    return {
      isValid: false,
      guidanceMessageKey: "guideEmpty",
      guidanceMessage:
        "Comienza seleccionando una proposición (p, q, r), una negación (¬) o un paréntesis ( ( ).",
      allowedTokenTypes: ["PROP", "NOT", "OPEN_PAR"],
      canCloseParenthesis: false,
    };
  }

  let openParCount = 0;
  for (let i = 0; i < cursorIndex; i++) {
    if (tokens[i].type === "OPEN_PAR") openParCount++;
    if (tokens[i].type === "CLOSE_PAR") openParCount--;
  }

  const leftToken = cursorIndex > 0 ? tokens[cursorIndex - 1] : null;

  let allowedTokenTypes: TokenType[] = [];
  // Se añade la anotación de tipo explícita aquí:
  let guidanceMessageKey: TranslationKey = "guideExpectPropOrOpenOrNot";
  let guidanceMessage = "";

  if (
    !leftToken ||
    leftToken.type === "OPEN_PAR" ||
    leftToken.type === "OP_BIN"
  ) {
    allowedTokenTypes = ["PROP", "NOT", "OPEN_PAR"];
    guidanceMessageKey = "guideExpectPropOrOpenOrNot";
    guidanceMessage =
      leftToken?.type === "OP_BIN"
        ? "Selecciona una proposición, negación o abre paréntesis tras el operador."
        : "Selecciona una proposición, negación o abre paréntesis.";
  } else if (leftToken.type === "NOT") {
    allowedTokenTypes = ["PROP", "NOT", "OPEN_PAR"];
    guidanceMessageKey = "guideExpectPropOrOpenOrNot";
    guidanceMessage =
      "La negación requiere una proposición o una expresión entre paréntesis.";
  } else if (leftToken.type === "PROP" || leftToken.type === "CLOSE_PAR") {
    allowedTokenTypes = ["OP_BIN"];
    if (openParCount > 0) {
      allowedTokenTypes.push("CLOSE_PAR");
      guidanceMessageKey = "guideExpectOpOrClose";
      guidanceMessage =
        "Puedes agregar un operador lógico o cerrar el paréntesis ')'.";
    } else {
      guidanceMessageKey = "guideExpectOpOrClose";
      guidanceMessage = "Puedes agregar un operador lógico (∧, ∨, →, ↔).";
    }
  }

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

  const isValid = isSyntaxValid && tokens.length > 0;

  if (isValid) {
    guidanceMessageKey = "guideComplete";
    guidanceMessage =
      "¡La expresión está completa! Puedes generar la tabla de verdad.";
  } else if (totalOpenPar > 0) {
    guidanceMessageKey = "guideUnbalancedPar";
  }

  return {
    isValid,
    guidanceMessageKey,
    guidanceMessage: isValid
      ? "¡La expresión está completa! Puedes generar la tabla de verdad."
      : guidanceMessage,
    allowedTokenTypes,
    canCloseParenthesis:
      openParCount > 0 &&
      (leftToken?.type === "PROP" || leftToken?.type === "CLOSE_PAR"),
  };
}
