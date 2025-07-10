"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/TranslationContext"; // Assuming this path is correct

const images = [
  { src: "/images/commision.jpg", link: "/docs/Commission.pdf", name: "Commission" },
  { src: "/images/microinvesment.jpg", link: "/docs/Micro-Investment.pdf", name: "Micro Investment" },
];

const pdfFiles = [
  { name: "Commission.pdf", link: "/docs/Commission.pdf" },
  { name: "MicroInvestment.pdf", link: "/docs/Micro-Investment.pdf" },
  { name: "PrivateBanker.pdf", link: "/docs/PrivateBanker.pdf" },
  { name: "Travel.pdf", link: "/docs/travel.pdf" }, // Changed to .pdf for consistency
];

export default function CompanyInfo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    setIsClient(true);

    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/"); // Redirect to homepage or login page
    }
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Reduced interval to 5 seconds for quicker demo

    return () => clearInterval(interval);
  }, []);

  if (!isClient) return null; // Prevents hydration mismatch issues

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 flex items-center gap-2 px-5 py-2 bg-white text-blue-700 font-semibold rounded-full shadow-lg hover:bg-blue-100 hover:text-blue-900 transition-all duration-300 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label="Go back to home"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      {/* Header Section */}
      <header className="text-center mb-10 mt-16">
        <h1 className="text-blue-900 text-5xl font-extrabold mb-3 tracking-tight drop-shadow-md">
          {t.agentHomeTitle || "Company Information"}
        </h1>
        <p className="text-blue-700 text-xl max-w-2xl mx-auto">
          {t.agentHomeSubtitle || "Explore our key documents and investment opportunities."}
        </p>
      </header>

      {/* Carousel Section */}
      <section className="relative w-full max-w-4xl h-[60vh] rounded-3xl shadow-2xl overflow-hidden mb-12 border-4 border-blue-200">
        {images.map((image, index) => (
          <a
            key={index}
            href={image.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            aria-label={`View ${image.name} document`}
          >
            <Image
              src={image.src}
              alt={image.name || "Document image"}
              layout="fill"
              objectFit="cover" // Changed to cover for better filling
              priority={index === 0}
              className="w-full h-full object-cover" // Ensure image fills the container
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-2xl font-bold p-4 rounded-lg bg-blue-700 bg-opacity-75">
                View {image.name}
              </span>
            </div>
          </a>
        ))}

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 border-2 border-white ${
                idx === currentIndex ? "bg-blue-500 w-4 h-4" : "bg-white opacity-70"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
      </div>

        {/* Call to Action for Carousel */}
        <p className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white text-lg font-semibold bg-blue-700 bg-opacity-75 rounded-full px-6 py-3 shadow-lg animate-pulse z-20">
          {t.agentHomeClickImage || "Click image to learn more!"}
        </p>
      </section>

      {/* PDF List Section */}
      <section className="w-full max-w-4xl text-center">
        <h2 className="text-blue-900 text-3xl font-bold mb-6">
          {t.agentHomeAvailablePDFs || "Available Documents"}
        </h2>
        <div className="flex flex-row gap-6 w-full justify-center flex-wrap">
        {pdfFiles.map((pdf, index) => (
          <a
            key={index}
            href={pdf.link}
            target="_blank"
            rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 group border-2 border-blue-100 hover:border-blue-300 min-w-[180px] max-w-xs flex-1"
              aria-label={`Download ${pdf.name}`}
            >
              <div className="bg-blue-100 p-4 rounded-full mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                <svg className="w-10 h-10 text-blue-600 group-hover:text-blue-800 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <span className="text-xl font-semibold text-blue-800 group-hover:text-blue-900 text-center leading-tight">
                {pdf.name.replace(".pdf", "")}
              </span>
              <span className="text-sm text-gray-500 mt-1">Click to view PDF</span>
          </a>
        ))}
      </div>
      </section>
    </div>
  );
}