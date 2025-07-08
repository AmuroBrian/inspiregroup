"use client";
import React from "react";
// import { useTranslation } from "@/TranslationContext"; // Removed due to compilation error
import { motion } from "framer-motion"; // Used for scroll-triggered animations

export default function WelcomeToHol({ darkMode = false }) { // Added darkMode prop
  // Placeholder text since TranslationContext could not be resolved.
  // If you have a custom TranslationContext, please ensure its path is correct
  // or provide the content for the 'useTranslation' hook.
  const welcometohol = "Welcome to Our Platform!";
  const welcometohol_desc = "Explore a world of possibilities with our innovative solutions. We are dedicated to providing you with the best experience, combining cutting-edge technology with user-friendly design. Join us on this journey to unlock your full potential.";

  // console.error("Note: The TranslationContext import was removed due to a compilation error. Placeholder text is being used. Please ensure your TranslationContext is correctly set up if you need translation functionality.");

  return (
    <section
      id="welcome-to-hol"
      // Adapted main section styling from InspireWalletIntro for a consistent look
      className={`relative w-full ${darkMode ? 'bg-gray-900' : 'bg-white'} py-16 px-4 md:px-16 flex flex-col md:flex-row items-center gap-8 overflow-hidden`}
    >
      {/* Decorative Background Shapes - Copied directly from InspireWalletIntro with animations */}
      <div className="absolute -left-32 -top-32 w-64 h-64 rounded-full bg-blue-500 opacity-15 blur-3xl animate-pulse"></div>
      <div className="absolute -right-32 bottom-0 w-96 h-96 rounded-full bg-purple-500 opacity-15 blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute left-1/4 top-1/2 w-32 h-32 bg-indigo-400 rounded-lg rotate-45 opacity-25 blur-xl animate-spin-slow"></div>

      {/* Text Section - Reordered to be on the left as per InspireWalletIntro's default */}
      <motion.div
        className="relative w-full md:w-1/2 flex flex-col justify-center"
        initial={{ opacity: 0, x: -100 }} // Animation from left on scroll into view
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Decorative vertical bar with a fade-in animation */}
        <div className={`absolute -left-8 top-0 w-4 h-16 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} rounded-full animate-fade-in-up`}></div>

        <h2 className={`relative text-3xl md:text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
          {welcometohol} {/* Using placeholder variable */}
          {/* Underline shape with a stretch animation */}
          <span className={`absolute left-0 -bottom-2 w-16 h-1 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} rounded-full animate-stretch`}></span>
        </h2>

        <p className={`text-lg md:text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-8 pl-6 border-l-2 ${darkMode ? 'border-blue-400/30' : 'border-blue-600/30'}`}>
          {welcometohol_desc} {/* Using placeholder variable */}
        </p>

        {/* Call to Action Button with interactive hover and tap effects */}
        <motion.button
          className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out
            ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg'}
            focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50`}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button>
      </motion.div>

      {/* Video Section - Designed to be prominent and visually engaging */}
      <motion.div
        className="relative w-full md:w-1/2"
        initial={{ opacity: 0, x: 100 }} // Animation from right on scroll into view
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} // Slightly delayed for sequential animation
      >
        {/* Floating shape behind the video for depth */}
        <div className={`absolute -z-10 -left-8 -top-8 w-full h-full rounded-3xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rotate-3 shadow-lg`}></div>

        {/* Decorative circle shape with a gentle bounce animation */}
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-400 rounded-full opacity-30 animate-bounce-slow"></div>

        {/* Main container for the video with enhanced styling and hover effect */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 transform hover:scale-105 transition-transform duration-300 ease-in-out">
          {/* The video element: auto-plays, loops, with controls, and plays inline for mobile compatibility */}
          <video
            src="/videos/Col.mp4" // Original video source
            autoPlay
            loop
            controls // Retained controls as requested
            playsInline
            className="w-full h-full object-contain" // Ensures video fits within container
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.div>

      {/* The original "Bottom Text" section has been removed to align with the requested design copy,
          which focuses on the two-column layout. */}

    </section>
  );
}
