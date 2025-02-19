"use client";

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../../script/firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export const AgentCodeEntry = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [agentCode, setAgentCode] = useState("");
  const [error, setError] = useState("");
  const [isHydrated, setIsHydrated] = useState(false); // Ensure hydration
  const [isHomePage, setIsHomePage] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter(); // ✅ Ensure router is initialized

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
      const generatedCode = uuidv4().slice(0, 8); // Generate a unique 8-character code
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
      <li className="relative group">
        <a
          onClick={() => setIsRegisterOpen(true)}
          className={`cursor-pointer flex flex-col items-center transition-all duration-300 ${
            isHydrated &&
            (isHomePage && !isScrolled ? "text-white" : "text-gray-700")
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
          onClick={() => setIsLoginOpen(true)}
          className={`cursor-pointer flex flex-col items-center transition-all duration-300 ${
            isHydrated &&
            (isHomePage && !isScrolled ? "text-white" : "text-gray-700")
          } hover:text-blue-600`}
        >
          <span className="text-lg">🔑</span>
          <span className="text-xs">LOGIN</span>
          {/* Underline Animation */}
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </li>
      <div className="absolute left-0 top-0 flex flex-col sm:flex-row justify-between items-center min-h-screen px-6 sm:px-10 py-6">
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
              <div className="mt-4 flex justify-between">
                <button
                  onClick={closeLoginModal}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

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
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Last Name"
              />
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="First Name"
              />
              <input
                type="date"
                value={formData.birthdate}
                onChange={(e) =>
                  setFormData({ ...formData, birthdate: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Address"
              />
              <div className="mt-4 flex justify-between">
                <button
                  onClick={closeRegisterModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRegisterSubmit}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
