"use client";
import React from "react";
import { useTranslation } from "@/TranslationContext";
import { motion } from "framer-motion";

export default function WelcomeToHol() {
  const { t } = useTranslation();

  return (
    <div className="relative flex items-center justify-center min-h-[70vh] bg-white px-4 flex-col overflow-hidden">
      {/* Decorative Background Shapes */}
      <div className="absolute -left-32 top-1/4 w-64 h-64 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
      <div className="absolute -right-32 bottom-1/4 w-96 h-96 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
      <div className="absolute left-1/4 top-1/2 w-32 h-32 bg-indigo-400 rounded-lg rotate-45 opacity-20 blur-xl"></div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full z-10">
        {/* Text Section with animation */}
        <motion.div
          className="flex flex-col justify-center text-black md:order-1"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Decorative elements */}
          <div className="absolute -left-8 top-0 w-4 h-16 bg-blue-600 rounded-full"></div>
          
          <h2 className="relative text-2xl md:text-3xl font-bold mb-4 mt-4 text-center md:text-left">
            {t.welcometohol}
            <span className="absolute left-0 md:left-0 -bottom-2 w-16 h-1 bg-blue-600 rounded-full"></span>
          </h2>
          <p className="text-md md:text-lg leading-relaxed text-center md:text-left pl-6 border-l-2 border-blue-600/30">
            {t.welcometohol_desc}
          </p>
        </motion.div>

        {/* Video Section with animation */}
        <motion.div
          className="relative w-full md:order-2 mt-2"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Floating shape behind video */}
          <div className="absolute -z-10 -left-4 -top-4 w-full h-full rounded-2xl bg-gray-100 rotate-2"></div>
          
          <div className="border-b-4 border-black pb-5">
            <video
              src="/videos/Col.mp4"
              autoPlay
              loop
              controls
              className="w-full h-auto rounded-lg shadow-xl border-4 border-white/10"
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom Text */}
      <motion.div
        className="relative text-left text-lg p-2 md:text-center md:text-xl md:p-5 z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        {/* Decorative dot before text */}
        <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 -top-1 w-3 h-3 bg-blue-600 rounded-full"></div>
        <span className="font-bold">{t.welcometohol_subheading}</span> {t.welcometohol_body}
      </motion.div>
    </div>
  );
}