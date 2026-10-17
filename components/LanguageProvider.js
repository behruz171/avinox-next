'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { translations as baseTranslations } from '@/lib/translations-base';
import { extraTranslations } from '@/lib/translations-extra';

const STORAGE_KEY = 'avinox-lang';
const DEFAULT_LANG = 'ru';

const translations = Object.fromEntries(
  Object.keys(baseTranslations).map((lang) => [
    lang,
    { ...baseTranslations[lang], ...extraTranslations[lang] },
  ])
);

const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (key, fallback) => fallback ?? key,
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(DEFAULT_LANG);

  // Restore saved language after hydration
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(translations[next] ? next : 'en');
  }, []);

  const t = useCallback(
    (key, fallback) => translations[lang]?.[key] ?? fallback ?? key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
