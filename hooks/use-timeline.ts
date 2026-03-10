"use client";

import { TimelineItem, VisibleRange } from "@/types/timeline";
import type React from "react";

import { useState, useEffect, useRef, createRef } from "react";

// Initial timeline data
const initialTimelineData: TimelineItem[] = [
  {
    id: 1,
    date: "Send the Brief",
    title: "Share your goal, product, and guardrails.",
    content: "Share your goal, product, and guardrails.",
  },
  {
    id: 2,
    date: "We Shape the Direction",
    title: "Hooks, angles, and concepts built for your brand.",
    content: "Hooks, angles, and concepts built for your brand.",
    hasTable: true,
  },
  {
    id: 3,
    date: "We Create",
    title: "Statics, videos, and PDP assets for every placement.",
    content:
      "Backend development and API integration according to technical specifications.",
  },
  {
    id: 4,
    date: "You Review",
    title: "Feedback in. We refine fast.",
    content:
      "Performance optimization and final quality assurance before release.",
  },
  {
    id: 5,
    date: "Ready to Publish",
    title: "Final creatives delivered to spec.",
    content:
      "Ongoing support and maintenance to ensure long-term success of the project.",
  },
  {
    id: 6,
    date: "Then We Scale",
    title: "More variants, markets, and winning creatives.",
    content:
      "Ongoing support and maintenance to ensure long-term success of the project.",
  },
];

export function useTimeline() {
  const [timelineData] = useState<TimelineItem[]>(initialTimelineData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Create refs for the container and each timeline step
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize stepRefs with maximum possible number of refs
  // This ensures we have refs for all possible steps
  const stepRefs = useRef<Array<React.RefObject<HTMLDivElement | null>>>(
    Array(10)
      .fill(null)
      .map(() => createRef<HTMLDivElement>()),
  );

  // Update refs when timelineData changes
  useEffect(() => {
    // Make sure we have enough refs for all timeline items
    if (stepRefs.current.length < timelineData.length) {
      const additionalRefs = Array(
        timelineData.length - stepRefs.current.length,
      )
        .fill(null)
        .map(() => createRef<HTMLDivElement>());

      stepRefs.current = [...stepRefs.current, ...additionalRefs];
    }
  }, [timelineData]);

  // Set loaded state after initial render for entrance animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Navigation is kept for API compatibility, but timeline now shows all steps.
  const navigateTimeline = (direction: "prev" | "next") => {
    return direction;
  };

  const visibleTimelineData = timelineData;

  const visibleRange: VisibleRange = {
    start: 0,
    end: timelineData.length,
  };

  const showPrevButton = false;
  const showNextButton = false;

  return {
    timelineData,
    visibleTimelineData,
    visibleRange,
    isLoaded,
    containerRef,
    stepRefs,
    showPrevButton,
    showNextButton,
    navigateTimeline,
  };
}
