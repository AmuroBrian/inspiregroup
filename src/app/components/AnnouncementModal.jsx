"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true); // Open modal when the component mounts
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="bg-white p-6 rounded-2xl shadow-xl w-full m-10 md:w-[80%] text-center"
        >
          <h2 className="text-xl font-bold">
            Important Notice: Disclosure Guidelines
          </h2>
          <p className="mt-2 text-left md:text-center md:p-2">
            For security reasons and to prevent unauthorized use, company
            licenses and financial statements are disclosed only to contracted
            clients and registered agents. Additionally, some information is
            publicly available on the official websites of Inspire Holdings
            Incorporated and Inspire Next Global Inc., so please refer to those
            sources for further details. We appreciate your understanding and
            cooperation in protecting personal and corporate information and
            preventing misuse.
          </p>
          <button
            className="mt-4 w-full bg-blue-700 text-white hover:bg-white hover:border-solid hover:border-2 hover:border-blue-700 hover:text-black p-3 rounded-lg font-bold"
            onClick={closeModal}
          >
            OK
          </button>
        </motion.div>
      </div>
    )
  );
}
