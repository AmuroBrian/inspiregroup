"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/TranslationContext";
import { useLanguageStore } from "@/storage/languageStore";

const Footer = () => {
  const { language, setLanguage, t } = useTranslation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 text-gray-700 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        {/* Scroll to top button */}
        {showScrollTop && (
          <button 
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 z-50"
            aria-label="Scroll to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}

        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright and branding */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-sm">
              &copy; {currentYear} Inspire Holdings Inc. - All Rights Reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Powered by <span className="font-medium text-blue-600">Inspire Group</span>
            </p>
          </div>

          {/* Language selector */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { code: "en", label: "English" },
              { code: "ja", label: "日本語" },
              { code: "ko", label: "한국어" },
              { code: "zh", label: "简体中文" }
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`text-sm px-3 py-1 rounded-md transition-colors ${
                  language === lang.code
                    ? "bg-indigo-100 text-blue-700 font-medium"
                    : "hover:bg-gray-100"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Optional additional links */}
        <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-xs">
          <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;