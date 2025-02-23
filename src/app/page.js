import Image from "next/image";
import HeroSection from "./components/HeroSection";
import ProjectCards from "./components/ProjectCards";
import EmailSection from "./components/EmailSection";
import WelcomeToHol from "./components/WelcomeToHol";
import CompanyInfo from "./components/CompanyInfo";
import RSS from "./components/RSS";
import InspireWalletIntro from "./components/InspireWalletIntro";
import AnnouncementModal from "./components/AnnouncementModal";

export default function Home() {
  return (
    <div>
      <AnnouncementModal />
      <HeroSection />
      <InspireWalletIntro />
      <WelcomeToHol />
      <ProjectCards />
      <CompanyInfo />
      <EmailSection />
      <RSS />
    </div>
  );
}
