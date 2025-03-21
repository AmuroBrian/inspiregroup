"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "@/TranslationContext"; 


export default function InspireWalletIntro() {
    const { t } = useTranslation(); // Use translation context

  return (
    <div className="w-full flex justify-center items-center p-2 flex-col md:flex-row md:p-8">
      <div className="w-full md:w-[50%] flex justify-center items-center text-center p-2 md:p-8">
        <img
          src="./images/iwintro.png"
          alt="Inspire Wallet"
          className="w-full rounded-lg"
        />
      </div>
      <div className="flex justify-center flex-col items-start w-full md:w-[50%] p-2 md:p-8">
        <div className="w-full p-3 text-3xl font-bold">
           {t.introWalletTitle} 
        </div>
        <div className="w-full flex justify-center items-center text-left p-2 text-xl">
        {t. introWalletDesc} 
        </div>
      </div>
    </div>
  );
}
