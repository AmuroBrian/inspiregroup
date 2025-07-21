"use client";

import Link from "next/link";
import { Rocket, Home, Satellite, Globe, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Predefined star positions to avoid hydration mismatch
const STAR_POSITIONS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  width: Math.random() * 3 + 1,
  height: Math.random() * 3 + 1,
  opacity: Math.random() * 0.5 + 0.1,
}));

export default function Custom404() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-6 relative overflow-hidden">
      {/* Animated space background - only render on client */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden">
          {STAR_POSITIONS.map((star) => (
            <motion.div
              key={star.id}
              className="absolute bg-white rounded-full"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.width}px`,
                height: `${star.height}px`,
                opacity: star.opacity,
              }}
              animate={{
                y: [0, -50],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* Floating planets */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-purple-900 to-blue-900 shadow-lg shadow-purple-900/50"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-12 h-12 rounded-full bg-gradient-to-br from-orange-900 to-red-900 shadow-lg shadow-orange-900/50"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Animated rocket */}
        <motion.div
          className="mb-8"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Rocket className="w-24 h-24 text-yellow-400 drop-shadow-[0_0_15px_rgba(255,196,0,0.7)]" />
        </motion.div>

        {/* Glowing 404 text */}
        <div className="relative">
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 mb-4">
            404
          </h1>
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-red-600 rounded-full blur-2xl opacity-20 -z-10"></div>
        </div>

        {/* Error message */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mt-4">
          Lost in Space?
        </h2>
        <p className="text-lg text-gray-400 mt-2">
          The page you're looking for has drifted out of orbit.
        </p>

        {/* Glassmorphism navigation card */}
        <motion.div
          className="mt-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 w-full max-w-md shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Satellite className="w-6 h-6 text-blue-400" />
            <h3 className="font-medium text-gray-200">Navigation Options</h3>
          </div>

          <div className="space-y-3">
            <a href="https://inspireholdings.ph/" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600/80 to-blue-800/80 rounded-lg hover:from-blue-500/80 hover:to-blue-700/80 transition-all"
              >
                <span className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Return to Home
                </span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </a>

            <a href="https://inspire-alliance.com/" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-700/50 transition-all"
              >
                <span className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-teal-400" />
                  Explore Our Galaxy
                </span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|static|favicon.ico|robots.txt).*)'],
};