"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import cards from "@/data/cards";
import Image from "next/image";

const REVEAL_DURATION_MS = 350;
const DESCEND_DURATION_MS = 300;
const SCATTER_DURATION_MS = 350;
const ORBIT_SETTLE_DURATION_MS = 700;
const INTRO_DURATION_MS =
  REVEAL_DURATION_MS +
  DESCEND_DURATION_MS +
  SCATTER_DURATION_MS +
  ORBIT_SETTLE_DURATION_MS;
const ORBIT_SPEED = 0.00055;
const ORBIT_CENTER_GAP_X = 340;
const ORBIT_CENTER_GAP_Y = 220;
const ORBIT_CENTER_GAP_X_MOBILE = 190;
const ORBIT_CENTER_GAP_Y_MOBILE = 130;

const easeInOut = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

export default function HomePage() {
  const animationStartRef = useRef<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );

  useEffect(() => {
    let frameId = 0;

    const animate = (time: number) => {
      if (animationStartRef.current === null) {
        animationStartRef.current = time;
      }

      setElapsedMs(time - animationStartRef.current);
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const displayCards = isMobile ? cards.slice(0, 7) : cards;

  const revealEnd = REVEAL_DURATION_MS;
  const descendEnd = revealEnd + DESCEND_DURATION_MS;
  const scatterEnd = descendEnd + SCATTER_DURATION_MS;
  const settleEnd = scatterEnd + ORBIT_SETTLE_DURATION_MS;
  const orbitElapsed = Math.max(elapsedMs - INTRO_DURATION_MS, 0);
  const baseOrbitRotation = orbitElapsed * ORBIT_SPEED;

  const getCardStyle = (card: (typeof cards)[0], index: number) => {
    let x = card.initial.x;
    let y = card.initial.y;
    let opacity = 0;
    let scale = card.initial.scale;

    const isLateCard = index >= 8;
    const angleSeed = (index / displayCards.length) * Math.PI * 2;
    const explodedRadius = Math.hypot(card.exploded.x, card.exploded.y);
    const orbitRadius = clamp01(explodedRadius / 320) * (isMobile ? 95 : 180);
    const orbitRadiusX =
      (isMobile ? ORBIT_CENTER_GAP_X_MOBILE : ORBIT_CENTER_GAP_X) + orbitRadius;
    const orbitRadiusY =
      (isMobile ? ORBIT_CENTER_GAP_Y_MOBILE : ORBIT_CENTER_GAP_Y) +
      orbitRadius * 0.55;
    const orbitScale = clamp01(card.row.scale);
    const orbitXStart = Math.cos(angleSeed) * orbitRadiusX;
    const orbitYStart = Math.sin(angleSeed) * orbitRadiusY;

    if (elapsedMs > 0 && elapsedMs <= revealEnd) {
      const progress = clamp01(elapsedMs / REVEAL_DURATION_MS);
      const delay = index * 0.05;
      const adjustedProgress = clamp01((progress - delay) * 2);

      opacity = isLateCard ? 0 : adjustedProgress;
    }

    if (elapsedMs > revealEnd && elapsedMs <= descendEnd) {
      const progress = clamp01((elapsedMs - revealEnd) / DESCEND_DURATION_MS);
      const eased = easeInOut(progress);

      x = 0;
      y = card.descending.y * eased;
      scale =
        card.initial.scale +
        (card.descending.scale - card.initial.scale) * eased;
      opacity = isLateCard ? Math.min(eased * 2, 1) : 1;
    }

    if (elapsedMs > descendEnd) {
      const progress = clamp01((elapsedMs - descendEnd) / SCATTER_DURATION_MS);
      const eased = easeInOut(progress);

      x = card.descending.x + (card.exploded.x - card.descending.x) * eased;
      y = card.descending.y + (card.exploded.y - card.descending.y) * eased;
      scale =
        card.descending.scale +
        (card.exploded.scale - card.descending.scale) * eased;
      opacity = 1;
    }

    if (elapsedMs > scatterEnd && elapsedMs < settleEnd) {
      const progress = clamp01(
        (elapsedMs - scatterEnd) / ORBIT_SETTLE_DURATION_MS,
      );
      const eased = easeInOut(progress);

      x = card.exploded.x + (orbitXStart - card.exploded.x) * eased;
      y = card.exploded.y + (orbitYStart - card.exploded.y) * eased;
      scale = card.exploded.scale + (orbitScale - card.exploded.scale) * eased;
      opacity = 1;
    }

    if (elapsedMs >= settleEnd) {
      // Orbit around center in a continuous loop once the cards have scattered.
      const drift = orbitElapsed * 0.0012;
      const angle = angleSeed + baseOrbitRotation + index * 0.12;
      x = Math.cos(angle) * orbitRadiusX;
      y = Math.sin(angle + drift) * orbitRadiusY;
      scale = orbitScale;
      opacity = 1;
    }

    return {
      transform: `translate(${x}px, ${y}px) scale(${scale})`,
      opacity,
    };
  };

  const headingStyle = useMemo(() => {
    const fadeIn = clamp01((elapsedMs - 450) / 450);
    const visibleInOrbit = elapsedMs >= settleEnd ? 1 : fadeIn;
    const breathing =
      elapsedMs >= settleEnd ? Math.sin(orbitElapsed * 0.002) * 0.025 : 0;
    return {
      opacity: visibleInOrbit,
      transform: `scale(${0.88 + visibleInOrbit * 0.14 + breathing})`,
      transition: "opacity 0.2s, transform 0.2s",
    };
  }, [elapsedMs, settleEnd, orbitElapsed]);

  return (
    <div className="bg-black min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-black/80 backdrop-blur-sm">
        <div className="flex items-center gap-8">
          <div className="text-white">
            <Image
              src="https://res.cloudinary.com/dl20l7ldt/image/upload/v1772875618/Frame_33_k1o5rw.png"
              alt="Designing Thing"
              className="h-6 w-auto"
              width={48}
              height={48}
            />
          </div>
          <div className="hidden md:flex items-center gap-8 text-white/90 text-sm font-medium">
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              Product
              <ChevronDown className="w-4 h-4" />
            </button>
            <a href="#" className="hover:text-white transition-colors">
              Discover
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Help
            </a>
          </div>
        </div>
        <Button
          size="sm"
          className="bg-[#c4f567] text-black hover:bg-[#b8e557] font-medium px-4 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-4 h-4"
          >
            <path
              fill="currentColor"
              d="M13 5a1 1 0 1 0-2 0h2Zm-1.707 12.51a1 1 0 0 0 1.414 0l6.364-6.364a1 1 0 1 0-1.414-1.414L12 15.389 6.343 9.732a1 1 0 0 0-1.414 1.414l6.364 6.364ZM5 18a1 1 0 1 0 0 2v-2Zm14 2a1 1 0 1 0 0-2v2ZM12 5h-1v11.803h2V5h-1ZM5 19v1h14v-2H5v1Z"
            />
          </svg>
          Don&apos;t Download
        </Button>
      </nav>

      {/* Hero Section - auto looping animation */}
      <section className="relative h-screen overflow-hidden">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            {displayCards.map((card, index) => (
              <div
                key={index}
                className={`absolute w-40 h-40 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-200 ${!isMobile ? "hover:scale-105 hover:z-50" : ""} cursor-pointer`}
                style={getCardStyle(card, index)}
              >
                <Image
                  src={card.image || "/placeholder.svg"}
                  alt={`Artwork ${index + 1}`}
                  className="w-full h-full object-cover brightness-90"
                  width={256}
                  height={256}
                />
              </div>
            ))}
          </div>

          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="text-center px-6" style={headingStyle}>
              <h1 className="text-5xl md:text-8xl font-extrabold tracking-wide text-[#ff8015] leading-[0.9]">
                Engineering
              </h1>
              <h1 className="text-5xl md:text-8xl font-extrabold tracking-wide text-[#ff8015] leading-[0.95]">
                Creativity
              </h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
