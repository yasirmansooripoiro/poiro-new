"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "motion/react";

const SvgPath = () => {
  const pathRef = useRef<SVGTextPathElement | null>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (currentY) => {
      const textPath = pathRef.current;

      if (!textPath) {
        return;
      }

      // Convert page scroll to a looping percentage offset so the marquee keeps moving.
      const offset = -((currentY * 0.08) % 100);
      textPath.setAttribute("startOffset", `${offset}%`);
    });

    return unsubscribe;
  }, [scrollY]);

  const repeatCount = 8;

  return (
    <div>
      <svg className="w-full" viewBox="0 0 250 90">
        <path
          fill="none"
          id="curve"
          d="m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68"
        />
        <text className="text-[12px] uppercase" style={{ fill: "#ff8015" }}>
          <textPath ref={pathRef} startOffset="0%" href="#curve">
            {Array.from({ length: repeatCount }).map((_, i) => (
              <tspan key={i}>
                Ship more <tspan fill="#ffffff">•</tspan> Spend less{" "}
                <tspan fill="#ffffff">•</tspan> Create without limits{" "}
                <tspan fill="#ffffff">•</tspan>{" "}
              </tspan>
            ))}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default SvgPath;
