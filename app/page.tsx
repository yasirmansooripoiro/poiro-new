import { BentoGrid } from "@/components/bento-grid";
import Faq from "@/components/faqs";
import GradientFooter from "@/components/gradient-footer";
import Grainient from "@/components/granient";
import GridDistortion from "@/components/granient";
import { BriefUploadSection } from "@/components/home/brief-upload-section";
import { CtaSection } from "@/components/home/cta-section";
import { FloatingDockSection } from "@/components/home/floating-dock-section";
import GradualBlurMemo from "@/components/home/gradual.blur";
import { HeroSection } from "@/components/home/hero-section";
import { OurWorkHomeSection } from "@/components/home/our-work-home-section";
import { WorksGallerySection } from "@/components/home/works-gallery-section";
import SvgPath from "@/components/svg-path";
import Timeline from "@/components/timeline/timeline";
import { TimeLines } from "@/components/timelines";

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen overflow-hidden">
        <div className="relative z-10">
          <HeroSection />

          {/* <SectionSpacer title="The Problem" /> */}
          <OurWorkHomeSection />

          {/* <SectionSpacer title="The Reality" /> */}
          <CtaSection />

          {/* <SectionSpacer title="Our Work" /> */}
          <WorksGallerySection />

          <SvgPath />

          {/* <SectionSpacer title="For The CMO" /> */}
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
