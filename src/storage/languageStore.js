import { create } from "zustand";
const getStoredLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("selectedLanguage") || "en";
  }
  return "en";
};

export const useLanguageStore = create((set) => ({
  language: getStoredLanguage(),

  setLanguage: (lang) => {
    set({ language: lang });
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedLanguage", lang);
    }
  },
}));
