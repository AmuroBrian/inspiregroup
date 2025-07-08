"use client";

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../../script/firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/TranslationContext";

export const AgentCodeEntry = ({ isMenuOpen }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [agentCode, setAgentCode] = useState("");
  const [error, setError] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    birthdate: "",
    address: "",
  });

  const [formErrors, setFormErrors] = useState({
    lastName: false,
    firstName: false,
    birthdate: false,
    address: false,
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

  const validateForm = () => {
    const errors = {
      lastName: !formData.lastName.trim(),
      firstName: !formData.firstName.trim(),
      birthdate: !formData.birthdate,
      address: !formData.address.trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleLogin = async () => {
    if (!agentCode.trim()) {
      setError("Please enter an agent code");
      return;
    }

    try {
      const q = query(collection(db, "agents"), where("code", "==", agentCode));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert(t("login_success"));
        setAgentCode("");
        setError("");
        closeLoginModal();
        localStorage.setItem("isLoggedIn", "true");
        router.push("/agent-home");
      } else {
        setError(t("incorrect_agent_code"));
      }
    } catch (err) {
      console.error("Login error", err);
      setError(t("login_error"));
    }
  };

  const handleRegisterSubmit = async () => {
    if (!validateForm()) return;

    try {
      const generatedCode = uuidv4().slice(0, 8).toUpperCase();
      await addDoc(collection(db, "agents"), {
        ...formData,
        code: generatedCode,
        createdAt: new Date(),
      });
      alert(`${t("registration_success")} ${generatedCode}`);
      closeRegisterModal();
    } catch (err) {
      console.error("Registration error", err);
      alert(t("registration_error"));
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
    setFormErrors({ lastName: false, firstName: false, birthdate: false, address: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const getTextColorClass = () => {
    if (!isHydrated) return "text-gray-500";
    return isHomePage && !isScrolled ? "md:text-white text-gray-500" : "md:text-gray-700 text-gray-500";
  };

  return (
    <>
      {/* Login & Register Menu Items */}
      <li className="relative group">
        <button
          onClick={() => setIsRegisterOpen(true)}
          className={`cursor-pointer flex flex-row md:flex-col items-center space-x-2 md:space-x-0 relative ${getTextColorClass()} hover:text-blue-600 transition-colors`}
          aria-label={t("register")}
        >
          <span className="text-lg">📝</span>
          <span className="text-lg md:text-xs">{t("register")}</span>
        </button>
        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 md:group-hover:w-full"></span>
      </li>

      <li className="relative group">
        <button
          onClick={() => setIsLoginOpen(true)}
          className={`cursor-pointer flex flex-row md:flex-col items-center space-x-2 md:space-x-0 relative ${getTextColorClass()} hover:text-blue-600 transition-colors`}
          aria-label={t("login")}
        >
          <span className="text-lg">🔑</span>
          <span className="text-lg md:text-xs">{t("login")}</span>
        </button>
        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 md:group-hover:w-full"></span>
      </li>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 modal-container">
          <div className="relative bg-white rounded-2xl enhanced-shadow p-8 w-full max-w-md transform transition-all duration-300 modal-content glass-effect">
            {/* Close Button */}
            <button
              onClick={closeLoginModal}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
              aria-label={t("close")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t("agent_login")}</h2>
              <p className="text-gray-600 text-sm">{t("enter_agent_code")}</p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm2 6V6a2 2 0 10-4 0v2h4z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="password"
                  value={agentCode}
                  onChange={(e) => setAgentCode(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-lg input-focus-effect"
                  placeholder={t("agent_code_placeholder")}
                  aria-label={t("agent_code")}
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mt-8">
                <button
                  onClick={closeLoginModal}
                  className="py-3 px-6 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-105 btn-hover-effect"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={handleLogin}
                  className="py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:scale-105 shadow-lg btn-hover-effect"
                >
                  {t("login")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 modal-container">
          <div className="relative bg-white rounded-2xl enhanced-shadow p-8 w-full max-w-md transform transition-all duration-300 max-h-[90vh] overflow-y-auto modal-content glass-effect">
            {/* Close Button */}
            <button
              onClick={closeRegisterModal}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
              aria-label={t("close")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t("register")}</h2>
              <p className="text-gray-600 text-sm">{t("fill_registration_details")}</p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("first_name")}</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full p-4 border-2 ${formErrors.firstName ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-green-100'} rounded-xl focus:ring-4 focus:border-green-500 transition-all duration-200 input-focus-effect`}
                    placeholder={t("enter_first_name")}
                    aria-invalid={formErrors.firstName}
                  />
                  {formErrors.firstName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {t("field_required")}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("last_name")}</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full p-4 border-2 ${formErrors.lastName ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-green-100'} rounded-xl focus:ring-4 focus:border-green-500 transition-all duration-200 input-focus-effect`}
                    placeholder={t("enter_last_name")}
                    aria-invalid={formErrors.lastName}
                    aria-describedby={formErrors.lastName ? "lastNameError" : undefined}
                  />
                  {formErrors.lastName && (
                    <p id="lastNameError" className="mt-2 text-sm text-red-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {t("field_required")}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t("birthdate")}</label>
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  className={`w-full p-4 border-2 ${formErrors.birthdate ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-green-100'} rounded-xl focus:ring-4 focus:border-green-500 transition-all duration-200 input-focus-effect`}
                  aria-invalid={formErrors.birthdate}
                />
                {formErrors.birthdate && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {t("field_required")}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t("address")}</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full p-4 border-2 ${formErrors.address ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-green-100'} rounded-xl focus:ring-4 focus:border-green-500 transition-all duration-200 input-focus-effect`}
                  placeholder={t("enter_address")}
                  aria-invalid={formErrors.address}
                />
                {formErrors.address && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {t("field_required")}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <button
                  onClick={closeRegisterModal}
                  className="py-3 px-6 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-105 btn-hover-effect"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={handleRegisterSubmit}
                  className="py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-200 hover:scale-105 shadow-lg btn-hover-effect"
                >
                  {t("submit")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};