"use client";
import { useEffect } from "react";
import HeroSection from "./components/HeroSection";
import ProjectCards from "./components/ProjectCards";
import EmailSection from "./components/EmailSection";
import WelcomeToHol from "./components/WelcomeToHol";
import CompanyInfo from "./components/CompanyInfo";
import RSS from "./components/RSS";
import InspireWalletIntro from "./components/InspireWalletIntro";
import AnnouncementModal from "./components/AnnouncementModal";

export default function Home() {
  // 👇 Scroll to projectcards after redirect
  useEffect(() => {
    const scrollFlag = localStorage.getItem("scrollToProjectCards");
    if (scrollFlag) {
      localStorage.removeItem("scrollToProjectCards");
      const el = document.getElementById("projectcards");
      if (el) {
        const yOffset = 80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }

  }, []);

  
  

  return (
    <div>
      <AnnouncementModal />
      <HeroSection />
      <InspireWalletIntro />
      <WelcomeToHol />

      {/* 👇 This is the section we scroll to */}
      <section id="projectcards">
        <ProjectCards />
      </section>

      <CompanyInfo />
      <EmailSection />
      <RSS />
    </div>
  );
}
