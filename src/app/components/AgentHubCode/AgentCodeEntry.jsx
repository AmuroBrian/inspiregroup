"use client";

import React, { useState } from "react";

export const AgentCodeEntry = () => {
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

  const handleLogin = () => {
    if (agentCode === "1234") {
      alert("Login Successful!");
      closeLoginModal();
    } else {
      setError("Incorrect Agent Code. Please try again.");
    }
  };

  const handleRegisterSubmit = () => {
    alert("Registration Successful!");
    closeRegisterModal();
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
    <div className="flex flex-col sm:flex-row justify-between items-center min-h-screen px-6 sm:px-10 py-6">
      {/* Register Button (Left Side) */}
      <button
        onClick={() => setIsRegisterOpen(true)}
        className="w-full sm:w-auto px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600"
      >
        Register
      </button>

      {/* Login Button (Right Side) */}
      <button
        onClick={() => setIsLoginOpen(true)}
        className="w-full sm:w-auto mt-4 sm:mt-0 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
      >
        Login
      </button>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Enter Agent Code</h2>
            <hr className="mb-4 border-gray-300" />

            <input
              type="password"
              value={agentCode}
              onChange={(e) => setAgentCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your agent code"
            />

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="mt-4 flex flex-col sm:flex-row justify-between gap-2">
              <button
                onClick={closeLoginModal}
                className="w-full sm:w-auto px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleLogin}
                className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
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
            <hr className="mb-4 border-gray-300" />

            {/* Registration Form */}
            <div className="space-y-2">
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Last Name"
              />
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="First Name"
              />
              <input
                type="date"
                value={formData.birthdate}
                onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Address"
              />
            </div>

            {/* Buttons */}
            <div className="mt-4 flex flex-col sm:flex-row justify-between gap-2">
              <button
                onClick={() => setFormData({ lastName: "", firstName: "", birthdate: "", address: "" })}
                className="w-full sm:w-auto px-4 py-2 bg-gray-400 text-white rounded"
              >
                Clear
              </button>
              <button
                onClick={closeRegisterModal}
                className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleRegisterSubmit}
                className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
