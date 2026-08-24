import type {
  Token,
  ASTNode,
  OperatorSymbol,
  PropositionSymbol,
} from "./types";

const PRECEDENCE: Record<string, number> = {
  "¬": 4,
  "∧": 3,
  "∨": 2,
  "→": 1,
  "↔": 1,
};

export function parseToAST(tokens: Token[]): ASTNode {
  const outputStack: ASTNode[] = [];
  const operatorStack: Token[] = [];

  for (const token of tokens) {
    if (token.type === "PROP") {
      outputStack.push({
        type: "PROP",
        value: token.value as PropositionSymbol,
      });
    } else if (token.type === "NOT") {
      operatorStack.push(token);
    } else if (token.type === "OP_BIN") {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1].type !== "OPEN_PAR" &&
        PRECEDENCE[operatorStack[operatorStack.length - 1].value] >=
          PRECEDENCE[token.value]
      ) {
        popOperator(outputStack, operatorStack.pop()!);
      }
      operatorStack.push(token);
    } else if (token.type === "OPEN_PAR") {
      operatorStack.push(token);
    } else if (token.type === "CLOSE_PAR") {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1].type !== "OPEN_PAR"
      ) {
        popOperator(outputStack, operatorStack.pop()!);
      }
      operatorStack.pop();
      if (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1].type === "NOT"
      ) {
        popOperator(outputStack, operatorStack.pop()!);
      }
    }
  }

  while (operatorStack.length > 0) {
    popOperator(outputStack, operatorStack.pop()!);
  }

  if (outputStack.length !== 1) {
    throw new Error("Expresión mal formada");
  }

  return outputStack[0];
}

function popOperator(outputStack: ASTNode[], operatorToken: Token) {
  if (operatorToken.type === "NOT") {
    const operand = outputStack.pop();
    if (!operand) throw new Error("Error al procesar negación");
    outputStack.push({ type: "NOT", operand });
  } else if (operatorToken.type === "OP_BIN") {
    const right = outputStack.pop();
    const left = outputStack.pop();
    if (!left || !right) throw new Error("Error al procesar operador binario");
    outputStack.push({
      type: "BINARY",
      operator: operatorToken.value as OperatorSymbol,
      left,
      right,
    });
  }
}
