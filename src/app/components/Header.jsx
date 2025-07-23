"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "@/TranslationContext";
import {
  Home, Info, Mail, LogOut, UserPlus, Key, ChevronDown, Globe, Menu, Check,
} from "lucide-react";
import { AgentCodeEntry } from "./AgentHubCode/AgentCodeEntry";

const Header = () => {
  const [checking, setChecking] = useState(true);
  const [isPhilippines, setIsPhilippines] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const { t, isClient, language, setLanguage } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef(null);
  const langDropdownRef = useRef(null);
  const mobileLangDropdownRef = useRef(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileLangDropdownOpen, setMobileLangDropdownOpen] = useState(false);
  const agentCodeEntryRef = useRef();

  // Enhanced language options data with better flag display
  const languageOptions = [
    { code: "en", label: t.english || "English", flag: "🇬🇧", native: "English" },
    { code: "ja", label: t.japanese || "日本語", flag: "🇯🇵", native: "日本語" },
    { code: "ko", label: t.korean || "한국어", flag: "🇰🇷", native: "한국어" },
    { code: "zh", label: t.chinese || "简体中文", flag: "🇨🇳", native: "简体中文" },
  ];

  // Get current language details
  const currentLanguage = languageOptions.find(lang => lang.code === language) || languageOptions[0];

  // IP Check Effect
  useEffect(() => {
    fetch(`https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IPINFO_API_URL}`)
      .then(res => res.json())
      .then(data => {
        setIsPhilippines(data.country === "PH");
        setChecking(false);
      })
      .catch(() => {
        setIsPhilippines(false);
        setChecking(false);
      });
  }, []);

  useEffect(() => {
    const handleLoginStatusChange = () => {
      const loginStatus = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(loginStatus === "true");
    };
    handleLoginStatusChange();
    window.addEventListener("loginStatusChanged", handleLoginStatusChange);
    return () => window.removeEventListener("loginStatusChanged", handleLoginStatusChange);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };

    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest('[aria-label="Toggle menu"]')
      ) {
        setIsMenuOpen(false);
      }

      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target) &&
        !event.target.closest(".language-dropdown-button")
      ) {
        setLangDropdownOpen(false);
      }

      if (
        mobileLangDropdownRef.current &&
        !mobileLangDropdownRef.current.contains(event.target) &&
        !event.target.closest(".mobile-language-button")
      ) {
        setMobileLangDropdownOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("loginStatusChanged"));
    router.push("/");
  };

  // Don't render header if checking or if user is from Philippines
  if (checking || isPhilippines) return null;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md h-[68px]">
        <div className="container mx-auto flex justify-between items-center h-full px-6 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/images/inspirelogo.png" alt="Inspire Connect Logo" className="h-10 md:h-12 object-contain" />
            <span className="text-2xl md:text-3xl font-bold text-gray-800">
              {t.inspireGroup || "INSPIRE GROUP"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <ul className="flex items-center space-x-4 lg:space-x-6">
              <li>
                <Link
                  href={isHomePage ? "#hero" : "/"}
                  onClick={isHomePage ? (e) => scrollToSection(e, "hero") : null}
                  className="flex items-center space-x-1 px-3 py-2 text-gray-800 hover:text-blue-600"
                >
                  <Home size={18} />
                  <span>{isClient ? t.home : "Home"}</span>
                </Link>
              </li>
              {isHomePage && (
                <>
                  <li>
                    <a
                      onClick={(e) => scrollToSection(e, "about-section")}
                      className="flex items-center space-x-1 px-3 py-2 text-gray-800 hover:text-blue-600"
                    >
                      <Info size={18} />
                      <span>{t.about || "About"}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={(e) => scrollToSection(e, "contacts")}
                      className="flex items-center space-x-1 px-3 py-2 text-gray-800 hover:text-blue-600"
                    >
                      <Mail size={18} />
                      <span>{t.contact || "Contact"}</span>
                    </a>
                  </li>
                </>
              )}
            </ul>

            {/* Desktop Buttons */}
            <div className="ml-4 flex items-center space-x-2">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => agentCodeEntryRef.current?.openRegister()}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
                  >
                    <UserPlus size={16} className="inline mr-1" />
                    {t.register || "Register"}
                  </button>
                  <button
                    onClick={() => agentCodeEntryRef.current?.openLogin()}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors duration-200"
                  >
                    <Key size={16} className="inline mr-1" />
                    {t.login || "Login"}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/agent-home" className="text-blue-700 hover:text-blue-900 font-semibold">
                    {t.agentSite || "Agent Site"}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-200"
                  >
                    <LogOut size={16} className="inline mr-1" />
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Enhanced Language Dropdown (Desktop) */}
            <div className="ml-4 relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-800 transition-all duration-200 border border-gray-200 language-dropdown-button"
                aria-haspopup="true"
                aria-expanded={langDropdownOpen}
                aria-label="Language selector"
              >
                <span className="text-lg mr-2">{currentLanguage.flag}</span>
                <span className="mx-1 text-sm font-medium hidden sm:inline">
                  {currentLanguage.native}
                </span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} 
                />
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                  <div className="py-1">
                    <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.selectLanguage || "Select Language"}
                    </div>
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-3 text-left transition-colors duration-150 ${
                          language === lang.code 
                            ? "bg-blue-50 text-blue-700 font-medium" 
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-lg mr-3">{lang.flag}</span>
                        <div className="flex flex-col">
                          <span className="text-sm">{lang.label}</span>
                          <span className="text-xs text-gray-500">{lang.native}</span>
                        </div>
                        {language === lang.code && (
                          <Check size={16} className="text-blue-600 ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Controls - Language Button and Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Enhanced Mobile Language Button */}
            <div className="relative" ref={mobileLangDropdownRef}>
              <button
                onClick={() => setMobileLangDropdownOpen(!mobileLangDropdownOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 mobile-language-button"
                aria-haspopup="true"
                aria-expanded={mobileLangDropdownOpen}
                aria-label="Mobile language selector"
              >
                <span className="text-lg">{currentLanguage.flag}</span>
              </button>
              {mobileLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                  <div className="py-1">
                    <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.selectLanguage || "Select Language"}
                    </div>
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setMobileLangDropdownOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-3 text-left transition-colors duration-150 ${
                          language === lang.code 
                            ? "bg-blue-50 text-blue-700 font-medium" 
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-lg mr-3">{lang.flag}</span>
                        <div className="flex flex-col">
                          <span className="text-sm">{lang.label}</span>
                          <span className="text-xs text-gray-500">{lang.native}</span>
                        </div>
                        {language === lang.code && (
                          <Check size={16} className="text-blue-600 ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 hover:text-blue-600 p-1"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>

        {/* Mobile Menu (without language selector) */}
        {isMenuOpen && (
          <div ref={menuRef} className="md:hidden bg-white shadow-lg">
            <ul className="flex flex-col p-4 space-y-3">
              <li>
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-3 py-2 text-gray-800 hover:bg-gray-50 rounded-lg"
                >
                  <Home size={18} className="mr-3" />
                  {t.home || "Home"}
                </Link>
              </li>
              {isHomePage && (
                <>
                  <li>
                    <a 
                      onClick={(e) => scrollToSection(e, "about-section")} 
                      className="flex items-center px-3 py-2 text-gray-800 hover:bg-gray-50 rounded-lg"
                    >
                      <Info size={18} className="mr-3" />
                      {t.about || "About"}
                    </a>
                  </li>
                  <li>
                    <a 
                      onClick={(e) => scrollToSection(e, "contacts")} 
                      className="flex items-center px-3 py-2 text-gray-800 hover:bg-gray-50 rounded-lg"
                    >
                      <Mail size={18} className="mr-3" />
                      {t.contact || "Contact"}
                    </a>
                  </li>
                </>
              )}
              <li>
                {!isLoggedIn ? (
                  <div className="space-y-2">
                    <button 
                      onClick={() => { agentCodeEntryRef.current?.openRegister(); setIsMenuOpen(false); }} 
                      className="flex items-center w-full px-3 py-2 text-left text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <UserPlus size={18} className="mr-3" />
                      {t.register || "Register"}
                    </button>
                    <button 
                      onClick={() => { agentCodeEntryRef.current?.openLogin(); setIsMenuOpen(false); }} 
                      className="flex items-center w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg"
                    >
                      <Key size={18} className="mr-3" />
                      {t.login || "Login"}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link 
                      href="/agent-home" 
                      className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      {t.agentSite || "Agent Site"}
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="flex items-center w-full px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <LogOut size={18} className="mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Agent Code Entry Modal */}
      <AgentCodeEntry ref={agentCodeEntryRef} />
    </>
  );
};

export default Header;