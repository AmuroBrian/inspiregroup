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
