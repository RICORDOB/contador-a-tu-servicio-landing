import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AutomationSection from "@/components/sections/AutomationSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import ToolsSection from "@/components/sections/ToolsSection";
import CalculatorSection from "@/components/sections/CalculatorSection";
import ExoRentaSection from "@/components/sections/ExoRentaSection";
import StatsSection from "@/components/sections/StatsSection";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import SectionTabBar from "@/components/layout/SectionTabBar";
import SectionsViewport from "@/components/layout/SectionsViewport";
import type { SectionId } from "@/lib/section-nav";

const sections: Record<SectionId, React.ReactNode> = {
  inicio: (
    <>
      <HeroSection />
      <StatsSection />
    </>
  ),
  servicios: <ServicesSection />,
  automatizacion: <AutomationSection />,
  proceso: <HowItWorksSection />,
  herramientas: <ToolsSection />,
  calculadora: <CalculatorSection />,
  exorenta: <ExoRentaSection />,
  nosotros: (
    <>
      <AboutSection />
      <TestimonialsSection />
    </>
  ),
  contacto: <ContactSection />,
};

export default function Home() {
  return (
    <div className="bg-animated-gradient landing-backdrop relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_0)] [background-size:44px_44px]"
      />
      <div className="relative">
        <SectionTabBar />
        <SectionsViewport sections={sections} />
      </div>
    </div>
  );
}