"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/TranslationContext";
import { FaBuilding, FaUsers, FaChartPie, FaHandshake } from "react-icons/fa";

export const CompanyOverview = () => {
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
    
    const element = document.querySelector("#company-overview");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div id="company-overview" className="min-h-screen bg-gradient-to-br mt-20 from-blue-50 to-white py-16 px-4 md:px-8">
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
              {t.overview}
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

        {/* Main Content Card */}
        <motion.div 
          className="bg-white p-8 rounded-3xl shadow-xl relative overflow-hidden mb-16"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row gap-12">
            {/* Text Content */}
            <div className="w-full md:w-1/2 space-y-6">
              <motion.div 
                className="flex items-center gap-4 mb-8"
                variants={itemVariants}
              >
                <div className="w-12 h-12 rounded-lg bg-blue-500 text-white flex items-center justify-center">
                  <FaBuilding size={20} />
                </div>
                <h2 className="text-3xl font-bold text-blue-800">
                  {t.inc}
                </h2>
              </motion.div>
              
              <motion.p className="text-blue-900/90 leading-relaxed" variants={itemVariants}>
                {t.incone}
              </motion.p>
              <motion.p className="text-blue-900/90 leading-relaxed" variants={itemVariants}>
                {t.inctwo}
              </motion.p>
              <motion.p className="text-blue-900/90 leading-relaxed" variants={itemVariants}>
                {t.incthree}
              </motion.p>
              <motion.p className="text-blue-900/90 leading-relaxed" variants={itemVariants}>
                {t.incfour}
              </motion.p>
            </div>

            {/* Image */}
            <motion.div 
              className="w-full md:w-1/2 flex justify-center items-center"
              variants={itemVariants}
            >
              <img
                src="/images/AllianceBuilding.jpg"
                alt="Company Mission"
                className="w-full h-auto max-w-md object-cover rounded-2xl shadow-lg border-4 border-blue-100 transform hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Key Points Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team Card */}
          <motion.div 
            className="bg-white p-8 rounded-3xl shadow-xl relative overflow-hidden group"
            variants={itemVariants}
            whileHover="hover"
          >
            <div className="absolute top-6 right-6 text-blue-100 group-hover:text-blue-300 transition-colors">
              <FaUsers size={40} />
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-500 text-white flex items-center justify-center mb-6">
              <FaUsers size={20} />
            </div>
            <h2 className="text-2xl font-bold text-blue-800 mb-6">
              Expert Team
            </h2>
            <p className="text-blue-900/90 leading-relaxed">
              Our team brings together top talent with diverse expertise in finance and technology.
            </p>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-100 opacity-20 group-hover:opacity-30 transition-opacity"></div>
          </motion.div>

          {/* Performance Card */}
          <motion.div 
            className="bg-white p-8 rounded-3xl shadow-xl relative overflow-hidden group"
            variants={itemVariants}
            whileHover="hover"
          >
            <div className="absolute top-6 right-6 text-blue-100 group-hover:text-blue-300 transition-colors">
              <FaChartPie size={40} />
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-500 text-white flex items-center justify-center mb-6">
              <FaChartPie size={20} />
            </div>
            <h2 className="text-2xl font-bold text-blue-800 mb-6">
              Proven Performance
            </h2>
            <p className="text-blue-900/90 leading-relaxed">
              Consistent track record of delivering superior results for our clients.
            </p>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-100 opacity-20 group-hover:opacity-30 transition-opacity"></div>
          </motion.div>

          {/* Partnerships Card */}
          <motion.div 
            className="bg-white p-8 rounded-3xl shadow-xl relative overflow-hidden group"
            variants={itemVariants}
            whileHover="hover"
          >
            <div className="absolute top-6 right-6 text-blue-100 group-hover:text-blue-300 transition-colors">
              <FaHandshake size={40} />
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-500 text-white flex items-center justify-center mb-6">
              <FaHandshake size={20} />
            </div>
            <h2 className="text-2xl font-bold text-blue-800 mb-6">
              Strategic Partnerships
            </h2>
            <p className="text-blue-900/90 leading-relaxed">
              Strong network of industry partners to enhance our service offerings.
            </p>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-100 opacity-20 group-hover:opacity-30 transition-opacity"></div>
          </motion.div>

          {/* Innovation Card */}
          <motion.div 
            className="bg-white p-8 rounded-3xl shadow-xl relative overflow-hidden group"
            variants={itemVariants}
            whileHover="hover"
          >
            <div className="absolute top-6 right-6 text-blue-100 group-hover:text-blue-300 transition-colors">
              <FaBuilding size={40} />
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-500 text-white flex items-center justify-center mb-6">
              <FaBuilding size={20} />
            </div>
            <h2 className="text-2xl font-bold text-blue-800 mb-6">
              Global Presence
            </h2>
            <p className="text-blue-900/90 leading-relaxed">
              Serving clients worldwide with localized expertise and global insights.
            </p>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-100 opacity-20 group-hover:opacity-30 transition-opacity"></div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};