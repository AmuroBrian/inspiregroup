"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/TranslationContext";

export default function WelcomeToHol({ darkMode = false }) {
  const { t } = useTranslation();
  const welcometohol = t.welcometohol;
  const welcometohol_desc = t.welcometohol_desc;
  const welcometohol_subheading = t.welcometohol_subheading;
  const welcometohol_body = t.welcometohol_body;

  return (
    <section
      id="welcome-to-hol"
      className={`relative w-full ${darkMode ? 'bg-gray-900' : 'bg-white'} py-16 px-4 md:px-16 flex flex-col md:flex-row items-center gap-8 overflow-hidden`}
    >
      {/* Decorative Background Shapes */}
      <div className="absolute -left-32 -top-32 w-64 h-64 rounded-full bg-blue-500 opacity-15 blur-3xl animate-pulse"></div>
      <div className="absolute -right-32 bottom-0 w-96 h-96 rounded-full bg-purple-500 opacity-15 blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute left-1/4 top-1/2 w-32 h-32 bg-indigo-400 rounded-lg rotate-45 opacity-25 blur-xl animate-spin-slow"></div>

      {/* Text Section */}
      <motion.div
        className="relative w-full md:w-1/2 flex flex-col justify-center"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={`absolute -left-8 top-0 w-4 h-16 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} rounded-full animate-fade-in-up`}></div>
        <h2 className={`relative text-3xl md:text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          {welcometohol}
          <span className={`absolute left-0 -bottom-2 w-16 h-1 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} rounded-full animate-stretch`}></span>
        </h2>
        <h3 className={`text-lg md:text-xl font-semibold mb-2 ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>{welcometohol_subheading}</h3>
        <p className={`text-base md:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-4 pl-6 border-l-2 ${darkMode ? 'border-blue-400/30' : 'border-blue-600/30'}`}>{welcometohol_desc}</p>
        <p className={`text-base md:text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed pl-6 border-l-2 ${darkMode ? 'border-blue-400/20' : 'border-blue-600/10'}`}>{welcometohol_body}</p>
      </motion.div>

      {/* Video Section */}
      <motion.div
        className="relative w-full md:w-1/2"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <div className={`absolute -z-10 -left-8 -top-8 w-full h-full rounded-3xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rotate-3 shadow-lg`}></div>
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-400 rounded-full opacity-30 animate-bounce-slow"></div>
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <video
            src="/videos/Col.mp4"
            autoPlay
            loop
            controls
            playsInline
            className="w-full h-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.div>
    </section>
  );
}
