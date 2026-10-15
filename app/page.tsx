import { Hero } from "@/components/sections/hero";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { IndustriesSection } from "@/components/sections/industries-section";
import { ValuesSection } from "@/components/sections/values-section";
import { StatsSection } from "@/components/sections/stats-section";
import { WhyNorvaneSection } from "@/components/sections/why-norvane-section";
import { PartnersSection } from "@/components/sections/partners-section";
import { CredibilityBand } from "@/components/sections/credibility-band";
import { CtaSection } from "@/components/sections/cta-section";
import { OverlapSection } from "@/components/sections/overlap-section";
import { TravelingSceneMount } from "@/components/three/traveling-scene-mount";

export default function HomePage() {
  return (
    <>
      <TravelingSceneMount />
      <Hero />
      <LogoMarquee />
      <IndustriesSection />
      <ValuesSection />
      <OverlapSection>
        <StatsSection />
      </OverlapSection>
      <WhyNorvaneSection />
      <PartnersSection />
      <CredibilityBand />
      <OverlapSection>
        <CtaSection />
      </OverlapSection>
    </>
  );
}
