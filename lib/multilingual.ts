import {
  DEFAULT_LANGUAGE,
  INDIAN_LANGUAGES,
  MultilingualString,
} from "./i18n";

export function normalizeMultilingual(
  value: string | MultilingualString
): MultilingualString {
  if (typeof value === "string") {
    return { [DEFAULT_LANGUAGE]: value };
  }

  const cleaned: MultilingualString = {};

  for (const lang of INDIAN_LANGUAGES) {
    if (value[lang]) {
      cleaned[lang] = value[lang];
    }
  }

  if (!cleaned[DEFAULT_LANGUAGE]) {
    const first = Object.values(cleaned)[0] ?? "";
    cleaned[DEFAULT_LANGUAGE] = first;
  }

  return cleaned;
}