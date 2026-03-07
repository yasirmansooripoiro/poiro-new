"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { HARD_CODED_BLOCKS_PER_COLUMN, HARD_CODED_COLUMNS } from "@/constants";
import styles from "./blocks-overlay.module.css";

const TRAIL_LENGTH = 18;
const MIN_TRAIL_OPACITY = 0.1;
const IDLE_CLEAR_DELAY_MS = 140;
const ACTIVE_BLOCK_COLOR = "#ff8015";

export default function BlocksOverlay() {
  const blockRefs = useRef<Array<HTMLDivElement | null>>([]);
  const trailRef = useRef<number[]>([]);
  const idleTimeoutRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const lastPaintedIndexRef = useRef<number | null>(null);
  const [grid, setGrid] = useState(() => ({
    columns: HARD_CODED_COLUMNS,
    rows: HARD_CODED_BLOCKS_PER_COLUMN,
    blockSize: 0,
  }));

  const totalBlocks = useMemo(
    () => grid.columns * grid.rows,
    [grid.columns, grid.rows],
  );

  useEffect(() => {
    const syncGrid = () => {
      const width = Math.max(window.innerWidth, 1);
      const height = Math.max(window.innerHeight, 1);
      const columns = HARD_CODED_COLUMNS;
      const blockSize = width / columns;
      const rows = Math.max(1, Math.ceil(height / blockSize));

      setGrid((prev) => {
        if (
          prev.columns === columns &&
          prev.rows === rows &&
          prev.blockSize === blockSize
        ) {
          return prev;
        }

        return { columns, rows, blockSize };
      });
    };

    syncGrid();
    window.addEventListener("resize", syncGrid);

    return () => {
      window.removeEventListener("resize", syncGrid);
    };
  }, []);

  useEffect(() => {
    const blockRefList = blockRefs.current;
    const idleTimeout = idleTimeoutRef;

    const clearTrail = () => {
      trailRef.current.forEach((index) => {
        const block = blockRefList[index];
        if (block) {
          block.style.opacity = "0";
        }
      });
      trailRef.current = [];
      lastPaintedIndexRef.current = null;
    };

    const scheduleIdleClear = () => {
      if (idleTimeout.current) {
        window.clearTimeout(idleTimeout.current);
      }

      idleTimeout.current = window.setTimeout(() => {
        clearTrail();
        idleTimeout.current = null;
      }, IDLE_CLEAR_DELAY_MS);
    };

    const paintTrail = (activeIndex: number) => {
      if (activeIndex === lastPaintedIndexRef.current) {
        return;
      }

      const previousTrail = trailRef.current;
      const nextTrail = [
        activeIndex,
        ...previousTrail.filter((index) => index !== activeIndex),
      ].slice(0, TRAIL_LENGTH);

      previousTrail.forEach((index) => {
        if (nextTrail.includes(index)) {
          return;
        }

        const block = blockRefList[index];
        if (block) {
          block.style.opacity = "0";
        }
      });

      const opacityRange = 1 - MIN_TRAIL_OPACITY;
      const denominator = Math.max(nextTrail.length - 1, 1);

      nextTrail.forEach((index, trailIndex) => {
        const block = blockRefList[index];
        if (!block) {
          return;
        }

        const ratio = trailIndex / denominator;
        const opacity = 1 - ratio * opacityRange;

        block.style.opacity = opacity.toFixed(3);
      });

      trailRef.current = nextTrail;
      lastPaintedIndexRef.current = activeIndex;
      scheduleIdleClear();
    };

    const flushPointer = () => {
      frameRef.current = null;
      const point = pointerRef.current;

      if (!point || grid.columns <= 0 || grid.rows <= 0) {
        return;
      }

      const xRatio = point.x / Math.max(window.innerWidth, 1);
      const yRatio = point.y / Math.max(window.innerHeight, 1);

      const column = Math.min(
        grid.columns - 1,
        Math.max(0, Math.floor(xRatio * grid.columns)),
      );
      const row = Math.min(
        grid.rows - 1,
        Math.max(0, Math.floor(yRatio * grid.rows)),
      );
      const index = row * grid.columns + column;

      paintTrail(index);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };

      if (frameRef.current == null) {
        frameRef.current = window.requestAnimationFrame(flushPointer);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      if (frameRef.current != null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      pointerRef.current = null;

      if (idleTimeout.current) {
        window.clearTimeout(idleTimeout.current);
        idleTimeout.current = null;
      }

      clearTrail();
    };
  }, [grid.columns, grid.rows]);

  return (
    <div
      className={styles.overlay}
      aria-hidden="true"
      style={
        {
          "--blocks-columns": grid.columns,
          "--blocks-rows": grid.rows,
          "--block-size": `${grid.blockSize}px`,
          "--active-block-color": ACTIVE_BLOCK_COLOR,
        } as CSSProperties
      }
    >
      {Array.from({ length: totalBlocks }, (_, index) => {
        return (
          <div
            key={index}
            ref={(node) => {
              blockRefs.current[index] = node;
            }}
            className={styles.block}
          />
        );
      })}
    </div>
  );
}
