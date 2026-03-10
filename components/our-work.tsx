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

const imageRevealTargets: Record<
  string,
  { x: number; y: number; rotation: number; delay: number }
> = {
  "left-1": { x: -14, y: -18, rotation: -6, delay: 0 },
  "right-1": { x: 14, y: -18, rotation: 6, delay: 0.06 },
  "left-2": { x: 10, y: -8, rotation: -3, delay: 0.12 },
  "right-2": { x: -8, y: -10, rotation: 3, delay: 0.18 },
  "left-3": { x: -6, y: 12, rotation: -5, delay: 0.24 },
  "right-3": { x: 8, y: 12, rotation: 4, delay: 0.3 },
  "center-1": { x: 0, y: 22, rotation: 1, delay: 0.22 },
};

const OurWorkSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        images.forEach((image, idx) => {
          const element = imageRefs.current[idx];
          if (element) {
            const target = imageRevealTargets[image.id] ?? {
              x: 0,
              y: 0,
              rotation: 0,
            };
            gsap.set(element, {
              x: target.x,
              y: target.y,
              rotation: target.rotation,
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              clipPath: "inset(0% 0% 0% 0% round 1rem)",
            });
          }
        });
        return;
      }

      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
          end: "bottom 28%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      images.forEach((image, idx) => {
        const element = imageRefs.current[idx];
        if (!element) return;

        const target = imageRevealTargets[image.id] ?? {
          x: 0,
          y: 0,
          rotation: 0,
          delay: idx * 0.06,
        };
        const entryX =
          image.side === "left"
            ? target.x - 120
            : image.side === "right"
              ? target.x + 120
              : target.x;
        const entryRotation =
          image.side === "left"
            ? target.rotation - 8
            : image.side === "right"
              ? target.rotation + 8
              : target.rotation;

        revealTl.fromTo(
          element,
          {
            x: entryX,
            y: target.y + 86,
            rotation: entryRotation,
            scale: image.side === "center" ? 0.72 : 0.8,
            opacity: 0,
            filter: "blur(14px)",
            clipPath: "inset(14% 14% 14% 14% round 1rem)",
          },
          {
            x: target.x,
            y: target.y,
            rotation: target.rotation,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            clipPath: "inset(0% 0% 0% 0% round 1rem)",
            duration: image.side === "center" ? 1.2 : 1.05,
            ease: image.side === "center" ? "back.out(1.45)" : "power3.out",
          },
          target.delay,
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
      className="relative w-full bg-transparent overflow-hidden"
      style={{ minHeight: "120vh" }}
    >
      <div className="absolute inset-x-0 top-[35%] z-20 flex justify-center pointer-events-none">
        <div className="w-full max-w-2xl px-6 md:px-8 text-center pointer-events-auto">
          <p className="text-gray-400 text-4xl md:text-6xl mb-4 font-medium tracking-wide">
            Ideas, executed without friction.
          </p>
          <h2 className="text-xl font-bold text-foreground leading-tight text-balance font-mono">
            Your creative vision shouldn&apos;t stall in production. Poiro turns
            briefs into publish-ready AI creatives—so your brand ships more,
            tests more, and wins more.
          </h2>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        {leftImages.map((image, idx) => {
          const layouts = [
            {
              top: "11%",
              left: "8%",
              w: 224,
              h: 266,
            },
            {
              top: "35%",
              left: "13%",
              w: 224,
              h: 266,
            },
            {
              top: "56%",
              left: "6%",
              w: 224,
              h: 266,
            },
          ];
          const layout = layouts[idx];

          return (
            <div
              key={image.id}
              ref={(el) => {
                imageRefs.current[images.indexOf(image)] = el;
              }}
              className="absolute rounded-2xl overflow-hidden shadow-xl"
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
            {
              top: "10%",
              right: "8%",
              w: 224,
              h: 266,
            },
            {
              top: "34%",
              right: "13%",
              w: 224,
              h: 266,
            },
            {
              top: "56%",
              right: "6%",
              w: 224,
              h: 266,
            },
          ];
          const layout = layouts[idx];

          return (
            <div
              key={image.id}
              ref={(el) => {
                imageRefs.current[images.indexOf(image)] = el;
              }}
              className="absolute rounded-2xl overflow-hidden shadow-xl"
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
            style={{
              top: "66%",
              width: 224,
              height: 266,
            }}
          >
            <Image
              src={centerImage.src}
              alt={centerImage.alt}
              width={224}
              height={266}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        ) : null}

        <div className="absolute inset-x-0 top-[74%] mx-auto h-40 w-130 rounded-full bg-foreground/10 blur-3xl" />
      </div>

      <div className="absolute inset-x-0 bottom-14 flex justify-center px-4 sm:hidden">
        {centerImage ? (
          <div
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
