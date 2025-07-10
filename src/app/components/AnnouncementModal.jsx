"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false); // Track if component mounted

  useEffect(() => {
    setHasMounted(true); // Prevent SSR mismatch
    setIsOpen(true); // Open modal when the component mounts
  }, []);

  if (!hasMounted) return null; // Avoid hydration mismatch

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4"> {/* Increased opacity, added padding */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} // Initial state: slightly smaller and invisible
          animate={{ opacity: 1, scale: 1 }} // Animates to full size and visible
          exit={{ opacity: 0, scale: 0.8 }} // Exit animation: fades out and shrinks
          transition={{ duration: 0.3, ease: "easeOut" }} // Smooth transition
          className="relative bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md mx-auto border-4 border-blue-200/50 overflow-hidden" // Enhanced styling
        >
          {/* Decorative Shapes inside the modal */}
          <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-blue-400 opacity-10 blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-purple-400 opacity-10 blur-xl"></div>

          <h2 className="text-2xl font-extrabold text-gray-900 mb-4 text-center"> {/* Larger, bolder title */}
            Important Notice: Disclosure Guidelines
            <span className="block w-16 h-1 bg-blue-600 rounded-full mx-auto mt-2"></span> {/* Underline for title */}
          </h2>
          <p className="mt-4 text-base text-gray-700 leading-relaxed text-center"> {/* Adjusted text size and color */}
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
            whileHover={{ scale: 1.02 }} // Slight scale on hover
            whileTap={{ scale: 0.98 }} // Slight scale on tap
          >
            OK
          </motion.button>
        </motion.div>
      </div>
    )
  );
}
