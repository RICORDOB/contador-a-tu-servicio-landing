import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AutomationSection from "@/components/sections/AutomationSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import ToolsSection from "@/components/sections/ToolsSection";
import StatsSection from "@/components/sections/StatsSection";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AutomationSection />
      <HowItWorksSection />
      <StatsSection />
      <ToolsSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}