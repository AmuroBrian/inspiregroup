"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "@/TranslationContext";
import { Home, Info, Mail, LogOut, UserPlus, Key } from "lucide-react";
import { AgentCodeEntry } from './AgentHubCode/AgentCodeEntry';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const { t, isClient } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              <svg
                className="w-8 h-8 text-gray-800"
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

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[68px] left-0 w-full bg-white z-40 transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-screen shadow-md" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center space-y-4 py-4 px-4">
          <li className="w-full">
            <Link
              href={isHomePage ? "#hero" : "/"}
              onClick={isHomePage ? (e) => scrollToSection(e, "hero") : () => setIsMenuOpen(false)}
              className="w-full text-lg flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-gray-800 hover:text-blue-600"
            >
              <Home size={20} />
              <span>{isClient ? t.home : "Home"}</span>
            </Link>
          </li>

          {isHomePage && (
            <>
              <li className="w-full">
                <a
                  onClick={(e) => scrollToSection(e, "about-section")}
                  className="w-full text-lg flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-gray-800 hover:text-blue-600"
                >
                  <Info size={20} />
                  <span>{isClient ? t.about : "About"}</span>
                </a>
              </li>
              <li className="w-full">
                <a
                  onClick={(e) => scrollToSection(e, "contacts")}
                  className="w-full text-lg flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-gray-800 hover:text-blue-600"
                >
                  <Mail size={20} />
                  <span>{isClient ? t.contact : "Contact"}</span>
                </a>
              </li>
            </>
          )}

          {!isLoggedIn ? (
            <>
              <li className="w-full px-4">
                <button
                  onClick={() => {
                    agentCodeEntryRef.current?.openRegister();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-lg flex items-center justify-center space-x-2 px-6 py-3 bg-blue-500 text-white hover:bg-blue-600 rounded-full font-semibold text-sm shadow-sm"
                >
                  <UserPlus size={20} />
                  <span>{t.register || "Register"}</span>
                </button>
              </li>
              <li className="w-full px-4">
                <button
                  onClick={() => {
                    agentCodeEntryRef.current?.openLogin();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-lg flex items-center justify-center space-x-2 px-6 py-3 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-full font-semibold text-sm shadow-sm"
                >
                  <Key size={20} />
                  <span>{t.login || "Login"}</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="w-full">
                <Link
                  href="/agent-home"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-lg flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-blue-700 hover:text-blue-900"
                >
                  <span>{isClient ? (t.agentSite || "Agent Site") : "Agent Site"}</span>
                </Link>
              </li>
              <li className="w-full px-4">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-lg flex items-center justify-center space-x-2 px-6 py-3 bg-red-500 text-white hover:bg-red-600 rounded-full font-semibold text-sm shadow-sm"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Agent Code Entry Modals */}
      <AgentCodeEntry ref={agentCodeEntryRef} />
    </>
  );
};

export default Header;