"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/TranslationContext";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

export const CompanyMessage = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    const element = document.querySelector("#company-message");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div id="company-message" className="min-h-screen mt-20 bg-gradient-to-br from-blue-50 to-white py-16 px-4 md:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Floating decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-100 opacity-20 blur-xl"></div>
          <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-blue-200 opacity-15 blur-xl"></div>
        </div>

        {/* Title Section with modern underline */}
        <motion.div 
          className="text-center mb-16 relative"
          variants={itemVariants}
        >
          <div className="inline-block relative">
            <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6">
              {t.compM}
            </h1>
            {!prefersReducedMotion && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isVisible ? { 
                  scaleX: 1,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.3
                  }
                } : {}}
                className="absolute -bottom-2 left-0 right-0 mx-auto h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                style={{ width: '70%' }}
              />
            )}
          </div>
        </motion.div>

        {/* Rest of the component remains the same */}
        <motion.div 
          className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden"
          variants={itemVariants}
        >
          {/* Hero Image at the top inside container */}
          <motion.div 
            className="w-full mb-8 sm:mb-12"
            variants={itemVariants}
          >
            <img
              src="/images/flag.jpeg"
              alt="Company Leadership"
              className="w-full h-auto max-h-[400px] object-cover rounded-2xl shadow-lg border-4 border-blue-100 transform hover:scale-[1.01] transition-transform duration-300 ease-in-out"
            />
          </motion.div>

          {/* Responsive two-column message section */}
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
            {/* CEO Message Card */}
            <motion.div 
              className="flex-1 bg-blue-50/50 p-6 sm:p-8 rounded-2xl border border-blue-100 relative min-w-0"
              variants={itemVariants}
              whileHover="hover"
            >
              <FaQuoteLeft className="text-blue-200 text-xl sm:text-2xl absolute top-4 left-4" />
              <div className="pl-8 pr-4">
                <motion.h2 
                  className="text-xl sm:text-2xl font-bold text-blue-800 mb-3 sm:mb-4 flex items-center"
                  variants={itemVariants}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center mr-3">
                    <FaQuoteLeft size={10} className="sm:size-[12px]" />
                  </div>
                  {t.compMone}
                </motion.h2>
                
                <motion.p className="text-blue-900/90 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4" variants={itemVariants}>
                  {t.compMtwo}
                </motion.p>
                <motion.p className="text-blue-900/90 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4" variants={itemVariants}>
                  {t.compMthree}
                </motion.p>
                <motion.p className="text-blue-900/90 text-sm sm:text-base leading-relaxed" variants={itemVariants}>
                  {t.compMfour}
                </motion.p>
              </div>
              <FaQuoteRight className="text-blue-200 text-xl sm:text-2xl absolute bottom-4 right-4" />
              <motion.p 
                className="text-blue-700 text-sm sm:text-base font-semibold text-right mt-4 sm:mt-6"
                variants={itemVariants}
              >
                — Melody Santos
              </motion.p>
            </motion.div>

            {/* CFO Message Card */}
            <motion.div 
              className="flex-1 bg-blue-50/50 p-6 sm:p-8 rounded-2xl border border-blue-100 relative min-w-0"
              variants={itemVariants}
              whileHover="hover"
            >
              <FaQuoteLeft className="text-blue-200 text-xl sm:text-2xl absolute top-4 left-4" />
              <div className="pl-8 pr-4">
                <motion.h2 
                  className="text-xl sm:text-2xl font-bold text-blue-800 mb-3 sm:mb-4 flex items-center"
                  variants={itemVariants}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center mr-3">
                    <FaQuoteLeft size={10} className="sm:size-[12px]" />
                  </div>
                  {t.compMfift}
                </motion.h2>
                
                <motion.p className="text-blue-900/90 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4" variants={itemVariants}>
                  {t.compMsix}
                </motion.p>
                <motion.p className="text-blue-900/90 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4" variants={itemVariants}>
                  {t.compMseven}
                </motion.p>
                <motion.p className="text-blue-900/90 text-sm sm:text-base leading-relaxed" variants={itemVariants}>
                  {t.compMeight}
                </motion.p>
              </div>
              <FaQuoteRight className="text-blue-200 text-xl sm:text-2xl absolute bottom-4 right-4" />
              <motion.p 
                className="text-blue-700 text-sm sm:text-base font-semibold text-right mt-4 sm:mt-6"
                variants={itemVariants}
              >
                — Rhia Alberto
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};