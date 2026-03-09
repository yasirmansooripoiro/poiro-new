"use client";
import React, { JSX } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import LiquidEther from "./liquid-ether";

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
  colors: string[];
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  return (
    <div className="mx-auto grid h-full w-full max-w-7xl grid-cols-1 gap-3 p-6 md:grid-cols-3 md:auto-rows-[180px] md:p-8 lg:auto-rows-[200px]">
      {cards.map((card) => (
        <motion.article
          key={card.id}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={cn(
            "group relative min-h-50 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 md:min-h-0",
            card.className,
          )}
        >
          <div className="absolute inset-0">
            <LiquidEther colors={card.colors} />
          </div>

          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent opacity-45 transition-opacity duration-300 group-hover:opacity-65" />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-5">
            {card.content}
          </div>
        </motion.article>
      ))}
    </div>
  );
};
