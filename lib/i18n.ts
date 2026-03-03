export const DEFAULT_LANGUAGE = "en" as const;

export const INDIAN_LANGUAGES = [
  "en",
  "hi",
  "mr",
  "ta",
  "te",
  "bn",
  "gu",
  "kn",
  "ml",
  "pa",
] as const;

export type LanguageCode = (typeof INDIAN_LANGUAGES)[number];

export type MultilingualString = {
  [K in LanguageCode]?: string;
};