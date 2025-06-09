"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AgentCodeEntry } from "./AgentHubCode/AgentCodeEntry";
import { useTranslation } from "@/TranslationContext";



const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false); // Ensure hydration
  const { t } = useTranslation(); // Use translation context


  const pathname = usePathname();

  
  
  useEffect(() => {
    setIsHomePage(pathname === "/");

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const scrollToHero = (e) => {
    e.preventDefault();
    document.getElementById("hero-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined")
      {
      const shouldScroll = localStorage.getItem("scrollToAbout");
      if (shouldScroll) {
        localStorage.removeItem("scrollToAbout");
        const el = document.getElementById("ProjectCards");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  }, []);
  
  const scrollToProjectCards = (e) => {
    e.preventDefault();
    const el = document.getElementById("projectcards");
  
    if (el) {
      const header = document.getElementById("header"); // Use the ID or class of your header
      const headerHeight = header ? header.offsetHeight : 0; // Get the actual header height
      const y = el.getBoundingClientRect().top + window.pageYOffset - headerHeight; // Adjust scroll position by header height
  
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      localStorage.setItem("scrollToProjectCards", "true");
      window.location.href = "/";
    }
  
    setIsMenuOpen(false); // Close mobile menu after clicking
  };
  


  

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isHomePage && !isScrolled ? "bg-transparent" : "bg-white shadow-md"
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
              isHomePage && !isScrolled ? "text-white" : "text-blue-600"
            }`}
          >
            INSPIRE GROUP
          </span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8">

          <li className="relative group">
            <Link
              href={isHomePage ? "#" : "/"}
              onClick={isHomePage ? scrollToHero : null}
              className={`flex flex-col items-center transition-all duration-200 ${
                isHydrated &&
                (isHomePage && !isScrolled ? "text-white" : "text-gray-700")
              } hover:text-blue-600`}
            >
              {/* <span className="text-lg">🏠</span> */}
              {/* <span className="text-xs">{t.home}</span> */}
              {/* Underline Animation */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>

          {pathname !== "/" ? (
            <li className="relative group">
              <button
                onClick={() => (window.location.href = pathname === "/agent-home" ? "/" : "/")}
                className="flex flex-col items-center transition-all duration-300 text-gray-700 hover:text-blue-600"
              >
                <span className="text-lg">{pathname === "/agent-home" ? "🚪" : "🏠"}</span>
                <span className="text-xs">{pathname === "/agent-home" ? t.home : t.home}</span>

                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </li>
          ) : null}


          {isHomePage && (
            <>
              <li className="relative group">
                <Link
                  href="#"
                  onClick={scrollToHero}
                  className={`flex flex-col items-center transition-all duration-300 ${
                    isHomePage && !isScrolled ? "text-white" : "text-gray-700"
                  } hover:text-blue-600`}
                >
                  <span className="text-lg">🏠</span>
                  <span className="text-xs">{t.home}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>

              <li className="relative group">
  <a
   onClick={(e) => {
    e.preventDefault();
    const el = document.getElementById("projectcards");
  
    if (el) {
      const yOffset = 3200; // adjust this value to match your header height
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
  
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      localStorage.setItem("scrollToProjectCards", "true");
      window.location.href = "/";
    }
  
    setIsMenuOpen(false);
  }}
  
    className={`cursor-pointer flex flex-col items-center transition-all duration-300 ${
      isHomePage && !isScrolled ? "text-white" : "text-gray-700"
    } hover:text-blue-600`}
  >
    <span className="text-lg">🏢</span>
    <span className="text-xs">{t.about}</span>
    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
  </a>
</li>


{isMenuOpen && (
  <div className="md:hidden bg-white shadow-md transition-all duration-300 py-4">
    <ul className="flex flex-col items-center space-y-4">

      <li>
        <Link
          href={isHomePage ? "#" : "/"}
          onClick={isHomePage ? scrollToHero : () => setIsMenuOpen(false)}
          className="text-lg text-gray-500 transition-all duration-300 hover:text-blue-600"
        >
          🏠 {t.home}
        </Link>
      </li>

      {/* About Link */}
      <li>
        <a
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById("about");
            if (el) {
              const header = document.getElementById("header");
              const headerHeight = header ? header.offsetHeight : 0;
              const y = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;

              window.scrollTo({ top: y, behavior: "smooth" });
            }
            setIsMenuOpen(false); // Close menu
          }}
          className="text-lg cursor-pointer text-gray-500 transition-all duration-300 hover:text-blue-600"
        >
          🏢 {t.about}
        </a>
      </li>
    </ul>
  </div>
)}




              {/* {pathname !== "/" && (
                <li className="relative group">
                  <button
                    onClick={() => (window.location.href = "/")}
                    className="flex flex-col items-center transition-all duration-300 text-gray-700 hover:text-blue-600"
                  >
                    <span className="text-lg">
                      {pathname === "/ProjectCards" ? "🚪" : "🏠"}
                    </span>
                    <span className="text-xs">{pathname === "/ProjectCards" ? t.home : t.home}</span>

                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
              )} */}

              <li className="relative group">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contacts")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                    setIsMenuOpen(false);
                  }}
                  className={`cursor-pointer flex flex-col items-center transition-all duration-300 ${
                    isHomePage && !isScrolled ? "text-white" : "text-gray-700"
                  } hover:text-blue-600`}
                >
                  <span className="text-lg">✉️</span>

                  <span className="text-xs">{t.contact}</span>
                  {/* Underline Animation */}

                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>

              <AgentCodeEntry />
            </>
          )}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden p-2 rounded-md transition-all duration-300 ${
            isHomePage && !isScrolled ? "bg-transparent text-white" : "text-gray-700"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md transition-all duration-300 py-4">
          <ul className="flex flex-col items-center space-y-4">

            <li>
              <Link
                href={isHomePage ? "#" : "/"}
                onClick={isHomePage ? scrollToHero : () => setIsMenuOpen(false)}
                className="text-lg text-gray-500 transition-all duration-300 hover:text-blue-600"
              >
                🏠 {t.home}
              </Link>
            </li>

           

            {pathname !== "/" && (
              <li className="relative group">
                <button
                  onClick={() => (window.location.href = "/")}
                  className="flex flex-col items-center transition-all duration-300 text-gray-700 hover:text-blue-600"
                >
                  <span className="text-lg">🚪</span>
                  <span className="text-xs">{t.home}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </li>
            )}


            {isHomePage && (
              <>
              {/* <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("hero")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                    setIsMenuOpen(false);
                  }}
                  className="text-lg cursor-pointer text-gray-500 transition-all duration-300 hover:text-blue-600"
                >
                  🏠 {t.home}
                </a>
              </li> */}


<li>
  <a 
    onClick={(e) => {
      e.preventDefault();
      const el = document.getElementById("about");
      if (el) {
        const header = document.getElementById("header");
        const headerHeight = header ? header.offsetHeight : 0;
        const y = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({ top: y, behavior: "smooth" });
      } else {
        localStorage.setItem("scrollToProjectCards", "true");
        window.location.href = "/";
      }

      setIsMenuOpen(false);
    }}
    className="text-lg cursor-pointer text-gray-500 transition-all duration-300 hover:text-blue-600"
  >
    🏢 {t.about}
  </a>
</li>


                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("contacts")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                      setIsMenuOpen(false);
                    }}
                    className="text-lg cursor-pointer text-gray-500 transition-all duration-300 hover:text-blue-600"
                  >
                    ✉️ {t.contact}
                  </a>
                </li>

                <AgentCodeEntry />
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
