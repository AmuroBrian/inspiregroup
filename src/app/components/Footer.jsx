"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "@/TranslationContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faGlobe, faBuilding } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const [accessStatus, setAccessStatus] = useState('checking'); // 'checking' | 'allowed' | 'blocked'
  const { t } = useTranslation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const checkCountRef = useRef(0);

  // Robust IP verification
  useEffect(() => {
    const MAX_CHECKS = 2;
    const controller = new AbortController();
    const { signal } = controller;

    const verifyLocation = async (attempt = 0) => {
      try {
        checkCountRef.current++;
        const apiUrl = attempt % 2 === 0 
          ? `https://ipapi.co/json/?${Date.now()}`
          : `https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IPINFO_API_URL}&${Date.now()}`;

        const response = await fetch(apiUrl, { signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        const isPH = ["PH", "PHL"].includes(data.country);

        if (isPH) {
          setAccessStatus('blocked');
          return;
        }

        if (attempt < MAX_CHECKS - 1) {
          // Double-check if not PH
          setTimeout(() => verifyLocation(attempt + 1), 500);
        } else {
          setAccessStatus('allowed');
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Location check error:', error);
          if (checkCountRef.current >= MAX_CHECKS) {
            setAccessStatus('allowed'); // Default to showing if checks fail
          }
        }
      }
    };

    verifyLocation();

    return () => controller.abort();
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Render nothing while checking or if blocked
  if (accessStatus !== 'allowed') return null;

  // Full footer rendering
  return (
    <footer className="bg-gradient-to-r from-black to-blue-950 text-gray-200 border-t border-blue-900 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-dots-pattern opacity-10" aria-hidden="true"></div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 lg:gap-x-20">
          
          {/* Branding Section */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="text-4xl font-semibold text-white mb-4 tracking-tight leading-tight">
              {t.inspireGroup || "Inspire Holdings Inc."}
            </h3>
            <p className="text-base text-blue-100 leading-relaxed mb-3">
              &copy; {new Date().getFullYear()} {t.inspireGroup || "Inspire Holdings Inc."}.{" "}
              {t.allRightsReserved || "All Rights Reserved."}
            </p>
            <p className="text-sm text-blue-200">
              {t.poweredBy || "Powered by"}{" "}
              <span className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer">
                {t.inspireGroup || "Inspire Group"}
              </span>
            </p>
          </div>

          {/* Offices Section - All details included */}
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

        <div className="border-t border-blue-900 mt-16 pt-8 text-center text-blue-300 text-sm">
          <p>{t.footerNote || "Inspiring innovation, building futures."}</p>
        </div>
      </div>

      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 z-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </footer>
  );
};

export default Footer;