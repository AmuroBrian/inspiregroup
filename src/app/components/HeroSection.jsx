import React from "react";

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <video
        className="top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Inspire Group
      </video>
    </div>
  );
}
