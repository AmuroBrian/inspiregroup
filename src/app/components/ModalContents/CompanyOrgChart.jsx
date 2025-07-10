"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "@/TranslationContext";
import { motion } from "framer-motion";

export const CompanyOrgChart = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Animation variants - consistent with CompanyOverview
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

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    const element = document.querySelector("#org-chart");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div id="org-chart" className="min-h-screen mt-20 bg-gradient-to-br from-blue-50 to-white py-16 px-4 md:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Floating decorative elements - consistent with CompanyOverview */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-100 opacity-20 blur-xl"></div>
          <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-blue-200 opacity-15 blur-xl"></div>
        </div>

        {/* Centered Title Section with modern underline - now matching CompanyOverview */}
        <motion.div 
          className="text-center mb-16 relative"
          variants={itemVariants}
        >
          <div className="inline-block relative">
            <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6">
              {t.org}
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

        {/* Main Content Card - updated styling to match CompanyOverview */}
        <motion.div 
          className="bg-white p-8 rounded-3xl shadow-xl relative overflow-hidden mb-16"
          variants={itemVariants}
        >
          {/* Decorative Accent Bar */}
          <div className="absolute top-0 left-0 w-full h-2 rounded-t-3xl" />

          {/* Department List */}
          <motion.div 
            className="w-full bg-blue-50/60 rounded-2xl p-6 shadow-sm border border-blue-100 mb-8"
            variants={itemVariants}
            whileHover={{ 
              y: -5,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              {t.orgone}
            </h2>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[t.orgtwo, t.orgtwo, t.orgthree, t.orgfive, t.orgsix, 
                t.orgseven, t.orgeight, t.orgnine, t.orgten, t.orgeleven, t.orgtwelve].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center text-lg font-medium text-blue-900 bg-blue-100/60 rounded-lg px-3 py-2"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-yellow-400 mr-2 text-xl">★</span> {item}
                </motion.li>
              ))}
            </ul>
            <motion.p 
              className="text-gray-700 text-lg leading-relaxed mt-6 text-left"
              variants={itemVariants}
            >
              {t.orgthird}
            </motion.p>
          </motion.div>

          {/* Org Chart Image */}
          <motion.div 
            className="w-full flex justify-center"
            variants={itemVariants}
          >
            <motion.div 
              className="w-full max-w-4xl"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img
                src="images/OrganizationNew.png"
                alt="Organization Image"
                className="w-full h-auto object-cover rounded-2xl shadow-lg border-4 border-blue-200"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};