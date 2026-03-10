"use client";

import Image from "next/image";
import Assets from "@/app/assets";
import Galaxy from "@/components/galaxy";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PixelBlast from "./pixel-blast";

gsap.registerPlugin(ScrollTrigger);

const GradientFooter = () => {
  // const footerRef = useRef<HTMLElement>(null);

  // useEffect(() => {
  //   if (!footerRef.current) return;

  //   const ctx = gsap.context(() => {
  //     gsap.to(footerRef.current, {
  //       maxWidth: "80rem",
  //       borderRadius: "0.75rem",
  //       paddingLeft: "1.5rem",
  //       paddingRight: "1.5rem",
  //       ease: "power3.out",
  //       scrollTrigger: {
  //         trigger: footerRef.current,
  //         start: "top bottom-=100",
  //         end: "top center",
  //         scrub: 1.2,
  //         toggleActions: "play reverse play reverse",
  //       },
  //     });
  //   }, footerRef);

  //   return () => ctx.revert();
  // }, []);

  return (
    <footer className="relative w-full mb-20">
      <section
        // ref={footerRef}
        className="relative w-full overflow-hidden mx-auto border border-white/20 max-w-7xl rounded-2xl"
        // style={{ maxWidth: "100%" }}
      >
        <div className="absolute inset-0">
          {/* <Galaxy
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        /> */}
          <PixelBlast
            variant="square"
            pixelSize={4}
            color="#ff8015"
            patternScale={2}
            patternDensity={1}
            pixelSizeJitter={0}
            enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            liquid={false}
            liquidStrength={0.12}
            liquidRadius={1.2}
            liquidWobbleSpeed={5}
            speed={0.5}
            edgeFade={0.25}
            // transparent
          />
        </div>

        <div className="pointer-events-none relative z-10 mx-auto flex h-88 w-full max-w-7xl items-center justify-center px-6 py-12 sm:h-104">
          <Image
            src={Assets.logo}
            alt="Poiro logo"
            width={640}
            height={220}
            priority
            className="h-auto w-[min(82vw,36rem)] select-none object-contain drop-shadow-[0_0_40px_rgba(0,0,0,0.45)]"
          />
        </div>
      </section>

        <section className="relative w-full">
          <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Left side - Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start sm:gap-6">
            <a
              href="#"
              className="text-sm text-neutral-400 transition-colors hover:text-white"
            >
              Terms and Conditions
            </a>
            <span className="hidden text-neutral-600 sm:inline">•</span>
            <a
              href="#"
              className="text-sm text-neutral-400 transition-colors hover:text-white"
            >
              Privacy Policy
            </a>
            <span className="hidden text-neutral-600 sm:inline">•</span>
            <a
              href="#"
              className="text-sm text-neutral-400 transition-colors hover:text-white"
            >
              Cookies
            </a>
          </div>

          {/* Right side - Copyright */}
          <div className="text-sm text-neutral-400">
            © 2026 Poiro. All rights reserved.
          </div>
            </div>
          </div>
        </section>
    </footer>
  );
};

export default GradientFooter;
