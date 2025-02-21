"use client";

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../../script/firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export const AgentCodeEntry = ({ isMenuOpen }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [agentCode, setAgentCode] = useState("");
  const [error, setError] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter(); // ✅ Ensure router is initialized
  const textColor = isMenuOpen ? "text-black" : "text-white";

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    birthdate: "",
    address: "",
  });

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

  return (
    <>
      {/* Login & Register Menu Items */}
      <li className="relative group">
  <button
    onClick={() => setIsRegisterOpen(true)}
    className={`cursor-pointer flex flex-row md:flex-col items-center space-x-2 md:space-x-0 relative ${
      isHydrated &&
      (isHomePage && !isScrolled
        ? "md:text-white text-gray-500"  // White on desktop, gray-500 on mobile (not scrolled)
        : "md:text-gray-700 text-gray-500") // Gray-700 for desktop (scrolled), Gray-500 for mobile (always)
    } hover:text-blue-600`}
  >
    <span className="text-lg">📝</span>
    <span className="text-lg md:text-xs relative">REGISTER</span> 
  </button>

  {/* Desktop-Only Underline Animation */}
  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 md:group-hover:w-full"></span>
</li>


<li className="relative group">
  <button
    onClick={() => setIsLoginOpen(true)}
    className={`cursor-pointer flex flex-row md:flex-col items-center space-x-2 md:space-x-0 relative ${
      isHydrated &&
      (isHomePage && !isScrolled
        ? "md:text-white text-gray-500"  // White on desktop, Gray-500 on mobile (not scrolled)
        : "md:text-gray-700 text-gray-500") // Gray-700 for desktop (scrolled), Gray-500 for mobile (always)
    } hover:text-blue-600`}
  >
    <span className="text-lg">🔑</span>
    <span className="text-lg md:text-xs relative">LOGIN</span> 
  </button>

  {/* Desktop-Only Underline Animation */}
  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 md:group-hover:w-full"></span>
</li>



      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
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

      {/* Register Modal */}
      {isRegisterOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
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
    </>
  );
};
