"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IPINFO_API_URL}`)
      .then(res => res.json())
      .then(data => {
        if (data.country === "PH") {
          router.replace("/404");
        } else {
          setChecking(false);
        }
      })
      .catch(() => setChecking(false));
  }, [router]);

  if (checking) return null;

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
