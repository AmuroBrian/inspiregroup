"use client";
import { createContext, useContext, useEffect, useState } from "react";
import translations from "@/lib/translations";
import { useLanguageStore } from "@/storage/languageStore";

export const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const { language, setLanguage } = useLanguageStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const translateDynamicText = async (text) => {
    if (!text) return "";
    
    // Return original text if we're not on the client or if language is English
    if (!isClient || language === "en") return text;
    
    try {
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${language}&dt=t&q=${encodeURIComponent(text)}`
      );
      
      if (!res.ok) {
        console.error("Translation API error:", res.status, await res.text());
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      return data[0][0][0];
    } catch (error) {
      console.warn("Translation API failed, falling back to local translations:", error);
      
      // Fallback 1: Check if we have a local translation for this exact text
      const localTranslations = translations[language];
      if (localTranslations) {
        const exactMatch = Object.entries(localTranslations).find(
          ([key]) => key.toLowerCase() === text.toLowerCase()
        );
        if (exactMatch) return exactMatch[1];
      }
      
      // Fallback 2: Return the original text
      return text;
    }
  };

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

export const useTranslation = () => useContext(TranslationContext);

fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ja&dt=t&q=Hello%20world')
  .then(r => r.json())
  .then(console.log)