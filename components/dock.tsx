"use client";

import { useEffect, useRef, useState } from "react";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import { FloatingDock } from "./floating-dock";
import Image from "next/image";

export function FloatingDockDemo() {
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const showAfter = 180;

    const handleScroll = () => {
      const nextVisible = window.scrollY > showAfter;
      if (nextVisible === isVisibleRef.current) {
        return;
      }

      isVisibleRef.current = nextVisible;
      setIsVisible(nextVisible);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];
  return (
    <div
      className={[
        "fixed inset-x-0 top-6 z-70 flex justify-center px-4 transition-all duration-300",
        isVisible
          ? "pointer-events-none translate-y-0 opacity-100"
          : "pointer-events-none translate-y-8 opacity-0",
      ].join(" ")}
      aria-hidden={!isVisible}
    >
      <FloatingDock
        desktopClassName="pointer-events-auto"
        mobileClassName="pointer-events-auto"
        items={links}
      />
    </div>
  );
}
