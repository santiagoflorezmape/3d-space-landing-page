import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MarqueeSection } from "@/components/MarqueeSection";
import { ProblemSection } from "@/components/ProblemSection";
import { ProcessSection } from "@/components/ProcessSection";
import { DeliverSection } from "@/components/DeliverSection";
import { ProofSection } from "@/components/ProofSection";
import { FitSection } from "@/components/FitSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { OrbitalBackground } from "@/components/OrbitalBackground";

export default function Home() {
  return (
    <>
      <OrbitalBackground />
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeSection />
        <ProblemSection />
        <ProcessSection />
        <DeliverSection />
        <ProofSection />
        <FitSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
