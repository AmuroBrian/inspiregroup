"use client";
import { createContext, useContext, useEffect, useState } from "react";
import translations from "@/lib/translations";
import { useLanguageStore } from "@/storage/languageStore";

export const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const { language, setLanguage } = useLanguageStore();
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side before rendering translated content
  useEffect(() => {
    setIsClient(true);
  }, []);

  const translateDynamicText = async (text) => {
    if (!text) return "";
    try {
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${language}&dt=t&q=${encodeURIComponent(text)}`
      );
      const data = await res.json();
      return data[0][0][0]; // Extract translated text
    } catch (error) {
      console.error("Translation error:", error);
      return text;
    }
  };

  // During SSR, always use English translations to prevent hydration mismatch
  const currentLanguage = isClient ? language : "en";
  const currentTranslations = translations[currentLanguage] || translations.en;

  return (
    <TranslationContext.Provider value={{ 
      language: currentLanguage, 
      setLanguage, 
      t: currentTranslations, 
      translateDynamicText,
      isClient 
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook
export const useTranslation = () => useContext(TranslationContext);
