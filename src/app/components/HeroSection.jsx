"use client";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "@/TranslationContext";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";

export default function HeroSection() {
  const { t } = useTranslation();
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

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
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Trigger animations on mount and when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, isInView]);

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      ref={ref}
    >
      {/* Background Video */}
      <motion.video
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        loading="eager"
        aria-label="Background video showing financial concepts"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <source src="/videos/herovideo.mp4" type="video/mp4" />
        <source src="/videos/herovideo.webm" type="video/webm" />
        Your browser does not support HTML5 video.
      </motion.video>

      {/* Overlay with animated content */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="w-full px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 text-left"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="max-w-7xl mx-auto">
            <motion.h1 
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight drop-shadow-lg max-w-6xl"
              variants={itemVariants}
            >
              {t.herosub}
            </motion.h1>
            
            <motion.p 
              className="text-white/90 mt-6 text-lg md:text-xl max-w-5xl leading-relaxed"
              variants={itemVariants}
            >
              {t.heroDescription || "Empowering your financial journey with secure, smart, and seamless digital solutions."}
            </motion.p>
            
            <motion.div 
              className="mt-8 flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Link
                href="#cta"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-black bg-white hover:bg-gray-100 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t.getStarted || "Get Started"}
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white border border-white hover:bg-white/10 rounded-lg transition-all duration-300 transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t.learnMore || "Learn More"}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}