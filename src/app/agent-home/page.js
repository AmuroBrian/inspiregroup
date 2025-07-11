"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/TranslationContext";
import { motion } from "framer-motion";

// Constants (remain the same)
const IMAGES = [
  {
    src: "/images/commision.png",
    link: "/docs/Commission.pdf",
    name: "Commission",
    ariaLabel: "Commission document",
  },
  {
    src: "/images/FinancialProductN.png",
    link: "/docs/FinancialProductsNew.pdf",
    name: "Financial Product",
    ariaLabel: "Financial Product document",
  },
  {
    src: "/images/PrivateBankerNewP.png",
    link: "/docs/PrivateBankerNew.pdf",
    name: "Private Banker",
    ariaLabel: "Private Banker document",
  },
  {
    src: "/images/TravelProtectionC.png",
    link: "/docs/TravelProtectionNew.pdf",
    name: "Travel Protection",
    ariaLabel: "Travel Protection document",
  },
];

const PDF_FILES = [
  {
    name: "Commission.pdf",
    link: "/docs/Commission.pdf",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-blue-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    name: "Financial Products.pdf",
    link: "/docs/FinancialProductsNew.pdf",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-blue-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
      </svg>
    ),
  },
  {
    name: "Private Banker.pdf",
    link: "/docs/PrivateBankerNew.pdf",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-blue-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    name: "Travel Protection.pdf",
    link: "/docs/TravelProtectionNew.pdf",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-blue-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

const MIN_SWIPE_DISTANCE = 50;
const CAROUSEL_ITEM_WIDTH_DESKTOP = 500;
const CAROUSEL_ITEM_HEIGHT_DESKTOP = 350;
const CAROUSEL_ITEM_WIDTH_MOBILE = 300;
const CAROUSEEL_ITEM_HEIGHT_MOBILE = 200;
const ASPECT_RATIO_DESKTOP = CAROUSEL_ITEM_WIDTH_DESKTOP / CAROUSEL_ITEM_HEIGHT_DESKTOP;
const ASPECT_RATIO_MOBILE = CAROUSEL_ITEM_WIDTH_MOBILE / CAROUSEEL_ITEM_HEIGHT_MOBILE;

export default function CompanyInfo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [dimensions, setDimensions] = useState({
    width: CAROUSEL_ITEM_WIDTH_DESKTOP,
    height: CAROUSEL_ITEM_HEIGHT_DESKTOP,
  });
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isPDFUnderlineVisible, setIsPDFUnderlineVisible] = useState(false);
  const carouselRef = useRef(null);
  const router = useRouter();
  const { t } = useTranslation();
  const autoSlideIntervalRef = useRef(null);
  const [loggedInUserName, setLoggedInUserName] = useState("");

  // Calculate responsive dimensions (remains the same)
  const calculateDimensions = useCallback(() => {
    if (typeof window === "undefined")
      return {
        width: CAROUSEL_ITEM_WIDTH_DESKTOP,
        height: CAROUSEL_ITEM_HEIGHT_DESKTOP,
      };

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      const maxWidth = Math.min(window.innerWidth * 0.9, CAROUSEL_ITEM_WIDTH_MOBILE);
      const height = maxWidth / ASPECT_RATIO_MOBILE;
      return { width: maxWidth, height };
    } else {
      const maxWidth = Math.min(window.innerWidth * 0.7, CAROUSEL_ITEM_WIDTH_DESKTOP);
      const height = maxWidth / ASPECT_RATIO_DESKTOP;
      return { width: maxWidth, height };
    }
  }, []);

  // ************ FIX STARTS HERE ************

  // resetAutoSlide MUST be defined before handlePrev, handleNext, goToSlide
  const resetAutoSlide = useCallback(() => {
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current);
    }
    // We pass handleNext directly here as it's defined below,
    // but useCallback ensures stable reference.
    autoSlideIntervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
  }, [IMAGES.length]); // Depend on IMAGES.length for safety, though it's constant

  // Memoized navigation handlers
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
    resetAutoSlide(); // Now resetAutoSlide is defined
  }, [IMAGES.length, resetAutoSlide]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    resetAutoSlide(); // Now resetAutoSlide is defined
  }, [IMAGES.length, resetAutoSlide]);

  const goToSlide = useCallback(
    (index) => {
      setCurrentIndex(index);
      resetAutoSlide(); // Now resetAutoSlide is defined
    },
    [resetAutoSlide]
  );

  // ************ FIX ENDS HERE ************


  useEffect(() => {
    setIsClient(true);
    setWindowWidth(window.innerWidth);
    setDimensions(calculateDimensions());

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setDimensions(calculateDimensions());
    };

    window.addEventListener("resize", handleResize);

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUserName = localStorage.getItem("loggedInUserName");

    if (!isLoggedIn) {
      router.push("/");
    } else {
      setLoggedInUserName(storedUserName || "Agent");
    }

    // Initialize auto-slide after all functions are defined
    resetAutoSlide();

    setTimeout(() => setIsTitleVisible(true), 300);
    setTimeout(() => setIsPDFUnderlineVisible(true), 600);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (autoSlideIntervalRef.current) {
        clearInterval(autoSlideIntervalRef.current);
      }
    };
  }, [router, resetAutoSlide, calculateDimensions]); // Add router to dependency array

  // Touch handlers for mobile (remain the same)
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > MIN_SWIPE_DISTANCE) {
      handleNext();
    }
    if (touchStart - touchEnd < -MIN_SWIPE_DISTANCE) {
      handlePrev();
    }
  };

  // Mouse handlers for desktop (remain the same)
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX;
    const diff = startX - x;
    if (diff > MIN_SWIPE_DISTANCE) handleNext();
    if (diff < -MIN_SWIPE_DISTANCE) handlePrev();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Calculate carousel item transforms (remain the same)
  const getItemTransform = (position, isMobile) => {
    const adjustedPosition =
      position > IMAGES.length / 2 ? position - IMAGES.length : position;
    const absPosition = Math.abs(adjustedPosition);
    const direction = adjustedPosition > 0 ? 1 : -1;

    if (adjustedPosition === 0) {
      return {
        transform: "translateZ(0)",
        zIndex: 10,
        scale: 1,
        opacity: 1,
      };
    }

    const translateX = isMobile ? 30 * direction : 50 * direction;
    const translateZ = isMobile ? -50 * absPosition : -100 * absPosition;
    const rotateY = isMobile ? 15 * -direction : 30 * -direction;

    return {
      transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
      zIndex: 10 - absPosition,
      opacity: 1 - absPosition * 0.3,
      scale: isMobile ? 0.9 : 0.8,
    };
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 mt-20 relative">
      {/* Welcome Message */}
      <div className="w-full flex justify-center mb-8">
        <div className="relative flex items-center gap-4 px-10 py-5 rounded-2xl shadow-2xl border border-blue-200 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 animate-fade-in">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/30 shadow-md">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3zm0 2c-2.67 0-8 1.337-8 4v2a1 1 0 001 1h14a1 1 0 001-1v-2c0-2.663-5.33-4-8-4z"
              />
            </svg>
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-lg tracking-wide">
            {/* Dynamic Welcome Message */}
            {loggedInUserName ? (
              `${t.welcome || "Welcome"}, ${loggedInUserName}!`
            ) : (
              t.welcomeInspireAgent || "Welcome Inspire Agent"
            )}
          </span>
        </div>
      </div>
      {/* Header Section with animated underline */}
      <header className="text-center mb-8 sm:mb-12 max-w-4xl px-4 relative flex flex-col items-center">
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col items-center w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                {t.agentHomeTitle || "Company Information"}
              </span>
            </h1>
            <div className="relative flex justify-center w-full">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isTitleVisible ? { scaleX: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.3,
                }}
                className="h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                style={{ width: "70%", originX: 0 }}
              />
            </div>
          </div>
        </div>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mt-8 text-center">
          {t.agentHomeSubtitle || "Access your business resources and documents below."}
        </p>
      </header>
      {/* 3D Carousel Section */}
      <section
        className="relative w-full max-w-6xl mb-12 sm:mb-16 perspective-1000"
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        aria-label="Document carousel"
        style={{
          height: `${dimensions.height + 60}px`,
        }}
      >
        <div className="relative w-full h-full transform-style-preserve-3d transition-transform duration-700">
          {IMAGES.map((image, index) => {
            const position = (index - currentIndex + IMAGES.length) % IMAGES.length;
            const isMobile = windowWidth < 768;
            const { transform, zIndex, opacity, scale } = getItemTransform(
              position,
              isMobile
            );

            return (
              <a
                key={index}
                href={image.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute left-1/2 top-1/2 transition-all duration-700 ${
                  index === currentIndex ? "cursor-default" : "cursor-pointer"
                }`}
                style={{
                  width: `${dimensions.width}px`,
                  height: `${dimensions.height}px`,
                  transform: `translate(-50%, -50%) ${transform} scale(${scale})`,
                  zIndex,
                  opacity,
                  filter: index === currentIndex ? "none" : "brightness(0.8)",
                }}
                aria-label={image.ariaLabel}
              >
                <Image
                  src={image.src}
                  alt={image.name || "Document image"}
                  fill
                  priority={index === currentIndex}
                  className="object-cover rounded-xl shadow-xl"
                  sizes={`(max-width: 768px) ${dimensions.width}px, ${dimensions.width}px`}
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg">
                    <span className="text-blue-800 font-semibold text-sm sm:text-lg flex items-center">
                      {t.view || "View"} {image.name}
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
        {/* Carousel Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="hidden sm:block absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-blue-800 p-2 sm:p-3 rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Previous slide"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="hidden sm:block absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-blue-800 p-2 sm:p-3 rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Next slide"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {/* Indicators */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-blue-600 w-4 sm:w-6" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === currentIndex}
            />
          ))}
        </div>
      </section>
      {/* PDF List Section */}
      <section className="w-full max-w-6xl px-4 mb-12">
        <div className="text-center mb-8 sm:mb-10">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 relative z-10">
              {t.agentHomeAvailablePDFs || "Available Documents"}
            </h2>
            <div className="relative flex justify-center w-full">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isPDFUnderlineVisible ? { scaleX: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.3,
                }}
                className="h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                style={{
                  width: "160px",
                  maxWidth: "100%",
                  originX: 0,
                  marginTop: "0.25rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                }}
              />
            </div>
          </div>
          <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base max-w-2xl mx-auto">
            {t.agentHomePDFDescription || "Explore our comprehensive library of documents and resources."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PDF_FILES.map((pdf, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 group"
            >
              <div className="p-4 sm:p-6">
                <div className="bg-blue-50 p-3 sm:p-4 rounded-xl inline-flex mb-4 sm:mb-5 group-hover:bg-blue-100 transition-colors">
                  {pdf.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
                  {pdf.name.replace(".pdf", "")}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">
                  {t.pdfDocument || "PDF Document"}
                </p>
                <a
                  href={pdf.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  aria-label={`View ${pdf.name}`}
                >
                  {t.viewDocument || "View Document"}
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}