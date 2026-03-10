"use client";

import type React from "react";

import { motion } from "motion/react";
import type { Variants } from "motion/react";

interface TimelineStepProps {
  step: {
    id: number;
    date: string;
    title: string;
    content: string;
  };
  stepRef: React.RefObject<HTMLDivElement | null>;
  itemVariants: Variants;
  isBeamActive?: boolean;
}

export function TimelineStep({
  step,
  stepRef,
  itemVariants,
  isBeamActive = false,
}: TimelineStepProps) {
  return (
    <motion.div
      className="flex flex-col items-center z-20 relative"
      variants={itemVariants}
    >
      {/* Date - Fixed spacing with min-width */}
      <div className="w-full max-w-28 min-h-10 sm:min-h-12 text-center mb-4 flex items-center justify-center">
        <span className="text-gray-400 text-xs sm:text-sm leading-tight block">
          {step.date}
        </span>
      </div>

      {/* Circle dot - Static, non-interactive */}
      <div
        ref={stepRef}
        className="w-8 h-8 rounded-full border-2 border-white bg-gray-900 flex items-center justify-center relative text-white"
      >
        <span
          className="text-xs font-medium transition-all duration-300"
          style={
            isBeamActive
              ? {
                  color: "#ff8015",
                  textShadow:
                    "0 0 6px rgba(255,128,21,0.55), 0 0 12px rgba(255,128,21,0.3)",
                }
              : undefined
          }
        >
          {step.id}
        </span>
      </div>

      {/* Title */}
      <div className="mt-4 w-full max-w-28 text-center">
        <span className="text-white font-medium text-xs sm:text-sm leading-tight block">
          {step.title}
        </span>
      </div>
    </motion.div>
  );
}
