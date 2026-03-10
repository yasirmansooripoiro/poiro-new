"use client";

import type { Variants } from "motion/react";

export function useAnimationVariants() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // Enhanced content variants for smoother animations
  const contentVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.98,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 14,
        mass: 1,
        delayChildren: 0.1,
        staggerChildren: 0.07,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.96,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  // New variants for content children elements
  const contentChildrenVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    exit: {
      opacity: 0,
      y: 5,
      transition: {
        duration: 0.15,
      },
    },
  };

  return {
    containerVariants,
    itemVariants,
    contentVariants,
    contentChildrenVariants,
  };
}
