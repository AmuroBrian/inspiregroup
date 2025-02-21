"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const images = [
  { src: "/images/commision.jpg", link: "/docs/Commission.pdf", name: "Commission" },
  { src: "/images/microinvesment.jpg", link: "/docs/MicroInvestment.pdf", name: "Micro Investment" },
];

const pdfFiles = [
  { name: "Commission.pdf", link: "/docs/Commission.pdf" },
  { name: "MicroInvestment.pdf", link: "/docs/MicroInvestment.pdf" },
  { name: "PrivateBanker.pdf", link: "/docs/PrivateBanker.pdf" },
  { name: "Travel.jpg", link: "/docs/travel.pdf" },
];

export default function CompanyInfo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

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
    <div className="relative w-full min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Title */}
      <div className="w-full h-[80px]"></div>
      <h2 className="text-black text-3xl font-bold mb-4">Business Lines</h2>

      {/* Centered Image Wrapper */}
      <div className="relative w-[80%] h-[80vh] flex items-center justify-center">
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
              className={`absolute transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            />
          </a>
        ))}
      </div>

      {/* Bottom Text */}
      <p className="relative text-black text-sm font-semibold animate-bounce z-20 bg-gray bg-opacity-50 rounded">
        Click the image to view details
      </p>

      {/* PDF List */}
      <div className="mt-8 w-full flex flex-col items-center">
        <h3 className="text-black text-2xl font-bold mb-4">Available PDFs</h3>
        {pdfFiles.map((pdf, index) => (
          <a
            key={index}
            href={pdf.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[80%] border-2 border-gray-300 rounded-md p-4 mb-2 text-center text-lg font-semibold text-blue-600 hover:bg-gray-100"
          >
            {pdf.name}
          </a>
        ))}
      </div>
    </div>
  );
}
