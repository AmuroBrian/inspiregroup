import React from "react";

export default function HeroSection() {
  return (
    <div id="hero-section" className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <video
        className="top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/herovideo.mp4" type="video/mp4" />
        Inspire Group
      </video>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <h1 className="text-white text-4xl sm:text-6xl md:text-6xl font-bold text-center">
          Welcome to Inspire Holdings Incorporated
        </h1>
      </div>
    </div>
  );
}
