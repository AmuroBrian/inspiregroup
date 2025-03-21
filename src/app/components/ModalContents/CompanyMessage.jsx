"use client";
import React from "react";
import { useTranslation } from "@/TranslationContext";

export const CompanyMessage = () => {
   const { t } = useTranslation();
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="w-full h-[80px]"></div>
      <h1 className="text-3xl font-bold text-left">
      {t.compM}
      </h1>
      <hr className="my-4 border-gray-300" />

      <div className="w-full">
        <img
          src="images/flag.jpeg"
          alt="Stocks"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </div>

      <div className="mt-6 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-left">
           {t.compMone}{" "}
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

          <p className="text-gray-700 text-lg font-semibold text-right leading-relaxed mt-4">
            Melody Santos
          </p>
        </div>

        <hr className="my-4 border-gray-300" />
        <h1 className="text-2xl font-bold text-left">
         {t.compMfift}
        </h1>

        <div>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
           {t.compMsix}
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mt-4">
           {t.compMseven}
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            {t.compMeight}
          </p>

          <p className="text-gray-700 text-lg font-semibold text-right leading-relaxed mt-4">
            Rhia Alberto
          </p>
        </div>
      </div>
    </div>
  );
};
