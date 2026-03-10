"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Pixel {
  id: number;
  x: number;
  y: number;
}

export default function PixelTrail() {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const lastMove = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();

      // throttle to ~60fps
      if (now - lastMove.current < 16) return;
      lastMove.current = now;

      const newPixel: Pixel = {
        id: now + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setPixels((prev) => {
        const next = [...prev, newPixel];

        // keep only last 40 pixels
        if (next.length > 40) next.shift();

        return next;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <AnimatePresence>
        {pixels.map((pixel) => (
          <motion.div
            key={pixel.id}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute h-5 w-5 bg-[#ff8015]"
            style={{
              left: pixel.x,
              top: pixel.y,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
