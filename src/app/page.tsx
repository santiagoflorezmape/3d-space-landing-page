import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MarqueeSection } from "@/components/MarqueeSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { FitSection } from "@/components/FitSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { OrbitalBackground } from "@/components/OrbitalBackground";

export default function Home() {
  return (
    <>
      <OrbitalBackground />
      <Navbar />
      <main style={{ position: "relative", zIndex: 2 }}>
        <HeroSection />
        <MarqueeSection />
        <ServicesSection />
        <AboutSection />
        <FitSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
