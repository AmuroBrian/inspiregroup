"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  { src: "/images/travel.jpg", link: "/docs/travel.pdf" },
  { src: "/images/microinvesment.jpg", link: "/docs/Micro-Investment.pdf" },
  { src: "/images/commision.jpg", link: "/docs/Commission-Structure.pdf" },
  { src: "/images/bank.jpg", link: "/docs/PrivateBanker.pdf" },
];

export default function CompanyInfo() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Title */}
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
              objectFit="contain" // Keeps the entire image visible
              priority={index === 0}
              className={`absolute transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          </a>
        ))}
      </div>

      {/* Bottom Text */}
      <p className="absolute bottom-4 text-black text-sm font-semibold animate-bounce z-20 bg-gray bg-opacity-50 rounded">
        Click the image to view details
      </p>
    </div>
  );
}
