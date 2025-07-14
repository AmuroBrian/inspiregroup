"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/TranslationContext";
// Assuming useLanguageStore is still needed elsewhere, but not directly used in this improved Footer component for language setting.
// import { useLanguageStore } from "@/storage/languageStore";

const Footer = () => {
  const { t } = useTranslation(); // Removed language, setLanguage as they are no longer used here
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show scroll to top button when user scrolls down 200px
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = 2024; // Changed from new Date().getFullYear() to 2024

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 border-t border-gray-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Section 1: Branding and Copyright */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">{t.inspireGroup || "Inspire Holdings Inc."}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              &copy; {currentYear} {t.inspireGroup || "Inspire Holdings Inc."}. {t.allRightsReserved || "All Rights Reserved."}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {t.poweredBy || "Powered by"} <span className="font-medium text-blue-400">{t.inspireGroup || "Inspire Group"}</span>
            </p>
          </div>

          {/* Section 2: Placeholder for links or other info (previously Section 2, now gap filled by Section 1 and Scroll to Top) */}
          {/* You might want to add more content here or adjust the grid layout if Section 2 was truly missing */}
          <div>
            {/* Example: Quick Links */}
            {/* <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a></li>
            </ul> */}
          </div>

          {/* Section 3: This space is now implicitly available as the language selector is moved */}
          {/* You can add contact info, social media links, etc. here if you wish */}
          <div>
            {/* Example: Contact Info */}
            {/* <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
            <p className="text-sm text-gray-400">123 Main Street, City, Country</p>
            <p className="text-sm text-gray-400">info@inspiregroup.com</p> */}
          </div>
        </div>

        {/* Scroll to top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            aria-label="Scroll to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;