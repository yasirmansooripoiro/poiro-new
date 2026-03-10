"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Background } from "@/components/bg";
import { BriefUpload } from "@/components/brief";

export function BriefUploadSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sectionElement = sectionRef.current;
    const frameElement = frameRef.current;

    if (!sectionElement || !frameElement) {
      return;
    }

    const mm = gsap.matchMedia();

    const setupAnimation = (insetPx: number, radiusPx: number) => {
      const inset = `inset(0 ${insetPx}px round ${radiusPx}px)`;

      gsap.set(frameElement, {
        clipPath: inset,
        WebkitClipPath: inset,
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionElement,
            // Start expanding when the section reaches 50% of the viewport.
            start: "top 50%",
            end: "top top",
            scrub: true,
          },
        })
        .to(frameElement, {
          clipPath: "inset(0 0px round 0px)",
          WebkitClipPath: "inset(0 0px round 0px)",
          ease: "power2.out",
        });
    };

    mm.add("(max-width: 767px)", () => {
      setupAnimation(56, 42);
    });

    mm.add("(min-width: 768px)", () => {
      setupAnimation(160, 72);
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section className="relative w-full py-10 md:py-14" ref={sectionRef}>
      <div className="relative h-screen">
        <div className="sticky top-0 h-dvh overflow-hidden">
          <div className="relative h-full w-full" ref={frameRef}>
            <Background
              // src="https://res.cloudinary.com/dnjcut34n/video/upload/v1754907626/poiro/tesla_ijkjmi.mp4"
              src="https://res.cloudinary.com/dl20l7ldt/image/upload/v1773052358/MuvtY1zQaF6aBXtBQe32S_uNgFm5Gt_rgy6f0.png"
            />
            <BriefUpload />
          </div>
        </div>
      </div>
    </section>
  );
}
