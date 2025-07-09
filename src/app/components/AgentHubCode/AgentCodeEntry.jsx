"use client";

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../../script/firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/TranslationContext";
import { Home, Info, Mail, UserPlus, Key, LogOut } from "lucide-react";

export const AgentCodeEntry = ({ isMenuOpen }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [agentCode, setAgentCode] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState({ show: false, code: "" });
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loginStatus = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(loginStatus === "true");
    }
  }, []);

  const handleLogin = async () => {
    try {
      const q = query(collection(db, "agents"), where("code", "==", agentCode));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        alert("Login Successful!");
        setAgentCode("");
        setError("");
        closeLoginModal();
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        window.dispatchEvent(new Event("loginStatusChanged"));
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
    // Validation
    const errors = {
      lastName: !formData.lastName.trim(),
      firstName: !formData.firstName.trim(),
      birthdate: !formData.birthdate,
      address: !formData.address.trim(),
    };
    setFormErrors(errors);
    setRegisterError("");
    if (Object.values(errors).some(Boolean)) {
      setRegisterError("All fields are required.");
      return;
    }
    // Age validation
    const birthDateObj = new Date(formData.birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDateObj.getFullYear() - (today < new Date(birthDateObj.setFullYear(today.getFullYear())) ? 1 : 0);
    if (isNaN(age) || age < 18) {
      setRegisterError("You must be at least 18 years old to register.");
      setFormErrors(prev => ({ ...prev, birthdate: true }));
      return;
    }
    // Checkbox validation
    if (!checkboxChecked) {
      setRegisterError("You must acknowledge and understand your agent code before submitting.");
      return;
    }
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
    setCheckboxChecked(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("loginStatusChanged"));
    router.push("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Simplified text color logic
  const getTextColorClass = () => {
    return "text-gray-700 hover:text-blue-600";
  };

  return (
    <>
      {/* Login & Register Menu Items */}
      {!isLoggedIn ? (
        <>
          <li>
            <button onClick={() => setIsRegisterOpen(true)} className="inline-flex items-center justify-center space-x-1 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-md bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg">
              <UserPlus size={18} />
              <span>{t.register || "Register"}</span>
            </button>
          </li>
          <li>
            <button onClick={() => setIsLoginOpen(true)} className="inline-flex items-center justify-center space-x-1 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-md bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-lg">
              <Key size={18} />
              <span>{t.login || "Login"}</span>
            </button>
          </li>
        </>
      ) : null}
      {/* Only render logout button in mobile navigation, not desktop */}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-[scaleIn_0.2s]">
            {/* Close Button */}
            <button
              onClick={closeLoginModal}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="mx-auto w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{t.agentLoginTitle || "Agent Login"}</h2>
              <p className="text-gray-600 text-sm">{t.agentLoginSubtitle || "Enter your agent code to access your dashboard"}</p>
            </div>
            {/* Form */}
            <form className="space-y-6" onSubmit={e => { e.preventDefault(); handleLogin(); }}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.agentCodeLabel || "Agent Code"}</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm2 6V6a2 2 0 10-4 0v2h4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <input
                    type="password"
                    value={agentCode}
                    onChange={(e) => setAgentCode(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg"
                    placeholder={t.agentCodePlaceholder || "Enter your agent code"}
                    aria-label="Agent code"
                  />
                </div>
              </div>
              {error && (
                <div className="p-3 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">{error ? t[error] || error : ""}</span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeLoginModal}
                  className="flex-1 py-3 px-6 rounded-xl font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  {t.cancel || "Cancel"}
                </button>
                <button
                  type="button"
                  onClick={() => setAgentCode("")}
                  className="flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-red-400 hover:bg-red-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  {t.clear || "Clear"}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {t.login || "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen transition-all duration-300">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 animate-[scaleIn_0.2s]">
            {/* Close Button */}
            <button
              onClick={closeRegisterModal}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="mx-auto w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{t.registerTitle || "Register"}</h2>
              <p className="text-gray-600 text-sm">{t.registerSubtitle || "Join our agent network and start earning"}</p>
            </div>
            {/* Form */}
            <form className="space-y-6" onSubmit={e => { e.preventDefault(); handleRegisterSubmit(); }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.lastNameLabel || "Last Name"}</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-base border-gray-200${formErrors.lastName ? ' border-red-500' : ''}`}
                    placeholder={t.lastNamePlaceholder || "Last Name"}
                    aria-invalid={formErrors?.lastName}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.firstNameLabel || "First Name"}</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-base border-gray-200${formErrors.firstName ? ' border-red-500' : ''}`}
                    placeholder={t.firstNamePlaceholder || "First Name"}
                    aria-invalid={formErrors?.firstName}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.birthdateLabel || "Birthdate"}</label>
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-base border-gray-200${formErrors.birthdate ? ' border-red-500' : ''}`}
                  placeholder={t.birthdatePlaceholder || "Birthdate"}
                  aria-invalid={formErrors?.birthdate}
                  required
                />
              </div>
              {registerError && (
                <div className="text-red-600 text-sm mt-1 flex items-center gap-2">
                  <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-1.414 1.414A8 8 0 105.636 18.364l1.414-1.414A6 6 0 1116.95 7.05l1.414-1.414z" /></svg>
                  {registerError}
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.addressLabel || "Address"}</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-base border-gray-200${formErrors.address ? ' border-red-500' : ''}`}
                  placeholder={t.addressPlaceholder || "Address"}
                  aria-invalid={formErrors?.address}
                  required
                />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="acknowledgeCode"
                  checked={checkboxChecked}
                  onChange={e => setCheckboxChecked(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-green-600"
                  required
                />
                <label htmlFor="acknowledgeCode" className="text-sm text-gray-700 select-none">
                  {t.acknowledgeCodeLabel || "I understand that I must copy and keep my agent code safe after registration."}
                </label>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                  <p className="text-sm text-blue-800">
                    <strong>{t.note || "Note:"}</strong> {t.agentCodeNote || "Your unique agent code will be generated and displayed once you complete the registration process."}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeRegisterModal}
                  className="flex-1 py-3 px-6 rounded-xl font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  {t.cancel || "Cancel"}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ lastName: '', firstName: '', birthdate: '', address: '' })}
                  className="flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-red-400 hover:bg-red-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  {t.clear || "Clear"}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-green-500 hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {t.submit || "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Registration Complete Modal */}
      {registerSuccess.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-[scaleIn_0.2s]">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.registrationCompleteTitle || "Registration Complete!"}</h2>
            <p className="text-gray-700 mb-4">{t.registrationCompleteSubtitle || "Congratulations! Your agent code is:"}</p>
            <div className="text-2xl font-mono font-bold text-blue-600 bg-blue-50 rounded-lg px-4 py-2 mb-2 inline-block">{registerSuccess.code}</div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
              <span className="text-yellow-700 text-sm font-semibold">{t.registrationAgeNote || "You must be 18 years or older to register. Please keep your agent code safe; you’ll need it to log in."}</span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(registerSuccess.code);
              }}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              {t.copyCode || "Copy Code"}
            </button>
            <div>
              <button
                onClick={() => setRegisterSuccess({ show: false, code: "" })}
                className="mt-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                {t.goToLogin || "Go to Login"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};