import { translations } from "./translations/es";

export type Language = "es" | "en";
export type TranslationKey = keyof typeof translations;
