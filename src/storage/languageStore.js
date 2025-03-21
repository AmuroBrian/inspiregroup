import { create } from "zustand";

export const useLanguageStore = create((set) => ({
  language: localStorage.getItem("selectedLanguage") || "en", // Load from local storage or default to "en"
  
  setLanguage: (lang) => {
    set({ language: lang });
    localStorage.setItem("selectedLanguage", lang); // Save to local storage
  },
}));
