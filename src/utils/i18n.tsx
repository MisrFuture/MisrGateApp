import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Lang = 'en' | 'ar';

interface I18nContextType {
  lang: Lang;
  t: (en: string, ar: string) => string;
  toggle: () => void;
  isRtl: boolean;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  const t = useCallback((en: string, ar: string) => lang === 'en' ? en : ar, [lang]);

  const toggle = () => {
    setLang(prev => {
      const next = prev === 'en' ? 'ar' : 'en';
      AsyncStorage.setItem('misrgate_lang', next);
      return next;
    });
  };

  const isRtl = lang === 'ar';

  return <I18nContext.Provider value={{ lang, t, toggle, isRtl }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
