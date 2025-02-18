"use client"; // Ensures this runs only on the client side

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Updated for Next.js 13+ (App Router)

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname(); // Get the current route
  const isHomePage = pathname === "/"; // Check if on homepage

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

        {/* Navigation Links */}
        <ul className="flex space-x-8">
          <li className="relative group">
            <Link
              href="/"
              className={`flex flex-col items-center transition-all duration-300 ${
                isHomePage && !isScrolled ? "text-white" : "text-gray-700"
              } hover:text-blue-600`}
            >
              <span className="text-lg">🏠</span>
              <span className="text-xs">HOME</span>
            </Link>
          </li>

          <li className="relative group">
            <a
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("about")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className={`flex flex-col items-center transition-all duration-300 ${
                isHomePage && !isScrolled ? "text-white" : "text-gray-700"
              } hover:text-blue-600`}
            >
              <span className="text-lg">🏢</span>
              <span className="text-xs">ABOUT</span>
            </a>
          </li>

          {/* CONTACT (Smooth Scrolling) */}
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
              className={`flex flex-col items-center transition-all duration-300 ${
                isHomePage && !isScrolled ? "text-white" : "text-gray-700"
              } hover:text-blue-600`}
            >
              <span className="text-lg">✉️</span>
              <span className="text-xs">CONTACT</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
