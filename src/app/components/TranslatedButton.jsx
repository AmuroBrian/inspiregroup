"use client";
import React from "react";

const TranslatedButton = ({ label, onClick }) => {
  return (
    <button
      className="mt-4 px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 hover:scale-110 transition-transform duration-300 ease-in-out"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TranslatedButton;
