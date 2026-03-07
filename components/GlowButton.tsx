"use client";

import { useEffect, useRef, useState } from "react";

const COLS = 42;
const ROWS = 9;
const CHARS = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ01";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

function initGrid() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      char: randomChar(),
      opacity: 0,
      bright: false,
    })),
  );
}

function initDrops() {
  return Array.from({ length: COLS }, () => ({
    head: Math.floor(Math.random() * -ROWS * 3),
    speed: 0.35 + Math.random() * 0.55,
  }));
}

type BorderTracerProps = {
  width: number;
  height: number;
  radius: number;
  hovered: boolean;
};

// Traveling border light using conic-gradient trick via SVG stroke-dashoffset
function BorderTracer({ width, height, radius, hovered }: BorderTracerProps) {
  const perimeter = 2 * (width + height) - 8 * radius + 2 * Math.PI * radius;
  const trailLen = perimeter * 0.18;

  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 5,
        overflow: "visible",
      }}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <defs>
        <linearGradient
          id="trailGrad"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2={width}
          y2="0"
        >
          <stop offset="0%" stopColor="rgba(0,255,70,0)" />
          <stop offset="60%" stopColor="rgba(0,255,70,0.9)" />
          <stop offset="100%" stopColor="rgba(180,255,180,1)" />
        </linearGradient>
      </defs>

      {/* Base dim border */}
      <rect
        x="1"
        y="1"
        width={width - 2}
        height={height - 2}
        rx={radius}
        ry={radius}
        stroke="rgba(0,255,70,0.18)"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Traveling glow streak */}
      {!hovered && (
        <rect
          x="1"
          y="1"
          width={width - 2}
          height={height - 2}
          rx={radius}
          ry={radius}
          stroke="url(#trailGrad)"
          strokeWidth="2"
          fill="none"
          strokeDasharray={`${trailLen} ${perimeter - trailLen}`}
          strokeLinecap="round"
          style={{
            animation: "borderTravel 2.8s linear infinite",
          }}
        />
      )}

      {/* Hover border: full bright */}
      {hovered && (
        <rect
          x="1"
          y="1"
          width={width - 2}
          height={height - 2}
          rx={radius}
          ry={radius}
          stroke="rgba(0,255,70,0.75)"
          strokeWidth="1.5"
          fill="none"
        />
      )}
    </svg>
  );
}

export default function GlowButton({ label = "Get unlimited access" }) {
  const [hovered, setHovered] = useState(false);
  const [grid, setGrid] = useState(initGrid);
  const dropsRef = useRef(initDrops());
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const hoveredRef = useRef(false);
  const fillRef = useRef(0);

  const W = 360,
    H = 76,
    R = 38;

  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);

  useEffect(() => {
    function tick(time: number) {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = time - (lastTimeRef.current ?? time);

      if (delta > 55) {
        lastTimeRef.current = time;

        // Animate fill progress
        if (hoveredRef.current) {
          fillRef.current = Math.min(1, fillRef.current + 0.045);
        } else {
          fillRef.current = Math.max(0, fillRef.current - 0.06);
        }
        const fp = fillRef.current;

        if (fp > 0.02) {
          setGrid((prev) => {
            const next = prev.map((row) => row.map((c) => ({ ...c })));
            const drops = dropsRef.current;

            drops.forEach((drop, col) => {
              // Only activate columns as fill sweeps left→right
              const colThreshold = col / COLS;
              const localFill = Math.max(0, (fp - colThreshold * 0.4) / 0.6);

              if (localFill <= 0) {
                // fade out
                for (let row = 0; row < ROWS; row++) {
                  next[row][col].opacity = Math.max(
                    0,
                    next[row][col].opacity - 0.08,
                  );
                  next[row][col].bright = false;
                }
                return;
              }

              drop.head += drop.speed * localFill;
              const headRow = Math.floor(drop.head);

              for (let row = 0; row < ROWS; row++) {
                const dist = headRow - row;
                if (dist === 0) {
                  next[row][col].char = randomChar();
                  next[row][col].opacity = localFill;
                  next[row][col].bright = true;
                } else if (dist > 0 && dist < 7) {
                  next[row][col].char = randomChar();
                  next[row][col].opacity = Math.max(
                    0.04,
                    localFill * (1 - dist * 0.15),
                  );
                  next[row][col].bright = false;
                } else {
                  next[row][col].opacity = Math.max(
                    0,
                    next[row][col].opacity * 0.88,
                  );
                  next[row][col].bright = false;
                  if (Math.random() < 0.04) next[row][col].char = randomChar();
                }
              }

              if (drop.head > ROWS + 5) {
                drop.head = Math.random() * -3;
                drop.speed = 0.35 + Math.random() * 0.55;
              }
            });

            return next;
          });
        } else {
          // fully idle — blank grid
          setGrid((prev) =>
            prev.map((row) =>
              row.map((cell) => ({
                ...cell,
                opacity: Math.max(0, cell.opacity - 0.05),
                bright: false,
              })),
            ),
          );
        }
      }

      frameRef.current = requestAnimationFrame(tick);
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes borderTravel {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -9999; }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          minHeight: "100vh",
          background: "#000",
        }}
      >
        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "relative",
            width: W,
            height: H,
            borderRadius: R,
            border: "none",
            background: "rgba(0,0,0,0.92)",
            cursor: "pointer",
            overflow: "hidden",
            outline: "none",
            padding: 0,
            transition: "box-shadow 0.4s ease",
            boxShadow: hovered
              ? "0 0 32px rgba(0,255,70,0.38), 0 0 80px rgba(0,255,70,0.13), inset 0 0 20px rgba(0,255,70,0.06)"
              : "0 0 8px rgba(0,255,70,0.06)",
          }}
        >
          {/* ASCII grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              gridTemplateRows: `repeat(${ROWS}, 1fr)`,
              padding: "4px 12px",
              boxSizing: "border-box",
              fontFamily: "'Courier New', monospace",
              fontSize: 9,
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {grid.map((row, ri) =>
              row.map((cell, ci) => (
                <span
                  key={`${ri}-${ci}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: cell.bright
                      ? `rgba(200,255,200,${cell.opacity})`
                      : `rgba(0,255,70,${cell.opacity})`,
                    textShadow: cell.bright
                      ? "0 0 7px rgba(200,255,200,0.9), 0 0 2px #fff"
                      : cell.opacity > 0.4
                        ? `0 0 5px rgba(0,255,70,${cell.opacity * 0.85})`
                        : "none",
                  }}
                >
                  {cell.char}
                </span>
              )),
            )}
          </div>

          {/* Vignette — fade edges into black */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: R,
              background: hovered
                ? "radial-gradient(ellipse at center, transparent 15%, rgba(0,0,0,0.48) 100%)"
                : "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.96) 100%)",
              transition: "background 0.5s ease",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          {/* Traveling border SVG */}
          <BorderTracer width={W} height={H} radius={R} hovered={hovered} />

          {/* Label */}
          <span
            style={{
              position: "relative",
              zIndex: 10,
              display: "block",
              textAlign: "center",
              width: "100%",
              color: "rgba(255,255,255,0.95)",
              fontSize: 16,
              fontFamily:
                "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 400,
              letterSpacing: "0.01em",
              textShadow: hovered
                ? "0 0 18px rgba(255,255,255,0.55)"
                : "0 0 6px rgba(255,255,255,0.2)",
              transition: "text-shadow 0.4s ease",
              pointerEvents: "none",
            }}
          >
            {label}
          </span>
        </button>
      </div>
    </>
  );
}
