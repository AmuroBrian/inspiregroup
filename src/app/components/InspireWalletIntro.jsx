"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/TranslationContext";

export default function InspireWalletIntro({ darkMode = false }) {
  const { t } = useTranslation();
  const introWalletTitle = t.introWalletTitle;
  const introWalletDesc = t.introWalletDesc;

  return (
    <section
      id="IW"
      className={`relative w-full ${darkMode ? 'bg-neutral-900' : 'bg-white'} py-16 px-4 md:px-16 flex flex-col md:flex-row items-center gap-8 overflow-hidden`}
    >
      {/* Decorative Shapes */}
      <div className="absolute -left-32 -top-32 w-64 h-64 rounded-full bg-blue-100 opacity-10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 w-96 h-96 rounded-full bg-blue-100 opacity-10 blur-3xl delay-1000" />
      <div className="absolute left-1/4 top-1/2 w-32 h-32 bg-blue-50 rounded-lg rotate-45 opacity-10 blur-xl" />

      {/* Video Section */}
      <motion.div
        className="relative w-full md:w-1/2"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={`absolute -z-10 -left-8 -top-8 w-full h-full rounded-3xl ${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'} rotate-3 shadow-lg`} />
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-100 rounded-full opacity-10" />
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-neutral-200 transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <video autoPlay loop muted playsInline className="w-full h-full object-contain">
            <source src="/videos/inspirewallet.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
        <div className={`absolute -left-8 top-0 w-4 h-16 bg-blue-100 rounded-full`} />

        <h2 className={`relative text-3xl md:text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-black'} mb-6`}>
          {introWalletTitle}
          <span className={`absolute left-0 -bottom-2 w-16 h-1 bg-blue-200 rounded-full`} />
        </h2>

        <p className={`text-lg md:text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-8 pl-6 border-l-2 border-blue-100`}>
          {introWalletDesc}
        </p>

        <h3 className={`text-lg md:text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
          {t.registrationTutorials || "Registration Tutorials"}
        </h3>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          {/* Investor Tutorial Button with Arrow Icon */}
          <motion.a
            href="/docs/investor.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative px-4 py-3 sm:px-6 sm:py-4 text-lg font-medium text-white rounded-xl transition-all duration-300 w-full sm:w-[240px] text-center shadow-2xl hover:shadow-3xl overflow-hidden
            ${darkMode ? 'bg-gradient-to-br from-blue-600 to-blue-500' : 'bg-gradient-to-br from-blue-500 to-blue-400'}`}
            whileHover={{
              y: -4,
              scale: 1.02,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
            }}
            whileTap={{
              scale: 0.98,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)"
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
              {t.investorTutorial || "Tutorial for Investor"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className={`absolute inset-0 rounded-xl transform translate-z-[-4px] group-hover:translate-z-[-6px] transition-transform duration-300
            ${darkMode ? 'bg-blue-700' : 'bg-blue-600'}`}></span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.a>

          {/* Agent Tutorial Button with Arrow Icon */}
          <motion.a
            href="/docs/agent.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative px-4 py-3 sm:px-6 sm:py-4 text-lg font-medium text-white rounded-xl transition-all duration-300 w-full sm:w-[240px] text-center shadow-2xl hover:shadow-3xl overflow-hidden
            ${darkMode ? 'bg-gradient-to-br from-blue-800 to-blue-700' : 'bg-gradient-to-br from-blue-700 to-blue-600'}`}
            whileHover={{
              y: -4,
              scale: 1.02,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
            }}
            whileTap={{
              scale: 0.98,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)"
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
              {t.agentTutorial || "Tutorial for Agent"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className={`absolute inset-0 rounded-xl transform translate-z-[-4px] group-hover:translate-z-[-6px] transition-transform duration-300
            ${darkMode ? 'bg-blue-900' : 'bg-blue-800'}`}></span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}