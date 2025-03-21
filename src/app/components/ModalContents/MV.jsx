"use client";
import React from "react";
import { useTranslation } from "@/TranslationContext";

export const MV = () => {
  const { t } = useTranslation(); // Use translation context
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="w-full h-[80px]"></div>
      {/* Title */}
      <h1 className="text-3xl font-bold text-center">{t.mv}</h1>
      <hr className="my-4 border-gray-300" />

      {/* Wide Image */}
      <div className="w-full">
        <img
          src="images/Stocks.jpeg"
          alt="Stocks"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Mission & Vision Sections */}
      <div className="mt-6 space-y-8">
        {/* Mission */}
        <div>
          <h2 className="text-3xl font-bold text-left">{t.mvone}</h2>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            {t.mvtwo}
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            {t.mvthree}
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
           {t.mvfour}
          </p>
        </div>

        {/* Vision */}
        <div>
          <h2 className="text-3xl font-bold text-left">{t.mvfive}</h2>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
           {t.mvsix}
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            {t.mvseven}
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-left">{t.mveight}</h2>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
           {t.mvnine}
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
           {t.mvten}
          </p>
        </div>
      </div>
    </div>
  );
};
