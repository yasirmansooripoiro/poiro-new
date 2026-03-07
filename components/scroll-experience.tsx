"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import InfiniteGallery from "./infinite";

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  title: string;
  description: string;
}

interface ScrollExperienceProps {
  images: { src: string; alt: string }[];
  features: Feature[];
  featuredImage: string;
}

export default function ScrollExperience({
  images,
  features,
  featuredImage,
}: ScrollExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const featuredImageRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const metricItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const featureItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const autoPlaySpeedRef = useRef<number>(1);
  const transitionProgressRef = useRef<number>(0);

  useGSAP(
    () => {
      const speedObj = { value: 1 };
      const transitionObj = { value: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Phase 1 (0–5%): Scroll hint fades
      tl.to(
        scrollHintRef.current,
        { opacity: 0, y: 20, duration: 0.05, ease: "power2.in" },
        0,
      );

      // Phase 2 (5–18%): Hero text exits with blur + upward parallax
      tl.to(
        heroTextRef.current,
        {
          opacity: 0,
          y: -120,
          scale: 1.12,
          filter: "blur(20px)",
          duration: 0.13,
          ease: "power2.inOut",
        },
        0.05,
      );

      // Phase 3 (15–32%): Gallery autoplay decelerates to a stop
      tl.to(
        speedObj,
        {
          value: 0,
          duration: 0.17,
          ease: "power2.inOut",
          onUpdate: () => {
            autoPlaySpeedRef.current = speedObj.value;
          },
        },
        0.15,
      );

      // Phase 3.5 (30–45%): One image transitions to center, others fade out
      tl.to(
        transitionObj,
        {
          value: 1,
          duration: 0.15,
          ease: "power2.inOut",
          onUpdate: () => {
            transitionProgressRef.current = transitionObj.value;
          },
        },
        0.3,
      );

      // Phase 4 (42–55%): Cinematic overlay darkens the scene
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.13, ease: "power1.in" },
        0.42,
      );

      // Phase 5 (44–55%): Gallery scales slightly and fades out
      tl.to(
        galleryRef.current,
        { opacity: 0, scale: 1.06, duration: 0.11, ease: "power2.in" },
        0.44,
      );

      // Phase 6 (52–67%): Featured image reveals with expanding circle
      tl.fromTo(
        featuredImageRef.current,
        { clipPath: "circle(0% at 50% 50%)", scale: 0.5, opacity: 0 },
        {
          clipPath: "circle(80% at 50% 50%)",
          scale: 1,
          opacity: 1,
          duration: 0.15,
          ease: "expo.out",
        },
        0.52,
      );

      // Phase 7 (68–78%): Image slides left to make room
      tl.to(
        featuredImageRef.current,
        { xPercent: -25, duration: 0.1, ease: "power3.inOut" },
        0.68,
      );

      // Phase 8 (74–84%): Metrics panel slides in from right
      tl.fromTo(
        metricsRef.current,
        { xPercent: 50, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.1, ease: "power2.out" },
        0.74,
      );

      // Phase 9 (78–86%): Metric cards stagger in with spring
      const metricEls = metricItemsRef.current.filter(Boolean);
      if (metricEls.length > 0) {
        tl.fromTo(
          metricEls,
          { y: 30, opacity: 0, scale: 0.85 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.015,
            duration: 0.06,
            ease: "back.out(1.4)",
          },
          0.78,
        );
      }

      // Phase 10 (84–92%): Feature items stagger in
      const featureEls = featureItemsRef.current.filter(Boolean);
      if (featureEls.length > 0) {
        tl.fromTo(
          featureEls,
          { x: 25, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.015,
            duration: 0.06,
            ease: "power2.out",
          },
          0.84,
        );
      }

      // Phase 11 (92–100%): Hold final state for reading
    },
    { scope: containerRef },
  );

  const metrics = [
    { value: "98%", label: "Performance" },
    { value: "4.9", label: "Rating" },
    { value: "12ms", label: "Load Time" },
    { value: "50K+", label: "Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "A+", label: "Score" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Gallery Background */}
      <div ref={galleryRef} className="absolute inset-0">
        <InfiniteGallery
          images={images}
          speed={1.2}
          zSpacing={3}
          visibleCount={20}
          falloff={{ near: 0.8, far: 14 }}
          disableWheelControl
          autoPlaySpeedRef={autoPlaySpeedRef}
          transitionProgressRef={transitionProgressRef}
          className="h-full w-full"
        />
      </div>

      {/* Hero Text */}
      <div
        ref={heroTextRef}
        className="absolute inset-0 pointer-events-none flex items-center justify-center text-center px-3 mix-blend-exclusion text-white z-10"
      >
        <h1 className="text-4xl md:text-8xl tracking-tight font-light">
          <span className="italic">Engineering Creativity</span>
        </h1>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs tracking-[0.3em] uppercase font-mono">
          Scroll to explore
        </span>
        <div className="w-px h-8 bg-linear-to-b from-white/50 to-transparent animate-pulse" />
      </div>

      {/* Dark cinematic overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-linear-to-br from-gray-950 via-black to-gray-950 opacity-0 z-15"
      />

      {/* Transition Layer — Featured Image + Metrics */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="flex items-center w-full max-w-7xl mx-auto px-8 gap-12">
          {/* Featured Image */}
          <div
            ref={featuredImageRef}
            className="w-[55%] aspect-16/10 relative rounded-2xl overflow-hidden opacity-0 shrink-0"
            style={{
              boxShadow:
                "0 30px 100px rgba(0,0,0,0.6), 0 0 60px rgba(99,102,241,0.08)",
            }}
          >
            <Image
              src={featuredImage}
              alt="Featured project"
              fill
              className="object-cover"
              sizes="55vw"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/10" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">
                Featured Work
              </span>
            </div>
          </div>

          {/* Metrics Panel */}
          <div ref={metricsRef} className="w-[45%] opacity-0 space-y-6">
            {/* Section Title */}
            <div>
              <p className="text-[11px] font-mono text-indigo-400 tracking-[0.25em] uppercase">
                Project Showcase
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 leading-tight">
                Crafted with
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
                  Precision
                </span>
              </h2>
              <div className="w-12 h-0.5 bg-linear-to-r from-blue-500 to-purple-500 mt-3 rounded-full" />
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2.5">
              {metrics.map((metric, i) => (
                <div
                  key={metric.label}
                  ref={(el) => {
                    metricItemsRef.current[i] = el;
                  }}
                  className="text-center p-3 rounded-xl bg-white/3 border border-white/6 backdrop-blur-sm"
                >
                  <div className="text-xl md:text-2xl font-bold text-white font-mono">
                    {metric.value}
                  </div>
                  <div className="text-[10px] text-white/35 mt-1 uppercase tracking-wider">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Capabilities */}
            <div className="space-y-2">
              <h3 className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.2em] mb-3">
                Capabilities
              </h3>
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  ref={(el) => {
                    featureItemsRef.current[i] = el;
                  }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/2 border border-white/4"
                >
                  <div className="w-0.75 self-stretch rounded-full bg-linear-to-b from-blue-500/60 to-purple-500/60 shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-sm font-medium text-white/85 leading-snug">
                      {feature.title}
                    </h4>
                    <p className="text-[11px] text-white/35 mt-0.5 leading-relaxed line-clamp-2">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
