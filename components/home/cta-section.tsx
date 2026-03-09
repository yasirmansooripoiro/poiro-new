"use client";

import { useEffect, useRef } from "react";
import { LayoutTextFlip } from "@/components/layout-text-flip";

export function CtaSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const videoElement = videoRef.current;

    if (!sectionElement || !videoElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          void videoElement.play();
          return;
        }

        videoElement.pause();
      },
      { threshold: [0, 0.5, 1] },
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
      videoElement.pause();
    };
  }, []);

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden max-w-7xl mx-auto py-20 min-h-200"
      ref={sectionRef}
    >
      <video
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover"
        loop
        muted
        playsInline
        preload="metadata"
        ref={videoRef}
      >
        <source
          src="https://res.cloudinary.com/dl20l7ldt/video/upload/v1772904814/ascii_hand_sfikzz.mp4"
          type="video/mp4"
        />
      </video>
      {/* <div className="absolute inset-0 -z-10 bg-background" /> */}

      <div className="relative z-10 px-6">
        <h2 className="text-4xl md:text-6xl tracking-tight text-center">
          Prompting ≠ Creativity
        </h2>

        <div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
          <LayoutTextFlip
            text="It is all about "
            words={["Storyboarding", "Generation", "Key Visuals", "Editing"]}
          />
        </div>
      </div>
    </section>
  );
}
