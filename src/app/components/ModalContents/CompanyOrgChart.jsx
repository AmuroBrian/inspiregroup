"use client";

import React from "react";
import { useTranslation } from "@/TranslationContext";
import { motion } from "framer-motion";

export const CompanyOrgChart = () => {
  const { t } = useTranslation(); // Use translation context
  return (
    <motion.div
      className="p-0 sm:p-4 md:p-6 max-w-full md:max-w-5xl mx-auto bg-white/90 rounded-3xl shadow-2xl border border-blue-100 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Decorative Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-2 sm:h-3 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 rounded-t-3xl" />
      <div className="w-full h-10 sm:h-[60px] md:h-[80px]" />
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-800 text-left mb-2 pl-2 relative">
        {t.org}
        <span className="block w-16 sm:w-20 h-1 bg-blue-500 rounded-full mt-2" />
      </h1>
      <hr className="my-3 sm:my-4 border-blue-200" />

      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
        {/* Org Chart Image */}
        <div className="flex-1 w-full flex justify-center md:justify-start">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <img
              src="images/OrgChart.jpg"
              alt="Organization Image"
              className="w-full h-auto object-cover rounded-2xl shadow-lg border-4 border-blue-200 transition-transform duration-300 hover:scale-105"
              style={{ minWidth: 0 }}
            />
          </div>
        </div>

        {/* Department List */}
        <div className="flex-1 w-full bg-blue-50/60 rounded-2xl p-4 sm:p-6 shadow-sm border border-blue-100 mt-6 md:mt-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 text-left mb-2">
            {t.orgone}
          </h2>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <li className="flex items-center text-base sm:text-lg font-medium text-blue-900 bg-blue-100/60 rounded-lg px-2 sm:px-3 py-2">
              <span className="text-yellow-400 mr-2 text-lg sm:text-xl">★</span> {t.orgtwo}
            </li>
            <li className="flex items-center text-base sm:text-lg font-medium text-blue-900 bg-blue-100/60 rounded-lg px-2 sm:px-3 py-2">
              <span className="text-yellow-400 mr-2 text-lg sm:text-xl">★</span> {t.orgtwo}
            </li>
            <li className="flex items-center text-base sm:text-lg font-medium text-blue-900 bg-blue-100/60 rounded-lg px-2 sm:px-3 py-2">
              <span className="text-yellow-400 mr-2 text-lg sm:text-xl">★</span> {t.orgthree}
            </li>
            <li className="flex items-center text-base sm:text-lg font-medium text-blue-900 bg-blue-100/60 rounded-lg px-2 sm:px-3 py-2">
              <span className="text-yellow-400 mr-2 text-lg sm:text-xl">★</span> {t.orgfive}
            </li>
            <li className="flex items-center text-base sm:text-lg font-medium text-blue-900 bg-blue-100/60 rounded-lg px-2 sm:px-3 py-2">
              <span className="text-yellow-400 mr-2 text-lg sm:text-xl">★</span> {t.orgsix}
            </li>
            <li className="flex items-center text-base sm:text-lg font-medium text-blue-900 bg-blue-100/60 rounded-lg px-2 sm:px-3 py-2">
              <span className="text-yellow-400 mr-2 text-lg sm:text-xl">★</span> {t.orgseven}
            </li>
            <li className="flex items-center text-base sm:text-lg font-medium text-blue-900 bg-blue-100/60 rounded-lg px-2 sm:px-3 py-2">
              <span className="text-yellow-400 mr-2 text-lg sm:text-xl">★</span> {t.orgeight}
            </li>
            <li className="flex items-center text-base sm:text-lg font-medium text-blue-900 bg-blue-100/60 rounded-lg px-2 sm:px-3 py-2">
              <span className="text-yellow-400 mr-2 text-lg sm:text-xl">★</span> {t.orgnine}
            </li>
            <li className="flex items-center text-base sm:text-lg font-medium text-blue-900 bg-blue-100/60 rounded-lg px-2 sm:px-3 py-2">
              <span className="text-yellow-400 mr-2 text-lg sm:text-xl">★</span> {t.orgten}
            </li>
            <li className="flex items-center text-base sm:text-lg font-medium text-blue-900 bg-blue-100/60 rounded-lg px-2 sm:px-3 py-2">
              <span className="text-yellow-400 mr-2 text-lg sm:text-xl">★</span> {t.orgeleven}
            </li>
            <li className="flex items-center text-base sm:text-lg font-medium text-blue-900 bg-blue-100/60 rounded-lg px-2 sm:px-3 py-2">
              <span className="text-yellow-400 mr-2 text-lg sm:text-xl">★</span> {t.orgtwelve}
            </li>
          </ul>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mt-4 sm:mt-6">
            {t.orgthird}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
