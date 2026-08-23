import type {
  ASTNode,
  PropositionSymbol,
  TruthTableData,
  TruthTableColumn,
  Token,
} from "./types";
import { parseToAST } from "./parser";

export function evaluateAST(
  node: ASTNode,
  env: Record<PropositionSymbol, boolean>,
): boolean {
  switch (node.type) {
    case "PROP":
      return env[node.value];
    case "NOT":
      return !evaluateAST(node.operand, env);
    case "BINARY": {
      const left = evaluateAST(node.left, env);
      const right = evaluateAST(node.right, env);
      switch (node.operator) {
        case "∧":
          return left && right;
        case "∨":
          return left || right;
        case "→":
          return !left || right;
        case "↔":
          return left === right;
      }
    }
  }
}

export function generateTruthTable(tokens: Token[]): TruthTableData {
  const usedProps = Array.from(
    new Set(
      tokens
        .filter((t) => t.type === "PROP")
        .map((t) => t.value as PropositionSymbol),
    ),
  ).sort();

  const ast = parseToAST(tokens);
  const numRows = Math.pow(2, usedProps.length);
  const rows: Record<string, boolean>[] = [];

  // Sub-expresiones para columnas intermedias
  const subExpressions: { label: string; ast: ASTNode }[] = [];
  extractSubExpressions(ast, subExpressions);

  // Generar combinaciones (Verdadero = T, Falso = F)
  for (let i = 0; i < numRows; i++) {
    const rowEnv: Record<string, boolean> = {};
    usedProps.forEach((prop, index) => {
      // Distribución binaria estándar (V/F)
      const bit = (i >> (usedProps.length - 1 - index)) & 1;
      rowEnv[prop] = bit === 0; // 0 -> true, 1 -> false
    });
    rows.push(rowEnv);
  }

  // Crear columnas
  const columns: TruthTableColumn[] = [];

  // Columnas de variables
  usedProps.forEach((prop) => {
    columns.push({
      header: prop,
      values: rows.map((r) => r[prop]),
    });
  });

  // Columnas intermedias y resultado final
  subExpressions.forEach((expr, idx) => {
    const isLast = idx === subExpressions.length - 1;
    columns.push({
      header: expr.label,
      isMainResult: isLast,
      values: rows.map((env) =>
        evaluateAST(expr.ast, env as Record<PropositionSymbol, boolean>),
      ),
    });
  });

  return { variables: usedProps, columns, rows };
}

function stringifyAST(node: ASTNode): string {
  switch (node.type) {
    case "PROP":
      return node.value;
    case "NOT":
      return `¬${stringifyAST(node.operand)}`;
    case "BINARY":
      return `(${stringifyAST(node.left)} ${node.operator} ${stringifyAST(node.right)})`;
  }
}

function extractSubExpressions(
  node: ASTNode,
  acc: { label: string; ast: ASTNode }[],
) {
  if (node.type === "PROP") return;
  if (node.type === "NOT") {
    extractSubExpressions(node.operand, acc);
  } else if (node.type === "BINARY") {
    extractSubExpressions(node.left, acc);
    extractSubExpressions(node.right, acc);
  }
  const label = stringifyAST(node);
  if (!acc.some((item) => item.label === label)) {
    acc.push({ label, ast: node });
  }
}
