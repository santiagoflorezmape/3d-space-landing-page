import { SpaceBackground } from "@/components/SpaceBackground";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MarqueeSection } from "@/components/MarqueeSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SpaceBackground />
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </>
  );
}
