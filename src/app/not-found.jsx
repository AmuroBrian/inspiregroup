"use client";

import Link from "next/link";
import { Rocket, Home, Satellite, Globe, ArrowRight, Orbit, Telescope, SatelliteDish, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Star data with different types (small, medium, large)
const STAR_DATA = Array.from({ length: 120 }, (_, i) => {
  const size = Math.random();
  return {
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: size > 0.9 ? 3 : size > 0.7 ? 2 : 1,
    opacity: Math.random() * 0.7 + 0.3,
    delay: Math.random() * 10,
    duration: Math.random() * 20 + 10,
    twinkle: Math.random() > 0.5,
  };
});

// Shooting star data
const SHOOTING_STARS = [
  {
    id: 1,
    size: 2,
    startX: "10%",
    startY: "15%",
    endX: "100vw",
    endY: "50vh",
    duration: 2,
    delay: 0,
    repeatDelay: 15
  },
  {
    id: 2,
    size: 1,
    startX: "30%",
    startY: "5%",
    endX: "100vw",
    endY: "80vh",
    duration: 1.5,
    delay: 5,
    repeatDelay: 20
  },
  {
    id: 3,
    size: 3,
    startX: "5%",
    startY: "80%",
    endX: "100vw",
    endY: "10vh",
    duration: 3,
    delay: 8,
    repeatDelay: 25
  },
  {
    id: 4,
    size: 1.5,
    startX: "90%",
    startY: "20%",
    endX: "-100vw",
    endY: "70vh",
    duration: 2.5,
    delay: 12,
    repeatDelay: 18
  },
  {
    id: 5,
    size: 2,
    startX: "80%",
    startY: "90%",
    endX: "-100vw",
    endY: "20vh",
    duration: 1.8,
    delay: 3,
    repeatDelay: 22
  }
];

// Enhanced Planet data with more properties for realistic effects
const PLANETS = [
  {
    id: 1,
    color: "from-purple-900 to-blue-900",
    shadow: "shadow-purple-900/50",
    size: "w-16 h-16",
    position: "top-[15%] left-[15%]",
    ringColor: "border-purple-800/30",
    duration: 40,
    ringWidth: "inset-4",
    ringSize: "w-24 h-24",
    glow: "shadow-[0_0_30px_5px_rgba(109,40,217,0.4)]",
    rotationAxis: [0.2, 1, 0.5],
    cloudPattern: "purple",
    pulse: true
  },
  {
    id: 2,
    color: "from-orange-900 to-red-900",
    shadow: "shadow-orange-900/50",
    size: "w-14 h-14",
    position: "bottom-[20%] right-[20%]",
    ringColor: "border-orange-800/30",
    duration: 30,
    reverse: true,
    ringWidth: "inset-3",
    ringSize: "w-20 h-20",
    glow: "shadow-[0_0_30px_5px_rgba(194,65,12,0.4)]",
    rotationAxis: [0.5, 1, 0.3],
    cloudPattern: "orange",
    pulse: false
  },
  {
    id: 3,
    color: "from-emerald-900 to-teal-900",
    shadow: "shadow-emerald-900/50",
    size: "w-10 h-10",
    position: "top-[25%] right-[10%]",
    ringColor: "border-emerald-800/30",
    duration: 50,
    ringWidth: "inset-2",
    ringSize: "w-16 h-16",
    glow: "shadow-[0_0_20px_3px_rgba(5,150,105,0.3)]",
    rotationAxis: [0.8, 0.2, 0.5],
    cloudPattern: "green",
    pulse: true
  },
  {
    id: 4,
    color: "from-yellow-900 to-amber-900",
    shadow: "shadow-yellow-900/50",
    size: "w-8 h-8",
    position: "bottom-[15%] left-[20%]",
    ringColor: "border-yellow-800/30",
    duration: 45,
    reverse: true,
    ringWidth: "inset-1.5",
    ringSize: "w-12 h-12",
    glow: "shadow-[0_0_20px_3px_rgba(180,83,9,0.3)]",
    rotationAxis: [0.3, 0.7, 1],
    cloudPattern: "yellow",
    pulse: false
  }
];

// Cloud patterns for planets
const CLOUD_PATTERNS = {
  purple: (
    <>
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-700/40 rounded-full"></div>
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-700/30 rounded-full"></div>
      <div className="absolute bottom-1/4 left-1/3 w-4 h-1 bg-purple-700/50 rounded-full"></div>
    </>
  ),
  orange: (
    <>
      <div className="absolute top-1/3 left-1/3 w-3 h-1 bg-orange-700/40 rounded-full"></div>
      <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-orange-700/30 rounded-full"></div>
    </>
  ),
  green: (
    <>
      <div className="absolute top-1/5 left-2/5 w-3 h-3 bg-emerald-700/40 rounded-full"></div>
      <div className="absolute bottom-1/5 right-2/5 w-2 h-2 bg-teal-700/30 rounded-full"></div>
      <div className="absolute top-2/5 left-1/5 w-1 h-3 bg-teal-700/50 rounded-full"></div>
    </>
  ),
  yellow: (
    <>
      <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-amber-700/40 rounded-full"></div>
      <div className="absolute bottom-1/3 right-1/3 w-1 h-3 bg-yellow-700/30 rounded-full"></div>
    </>
  )
};

export default function Custom404() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-6 relative overflow-hidden">
      {/* Space Background */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Stars */}
          {STAR_DATA.map((star) => (
            <motion.div
              key={`star-${star.id}`}
              className={`absolute bg-white rounded-full ${
                star.size === 3 
                  ? "shadow-[0_0_8px_2px_rgba(255,255,255,0.6)]" 
                  : star.size === 2 
                  ? "shadow-[0_0_4px_1px_rgba(255,255,255,0.4)]" 
                  : ""
              }`}
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
              }}
              animate={
                star.twinkle
                  ? {
                      opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
                    }
                  : {}
              }
              transition={{
                duration: star.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: star.delay,
              }}
            />
          ))}

          {/* Shooting stars */}
          {SHOOTING_STARS.map((star) => (
            <motion.div
              key={`shooting-star-${star.id}`}
              className="absolute bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                top: star.startY,
                left: star.startX,
              }}
              animate={{
                x: [0, star.endX],
                y: [0, star.endY],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                repeatDelay: star.repeatDelay,
                ease: "linear",
                delay: star.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Enhanced Planets */}
      {PLANETS.map((planet) => (
        <motion.div
          key={`planet-${planet.id}`}
          className={`absolute ${planet.size} ${planet.position} rounded-full bg-gradient-to-br ${planet.color} shadow-lg ${planet.shadow} ${planet.glow} transition-all duration-1000`}
          animate={{
            rotate: planet.reverse ? -360 : 360,
            scale: planet.pulse ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: planet.duration,
            repeat: Infinity,
            ease: "linear",
            scale: {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'center center',
            rotate: planet.reverse ? -360 : 360,
          }}
        >
          {/* Planet surface with cloud patterns */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {CLOUD_PATTERNS[planet.cloudPattern]}
          </div>
          
          {/* Ring system */}
          <motion.div 
            className={`absolute ${planet.ringWidth} rounded-full border ${planet.ringColor} pointer-events-none`}
            animate={{
              rotate: planet.reverse ? 360 : -360,
            }}
            transition={{
              duration: planet.duration * 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Glow effect */}
          <div className={`absolute ${planet.ringSize} -z-10 rounded-full ${planet.glow}`}></div>
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full">
        {/* Rocket */}
        <motion.div
          className="mb-10"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Rocket className="w-32 h-32 text-yellow-400 drop-shadow-[0_0_25px_rgba(255,196,0,0.9)]" />
        </motion.div>

        {/* Error Display */}
        <div className="relative mb-8">
          <motion.h1
            className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            404
          </motion.h1>
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-red-600 rounded-full blur-2xl opacity-20 -z-10" />
        </div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-100 mb-3">
            Content Not Available in Your Region
          </h2>
          <p className="text-lg text-gray-300 max-w-md mx-auto">
            Our cosmic scanners can't plot a course to this destination.
            It may have drifted into uncharted space or collapsed into a singularity.
          </p>
        </motion.div>

        {/* Navigation Panel */}
        <motion.div
          className="mt-12 bg-gradient-to-br from-gray-900/80 to-gray-950/90 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 w-full max-w-lg shadow-2xl shadow-blue-900/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <SatelliteDish className="w-7 h-7 text-blue-400" />
            </motion.div>
            <h3 className="font-medium text-gray-100 text-xl">Available Destinations</h3>
          </div>

          <div className="space-y-4">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="https://inspireholdings.ph/"
                className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-blue-600/90 to-blue-800/90 rounded-xl hover:from-blue-500/90 hover:to-blue-700/90 transition-all group"
              >
                <span className="flex items-center gap-3">
                  <Home className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span className="font-medium">Return to Command Center</span>
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="https://inspire-alliance.com/"
                className="flex items-center justify-between px-5 py-4 bg-gray-800/70 border border-gray-700 rounded-xl hover:bg-gray-700/70 transition-all group"
              >
                <span className="flex items-center gap-3">
                  <Telescope className="w-5 h-5 text-teal-400 transition-transform group-hover:scale-110" />
                  <span className="font-medium">Explore Alliance Territories</span>
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/"
                className="flex items-center justify-between px-5 py-4 bg-gray-800/70 border border-gray-700 rounded-xl hover:bg-gray-700/70 transition-all group"
              >
                <span className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-purple-400 transition-transform group-hover:scale-110" />
                  <span className="font-medium">Initiate Sector Scan</span>
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|static|favicon.ico|robots.txt).*)'],
};