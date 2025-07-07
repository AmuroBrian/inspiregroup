"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "@/TranslationContext";
import { motion } from "framer-motion";

export default function InspireWalletIntro({ darkMode = false, videoMode = false }) {
  const { t } = useTranslation();

  return (
    <section className={`relative w-full ${darkMode ? 'bg-gray-900' : 'bg-white'} py-16 px-4 md:px-16 flex flex-col md:flex-row items-center gap-8 overflow-hidden`}>
      {/* Decorative Shapes */}
      <div className="absolute -left-32 -top-32 w-64 h-64 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
      <div className="absolute -right-32 bottom-0 w-96 h-96 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
      <div className="absolute left-1/4 top-1/2 w-32 h-32 bg-indigo-400 rounded-lg rotate-45 opacity-20 blur-xl"></div>

      {/* Image/Video Section - Fixed to show full image */}
      <motion.div
        className="relative w-full md:w-1/2"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Floating shape behind the image */}
        <div className={`absolute -z-10 -left-8 -top-8 w-full h-full rounded-3xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rotate-3`}></div>
        
        {/* Decorative circle shape */}
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-400 rounded-full opacity-20"></div>
        
        {/* Main container with fixed aspect ratio */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white/10">
          {videoMode ? (
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
              <source src="/videos/iwintro.mp4" type="video/mp4" />
            </video>
          ) : (
            <Image
              src="/images/iwintro.png"
              alt="Inspire Wallet"
              fill
              className="object-contain" // Changed from 'cover' to 'contain' to show full image
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="relative w-full md:w-1/2 flex flex-col justify-center"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        {/* Decorative vertical bar */}
        <div className={`absolute -left-8 top-0 w-4 h-16 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} rounded-full`}></div>
        
        <h2 className={`relative text-3xl md:text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
          {t.introWalletTitle}
          {/* Underline shape */}
          <span className={`absolute left-0 -bottom-2 w-16 h-1 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} rounded-full`}></span>
        </h2>
        
        <p className={`text-lg md:text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-8 pl-6 border-l-2 ${darkMode ? 'border-blue-400/30' : 'border-blue-600/30'}`}>
          {t.introWalletDesc}
        </p>
      </motion.div>
    </section>
  );
}