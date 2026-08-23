export type TokenType = "PROP" | "NOT" | "OP_BIN" | "OPEN_PAR" | "CLOSE_PAR";

export type OperatorSymbol = "∧" | "∨" | "→" | "↔";
export type PropositionSymbol = "p" | "q" | "r";

export interface Token {
  id: string;
  type: TokenType;
  value: string;
}

export type ASTNode =
  | { type: "PROP"; value: PropositionSymbol }
  | { type: "NOT"; operand: ASTNode }
  | { type: "BINARY"; operator: OperatorSymbol; left: ASTNode; right: ASTNode };

export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
  guidanceMessage: string;
  allowedTokenTypes: TokenType[];
  allowedPropositions?: PropositionSymbol[];
  canCloseParenthesis: boolean;
}

export interface TruthTableColumn {
  header: string;
  isMainResult?: boolean;
  values: boolean[];
}

export interface TruthTableData {
  variables: PropositionSymbol[];
  columns: TruthTableColumn[];
  rows: { [key: string]: boolean }[];
}
