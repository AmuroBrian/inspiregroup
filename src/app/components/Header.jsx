// components/Header.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Import useRouter
import { useTranslation } from "@/TranslationContext";
import { Home, Info, Mail, UserPlus, Key } from "lucide-react";
import { v4 as uuidv4 } from "uuid"; // For generating UUID for agent code
import { db } from "../../../script/firebaseConfig"; // Adjust path as per your project structure
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter(); // Initialize useRouter
  const isHomePage = pathname === "/";
  const { t } = useTranslation();

  // State for Login/Register modals (moved from AgentCodeEntry)
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [agentCode, setAgentCode] = useState("");
  const [error, setError] = useState("");
  const [isHydrated, setIsHydrated] = useState(false); // Likely not needed here, but kept for direct migration
  const [isScrolled, setIsScrolled] = useState(false); // For scroll effect, if you still want it for the header

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
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
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

  // Common Tailwind CSS classes
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
          {/* Changed these to buttons that open modals */}
          <li>
            <button onClick={() => setIsRegisterOpen(true)} className={registerButtonClasses}>
              <UserPlus size={18} />
              <span>{t.register || "Register"}</span>
            </button>
          </li>
          <li>
            <button onClick={() => setIsLoginOpen(true)} className={loginButtonClasses}>
              <Key size={18} />
              <span>{t.login || "Login"}</span>
            </button>
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
          {/* Changed these to buttons that open modals in mobile */}
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
        </ul>
      </div>

      {/* Login Modal (Moved from AgentCodeEntry) */}
      {isLoginOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4 z-50"> {/* Added z-50 to ensure it's above other elements */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
            <h2 className="text-2xl font-bold text-center mb-4">
              Enter Agent Code
            </h2>
            <input
              type="password"
              value={agentCode}
              onChange={(e) => setAgentCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your agent code"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="mt-4 flex gap-2">
              <button
                onClick={closeLoginModal}
                className="w-full sm:w-auto flex-1 px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => setAgentCode("")}
                className="w-full sm:w-auto flex-1 px-4 py-2 bg-red-400 text-white rounded"
              >
                Clear
              </button>
              <button
                onClick={handleLogin}
                className="w-full sm:w-auto flex-1 px-4 py-2 bg-green-400 text-white rounded"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal (Moved from AgentCodeEntry) */}
      {isRegisterOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4 z-50"> {/* Added z-50 */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

            <input
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-3"
              placeholder="Last Name"
            />

            <input
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-3"
              placeholder="First Name"
            />

            {/* Birthdate Label and Input */}
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Birthdate:
            </label>
            <input
              type="date"
              value={formData.birthdate}
              onChange={(e) =>
                setFormData({ ...formData, birthdate: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />

            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-3"
              placeholder="Address"
            />

            {/* Buttons Layout */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={closeRegisterModal}
                className="w-full sm:w-auto flex-1 px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  setFormData({
                    lastName: "",
                    firstName: "",
                    birthdate: "",
                    address: "",
                  })
                }
                className="w-full sm:w-auto flex-1 px-4 py-2 bg-red-400 text-white rounded"
              >
                Clear
              </button>
              <button
                onClick={handleRegisterSubmit}
                className="w-full sm:w-auto flex-1 px-4 py-2 bg-green-400 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;