"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "@/TranslationContext";
import { Home, Info, Mail, LogOut, UserPlus, Key, ChevronDown, Globe } from "lucide-react"; // Make sure Globe is imported
import { AgentCodeEntry } from './AgentHubCode/AgentCodeEntry'; // Ensure this path is correct for your project structure

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const { t, isClient, language, setLanguage } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileLangDropdownOpen, setMobileLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef(null);
  const mobileLangDropdownRef = useRef(null);

  const agentCodeEntryRef = useRef();

  useEffect(() => {
    const handleLoginStatusChange = () => {
      if (typeof window !== "undefined") {
        const loginStatus = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(loginStatus === "true");
      }
    };

    handleLoginStatusChange();
    window.addEventListener("loginStatusChanged", handleLoginStatusChange);
    return () => {
      window.removeEventListener("loginStatusChanged", handleLoginStatusChange);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      // Close mobile menu if clicked outside, but not on menu toggle
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="Toggle menu"]') &&
        !event.target.closest('.language-dropdown-button')
      ) {
        setIsMenuOpen(false);
      }

      // Close desktop language dropdown on outside click
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target) && !event.target.closest('.language-dropdown-button')) {
        setLangDropdownOpen(false);
      }

      // Close mobile language dropdown on outside click
      if (mobileLangDropdownRef.current && !mobileLangDropdownRef.current.contains(event.target) && !event.target.closest('.language-dropdown-button')) {
        setMobileLangDropdownOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("loginStatusChanged"));
    router.push("/");
  };

  // Helper function to get the Globe icon for language selection
  const getLanguageIcon = () => {
    return <Globe size={24} />; // Always return the Globe icon
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md h-[68px]">
        <div className="container mx-auto flex justify-between items-center h-full px-6 md:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="/images/inspirelogo.png"
                alt="Inspire Connect Logo"
                className="h-10 md:h-12 object-contain"
              />
              <span className="text-2xl md:text-3xl font-extrabold text-gray-800">
                {t.inspireGroup || "INSPIRE GROUP"}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <ul className="flex items-center space-x-4 lg:space-x-6">
              <li className="group">
                <Link
                  href={isHomePage ? "#hero" : "/"}
                  onClick={isHomePage ? (e) => scrollToSection(e, "hero") : null}
                  className="relative font-medium tracking-wide text-sm flex items-center space-x-1 py-2 px-3 transition-colors duration-300 group text-gray-800 hover:text-blue-600"
                >
                  <Home size={18} />
                  <span>{isClient ? t.home : "Home"}</span>
                </Link>
              </li>

              {isHomePage && (
                <>
                  <li className="group">
                    <a
                      onClick={(e) => scrollToSection(e, "about-section")}
                      className="relative font-medium tracking-wide text-sm flex items-center space-x-1 py-2 px-3 transition-colors duration-300 group text-gray-800 hover:text-blue-600"
                    >
                      <Info size={18} />
                      <span>{isClient ? t.about : "About"}</span>
                    </a>
                  </li>

                  <li className="group">
                    <a
                      onClick={(e) => scrollToSection(e, "contacts")}
                      className="relative font-medium tracking-wide text-sm flex items-center space-x-1 py-2 px-3 transition-colors duration-300 group text-gray-800 hover:text-blue-600"
                    >
                      <Mail size={18} />
                      <span>{isClient ? t.contact : "Contact"}</span>
                    </a>
                  </li>
                </>
              )}
            </ul>

            {/* Desktop Auth Buttons */}
            <div className="ml-4 flex items-center space-x-2">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => agentCodeEntryRef.current?.openRegister()}
                    className="inline-flex items-center justify-center space-x-1 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-md bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg"
                  >
                    <UserPlus size={18} />
                    <span>{t.register || "Register"}</span>
                  </button>
                  <button
                    onClick={() => agentCodeEntryRef.current?.openLogin()}
                    className="inline-flex items-center justify-center space-x-1 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-md bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-lg"
                  >
                    <Key size={18} />
                    <span>{t.login || "Login"}</span>
                  </button>
                </>
              ) : (
                <>
                <Link
                  href="/agent-home"
                  className="relative font-medium tracking-wide text-sm flex items-center space-x-1 py-2 px-3 transition-colors duration-300 group text-blue-700 hover:text-blue-900"
                >
                  <span>{isClient ? (t.agentSite || "Agent Site") : "Agent Site"}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center space-x-1 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-md bg-red-500 text-white hover:bg-red-600 hover:shadow-lg"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
                </>
              )}
            </div>
            {/* Language Dropdown (Desktop) */}
            <div className="ml-6 relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangDropdownOpen((v) => !v)}
                className="flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 language-dropdown-button"
                aria-haspopup="listbox"
                aria-expanded={langDropdownOpen}
              >
                <span className="mr-2">{t.language || "Language"}</span>
                <ChevronDown size={18} />
              </button>
              {langDropdownOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {[
                    { code: "en", label: t.english || "English" },
                    { code: "ja", label: t.japanese || "日本語" },
                    { code: "ko", label: t.korean || "한국어" },
                    { code: "zh", label: t.chinese || "简体中文" },
                  ].map((lang) => (
                    <li key={lang.code}>
                      <button
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors duration-150 ${
                          language === lang.code
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100 text-gray-800"
                        }`}
                      >
                        {lang.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Mobile Navigation Toggle and Language Dropdown */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Language Dropdown (Mobile) - Now outside the burger menu container */}
            <div className="relative" ref={mobileLangDropdownRef}>
              <button
                onClick={() => setMobileLangDropdownOpen((v) => !v)}
                className="flex items-center p-1.5 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 language-dropdown-button"
                aria-label="Select Language"
                aria-haspopup="listbox"
                aria-expanded={mobileLangDropdownOpen}
              >
                {getLanguageIcon()} {/* Always display Globe icon */}
              </button>
              {mobileLangDropdownOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
                  {[
                    { code: "en", label: t.english || "English" },
                    { code: "ja", label: t.japanese || "日本語" },
                    { code: "ko", label: t.korean || "한국어" },
                    { code: "zh", label: t.chinese || "简体中文" },
                  ].map((lang) => (
                    <li key={lang.code}>
                      <button
                        onClick={() => {
                          setLanguage(lang.code);
                          setMobileLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors duration-150 flex items-center space-x-2 ${
                          language === lang.code
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100 text-gray-800"
                        }`}
                      >
                        {getLanguageIcon()} {/* Display Globe icon in dropdown options */}
                        <span>{lang.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Burger Icon */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="w-8 h-8 text-gray-800 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Content */}
      <div
        ref={menuRef}
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{
          backdropFilter: isMenuOpen ? "blur(5px)" : "none",
          backgroundColor: isMenuOpen ? "rgba(0,0,0,0.3)" : "transparent"
        }}
      >
        <div
          className={`absolute top-[68px] left-0 right-0 mx-auto w-full max-w-md bg-white shadow-xl rounded-b-lg transition-all duration-300 transform ${
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <ul className="flex flex-col items-center py-6 px-6 space-y-4">
            <li className="w-full">
              <Link
                href={isHomePage ? "#hero" : "/"}
                onClick={isHomePage ? (e) => scrollToSection(e, "hero") : () => setIsMenuOpen(false)}
                className="w-full flex items-center justify-start space-x-4 px-6 py-3 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors duration-200"
              >
                <Home size={22} className="text-blue-500" />
                <span className="text-lg font-medium">{isClient ? t.home : "Home"}</span>
              </Link>
            </li>

            {isHomePage && (
              <>
              <li className="w-full">
                <a
                  onClick={(e) => scrollToSection(e, "about-section")}
                  className="w-full flex items-center justify-start space-x-4 px-6 py-3 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                >
                  <Info size={22} className="text-blue-500" />
                  <span className="text-lg font-medium">{isClient ? t.about : "About"}</span>
                </a>
              </li>
              <li className="w-full">
                <a
                  onClick={(e) => scrollToSection(e, "contacts")}
                  className="w-full flex items-center justify-start space-x-4 px-6 py-3 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                >
                  <Mail size={22} className="text-blue-500" />
                  <span className="text-lg font-medium">{isClient ? t.contact : "Contact"}</span>
                </a>
              </li>
              </>
            )}

            <div className="w-full border-t border-gray-200 my-2"></div>

              {!isLoggedIn ? (
                <>
                <li className="w-full">
                  <button
                    onClick={() => {
                      agentCodeEntryRef.current?.openRegister();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-start space-x-4 px-6 py-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
                  >
                    <UserPlus size={22} className="text-blue-600" />
                    <span className="text-lg font-medium">{t.register || "Register"}</span>
                  </button>
                </li>
                <li className="w-full">
                  <button
                    onClick={() => {
                      agentCodeEntryRef.current?.openLogin();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-start space-x-4 px-6 py-3 rounded-lg bg-gray-50 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Key size={22} className="text-gray-600" />
                    <span className="text-lg font-medium">{t.login || "Login"}</span>
                  </button>
                </li>
                </>
              ) : (
                <>
                <li className="w-full">
                  <Link
                    href="/agent-home"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full flex items-center justify-start space-x-4 px-6 py-3 rounded-lg text-blue-700 hover:bg-blue-50 transition-colors duration-200"
                  >
                    <span className="text-lg font-medium">{isClient ? (t.agentSite || "Agent Site") : "Agent Site"}</span>
                  </Link>
                </li>
                <li className="w-full">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-start space-x-4 px-6 py-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200"
                  >
                    <LogOut size={22} className="text-red-600" />
                    <span className="text-lg font-medium">Logout</span>
                  </button>
                </li>
                </>
              )}
          </ul>
        </div>
      </div>
      {/* Agent Code Entry Modals */}
      <AgentCodeEntry ref={agentCodeEntryRef} />
    </>
  );
};

export default Header;