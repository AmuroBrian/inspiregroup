import Image from "next/image";
import HeroSection from "./components/HeroSection";
import ProjectCards from "./components/ProjectCards";
import EmailSection from "./components/EmailSection";
import RSS from "./components/RSS";


export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProjectCards />
      <EmailSection />
      <RSS/>
    </div>
  );
}
