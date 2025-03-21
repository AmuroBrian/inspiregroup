"use client";
import { createContext, useContext, useEffect } from "react";
import translations from "@/lib/translations";
import { useLanguageStore } from "@/storage/languageStore";



export const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const { language, setLanguage } = useLanguageStore();

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

  return (
    <TranslationContext.Provider value={{ 
      language, 
      setLanguage, 
      t: translations[language], 
      translateDynamicText 
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook
export const useTranslation = () => useContext(TranslationContext);
