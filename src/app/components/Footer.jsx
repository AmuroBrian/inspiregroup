"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/TranslationContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faGlobe, faBuilding } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const { t } = useTranslation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
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

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-black to-blue-950 text-gray-200 border-t border-blue-900 shadow-2xl relative overflow-hidden">
      {/* Background overlay for subtle texture/pattern */}
      {/* Ensure you have bg-dots-pattern defined in your tailwind.config.js if you want this effect */}
      {/* Consider adjusting opacity or color of dots if they clash with blue */}
      <div className="absolute inset-0 bg-dots-pattern opacity-10" aria-hidden="true"></div> {/* Increased opacity slightly for visibility on dark blue */}

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Main grid for footer sections */}
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 lg:gap-x-20">

          {/* Section 1: Branding and Copyright */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="text-4xl font-semibold text-white mb-4 tracking-tight leading-tight">
              {t.inspireGroup || "Inspire Holdings Inc."}
            </h3>
            <p className="text-base text-blue-100 leading-relaxed mb-3">
              &copy; {currentYear} {t.inspireGroup || "Inspire Holdings Inc."}.{" "}
              {t.allRightsReserved || "All Rights Reserved."}
            </p>
            <p className="text-sm text-blue-200">
              {t.poweredBy || "Powered by"}{" "}
              <span className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer">
                {t.inspireGroup || "Inspire Group"}
              </span>
            </p>
          </div>

          {/* Section 2: Head Office and Satellite Offices */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h4 className="text-xl font-semibold text-white mb-6 flex items-center justify-center md:justify-start">
              <FontAwesomeIcon icon={faBuilding} className="mr-3 text-blue-300 text-2xl" />
              {t.ourOffices || "Our Offices"}
            </h4>
            <div className="space-y-6 w-full">
              <div>
                <p className="font-semibold text-blue-100 flex items-center justify-center md:justify-start mb-1">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-3 text-red-300" />
                  {t.mainOffice || "Main Office (Philippines):"}
                </p>
                <p className="text-sm text-blue-200 pl-0 md:pl-6 leading-relaxed">
                  {t.mainOfficeAddress || "6F Alliance Global Tower, 11th Avenue, corner 36th St, Taguig, Metro Manila"}
                </p>
              </div>
              <div>
                <p className="font-semibold text-blue-100 flex items-center justify-center md:justify-start mb-1">
                  <FontAwesomeIcon icon={faGlobe} className="mr-3 text-green-300" />
                  {t.satelliteOfficeUSA || "Satellite Office (USA):"}
                </p>
                <p className="text-sm text-blue-200 pl-0 md:pl-6 leading-relaxed">
                  {t.usaOfficeAddress || "1209 Mountain Road PL NE STE N Bernalillo County Albuquerque, NM, 87110, USA"}
                </p>
              </div>
              <div>
                <p className="font-semibold text-blue-100 flex items-center justify-center md:justify-start mb-1">
                  <FontAwesomeIcon icon={faGlobe} className="mr-3 text-yellow-300" />
                  {t.satelliteOfficeJapan || "Satellite Office (Japan):"}
                </p>
                <p className="text-sm text-blue-200 pl-0 md:pl-6 leading-relaxed">
                  {t.japanOfficeAddress || "20th floor, Trust Tower Main Building, 1-8-3 Marunouchi, Chiyoda-ku, Tokyo 100-8283"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Scroll to top (Centered below content) */}
        <div className="border-t border-blue-900 mt-16 pt-8 text-center text-blue-300 text-sm">
          <p>
            {t.footerNote || "Inspiring innovation, building futures."}
          </p>
        </div>

        {/* Scroll to top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            aria-label="Scroll to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
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