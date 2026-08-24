import type { Language, TranslationKey } from "./types";
import { createContext } from "react";

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);
