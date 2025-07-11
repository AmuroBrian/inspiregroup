"use client";

import React, { useState, forwardRef, useImperativeHandle } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../../script/firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/TranslationContext";
import { UserPlus, Key, X, Check, AlertCircle, Info, ArrowRight } from "lucide-react";

export const AgentCodeEntry = forwardRef((props, ref) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [agentCode, setAgentCode] = useState("");
  const [error, setError] = useState("");
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
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    openLogin: () => setIsLoginOpen(true),
    openRegister: () => setIsRegisterOpen(true),
  }));

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const q = query(collection(db, "agents"), where("code", "==", agentCode));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        setLoginSuccess(true);
        setIsLoginOpen(false); // Close login modal
        setAgentCode("");
        setError("");
        localStorage.setItem("isLoggedIn", "true");
        window.dispatchEvent(new Event("loginStatusChanged"));
      } else {
        setError(t.incorrectAgentCode || "Incorrect Agent Code. Please try again.");
      }
    } catch (err) {
      console.error("Login error", err);
      setError(t.loginError || "Something went wrong. Please try again.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = {
      lastName: !formData.lastName.trim(),
      firstName: !formData.firstName.trim(),
      birthdate: !formData.birthdate,
      address: !formData.address.trim(),
    };
    
    setFormErrors(errors);
    setRegisterError("");
    
    if (Object.values(errors).some(Boolean)) {
      setRegisterError(t.allFieldsRequired || "All fields are required.");
      return;
    }

    // Age validation
    const birthDateObj = new Date(formData.birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDateObj.getFullYear() - 
               (today < new Date(birthDateObj.setFullYear(today.getFullYear())) ? 1 : 0);
    
    if (isNaN(age)) {
      setRegisterError(t.invalidBirthdate || "Please enter a valid birthdate.");
      setFormErrors(prev => ({ ...prev, birthdate: true }));
      return;
    }
    
    if (age < 18) {
      setRegisterError(t.ageRequirement || "You must be at least 18 years old to register.");
      setFormErrors(prev => ({ ...prev, birthdate: true }));
      return;
    }

    if (!checkboxChecked) {
      setRegisterError(t.acknowledgeError || "You must acknowledge and understand your agent code before submitting.");
      return;
    }

    try {
      const generatedCode = uuidv4().slice(0, 8).toUpperCase();
      await addDoc(collection(db, "agents"), {
        ...formData,
        code: generatedCode,
        createdAt: new Date(),
      });
      setRegisterSuccess({ show: true, code: generatedCode });
      setIsRegisterOpen(false); // Close registration modal
      setFormData({ lastName: "", firstName: "", birthdate: "", address: "" });
      setCheckboxChecked(false);
    } catch (err) {
      console.error("Registration error", err);
      setRegisterError(t.registrationError || "Failed to register. Please try again.");
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
    setRegisterError("");
    setCheckboxChecked(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: false }));
  };

  return (
    <>
      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50">
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-4 sm:p-6 mx-2 sm:mx-0">
            <button
              onClick={closeLoginModal}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close"
            >
              <X size={18} className="sm:size-5" />
            </button>

            <div className="text-center mb-4 sm:mb-6">
              <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Key className="text-blue-600 size-5 sm:size-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                {t.agentLoginTitle || "Agent Login"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                {t.agentLoginSubtitle || "Enter your agent code to access your dashboard"}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
              <div>
                <label htmlFor="agentCode" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  {t.agentCodeLabel || "Agent Code"}
                </label>
                <input
                  type="password"
                  id="agentCode"
                  value={agentCode}
                  onChange={(e) => setAgentCode(e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder={t.agentCodePlaceholder || "Enter your agent code"}
                  required
                />
              </div>

              {error && (
                <div className="p-2 sm:p-3 text-xs sm:text-sm bg-red-50 text-red-700 rounded-lg flex items-start gap-2">
                  <AlertCircle className="flex-shrink-0 mt-0.5 size-4 sm:size-[18px]" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-1 sm:pt-2">
                <button
                  type="button"
                  onClick={closeLoginModal}
                  className="flex-1 py-2 px-3 sm:px-4 text-sm sm:text-base rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                  {t.cancel || "Cancel"}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 sm:px-4 text-sm sm:text-base rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                >
                  {t.login || "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50">
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-4 sm:p-6 mx-2 sm:mx-0 overflow-y-auto max-h-[90dvh]">
            <button
              onClick={closeRegisterModal}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close"
            >
              <X size={18} className="sm:size-5" />
            </button>

            <div className="text-center mb-4 sm:mb-6">
              <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <UserPlus className="text-green-600 size-5 sm:size-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                {t.registerTitle || "Agent Registration"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                {t.registerSubtitle || "Join our agent network and start earning"}
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="lastName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    {t.lastNameLabel || "Last Name"}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 ${
                      formErrors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder={t.lastNamePlaceholder || "Enter your last name"}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="firstName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    {t.firstNameLabel || "First Name"}
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 ${
                      formErrors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder={t.firstNamePlaceholder || "Enter your first name"}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="birthdate" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  {t.birthdateLabel || "Birthdate"}
                </label>
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 ${
                    formErrors.birthdate ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  {t.addressLabel || "Address"}
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 ${
                    formErrors.address ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={t.addressPlaceholder || "Enter your address"}
                  required
                />
              </div>

              {registerError && (
                <div className="p-2 sm:p-3 text-xs sm:text-sm bg-red-50 text-red-700 rounded-lg flex items-start gap-2">
                  <AlertCircle className="flex-shrink-0 mt-0.5 size-4 sm:size-[18px]" />
                  <span>{registerError}</span>
                </div>
              )}

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="acknowledge"
                  checked={checkboxChecked}
                  onChange={(e) => setCheckboxChecked(e.target.checked)}
                  className="mt-1 size-4 sm:size-[16px]"
                  required
                />
                <label htmlFor="acknowledge" className="text-xs sm:text-sm text-gray-700">
                  {t.acknowledgeCodeLabel || "I understand that I must copy and keep my agent code safe after registration."}
                </label>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-3">
                <div className="flex items-start gap-2">
                  <Info className="text-blue-600 flex-shrink-0 mt-0.5 size-4 sm:size-[18px]" />
                  <p className="text-xs sm:text-sm text-blue-800">
                    <strong>{t.note || "Note:"}</strong> {t.agentCodeNote || "Your unique agent code will be generated and displayed once you complete the registration process."}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-1 sm:pt-2">
                <button
                  type="button"
                  onClick={closeRegisterModal}
                  className="flex-1 py-2 px-3 sm:px-4 text-sm sm:text-base rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                  {t.cancel || "Cancel"}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 sm:px-4 text-sm sm:text-base rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
                >
                  {t.submit || "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Registration Success Modal */}
      {registerSuccess.show && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-4 sm:p-6 mx-2 sm:mx-0 text-center">
            <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Check className="text-green-600 size-6 sm:size-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              {t.registrationCompleteTitle || "Registration Complete!"}
            </h2>
            <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
              {t.registrationCompleteSubtitle || "Congratulations! Your agent code is:"}
            </p>
            <div className="text-xl sm:text-2xl font-mono font-bold text-blue-600 bg-blue-50 rounded-lg px-3 py-2 sm:px-4 sm:py-3 mb-3 sm:mb-4">
              {registerSuccess.code}
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4 text-left">
              <div className="flex items-start gap-2">
                <Info className="text-yellow-600 flex-shrink-0 mt-0.5 size-4 sm:size-[18px]" />
                <p className="text-xs sm:text-sm text-yellow-800">
                  {t.registrationAgeNote || "You must be 18 years or older to register. Please remember and copy your agent code manually - you'll need it to log in."}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setRegisterSuccess({ show: false, code: "" });
                setIsLoginOpen(true); // Open login modal
              }}
              className="w-full py-2 px-3 sm:px-4 text-sm sm:text-base rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors duration-200"
            >
              {t.goToLogin || "Go to Login"} <ArrowRight size={16} className="sm:size-[18px]" />
            </button>
          </div>
        </div>
      )}

      {/* Login Success Modal */}
      {loginSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-4 sm:p-6 mx-2 sm:mx-0 text-center">
            <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Check className="text-blue-600 size-6 sm:size-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              {t.loginSuccessTitle || "Login Successful!"}
            </h2>
            <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
              {t.loginSuccessSubtitle || "Welcome back! You have successfully logged in to your agent dashboard."}
            </p>
            <button
              onClick={() => {
                setLoginSuccess(false);
                router.push("/agent-home");
              }}
              className="w-full py-2 px-3 sm:px-4 text-sm sm:text-base rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              {t.continue || "Continue"}
            </button>
          </div>
        </div>
      )}
    </>
  );
});

AgentCodeEntry.displayName = 'AgentCodeEntry';