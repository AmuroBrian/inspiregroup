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
      <nav
        className="fixed top-0 left-0 w-full z-50 bg-white shadow-md h-[68px]"
        aria-label="Main Navigation"
      >
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
                  aria-label={isClient ? t.home : "Home"}
                >
                  <Home size={18} />
                  <span>{isClient ? t.home : "Home"}</span>
                  <span className="absolute bottom-0 left-1/2 w-0 h-[3px] bg-blue-500 rounded-full transition-all duration-300 transform -translate-x-1/2 group-hover:w-[calc(100%-1rem)] group-focus:w-[calc(100%-1rem)]"></span>
                </Link>
              </li>

              {isHomePage && (
                <>
                  <li className="group">
                    <a
                      onClick={(e) => scrollToSection(e, "about-section")}
                      className="relative font-medium tracking-wide text-sm flex items-center space-x-1 py-2 px-3 transition-colors duration-300 group text-gray-800 hover:text-blue-600"
                      aria-label={isClient ? t.about : "About"}
                    >
                      <Info size={18} />
                      <span>{isClient ? t.about : "About"}</span>
                      <span className="absolute bottom-0 left-1/2 w-0 h-[3px] bg-blue-500 rounded-full transition-all duration-300 transform -translate-x-1/2 group-hover:w-[calc(100%-1rem)] group-focus:w-[calc(100%-1rem)]"></span>
                    </a>
                  </li>

                  <li className="group">
                    <a
                      onClick={(e) => scrollToSection(e, "contacts")}
                      className="relative font-medium tracking-wide text-sm flex items-center space-x-1 py-2 px-3 transition-colors duration-300 group text-gray-800 hover:text-blue-600"
                      aria-label={isClient ? t.contact : "Contact"}
                    >
                      <Mail size={18} />
                      <span>{isClient ? t.contact : "Contact"}</span>
                      <span className="absolute bottom-0 left-1/2 w-0 h-[3px] bg-blue-500 rounded-full transition-all duration-300 transform -translate-x-1/2 group-hover:w-[calc(100%-1rem)] group-focus:w-[calc(100%-1rem)]"></span>
                    </a>
                  </li>
                </>
              )}
            </ul>

            {/* Desktop Agent Code Entry */}
            <div className="ml-4">
              {!isLoggedIn ? (
                <AgentCodeEntry ref={agentCodeEntryRef} className="hidden md:block" />
              ) : (
                <ul className="flex items-center space-x-4 lg:space-x-6">
                  <li className="group">
                    <Link
                      href="/agent-home"
                      className="relative font-medium tracking-wide text-sm flex items-center space-x-1 py-2 px-3 transition-colors duration-300 group text-blue-700 hover:text-blue-900"
                      aria-label={isClient ? (t.agentSite || "Agent Site") : "Agent Site"}
                    >
                      <span>{isClient ? (t.agentSite || "Agent Site") : "Agent Site"}</span>
                      <span className="absolute bottom-0 left-1/2 w-0 h-[3px] bg-blue-500 rounded-full transition-all duration-300 transform -translate-x-1/2 group-hover:w-[calc(100%-1rem)] group-focus:w-[calc(100%-1rem)]"></span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center justify-center space-x-1 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-md bg-red-500 text-white hover:bg-red-600 hover:shadow-lg"
                      aria-label="Logout"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center z-50">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-5"
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
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
              className="w-full text-lg cursor-pointer transition-colors duration-300 flex items-center justify-center space-x-2 text-gray-800 hover:text-blue-600 px-4 py-2 rounded-md"
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
                  className="w-full text-lg cursor-pointer transition-colors duration-300 flex items-center justify-center space-x-2 text-gray-800 hover:text-blue-600 px-4 py-2 rounded-md"
                >
                  <Info size={20} />
                  <span>{isClient ? t.about : "About"}</span>
                </a>
              </li>

              <li className="w-full">
                <a
                  onClick={(e) => scrollToSection(e, "contacts")}
                  className="w-full text-lg cursor-pointer transition-colors duration-300 flex items-center justify-center space-x-2 text-gray-800 hover:text-blue-600 px-4 py-2 rounded-md"
                >
                  <Mail size={20} />
                  <span>{isClient ? t.contact : "Contact"}</span>
                </a>
              </li>
            </>
          )}

          {!isLoggedIn ? (
            <>
              <li className="w-full px-4 pt-2">
                <button
                  onClick={() => { agentCodeEntryRef.current?.openRegister(); setIsMenuOpen(false); }}
                  className="w-full text-lg cursor-pointer transition-colors duration-300 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-500 text-white hover:bg-blue-600 rounded-full font-semibold text-sm shadow-sm"
                >
                  <UserPlus size={20} />
                  <span>{t.register || "Register"}</span>
                </button>
              </li>
              <li className="w-full px-4">
                <button
                  onClick={() => { agentCodeEntryRef.current?.openLogin(); setIsMenuOpen(false); }}
                  className="w-full text-lg cursor-pointer transition-colors duration-300 flex items-center justify-center space-x-2 px-6 py-3 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-full font-semibold text-sm shadow-sm"
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
                  className="w-full text-lg cursor-pointer transition-colors duration-300 flex items-center justify-center space-x-2 text-blue-700 hover:text-blue-900 px-4 py-2 rounded-md"
                >
                  <span>{isClient ? (t.agentSite || "Agent Site") : "Agent Site"}</span>
                </Link>
              </li>
              <li className="w-full px-4 pt-2">
                <button
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="w-full text-lg cursor-pointer transition-colors duration-300 flex items-center justify-center space-x-2 px-6 py-3 bg-red-500 text-white hover:bg-red-600 rounded-full font-semibold text-sm shadow-sm"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Render AgentCodeEntry for modals */}
      <AgentCodeEntry ref={agentCodeEntryRef} className="hidden" />
    </>
  );
};

export default Header;