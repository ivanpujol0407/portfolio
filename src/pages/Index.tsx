import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Ticker from "@/components/Ticker";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ToolsSection from "@/components/ToolsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const { hash } = useLocation();

  // Arriving from a project page via /#work, /#about, ...
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 80);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <div className="min-h-screen bg-background">
      <Ticker />
      <Navbar overlay />
      <main>
        <HeroSection />
        <IntroSection />
        <ProjectsSection />
        <SkillsSection />
        <ToolsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
