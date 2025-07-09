"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/TranslationContext";

const images = [
  { src: "/images/commision.jpg", link: "/docs/Commission.pdf", name: "Commission" },
  { src: "/images/microinvesment.jpg", link: "/docs/Micro-Investment.pdf", name: "Micro Investment" },
];

const pdfFiles = [
  { name: "Commission.pdf", link: "/docs/Commission.pdf" },
  { name: "MicroInvestment.pdf", link: "/docs/Micro-Investment.pdf" },
  { name: "PrivateBanker.pdf", link: "/docs/PrivateBanker.pdf" },
  { name: "Travel.jpg", link: "/docs/travel.pdf" },
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
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) return null; // Prevents hydration mismatch issues

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center">
      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 px-4 py-2 bg-white text-blue-700 font-semibold rounded-full shadow-md hover:bg-blue-50 hover:text-blue-900 border border-blue-200 transition flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back
      </button>
      {/* Title */}
      <div className="w-full h-[80px]"></div>
      <h2 className="text-blue-900 text-4xl font-extrabold mb-2 tracking-tight drop-shadow">{t.agentHomeTitle}</h2>
      <p className="text-blue-700 text-lg mb-8">{t.agentHomeSubtitle}</p>

      {/* Centered Image Wrapper with Carousel Indicator */}
      <div className="relative w-[80%] h-[60vh] flex items-center justify-center mb-6">
        {images.map((image, index) => (
          <a
            key={index}
            href={image.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute w-full h-full flex items-center justify-center"
          >
            <Image
              src={image.src}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="contain"
              priority={index === 0}
              className={`absolute transition-opacity duration-1000 ease-in-out rounded-2xl shadow-xl border-2 border-blue-100 ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            />
          </a>
        ))}
        {/* Carousel Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-300 border border-blue-300 ${idx === currentIndex ? "bg-blue-500" : "bg-blue-200"}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Text */}
      <p className="relative text-blue-800 text-base font-semibold animate-bounce z-20 bg-white bg-opacity-70 rounded px-4 py-2 shadow mb-8">
        {t.agentHomeClickImage}
      </p>

      {/* PDF List as Cards */}
      <h3 className="text-blue-900 text-2xl font-bold mb-4">{t.agentHomeAvailablePDFs}</h3>
      <div className="mt-4 w-full max-w-2xl grid grid-cols-1 mb-5 md:grid-cols-2 gap-6">
        {pdfFiles.map((pdf, index) => (
          <a
            key={index}
            href={pdf.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center border-2 border-blue-100 rounded-2xl p-6 bg-white shadow hover:shadow-lg hover:bg-blue-50 transition group"
          >
            <svg className="w-10 h-10 mb-3 text-blue-500 group-hover:text-blue-700 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            <span className="text-lg font-semibold text-blue-800 group-hover:text-blue-900 transition text-center">{pdf.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
 