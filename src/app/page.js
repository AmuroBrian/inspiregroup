"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import HeroSection from "./components/HeroSection";
import ProjectCards from "./components/ProjectCards";
import EmailSection from "./components/EmailSection";
import WelcomeToHol from "./components/WelcomeToHol";
import CompanyInfo from "./components/CompanyInfo";
import RSS from "./components/RSS";
import InspireWalletIntro from "./components/InspireWalletIntro";
import AnnouncementModal from "./components/AnnouncementModal";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    }
  }, []);

  return (
    <>
      {/* Agent Site Button (only if logged in) */}
      {isLoggedIn && (
        <div className="w-full flex justify-center mt-4 mb-6 z-50">
          <a
            href="/agent-home"
            className="inline-block px-6 py-2 bg-blue-600 text-white font-bold rounded-full shadow hover:bg-blue-700 transition text-lg"
          >
            Agent Site
          </a>
        </div>
      )}
      <AnnouncementModal />
      <HeroSection />
       <WelcomeToHol />
      <InspireWalletIntro />
      <ProjectCards />
      <CompanyInfo />

      <EmailSection />
      <RSS />
    </>
  );
}
