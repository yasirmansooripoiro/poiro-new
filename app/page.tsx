import { BentoGrid } from "@/components/bento-grid";
import { CtaSection } from "@/components/home/cta-section";
import GradualBlurMemo from "@/components/home/gradual.blur";
import { HeroSection } from "@/components/home/hero-section";
import { OurWorkHomeSection } from "@/components/home/our-work-home-section";
import { SectionSpacer } from "@/components/home/section-spacer";
import { WorksGallerySection } from "@/components/home/works-gallery-section";

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen overflow-hidden">
        <div className="relative z-10">
          <HeroSection />

          <SectionSpacer title="Our Work" />
          <OurWorkHomeSection />

          <SectionSpacer title="Creative Process" />
          <CtaSection />

          <SectionSpacer title="Gallery" />
          <WorksGallerySection />

          <SectionSpacer title="Quick Links" />
          <BentoGrid />

          <GradualBlurMemo
            target="page"
            position="bottom"
            height="6rem"
            strength={2}
            divCount={10}
            curve="bezier"
            exponential
            opacity={1}
          />
        </div>

        {/* <FloatingDockSection /> */}
      </main>
    </>
  );
}
