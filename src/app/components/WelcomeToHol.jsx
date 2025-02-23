"use client";

import React from "react";

export default function WelcomeToHol() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-white px-4 flex-col">
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Company Info Section */}
        <div className="flex flex-col justify-center text-black md:order-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-4 text-center md:text-left">
            Welcome to Inspire Holdings Group
          </h2>
          <p className="text-md md:text-lg leading-relaxed text-center md:text-left">
            At Inspire Group, we are dedicated to providing innovative solutions
            that drive growth and success. Our team is committed to delivering
            excellence in every project, ensuring that our clients achieve their
            business goals with confidence. With a focus on integrity,
            innovation, and collaboration, we are shaping the future together.
          </p>
        </div>

        {/* Video Section */}
        <div className="w-full border-b-4 border-black pb-5 md:order-2 mt-2">
          <video
            src="/videos/Col.mp4"
            autoPlay
            loop
            controls
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="text-center p-7 text-xl">
        <span className="font-bold">
          For Foreign Entrepreneurs and Investors
        </span>{" "}
        – A World-Class Private Banking Experience At Inspire Group, we provide
        an exclusive network of elite private bankers dedicated to serving
        global entrepreneurs and investors. With strong connections to
        government authorities, major conglomerates, and key administrative
        bodies, we continue to grow as one of the most influential trading firms
        in the Philippines. Our unwavering trust and proven track record enable
        us to achieve what others deem impossible, offering exclusive business
        opportunities that go beyond conventional boundaries. At Inspire, we
        don’t just navigate the future—we transform your vision into a lasting
        legacy of success.
      </div>
    </div>
  );
}
