"use client";

import React from "react";

export default function WelcomeToHol() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-white px-4">
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
        
        {/* Company Info Section - Appears on top for mobile */}
        <div className="flex flex-col justify-center text-black md:order-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-4 text-center md:text-left">
            Welcome to Inspire Group
          </h2>
          <p className="text-md md:text-lg leading-relaxed text-center md:text-left text-justify">
            At Inspire Group, we are dedicated to providing innovative solutions that drive growth and success. 
            Our team is committed to delivering excellence in every project, ensuring that our clients achieve 
            their business goals with confidence. With a focus on integrity, innovation, and collaboration, 
            we are shaping the future together.
          </p>
        </div>

        {/* Video Section - Appears below on mobile */}
        <div className="w-full border-b-4 border-black pb-5 md:order-2 mt-2">
          <video
            src="/videos/CP updated 0221.mp4"
            autoPlay
            loop
            controls
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

      </div>
    </div>
  );
}
