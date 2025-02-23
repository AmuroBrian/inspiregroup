import React from "react";

export default function HeroSection() {
  return (
    <div
      id="hero-section"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
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
        <h1 className="text-white text-2xl sm:text-4xl md:text-4xl font-bold text-center">
          Welcome to Inspire Holdings Group – A legacy of strong trust and
          proven excellence. This is where your future moves to the next level.
        </h1>
      </div>
    </div>
  );
}
