"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "@/TranslationContext";
import {
  Home, Info, Mail, LogOut, UserPlus, Key, ChevronDown, Globe, Menu,
} from "lucide-react";
import { AgentCodeEntry } from "./AgentHubCode/AgentCodeEntry";

const Header = () => {
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
        !event.target.closest(".language-dropdown-button")
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
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                  >
                    <UserPlus size={16} className="inline mr-1" />
                    {t.register || "Register"}
                  </button>
                  <button
                    onClick={() => agentCodeEntryRef.current?.openLogin()}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300"
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
                    className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                  >
                    <LogOut size={16} className="inline mr-1" />
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Language Dropdown (Desktop) */}
            <div className="ml-4 relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 language-dropdown-button"
              >
                <Globe size={18} className="mr-1" />
                <span>{t.language || "Language"}</span>
                <ChevronDown size={18} className="ml-1" />
              </button>
              {langDropdownOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
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
                        className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${
                          language === lang.code ? "bg-blue-600 text-white" : "text-gray-800"
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 hover:text-blue-600"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div ref={menuRef} className="md:hidden bg-white shadow-md">
            <ul className="flex flex-col p-4 space-y-2">
              <li>
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-800 hover:text-blue-600"
                >
                  <Home size={18} className="inline mr-2" />
                  {t.home || "Home"}
                </Link>
              </li>
              {isHomePage && (
                <>
                  <li>
                    <a onClick={(e) => scrollToSection(e, "about-section")} className="block text-gray-800 hover:text-blue-600">
                      <Info size={18} className="inline mr-2" />
                      {t.about || "About"}
                    </a>
                  </li>
                  <li>
                    <a onClick={(e) => scrollToSection(e, "contacts")} className="block text-gray-800 hover:text-blue-600">
                      <Mail size={18} className="inline mr-2" />
                      {t.contact || "Contact"}
                    </a>
                  </li>
                </>
              )}
              <li>
                {!isLoggedIn ? (
                  <>
                    <button onClick={() => { agentCodeEntryRef.current?.openRegister(); setIsMenuOpen(false); }} className="block w-full text-left text-blue-500 hover:text-blue-600">
                      <UserPlus size={18} className="inline mr-2" />
                      {t.register || "Register"}
                    </button>
                    <button onClick={() => { agentCodeEntryRef.current?.openLogin(); setIsMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-gray-900">
                      <Key size={18} className="inline mr-2" />
                      {t.login || "Login"}
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/agent-home" className="text-blue-600 block">
                      {t.agentSite || "Agent Site"}
                    </Link>
                    <button onClick={handleLogout} className="text-red-500 hover:text-red-600 w-full text-left">
                      <LogOut size={18} className="inline mr-2" />
                      Logout
                    </button>
                  </>
                )}
              </li>
              {/* Mobile Language Dropdown */}
              <li className="relative" ref={mobileLangDropdownRef}>
                <button
                  onClick={() => setMobileLangDropdownOpen(!mobileLangDropdownOpen)}
                  className="flex items-center text-gray-800 hover:text-blue-600 language-dropdown-button"
                >
                  <Globe size={18} className="mr-2" />
                  {t.language || "Language"}
                  <ChevronDown size={18} className="ml-1" />
                </button>
                {mobileLangDropdownOpen && (
                  <ul className="mt-2 bg-white border rounded shadow-lg">
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
                          className={`block w-full text-left px-4 py-2 ${
                            language === lang.code ? "bg-blue-600 text-white" : "text-gray-800 hover:bg-gray-100"
                          }`}
                        >
                          {lang.label}
                        </button>
                      </li>
                    ))}
                  </ul>
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
