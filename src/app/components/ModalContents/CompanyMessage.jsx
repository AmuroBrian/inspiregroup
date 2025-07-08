"use client";
import React from "react";
import { useTranslation } from "@/TranslationContext";
import { motion } from "framer-motion";

export const CompanyMessage = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      className="p-0 sm:p-6 max-w-5xl mx-auto bg-white/90 rounded-3xl shadow-2xl border border-blue-100 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Decorative Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 rounded-t-3xl" />
      <div className="w-full h-[60px] sm:h-[80px]" />
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 text-left mb-2 pl-2 relative">
        {t.compM}
        <span className="block w-20 h-1.5 bg-blue-500 rounded-full mt-2" />
      </h1>
      <hr className="my-4 border-blue-200" />

      <div className="w-full flex justify-center">
        <img
          src="images/flag.jpeg"
          alt="Stocks"
          className="w-full max-w-lg h-64 object-cover rounded-2xl shadow-lg border-4 border-blue-200 transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="mt-8 space-y-12">
        <div className="bg-blue-50/60 rounded-2xl p-6 shadow-sm border border-blue-100">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 text-left mb-2">
            {t.compMone}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            {t.compMtwo}
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            {t.compMthree}
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            {t.compMfour}
          </p>
          <p className="text-blue-700 text-lg font-semibold text-right leading-relaxed mt-4">
            Melody Santos
          </p>
        </div>

        <div className="bg-blue-50/60 rounded-2xl p-6 shadow-sm border border-blue-100">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 text-left mb-2">
            {t.compMfift}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            {t.compMsix}
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            {t.compMseven}
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            {t.compMeight}
          </p>
          <p className="text-blue-700 text-lg font-semibold text-right leading-relaxed mt-4">
            Rhia Alberto
          </p>
        </div>
      </div>
    </motion.div>
  );
};
