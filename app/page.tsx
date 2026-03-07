import { CtaSection } from "@/components/home/cta-section";
import { FloatingDockSection } from "@/components/home/floating-dock-section";
import { HeroSection } from "@/components/home/hero-section";
import { OurWorkHomeSection } from "@/components/home/our-work-home-section";
import { SectionSpacer } from "@/components/home/section-spacer";
import { WorksGallerySection } from "@/components/home/works-gallery-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      <SectionSpacer title="Our Work" />
      <OurWorkHomeSection />

      <SectionSpacer title="Creative Process" />
      <CtaSection />

      <SectionSpacer title="Gallery" />
      <WorksGallerySection />

      <SectionSpacer title="Quick Links" />
      <FloatingDockSection />
    </main>
  );
}
