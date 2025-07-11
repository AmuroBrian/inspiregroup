"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "@/TranslationContext";
import { motion } from "framer-motion";
import { FaLightbulb, FaEye, FaRocket, FaChartLine, FaHandshake, FaGlobe } from "react-icons/fa";

export const MV = () => {
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
    
    const element = document.querySelector("#mv-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div id="mv-section" className="min-h-screen bg-gradient-to-br mt-8 from-blue-50 to-white py-16 px-4 md:px-8">
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
              {t.mv}
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

        {/* Hero Image with floating effect */}
        <motion.div 
          className="mb-16 rounded-3xl overflow-hidden shadow-2xl relative z-10"
          variants={itemVariants}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.8,
            ease: [0.2, 0.8, 0.4, 1]
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent z-10"></div>
          <img
            src="images/Stocks.jpeg"
            alt="Stocks"
            className="w-full h-72 md:h-[32rem] object-cover object-center"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              {t.mvtwo.split('.')[0]}
            </h2>
          </div>
        </motion.div>

        {/* Content Sections with icon cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mission Section */}
          <motion.section 
            className="bg-white p-8 rounded-3xl shadow-xl relative overflow-hidden group"
            variants={itemVariants}
            whileHover="hover"
          >
            <div className="absolute top-6 right-6 text-blue-100 group-hover:text-blue-300 transition-colors">
              <FaLightbulb size={40} />
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-500 text-white flex items-center justify-center mb-6">
              <FaRocket size={20} />
            </div>
            <h2 className="text-2xl font-bold text-blue-800 mb-6">
              {t.mvone}
            </h2>
            <div className="space-y-4 text-blue-900/90 relative z-10">
              <p className="leading-relaxed">
                {t.mvtwo}
              </p>
              <p className="leading-relaxed">
                {t.mvthree}
              </p>
              <p className="leading-relaxed">
                {t.mvfour}
              </p>
            </div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-100 opacity-20 group-hover:opacity-30 transition-opacity"></div>
          </motion.section>

          {/* Vision Section */}
          <motion.section 
            className="bg-white p-8 rounded-3xl shadow-xl relative overflow-hidden group"
            variants={itemVariants}
            whileHover="hover"
            transition={{ delay: 0.1 }}
          >
            <div className="absolute top-6 right-6 text-blue-100 group-hover:text-blue-300 transition-colors">
              <FaEye size={40} />
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-500 text-white flex items-center justify-center mb-6">
              <FaChartLine size={20} />
            </div>
            <h2 className="text-2xl font-bold text-blue-800 mb-6">
              {t.mvfive}
            </h2>
            <div className="space-y-4 text-blue-900/90 relative z-10">
              <p className="leading-relaxed">
                {t.mvsix}
              </p>
              <p className="leading-relaxed">
                {t.mvseven}
              </p>
            </div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-100 opacity-20 group-hover:opacity-30 transition-opacity"></div>
          </motion.section>

          {/* Values Section */}
          <motion.section 
            className="bg-white p-8 rounded-3xl shadow-xl relative overflow-hidden group"
            variants={itemVariants}
            whileHover="hover"
            transition={{ delay: 0.2 }}
          >
            <div className="absolute top-6 right-6 text-blue-100 group-hover:text-blue-300 transition-colors">
              <FaGlobe size={40} />
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-500 text-white flex items-center justify-center mb-6">
              <FaHandshake size={20} />
            </div>
            <h2 className="text-2xl font-bold text-blue-800 mb-6">
              {t.mveight}
            </h2>
            <div className="space-y-4 text-blue-900/90 relative z-10">
              <p className="leading-relaxed">
                {t.mvnine}
              </p>
              <p className="leading-relaxed">
                {t.mvten}
              </p>
            </div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-100 opacity-20 group-hover:opacity-30 transition-opacity"></div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
};