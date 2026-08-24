import { translations as enTranslations } from "./translations/en";
import { translations as esTranslations } from "./translations/es";
import React, { useState, useEffect, useCallback } from "react";
import type { Language, TranslationKey } from "./types";
import { LanguageContext } from "./context";

const dictionaries: Record<Language, Record<TranslationKey, string>> = {
  es: esTranslations,
  en: enTranslations,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language") as Language;
    return saved === "en" || saved === "es" ? saved : "es";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = useCallback(
    (key: TranslationKey): string => {
      return dictionaries[language]?.[key] || dictionaries["es"][key] || key;
    },
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
