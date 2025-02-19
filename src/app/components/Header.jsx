"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false); // Ensure hydration
  const pathname = usePathname();

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    lastName: "",
    firstName: "",
    birthDate: "",
    address: "",
  });
  const [loginCode, setLoginCode] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsHomePage(pathname === "/");
      setIsHydrated(true);

      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pathname]);

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
    setRegisterForm({ lastName: "", firstName: "", birthDate: "", address: "" });
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
    setLoginCode("");
  };

  const scrollToHero = (e) => {
    e.preventDefault();
    document.getElementById("hero-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (!isHydrated) return null; // Prevent SSR mismatch by rendering nothing initially

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
  <li className="relative group">
    <Link
      href={isHomePage ? "#" : "/"}
      onClick={isHomePage ? scrollToHero : null}
      className={`flex flex-col items-center transition-all duration-300 ${
        isHydrated && (isHomePage && !isScrolled ? "text-white" : "text-gray-700")
      } hover:text-blue-600`}
    >
      <span className="text-lg">🏠</span>
      <span className="text-xs">HOME</span>
      {/* Underline Animation */}
      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  </li>

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
            setIsMenuOpen(false);
          }}
          className={`cursor-pointer flex flex-col items-center transition-all duration-300 ${
            isHydrated && (isHomePage && !isScrolled ? "text-white" : "text-gray-700")
          } hover:text-blue-600`}
        >
          <span className="text-lg">🏢</span>
          <span className="text-xs">ABOUT</span>
          {/* Underline Animation */}
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </li>

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
            isHydrated && (isHomePage && !isScrolled ? "text-white" : "text-gray-700")
          } hover:text-blue-600`}
        >
          <span className="text-lg">✉️</span>
          <span className="text-xs">CONTACT</span>
          {/* Underline Animation */}
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </li>

      <li className="relative group">
        <a
          onClick={() => setShowRegisterModal(true)}
          className={`cursor-pointer flex flex-col items-center transition-all duration-300 ${
            isHydrated && (isHomePage && !isScrolled ? "text-white" : "text-gray-700")
          } hover:text-blue-600`}
        >
          <span className="text-lg">📝</span>
          <span className="text-xs">REGISTER</span>
          {/* Underline Animation */}
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </li>

      <li className="relative group">
        <a
          onClick={() => setShowLoginModal(true)}
          className={`cursor-pointer flex flex-col items-center transition-all duration-300 ${
            isHydrated && (isHomePage && !isScrolled ? "text-white" : "text-gray-700")
          } hover:text-blue-600`}
        >
          <span className="text-lg">🔑</span>
          <span className="text-xs">LOGIN</span>
          {/* Underline Animation */}
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </li>
    </>
  )}
</ul>



        {/* Hamburger Menu */}
<button
  className={`md:hidden p-2 rounded-md transition-all duration-300 ${
    isHydrated && isHomePage && !isScrolled ? "bg-transparent text-white" : " text-gray-700 "
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
          🏠 HOME
        </Link>
      </li>

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
                setIsMenuOpen(false);
              }}
              className="text-lg cursor-pointer text-gray-500 transition-all duration-300 hover:text-blue-600"
            >
              🏢 ABOUT
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
                setIsMenuOpen(false);
              }}
              className="text-lg cursor-pointer text-gray-500 transition-all duration-300 hover:text-blue-600"
            >
              ✉️ CONTACT
            </a>
          </li>

          <li>
            <a
              onClick={() => {
                setShowRegisterModal(true);
                setIsMenuOpen(false);
              }}
              className="text-lg cursor-pointer text-gray-500 transition-all duration-300 hover:text-blue-600"
            >
              📝 REGISTER
            </a>
          </li>

          <li>
            <a
              onClick={() => {
                setShowLoginModal(true);
                setIsMenuOpen(false);
              }}
              className="text-lg cursor-pointer text-gray-500 transition-all duration-300 hover:text-blue-600"
            >
              🔑 LOGIN
            </a>
          </li>
        </>
      )}
    </ul>
  </div>
)}



      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold text-center">Register</h2>
            <input type="text" placeholder="Last Name" className="w-full p-2 border rounded mb-2" />
            <input type="text" placeholder="First Name" className="w-full p-2 border rounded mb-2" />
            <input type="date" className="w-full p-2 border rounded mb-2" />
            <input type="text" placeholder="Address" className="w-full p-2 border rounded mb-4" />
            <div className="flex justify-between">
              <button onClick={closeRegisterModal} className="px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold text-center">Login</h2>
            <input type="text" placeholder="Agent Code" className="w-full p-2 border rounded mb-4" />
            <div className="flex justify-between">
              <button onClick={closeLoginModal} className="px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
