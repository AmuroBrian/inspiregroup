import Image from "next/image";
import HeroSection from "./components/HeroSection";
import ProjectCards from "./components/ProjectCards";
import EmailSection from "./components/EmailSection";
import WelcomeToHol from "./components/WelcomeToHol";
import CompanyInfo from "./components/CompanyInfo";
import RSS from "./components/RSS";
import { AgentCodeEntry } from "./components/AgentHubCode/AgentCodeEntry";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <WelcomeToHol />
      <ProjectCards />
      <CompanyInfo />
      <EmailSection />
      <RSS />
    </div>
  );
}
