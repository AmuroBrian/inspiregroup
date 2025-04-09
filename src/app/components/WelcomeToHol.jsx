"use client";
import React from "react";
import { useTranslation } from "@/TranslationContext"; // Import the translation hook

export default function WelcomeToHol() {
  const { t } = useTranslation(); // Use translation context

  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-white px-4 flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
        <div className="flex flex-col justify-center text-black md:order-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-4 text-center md:text-left">
            {t.welcometohol} 
          </h2>
          <p className="text-md md:text-lg leading-relaxed text-center md:text-left">
            {t.welcometohol_desc} 
          </p>
        </div>
        <div className="w-full border-b-4 border-black pb-5 md:order-2 mt-2">
          <video src="/videos/Col.mp4" autoPlay loop controls className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      </div>
      <div className="text-left text-lg p-2 md:text-center md:text-xl md:p-5">
        <span className="font-bold">{t. welcometohol_subheading}</span> {t.welcometohol_body}
      </div>
    </div>
  );
}
