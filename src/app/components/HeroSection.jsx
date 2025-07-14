"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTranslation } from "@/TranslationContext";
import { motion, useAnimation, useInView } from "framer-motion";

function TypingAnimation({
  text,
  inView,
  speed = 30,
  className = "",
  cursorColor = "white",
  cursorBlinkSpeed = 0.7,
  randomizeSpeed = false,
  onTypingComplete,
}) {
  const [displayed, setDisplayed] = useState("");
  const index = useRef(0);
  const timeoutRef = useRef(null);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const getTypingSpeed = () => {
    return randomizeSpeed
      ? speed + (Math.random() * 20 - 10)
      : speed;
  };

  const type = useCallback(() => {
    if (index.current < text.length) {
      setDisplayed(text.substring(0, index.current + 1));
      index.current++;
      timeoutRef.current = setTimeout(type, getTypingSpeed());
    } else {
      setIsTypingComplete(true);
      onTypingComplete?.();
    }
  }, [text, speed, randomizeSpeed, onTypingComplete]);

  const startTyping = useCallback(() => {
    clearTimeout(timeoutRef.current);
    index.current = 0;
    setIsTypingComplete(false);

    if (text.length > 0) {
      setDisplayed(text.charAt(0));
      index.current = 1;
      timeoutRef.current = setTimeout(type, getTypingSpeed());
    } else {
      setDisplayed("");
      setIsTypingComplete(true);
    }
  }, [text, type]);

  useEffect(() => {
    if (inView) {
      startTyping();
    } else {
      clearTimeout(timeoutRef.current);
      setDisplayed("");
      index.current = 0;
      setIsTypingComplete(false);
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [inView, startTyping]);

  return (
    <span className={`relative ${className}`}>
      {displayed}
      {inView && !isTypingComplete && (
        <span
          className="inline-block w-[2px] h-5 ml-0.5 align-middle"
          style={{
            backgroundColor: cursorColor,
            animation: `pulse ${cursorBlinkSpeed}s infinite`,
          }}
        />
      )}
    </span>
  );
}

export default function HeroSection() {
  const { t } = useTranslation();
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [controls, isInView]);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      ref={ref}
    >
      <motion.video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <source src="/videos/herovideo.webm" type="video/webm" />
        <source src="/videos/herovideo.mp4" type="video/mp4" />
      </motion.video>

      <motion.div
        className="absolute inset-0 bg-black/5 flex items-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="w-full px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h1
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 text-left [text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)] font-sans"
            variants={itemVariants}
          >
            <TypingAnimation
              text={t.herosub || "Welcome to Inspire Holdings Group – A legacy of strong trust and proven excellence. This is where your future moves to the next level."}
              inView={isInView}
              speed={60}
              className="inline"
              cursorColor="#ffffff"
              cursorBlinkSpeed={0.5}
              randomizeSpeed={false}
            />
          </motion.h1>

          <motion.p
            className="text-white text-base sm:text-lg md:text-xl mb-10 leading-relaxed min-h-[72px] text-left max-w-4xl [text-shadow:_0_1px_3px_rgb(0_0_0_/_50%)] font-sans font-light"
            variants={itemVariants}
          >
            <TypingAnimation
              text={t.heroDescription || "Empowering your financial journey with secure, smart solutions."}
              inView={isInView}
              speed={95}
              cursorColor="#ffffff"
              randomizeSpeed={false}
            />
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 md:gap-6"
            variants={itemVariants}
          >
            {/* Primary 3D Gradient Button */}
            <motion.a
              href="#welcome-to-hol"
              className="group relative px-8 py-4 text-base sm:text-lg font-medium text-white bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl transition-all duration-300 w-fit shadow-2xl hover:shadow-3xl overflow-hidden font-sans"
              whileHover={{ 
                y: -4,
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ 
                scale: 0.98,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)"
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {t.getStarted || "Learn More"}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="absolute inset-0 bg-blue-700 rounded-xl transform translate-z-[-4px] group-hover:translate-z-[-6px] transition-transform duration-300"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.a>

            {/* Secondary Glass Morphism Button */}
            <motion.a
              href="#IW"
              className="group relative px-8 py-4 text-base sm:text-lg font-medium text-white backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl transition-all duration-300 w-fit shadow-lg hover:shadow-xl overflow-hidden font-sans"
              whileHover={{ 
                y: -4,
                scale: 1.02,
                backgroundColor: "rgba(255, 255, 255, 0.15)"
              }}
              whileTap={{ 
                scale: 0.98,
                backgroundColor: "rgba(255, 255, 255, 0.05)"
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {t.learnMore || "Get Started"}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-all duration-300"></span>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}