"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);  // Track hydration state
  const pathname = usePathname(); // Get current route

  useEffect(() => {
    // Check if we are on the homepage
    setIsHomePage(pathname === "/");

    // Detect scroll position
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Mark hydration complete after initial render
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Smooth scroll to Hero section
  const scrollToHero = (e) => {
    e.preventDefault();
    document.getElementById("hero-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isHydrated && isHomePage && !isScrolled ? "bg-transparent" : "bg-white shadow-md"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/images/inspirelogo.png"
            alt="Inspire Connect"
            className="h-10 mr-2"
          />
          <span
            className={`text-xl font-bold transition-all duration-300 ${
              isHydrated && isHomePage && !isScrolled ? "text-white" : "text-blue-600"
            }`}
          >
            INSPIRE GROUP
          </span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8">
          {/* Home link logic */}
          <li className="relative group">
            <Link
              href={isHomePage ? "#" : "/"} // Link behavior based on page
              onClick={isHomePage ? scrollToHero : null} // Scroll to Hero on Home
              className={`flex flex-col items-center transition-all duration-300 ${
                isHydrated && (isHomePage && !isScrolled ? "text-white" : "text-gray-700")
              }`}
            >
              <span className="text-lg">🏠</span>
              <span className="text-xs">HOME</span>
            </Link>
          </li>

          {/* Show About and Contact only on Home Page */}
          {isHomePage && (
            <>
              <li className="relative group">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("about")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className={`flex flex-col items-center transition-all duration-300 cursor-pointer ${
                    isHydrated && (isHomePage && !isScrolled ? "text-white" : "text-gray-700")
                  }`}
                >
                  <span className="text-lg">🏢</span>
                  <span className="text-xs">ABOUT</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>

              <li className="relative group">
                <a
                  href="#contacts"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contacts")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className={`flex flex-col items-center transition-all duration-300 cursor-pointer ${
                    isHydrated && (isHomePage && !isScrolled ? "text-white" : "text-gray-700")
                  }`}
                >
                  <span className="text-lg">✉️</span>
                  <span className="text-xs">CONTACT</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            </>
          )}
        </ul>

        {/* Hamburger Menu */}
        <button
          className={`md:hidden transition-all duration-300 p-2 rounded-md ${
            isHydrated && (isHomePage && !isScrolled ? "bg-transparent text-white border-white border" : "bg-white text-gray-700 shadow-md")
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md py-4">
          <ul className="flex flex-col items-center space-y-4">
            {/* Home link behavior */}
            <li>
              <Link
                href={isHomePage ? "#" : "/"} // Link behavior based on page
                onClick={isHomePage ? scrollToHero : null} // Scroll to Hero on Home
                className="text-gray-700 hover:text-blue-600 text-lg"
              >
                🏠 HOME
              </Link>
            </li>

            {/* Show About and Contact only on Home Page */}
            {isHomePage && (
              <>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("about")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    className="text-gray-700 hover:text-blue-600 text-lg cursor-pointer relative group"
                  >
                    🏢 ABOUT
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>

                <li>
                  <a
                    href="#contacts"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("contacts")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    className="text-gray-700 hover:text-blue-600 text-lg cursor-pointer relative group"
                  >
                    ✉️ CONTACT
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
