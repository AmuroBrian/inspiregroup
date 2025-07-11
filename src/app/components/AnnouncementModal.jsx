"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    setIsOpen(true);
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  if (!hasMounted) return null;

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md mx-auto border-4 border-blue-200/50 overflow-hidden"
        >
          {/* Decorative Shapes */}
          <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-blue-400 opacity-10 blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-purple-400 opacity-10 blur-xl"></div>

          {/* Title with Modern Underline */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900 relative inline-block">
              Important Notice: Disclosure Guidelines
              {!prefersReducedMotion && (
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ 
                    scaleX: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.3
                    }
                  }}
                  className="absolute -bottom-4 left-0 right-0 mx-auto h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                  style={{ width: '60%' }}
                />
              )}
            </h2>
          </div>

          <p className="mt-4 text-base text-gray-700 leading-relaxed text-center">
            For security reasons and to prevent unauthorized use, company
            licenses and financial statements are disclosed only to contracted
            clients and registered agents. Additionally, some information is
            publicly available on the official websites of Inspire Holdings
            Incorporated and Inspire Next Global Inc., so please refer to those
            sources for further details. We appreciate your understanding and
            cooperation in protecting personal and corporate information and
            preventing misuse.
          </p>

          <motion.button
            className="mt-8 w-full bg-blue-600 text-white py-3 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out
                       hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
            onClick={() => setIsOpen(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            OK
          </motion.button>
        </motion.div>
      </div>
    )
  );
}