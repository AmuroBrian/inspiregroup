"use client"; // Add this line to mark the component as a client component

import React, { useState, useEffect } from "react";
import { useTranslation } from "@/TranslationContext"; 


export const CompanyOverview = () => {
  const [isMounted, setIsMounted] = useState(false);
   const { t } = useTranslation(); // Use translation context

  // Ensure the component only renders after the client has mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If the component is not mounted yet, return null to prevent SSR mismatches
  if (!isMounted) return null;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="w-full h-[80px]"></div>

      <h1 className="text-3xl font-bold text-center">{t.overview}</h1>
      <hr className="my-4 border-gray-300" />

      <div className="flex flex-col md:flex-row items-center gap-8">
        <img
          src="/images/PSE.jpg"
          alt="Company"
          className="w-80 h-80 object-cover rounded-lg shadow-lg"
        />

        {/* Text */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">{t.inc}</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
           {t.incone}
          </p>

          <p className="text-gray-700 text-lg leading-relaxed">
            {t.inctwo}
          </p>

          <p className="text-gray-700 text-lg leading-relaxed">
            {t.incthree}
          </p>

          <p className="text-gray-700 text-lg leading-relaxed">
            {t.incfour}
          </p>

        </div>
      </div>
    </div>
  );
};
