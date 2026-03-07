"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ImageItem {
  id: string;
  src: string;
  alt: string;
  side: "left" | "center" | "right";
}

const images: ImageItem[] = [
  {
    id: "left-1",
    src: "https://images.unsplash.com/photo-1770983438085-f840f1a72504?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUxOTZ8&ixlib=rb-4.1.0&q=85",
    alt: "Autonomous truck in desert",
    side: "left",
  },
  {
    id: "left-2",
    src: "https://images.unsplash.com/photo-1768740067016-d7fddac028d6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUxOTZ8&ixlib=rb-4.1.0&q=85",
    alt: "Team collaboration",
    side: "left",
  },
  {
    id: "left-3",
    src: "https://images.unsplash.com/photo-1771030668566-dc2e0f24c95e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUxOTZ8&ixlib=rb-4.1.0&q=85",
    alt: "Facility operations",
    side: "left",
  },
  {
    id: "right-1",
    src: "https://images.unsplash.com/photo-1770929356906-765cd4e21dd1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUxOTd8&ixlib=rb-4.1.0&q=85",
    alt: "Highway infrastructure",
    side: "right",
  },
  {
    id: "right-2",
    src: "https://images.unsplash.com/photo-1771251004016-d879327b33c2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUxOTd8&ixlib=rb-4.1.0&q=85",
    alt: "Tech innovation",
    side: "right",
  },
  {
    id: "right-3",
    src: "https://images.unsplash.com/photo-1772173333598-31ffc020d58a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUxOTd8&ixlib=rb-4.1.0&q=85",
    alt: "Team working",
    side: "right",
  },
  {
    id: "center-1",
    src: "https://images.unsplash.com/photo-1770647109112-62553107e44a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUxOTh8&ixlib=rb-4.1.0&q=85",
    alt: "Digital art",
    side: "center",
  },
];

const OurWorkSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        imageRefs.current.forEach((element) => {
          if (element) {
            gsap.set(element, { y: 0, opacity: 1 });
          }
        });
        return;
      }

      images.forEach((image, idx) => {
        const element = imageRefs.current[idx];
        if (!element) return;

        const sideOffsets: Record<ImageItem["side"], number[]> = {
          left: [-24, -38, -28],
          right: [24, 38, 28],
          center: [18],
        };

        const sideList = images.filter((item) => item.side === image.side);
        const sideIdx = sideList.indexOf(image);
        const yMovement = sideOffsets[image.side][sideIdx] ?? 0;

        gsap.fromTo(
          element,
          { y: 20, opacity: 0, scale: 0.96 },
          {
            y: yMovement,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 82%",
              end: "bottom bottom",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const leftImages = images.filter((img) => img.side === "left");
  const rightImages = images.filter((img) => img.side === "right");
  const centerImage = images.find((img) => img.side === "center");

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-background overflow-hidden"
      style={{ minHeight: "150vh" }}
    >
      <div
        ref={textWrapperRef}
        className="sticky top-0 h-screen flex items-center justify-center pointer-events-none z-20"
      >
        <div className="w-full max-w-2xl px-6 md:px-8 text-center pointer-events-auto">
          <p className="text-gray-400 text-sm md:text-base mb-4 font-medium tracking-wide">
            We built our own road.
          </p>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight text-balance">
            Our revolutionary Physical AI Platform enables—for the first time
            ever—true scale, generalizing to different form factors,
            geographies, and environments. This breakthrough is powered by the
            same AI model acting as a shared brain for both autonomous trucks
            and robotaxis.
          </h2>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        {leftImages.map((image, idx) => {
          const layouts = [
            { top: "24%", left: "15%", w: 148, h: 182, style: "" },
            { top: "44%", left: "18%", w: 138, h: 168, style: "" },
            { top: "64%", left: "14%", w: 146, h: 170, style: "" },
          ];
          const layout = layouts[idx];

          return (
            <div
              key={image.id}
              ref={(el) => {
                imageRefs.current[images.indexOf(image)] = el;
              }}
              className={`absolute ${layout.style} rounded-2xl overflow-hidden shadow-xl`}
              style={{
                top: layout.top,
                left: layout.left,
                width: layout.w,
                height: layout.h,
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={layout.w}
                height={layout.h}
                className="h-full w-full object-cover"
                priority={idx === 0}
              />
            </div>
          );
        })}

        {rightImages.map((image, idx) => {
          const layouts = [
            { top: "24%", right: "15%", w: 148, h: 182, style: "" },
            { top: "44%", right: "18%", w: 138, h: 168, style: "" },
            { top: "64%", right: "14%", w: 146, h: 170, style: "" },
          ];
          const layout = layouts[idx];

          return (
            <div
              key={image.id}
              ref={(el) => {
                imageRefs.current[images.indexOf(image)] = el;
              }}
              className={`absolute ${layout.style} rounded-2xl overflow-hidden shadow-xl`}
              style={{
                top: layout.top,
                right: layout.right,
                width: layout.w,
                height: layout.h,
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={layout.w}
                height={layout.h}
                className="h-full w-full object-cover"
                priority={idx === 0}
              />
            </div>
          );
        })}

        {centerImage ? (
          <div
            ref={(el) => {
              imageRefs.current[images.indexOf(centerImage)] = el;
            }}
            className="absolute left-1/2 -translate-x-1/2 rounded-2xl overflow-hidden shadow-2xl"
            style={{ top: "78%", width: 210, height: 252 }}
          >
            <Image
              src={centerImage.src}
              alt={centerImage.alt}
              width={210}
              height={252}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        ) : null}

        <div className="absolute inset-x-0 top-[70%] mx-auto h-40 w-130 rounded-full bg-foreground/10 blur-3xl" />
      </div>

      <div className="absolute inset-x-0 bottom-14 flex justify-center px-4 sm:hidden">
        {centerImage ? (
          <div
            ref={(el) => {
              imageRefs.current[images.indexOf(centerImage)] = el;
            }}
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{ width: 210, height: 250 }}
          >
            <Image
              src={centerImage.src}
              alt={centerImage.alt}
              width={210}
              height={250}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default OurWorkSection;
