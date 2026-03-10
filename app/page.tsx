import { BentoGrid } from "@/components/bento-grid";
import Faq from "@/components/faqs";
import GradientFooter from "@/components/gradient-footer";
import { BriefUploadSection } from "@/components/home/brief-upload-section";
import { CtaSection } from "@/components/home/cta-section";
import { FloatingDockSection } from "@/components/home/floating-dock-section";
import GradualBlurMemo from "@/components/home/gradual.blur";
import { HeroSection } from "@/components/home/hero-section";
import { OurWorkHomeSection } from "@/components/home/our-work-home-section";
import { WorksGallerySection } from "@/components/home/works-gallery-section";
// import { SectionTitle } from "@/components/section-title";
import SvgPath from "@/components/svg-path";

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen overflow-hidden">
        <div className="relative z-10">
          <HeroSection />

          <OurWorkHomeSection />

          <CtaSection />

          <WorksGallerySection />

          <SvgPath />

          <BentoGrid />

          <BriefUploadSection />

          <Faq />

          <GradientFooter />

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

        <FloatingDockSection />
      </main>
    </>
  );
}
