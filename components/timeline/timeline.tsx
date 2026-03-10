"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { AnimatedBeam } from "./animated-beam";
import { TimelineStep } from "./timeline-step";
import { useTimeline } from "@/hooks/use-timeline";
import { useAnimationVariants } from "@/hooks/use-animation-variants";

const BEAM_DELAY = 0.2;
const BEAM_DURATION = 5;

export default function Timeline() {
  // Business logic
  const { visibleTimelineData, isLoaded, containerRef, stepRefs } =
    useTimeline();

  // Animation variants
  const { containerVariants, itemVariants } = useAnimationVariants();
  const [activeStepId, setActiveStepId] = useState<number | null>(null);
  const lastActiveStepRef = useRef<number | null>(null);

  // Debug log to check refs
  useEffect(() => {
    if (isLoaded && visibleTimelineData.length > 1) {
      const timeout = setTimeout(() => {
        // Force a re-render to ensure the beam is displayed
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isLoaded, visibleTimelineData]);

  useEffect(() => {
    if (!isLoaded || visibleTimelineData.length <= 1) {
      lastActiveStepRef.current = null;
      return;
    }

    let animationFrameId = 0;
    const startTime = performance.now();

    const updateActiveStep = (now: number) => {
      const elapsedSeconds = (now - startTime) / 1000 - BEAM_DELAY;

      if (elapsedSeconds < 0) {
        if (lastActiveStepRef.current !== null) {
          lastActiveStepRef.current = null;
          setActiveStepId(null);
        }
      } else {
        const cycleTime = elapsedSeconds % BEAM_DURATION;
        const progress = cycleTime / BEAM_DURATION;
        const activeIndex = Math.min(
          visibleTimelineData.length - 1,
          Math.round(progress * (visibleTimelineData.length - 1)),
        );
        const nextActiveStepId = visibleTimelineData[activeIndex]?.id ?? null;

        if (nextActiveStepId !== lastActiveStepRef.current) {
          lastActiveStepRef.current = nextActiveStepId;
          setActiveStepId(nextActiveStepId);
        }
      }

      animationFrameId = requestAnimationFrame(updateActiveStep);
    };

    animationFrameId = requestAnimationFrame(updateActiveStep);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded, visibleTimelineData]);

  // Determine if we can render the beam
  const canRenderBeam =
    visibleTimelineData.length > 1 &&
    stepRefs.current.length > 0 &&
    stepRefs.current[visibleTimelineData[0].id - 1]?.current &&
    stepRefs.current[visibleTimelineData[visibleTimelineData.length - 1].id - 1]
      ?.current;

  const highlightedStepId =
    isLoaded && visibleTimelineData.length > 1 ? activeStepId : null;

  return (
    <div className="w-full max-w-5xl">
      <div className="relative" ref={containerRef}>
        {/* Position the animated beam at the bottom layer */}
        {canRenderBeam && (
          <AnimatedBeam
            className="z-0"
            containerRef={containerRef}
            fromRef={stepRefs.current[visibleTimelineData[0].id - 1]}
            toRef={
              stepRefs.current[
                visibleTimelineData[visibleTimelineData.length - 1].id - 1
              ]
            }
            pathColor="#ff8015"
            pathWidth={2}
            pathOpacity={0.3}
            gradientStartColor="#ff8015"
            gradientStopColor="#ff8015"
            delay={BEAM_DELAY}
            duration={BEAM_DURATION}
            startYOffset={0}
            endYOffset={0}
            curvature={0}
          />
        )}

        {/* Navigation buttons and timeline content with higher z-index */}
        <div className="z-10 relative">
          {/* Navigation buttons */}
          {/* {showPrevButton && <NavigationButton direction="prev" onClick={() => navigateTimeline("prev")} />} */}

          {/* {showNextButton && <NavigationButton direction="next" onClick={() => navigateTimeline("next")} />} */}

          {/* Timeline steps */}
          <motion.div
            className="w-full pb-6 px-2 sm:px-4"
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <div
              className={cn(
                "w-full flex items-start justify-between gap-2 sm:gap-4 md:gap-6",
              )}
            >
              {visibleTimelineData.map((step) => (
                <div key={step.id} className="flex-1 flex justify-center">
                  {/* Timeline step */}
                  <TimelineStep
                    step={step}
                    stepRef={stepRefs.current[step.id - 1]}
                    itemVariants={itemVariants}
                    isBeamActive={step.id === highlightedStepId}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
