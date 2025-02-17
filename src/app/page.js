import Image from "next/image";
import HeroSection from "./components/HeroSection";
import ProjectCards from "./components/ProjectCards";
import EmailSection from "./components/EmailSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProjectCards />
      <EmailSection />
    </div>
  );
}
