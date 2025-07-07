"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AgentCodeEntry } from "./AgentHubCode/AgentCodeEntry";
import { useTranslation } from "@/TranslationContext";
import { Home, Info, Mail, UserPlus, Key } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { t } = useTranslation();

  const scrollToSection = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setIsMenuOpen(false);
  };

  const commonLinkClasses = "relative font-medium tracking-wide text-sm flex items-center space-x-1 py-2 px-3 transition-colors duration-300 group";
  const mobileNavLinkClasses = "text-lg cursor-pointer transition-colors duration-300 flex items-center space-x-2";
  const underlineAnimation = "absolute bottom-0 left-1/2 w-0 h-[3px] bg-blue-500 rounded-full transition-all duration-300 transform -translate-x-1/2 group-hover:w-[calc(100%-1rem)] group-focus:w-[calc(100%-1rem)]";

  const buttonBaseClasses = "inline-flex items-center justify-center space-x-1 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-md";
  const registerButtonClasses = `${buttonBaseClasses} bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg`;
  const loginButtonClasses = `${buttonBaseClasses} bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-lg`;

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg"
      aria-label="Main Navigation"
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/images/inspirelogo.png"
              alt="Inspire Connect Logo"
              className="h-10 md:h-12 object-contain"
            />
            <span className="text-2xl md:text-3xl font-extrabold whitespace-nowrap text-gray-800">
              INSPIRE GROUP
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <li className="group">
            <Link
              href={isHomePage ? "#hero-section" : "/"}
              onClick={isHomePage ? (e) => scrollToSection(e, "hero-section") : null}
              className={`${commonLinkClasses} text-gray-800 hover:text-blue-600`}
              aria-label={t.home}
            >
              <Home size={18} />
              <span>{t.home}</span>
              <span className={underlineAnimation}></span>
            </Link>
          </li>

          {isHomePage && (
            <>
              <li className="group">
                <a
                  onClick={(e) => scrollToSection(e, "about")}
                  className={`${commonLinkClasses} text-gray-800 hover:text-blue-600`}
                  aria-label={t.about}
                >
                  <Info size={18} />
                  <span>{t.about}</span>
                  <span className={underlineAnimation}></span>
                </a>
              </li>

              <li className="group">
                <a
                  onClick={(e) => scrollToSection(e, "contacts")}
                  className={`${commonLinkClasses} text-gray-800 hover:text-blue-600`}
                  aria-label={t.contact}
                >
                  <Mail size={18} />
                  <span>{t.contact}</span>
                  <span className={underlineAnimation}></span>
                </a>
              </li>
            </>
          )}
          <li className="flex items-center space-x-2">
            <Link href="/register" className={registerButtonClasses}>
              <UserPlus size={18} />
              <span>{t.register || "Register"}</span>
            </Link>
            <Link href="/login" className={loginButtonClasses}>
              <Key size={18} />
              <span>{t.login || "Login"}</span>
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen py-4" : "max-h-0 py-0"
        }`}
      >
        <ul className="flex flex-col items-center space-y-4">
          <li>
            <Link
              href={isHomePage ? "#hero-section" : "/"}
              onClick={isHomePage ? (e) => scrollToSection(e, "hero-section") : () => setIsMenuOpen(false)}
              className={`${mobileNavLinkClasses} text-gray-800 hover:text-blue-600`}
            >
              <Home size={20} />
              <span>{t.home}</span>
            </Link>
          </li>

          {isHomePage && (
            <>
              <li>
                <a
                  onClick={(e) => scrollToSection(e, "about")}
                  className={`${mobileNavLinkClasses} text-gray-800 hover:text-blue-600`}
                >
                  <Info size={20} />
                  <span>{t.about}</span>
                </a>
              </li>

              <li>
                <a
                  onClick={(e) => scrollToSection(e, "contacts")}
                  className={`${mobileNavLinkClasses} text-gray-800 hover:text-blue-600`}
                >
                  <Mail size={20} />
                  <span>{t.contact}</span>
                </a>
              </li>
            </>
          )}
          <li>
            <Link
              href="/register"
              onClick={() => setIsMenuOpen(false)}
              className={`${mobileNavLinkClasses} ${registerButtonClasses.replace('shadow-md', 'shadow-sm')} px-6 py-2 w-full justify-center`}
            >
              <UserPlus size={20} />
              <span>{t.register || "Register"}</span>
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className={`${mobileNavLinkClasses} ${loginButtonClasses.replace('shadow-md', 'shadow-sm')} px-6 py-2 w-full justify-center`}
            >
              <Key size={20} />
              <span>{t.login || "Login"}</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;