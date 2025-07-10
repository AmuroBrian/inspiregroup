// components/Header.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Import useRouter
import { useTranslation } from "@/TranslationContext";
import { Home, Info, Mail, UserPlus, Key, LogOut } from "lucide-react";
import { v4 as uuidv4 } from "uuid"; // For generating UUID for agent code
import { db } from "../../../script/firebaseConfig"; // Adjust path as per your project structure
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { AgentCodeEntry } from "./AgentHubCode/AgentCodeEntry";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter(); // Initialize useRouter
  const isHomePage = pathname === "/";
  const { t, isClient } = useTranslation();

  // State for Login/Register modals (moved from AgentCodeEntry)
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [agentCode, setAgentCode] = useState("");
  const [error, setError] = useState("");
  const [isHydrated, setIsHydrated] = useState(false); // Likely not needed here, but kept for direct migration
  const [isScrolled, setIsScrolled] = useState(false); // For scroll effect, if you still want it for the header
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    birthdate: "",
    address: "",
  });

  // useEffect for handling scroll and hydration (similar to AgentCodeEntry)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsHydrated(true); // Hydration check
      // Check login state from localStorage
      const loginStatus = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(loginStatus === "true");
      // Listen for login status changes
      const handleLoginStatusChange = () => {
        const loginStatus = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(loginStatus === "true");
      };
      window.addEventListener("loginStatusChanged", handleLoginStatusChange);
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("loginStatusChanged", handleLoginStatusChange);
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []); // Empty dependency array means this runs once on mount

  const scrollToSection = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  // Functions for Login/Register modals (moved from AgentCodeEntry)
  const handleLogin = async () => {
    try {
      const q = query(collection(db, "agents"), where("code", "==", agentCode));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("Login Successful!");
        setAgentCode("");
        setError("");
        closeLoginModal();

        // Store login state
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        window.dispatchEvent(new Event("loginStatusChanged"));

        // Navigate to agent-home
        router.push("/agent-home");
      } else {
        setError("Incorrect Agent Code. Please try again.");
      }
    } catch (err) {
      console.error("Login error", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleRegisterSubmit = async () => {
    try {
      const generatedCode = uuidv4().slice(0, 8).toUpperCase();
      await addDoc(collection(db, "agents"), {
        ...formData,
        code: generatedCode,
        createdAt: new Date(),
      });
      alert(`Registration Successful! Your Agent Code: ${generatedCode}`);
      closeRegisterModal();
    } catch (err) {
      console.error("Registration error", err);
      alert("Failed to register. Please try again.");
    }
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
    setAgentCode("");
    setError("");
  };

  const closeRegisterModal = () => {
    setIsRegisterOpen(false);
    setFormData({ lastName: "", firstName: "", birthdate: "", address: "" });
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("loginStatusChanged"));
    router.push("/");
  };

  // Common Tailwind CSS classes
  const commonLinkClasses = "relative font-medium tracking-wide text-sm flex items-center space-x-1 py-2 px-3 transition-colors duration-300 group";
  const mobileNavLinkClasses = "text-lg cursor-pointer transition-colors duration-300 flex items-center space-x-2";
  const underlineAnimation = "absolute bottom-0 left-1/2 w-0 h-[3px] bg-blue-500 rounded-full transition-all duration-300 transform -translate-x-1/2 group-hover:w-[calc(100%-1rem)] group-focus:w-[calc(100%-1rem)]";

  const buttonBaseClasses = "inline-flex items-center justify-center space-x-1 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-md";
  const registerButtonClasses = `${buttonBaseClasses} bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg`;
  const loginButtonClasses = `${buttonBaseClasses} bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-lg`;
  const logoutButtonClasses = `${buttonBaseClasses} bg-red-500 text-white hover:bg-red-600 hover:shadow-lg`;

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
              {t.inspireGroup || "INSPIRE GROUP"}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <li className="group">
            <Link
              href={isHomePage ? "#hero" : "/"}
              onClick={isHomePage ? (e) => scrollToSection(e, "hero") : null}
              className={`${commonLinkClasses} text-gray-800 hover:text-blue-600`}
              aria-label={isClient ? t.home : "Home"}
            >
              <Home size={18} />
              <span>{isClient ? t.home : "Home"}</span>
              <span className={underlineAnimation}></span>
            </Link>
          </li>

          {isHomePage && (
            <>
              <li className="group">
                <a
                  onClick={(e) => scrollToSection(e, "about-section")}
                  className={`${commonLinkClasses} text-gray-800 hover:text-blue-600`}
                  aria-label={isClient ? t.about : "About"}
                >
                  <Info size={18} />
                  <span>{isClient ? t.about : "About"}</span>
                  <span className={underlineAnimation}></span>
                </a>
              </li>

              <li className="group">
                <a
                  onClick={(e) => scrollToSection(e, "contacts")}
                  className={`${commonLinkClasses} text-gray-800 hover:text-blue-600`}
                  aria-label={isClient ? t.contact : "Contact"}
                >
                  <Mail size={18} />
                  <span>{isClient ? t.contact : "Contact"}</span>
                  <span className={underlineAnimation}></span>
                </a>
              </li>
            </>
          )}
          {/* Always show AgentCodeEntry for Login/Register when not logged in */}
          {!isLoggedIn && <AgentCodeEntry />}
          {/* Show Agent Site and Logout only when logged in */}
          {isLoggedIn && (
            <>
              <li className="group">
                <Link
                  href="/agent-home"
                  className={`${commonLinkClasses} text-blue-700 hover:text-blue-900`}
                  aria-label={isClient ? (t.agentSite || "Agent Site") : "Agent Site"}
                >
                  <span>{isClient ? (t.agentSite || "Agent Site") : "Agent Site"}</span>
                  <span className={underlineAnimation}></span>
                </Link>
              </li>
              <li className="group">
                <button
                  onClick={handleLogout}
                  className={logoutButtonClasses}
                  aria-label="Logout"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </li>
            </>
          )}
        </ul>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen py-4" : "max-h-0 py-0"
        }`}
      >
        <ul className="flex flex-col items-center space-y-4">
          <li>
            <Link
                href={isHomePage ? "#hero" : "/"}
                onClick={isHomePage ? (e) => scrollToSection(e, "hero") : () => setIsMenuOpen(false)}
              className={`${mobileNavLinkClasses} text-gray-800 hover:text-blue-600`}
            >
              <Home size={20} />
              <span>{isClient ? t.home : "Home"}</span>
            </Link>
          </li>

          {isHomePage && (
            <>
              <li>
                <a
                  onClick={(e) => scrollToSection(e, "about-section")}
                  className={`${mobileNavLinkClasses} text-gray-800 hover:text-blue-600`}
                >
                  <Info size={20} />
                  <span>{isClient ? t.about : "About"}</span>
                </a>
              </li>

              <li>
                <a
                  onClick={(e) => scrollToSection(e, "contacts")}
                  className={`${mobileNavLinkClasses} text-gray-800 hover:text-blue-600`}
                >
                  <Mail size={20} />
                  <span>{isClient ? t.contact : "Contact"}</span>
                </a>
              </li>
            </>
          )}
            {/* Conditionally show login/register or logout buttons in mobile */}
            {!isLoggedIn ? (
              <>
                <li>
                  <button
                    onClick={() => { setIsRegisterOpen(true); setIsMenuOpen(false); }} // Close mobile menu when opening modal
                    className={`${mobileNavLinkClasses} ${registerButtonClasses.replace('shadow-md', 'shadow-sm')} px-6 py-2 w-full justify-center`}
                  >
                    <UserPlus size={20} />
                    <span>{t.register || "Register"}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setIsLoginOpen(true); setIsMenuOpen(false); }} // Close mobile menu when opening modal
                    className={`${mobileNavLinkClasses} ${loginButtonClasses.replace('shadow-md', 'shadow-sm')} px-6 py-2 w-full justify-center`}
                  >
                    <Key size={20} />
                    <span>{t.login || "Login"}</span>
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/agent-home"
                  onClick={() => setIsMenuOpen(false)} // Just close menu, do not logout
                  className={`${mobileNavLinkClasses} text-blue-700 hover:text-blue-900`}
                >
                  <span>{t.agentSite || "Agent Site"}</span>
                </Link>
              </li>
            )}
        </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;