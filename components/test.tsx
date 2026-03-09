"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
const PixelTransition = () => {
  const containerRef = useRef(null); // Grid settings: Adjust these for "chunkier" or "finer" pixels
  const columns = 20;
  const rows = 12;
  const totalBlocks = columns * rows;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  return (
    <div ref={containerRef} className="h-[200vh] relative bg-black">
            {/* Section 1 */}
            
      <section className="h-screen sticky top-0 flex items-center justify-center bg-zinc-900 text-white z-0">
                <h1 className="text-5xl font-bold italic">OLD WORLD</h1>
              
      </section>
            {/* The Pixel Overlay Layer */}
            
      <div
        className="fixed inset-0 pointer-events-none z-10 grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
                
        {[...Array(totalBlocks)].map((_, i) => {
          // Logic to create a "random but ordered" wave effect
          const col = i % columns;
          const row = Math.floor(i / columns); // Pixels start appearing at 20% scroll and finish by 80%
          // We add "noise" by factoring in the column/row index
          const startTrigger = (col + row) / (columns + rows);
          return (
            <Pixel
              key={i}
              progress={scrollYProgress}
              startTrigger={startTrigger}
            />
          );
        })}
              
      </div>
            {/* Section 2 */}
            
      <section className="h-screen relative flex items-center justify-center bg-white text-black z-20">
                
        <h1 className="text-5xl font-bold italic underline">NEW WORLD</h1>
              
      </section>
          
    </div>
  );
};
const Pixel = ({ progress, startTrigger }) => {
  // Each pixel waits for its turn, then scales from 0 to 1.1 (to ensure no gaps)
  const scale = useTransform(
    progress,
    [0 + startTrigger * 0.5, 0.4 + startTrigger * 0.5],
    [0, 1.1],
  ); // Optional: add slight color variation for that "dirty" pixel look
  const opacity = useTransform(
    progress,
    [0 + startTrigger * 0.5, 0.1 + startTrigger * 0.5],
    [0, 1],
  );
  return (
    <motion.div
      style={{ scale, opacity }}
      className="bg-white border-[0.5px] border-zinc-200"
    />
  );
};
export default PixelTransition;
