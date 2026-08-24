import type { TranslationKey } from "../types";

export const translations: Record<TranslationKey, string> = {
  appTitle: "SYS::TRUTH_TABLE_MONITOR v_ssj",
  modeLogic: "MODE: LOGIC_EVAL",
  inputSection: "[01]-INPUT_EXPRESSION",
  operatorsSection: "[02]-OPERATORS_PAD",
  outputSection: "[03]-TRUTH_TABLE_OUTPUT",
  execute: "[EXECUTE_EVALUATION]",
  errLabel: "ERR",
  haltLabel: "HALT",
  guideLabel: "GUIDE",
  statusReady: "STATUS: READY",
  memOptimal: "MEM: OPTIMAL",
  encodingLabel: "UTF-8",
  btnLeft: "< LEFT",
  btnRight: "RIGHT >",
  btnDel: "DEL",
  btnClear: "CLR",
  placeholderTokens: "_Awaiting expression tokens...",
  opAnd: "Conjunction",
  opOr: "Disjunction",
  opCond: "Conditional",
  opBicond: "Biconditional",
  themeDark: "THEME: DARK",
  themeLight: "THEME: LIGHT",
  // Dynamic Messages
  guideEmpty:
    "Start by entering a proposition (p, q, r) or an opening parenthesis.",
  guideComplete:
    "Expression is complete! You can now generate the truth table.",
  guideExpectOpOrClose:
    "Expected a binary operator (∧, ∨, →, ↔) or a closing parenthesis.",
  guideExpectPropOrOpenOrNot:
    "Expected a proposition (p, q, r), negation (¬), or opening parenthesis.",
  guideUnbalancedPar: "There are unclosed parentheses.",
  errInvalidSyntax: "Invalid expression syntax.",
  // Footer & Developer Info
  devRole: "Software Developer",
  footerQuote: "Building things that probably should've been documented.",
  byAuthor: "SebasstianAhr",
  footerReturnTop: "RETURN_TOP",
  footerRights: "ALL RIGHTS RESERVED",
};
