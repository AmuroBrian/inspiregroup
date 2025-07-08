"use client";
import React, { useEffect } from "react";
import { useTranslation } from "@/TranslationContext";
import { motion } from "framer-motion";

export const MV = () => {
  const { t } = useTranslation();

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

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "anticipate"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-16 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Spacer */}
        <div className="h-16"></div>
        
        {/* Title Section */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            {t.mv}
          </h1>
          <div className="w-24 h-1.5 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          className="mb-16 rounded-2xl overflow-hidden shadow-2xl"
          variants={imageVariants}
        >
          <img
            src="images/Stocks.jpeg"
            alt="Stocks"
            className="w-full h-72 md:h-96 object-cover object-center"
          />
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Mission Section */}
          <motion.section 
            className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-blue-500"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <h2 className="text-3xl font-bold text-blue-800 mb-6">
              {t.mvone}
            </h2>
            <div className="space-y-6 text-blue-900/90">
              <p className="text-lg leading-relaxed">
                {t.mvtwo}
              </p>
              <p className="text-lg leading-relaxed">
                {t.mvthree}
              </p>
              <p className="text-lg leading-relaxed">
                {t.mvfour}
              </p>
            </div>
          </motion.section>

          {/* Vision Section */}
          <motion.section 
            className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-blue-500"
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold text-blue-800 mb-6">
              {t.mvfive}
            </h2>
            <div className="space-y-6 text-blue-900/90">
              <p className="text-lg leading-relaxed">
                {t.mvsix}
              </p>
              <p className="text-lg leading-relaxed">
                {t.mvseven}
              </p>
            </div>
          </motion.section>

          {/* Additional Section */}
          <motion.section 
            className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-blue-500"
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-blue-800 mb-6">
              {t.mveight}
            </h2>
            <div className="space-y-6 text-blue-900/90">
              <p className="text-lg leading-relaxed">
                {t.mvnine}
              </p>
              <p className="text-lg leading-relaxed">
                {t.mvten}
              </p>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
};