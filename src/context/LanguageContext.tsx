'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TRANSLATIONS } from '@/data/translations';

interface LanguageContextType {
  lang: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS.tr;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'tr',
  setLanguage: () => {},
  t: TRANSLATIONS.tr,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('tr');

  useEffect(() => {
    // 1. Check if user already manually selected a language
    const saved = localStorage.getItem('fmkal_lang') as Language | null;
    if (saved && (saved === 'tr' || saved === 'en' || saved === 'ko')) {
      setLang(saved);
      return;
    }

    // 2. Instant Zero-Latency Detection via Timezone & Browser Language
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase();
      const navLang = (navigator.language || '').toLowerCase();

      if (tz.includes('seoul') || tz.includes('korea') || navLang.startsWith('ko')) {
        setLang('ko');
        return;
      }
      if (tz.includes('istanbul') || tz.includes('turkey') || navLang.startsWith('tr')) {
        setLang('tr');
        return;
      }
    } catch {
      // Fallback
    }

    // 3. Fallback IP Geo-Detection (runs silently in background)
    fetch('https://api.country.is/')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.country) {
          const code = data.country.toUpperCase();
          if (code === 'KR') {
            setLang('ko');
          } else if (code === 'TR' || code === 'AZ') {
            setLang('tr');
          } else {
            setLang('en');
          }
        }
      })
      .catch(() => {
        // Default to English or Turkish
      });
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const handleSetLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('fmkal_lang', newLang);
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.tr;

  return (
    <LanguageContext.Provider value={{ lang, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
