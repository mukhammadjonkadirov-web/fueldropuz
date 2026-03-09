"use client";

import { useI18n } from "@/lib/i18n";
import { translations } from "./translations";

export function useLanguage() {
  const { lang, setLang } = useI18n();
  const t = translations[lang];

  return { lang, setLang, t };
}

