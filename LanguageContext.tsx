import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, DefaultLang } from './translations';

type Translations = typeof translations;
type Language = DefaultLang;

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: <T = string>(key: string) => T;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = <T = string>(key: string): T => {
    const keys = key.split('.');
    // Start from the selected language root
    let value: unknown = (translations as Translations)[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key as T; // Return key if translation missing
      }
    }

    return value as T;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
