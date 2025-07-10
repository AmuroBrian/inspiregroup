// components/HeroSection.jsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/TranslationContext";
import Link from "next/link"; // Link is imported but not used. Consider removing if not needed.
import { motion, useAnimation, useInView } from "framer-motion";

// Typing animation component
function TypingAnimation({ text, inView, speed = 40, className = "" }) {
  const [displayed, setDisplayed] = useState("");
  const index = useRef(0);
  useEffect(() => {
    let timeout;
    if (inView) {
      setDisplayed("");
      index.current = 0;
      const type = () => {
        if (index.current <= text.length) {
          setDisplayed(text.slice(0, index.current));
          index.current++;
          timeout = setTimeout(type, speed);
        }
      };
      type();
    } else {
      setDisplayed("");
      index.current = 0;
    }
    return () => clearTimeout(timeout);
  }, [text, inView, speed]);
  return <span className={className}>{displayed}<span className="animate-pulse">|</span></span>;
}

export default function HeroSection() {
  const { t } = useTranslation();
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

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
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-20 md:py-24 lg:py-0"
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
        aria-label="Background video showing financial concepts"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <source src="/videos/herovideo.webm" type="video/webm" />
        <source src="/videos/herovideo.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </motion.video>

      {/* Overlay with animated content */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 flex items-center justify-center text-center sm:text-left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="max-w-7xl mx-auto">
            <motion.h1
              className="text-white text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight tracking-tight drop-shadow-lg max-w-6xl mx-auto sm:mx-0"
              variants={itemVariants}
            >
              {t.herosub}
            </motion.h1>

            <motion.p
              className="text-white/90 mt-4 sm:mt-6 text-xs sm:text-sm md:text-base max-w-5xl leading-relaxed mx-auto sm:mx-0"
              variants={itemVariants}
            >
              <motion.span
                variants={itemVariants}
                initial="hidden"
                animate={controls}
                style={{ display: 'inline-block' }}
              >
                <TypingAnimation
                  text={t.heroDescription || "Empowering your financial journey with secure, smart, and seamless digital solutions."}
                  inView={isInView}
                />
              </motion.span>
            </motion.p>

            <motion.div
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start"
              variants={itemVariants}
            >
              <motion.a
                href="#welcome-to-hol"
                className="inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 text-base font-semibold text-black bg-white hover:bg-gray-100 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white text-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.getStarted || "Learn More"}
              </motion.a>
              <motion.a
                href="#IW"
                className="inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 text-base font-semibold text-white border border-white hover:bg-white/10 rounded-lg transition-all duration-300 transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white text-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.learnMore || "Get Started"}
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}