"use client"; // This directive is kept as per the original code.

import React from "react";
import { motion } from "framer-motion"; // Used for scroll-triggered animations
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
      {/* Decorative Shapes - Subtle blue accent only */}
      <div className="absolute -left-32 -top-32 w-64 h-64 rounded-full bg-blue-100 opacity-10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 w-96 h-96 rounded-full bg-blue-100 opacity-10 blur-3xl delay-1000" />
      <div className="absolute left-1/4 top-1/2 w-32 h-32 bg-blue-50 rounded-lg rotate-45 opacity-10 blur-xl" />

      {/* Video Section */}
      <motion.div
        className="relative w-full md:w-1/2"
        initial={{ opacity: 0, x: -100 }} // Animation from left on scroll into view
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }} // Triggers when 20% of the element is visible
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Floating shape behind the video for depth */}
        <div className={`absolute -z-10 -left-8 -top-8 w-full h-full rounded-3xl ${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'} rotate-3 shadow-lg`} />

        {/* Decorative circle shape with a gentle bounce animation */}
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-100 rounded-full opacity-10" />

        {/* Main container for the video with enhanced styling and hover effect */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-neutral-200 transform hover:scale-105 transition-transform duration-300 ease-in-out">
          {/* The video element: auto-plays, loops, is muted, and plays inline for mobile compatibility */}
          <video autoPlay loop muted playsInline className="w-full h-full object-contain">
            {/* Source for the video. Ensure this path is correct in your project. */}
            <source src="/videos/inspirewallet.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="relative w-full md:w-1/2 flex flex-col justify-center"
        initial={{ opacity: 0, x: 100 }} // Animation from right on scroll into view
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} // Slightly delayed for sequential animation
      >
        {/* Decorative vertical bar with a fade-in animation (subtle blue accent) */}
        <div className={`absolute -left-8 top-0 w-4 h-16 bg-blue-100 rounded-full`} />

        <h2 className={`relative text-3xl md:text-4xl font-extrabold text-black mb-6`}>
          {introWalletTitle}
          {/* Underline shape with a stretch animation */}
          <span className={`absolute left-0 -bottom-2 w-16 h-1 bg-blue-200 rounded-full`} />
        </h2>

        <p className={`text-lg md:text-xl text-gray-900 leading-relaxed mb-8 pl-6 border-l-2 border-blue-100`}>
          {introWalletDesc}
        </p>

        {/* Call to Action Button with interactive hover and tap effects
        <motion.button
          className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out
            ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg'}
            focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50`}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button> */}
      </motion.div>
    </section>
  );
}
