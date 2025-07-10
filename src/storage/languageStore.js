import { create } from "zustand";

const getStoredLanguage = () => {
  // During SSR, always return "en" to ensure consistent server/client rendering
  if (typeof window === "undefined") {
    return "en";
  }
  
  // Only access localStorage on the client side
  try {
    return localStorage.getItem("selectedLanguage") || "en";
  } catch (error) {
    return "en";
  }
};

export const useLanguageStore = create((set) => ({
  language: getStoredLanguage(),

  setLanguage: (lang) => {
    set({ language: lang });
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("selectedLanguage", lang);
      } catch (error) {
        console.error("Failed to save language to localStorage:", error);
      }
    }
  },
}));
