"use client"; // Ensures this runs only on the client side

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Solid background, normal text color
      } else {
        setIsScrolled(false); // Transparent background, white text
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
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
              isScrolled ? "text-blue-600" : "text-white"
            }`}
          >
            INSPIRE GROUP
          </span>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-8">
          {[
            { text: "HOME", emoji: "🏠", href: "/" },
            { text: "ABOUT", emoji: "🏢", href: "/about" },
            { text: "CONTACT", emoji: "✉️", href: "/contact" },
          ].map((item, index) => (
            <li key={index} className="relative group">
              <Link
                href={item.href}
                className={`flex flex-col items-center transition-all duration-300 ${
                  isScrolled ? "text-gray-700" : "text-white"
                } hover:text-blue-600`}
              >
                <span className="text-lg">{item.emoji}</span>
                <span className="text-xs">{item.text}</span>
              </Link>

              {/* Underline Animation */}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
