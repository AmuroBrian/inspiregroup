"use client"; // Add this line to mark the component as a client component

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import motion for animations
import { useTranslation } from "@/TranslationContext";

export const CompanyOverview = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useTranslation();

  // Ensure the component only renders after the client has mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If the component is not mounted yet, return null to prevent SSR mismatches
  if (!isMounted) return null;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative bg-blue-50 py-20 px-4 md:px-8 lg:px-16 overflow-hidden"> {/* Lighter blue background, increased padding */}
      {/* Decorative background shapes - adjusted colors for blue theme */}
      <div className="absolute -top-20 -left-20 w-48 h-48 bg-blue-200 rounded-full opacity-30 blur-3xl animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-300 rounded-full opacity-20 blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-100 rounded-lg rotate-45 opacity-25 blur-2xl animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto z-10 relative"> {/* Changed max-w-6xl to max-w-7xl for wider layout */}
        {/* Spacer for fixed header, if any */}
        <div className="w-full h-[80px]"></div>

        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center text-blue-800 mb-12 relative" /* Darker blue heading, more bottom margin */
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {t.overview}
          <span className="block w-28 h-1.5 bg-blue-600 rounded-full mx-auto mt-4"></span> {/* Thicker, longer blue underline */}
        </motion.h1>

        <div className="flex flex-col md:flex-row items-center gap-16 bg-white p-10 rounded-3xl shadow-xl border border-blue-200"> {/* Increased padding, blue border */}
          {/* Text - Now appears first for md screens and above */}
          <motion.div
            className="w-full md:w-1/2 space-y-7 order-2 md:order-1" /* Increased space between paragraphs, changed order */
            variants={slideInLeft} // Changed to slide in from left to match new position
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 relative pb-4"> {/* Darker blue sub-heading */}
              {t.inc}
              <span className="absolute left-0 bottom-0 w-20 h-1.5 bg-blue-500 rounded-full"></span> {/* Thicker, blue underline */}
            </h2>
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
          </motion.div>

          {/* Image - Now appears second for md screens and above */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center order-1 md:order-2" /* Changed order */
            variants={slideInRight} // Changed to slide in from right to match new position
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src="/images/Missionpic.png"
              alt="Company Mission"
              className="w-full h-auto max-w-sm object-cover rounded-2xl shadow-lg border-4 border-blue-200 transform hover:scale-105 transition-transform duration-300 ease-in-out" /* Blue border */
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
