"use client";

import { LayoutGrid } from "./layout-grid";

export function BentoGrid() {
  return (
    <div className="w-full py-10 md:py-14">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-normal text-base max-w-lg text-neutral-200">
        A serene and tranquil retreat, this house in the woods offers a peaceful
        escape from the hustle and bustle of city life.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-normal text-base max-w-lg text-neutral-200">
        Perched high above the world, this house offers breathtaking views and a
        unique living experience. It&apos;s a place where the sky meets home,
        and tranquility is a way of life.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-normal text-base max-w-lg text-neutral-200">
        A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-normal text-base max-w-lg text-neutral-200">
        A house by the river is a place of peace and tranquility. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};

const SkeletonFive = () => {
  return (
    <div>
      <p className="font-normal text-base max-w-lg text-neutral-200">
        Minimal and warm, this desert hideaway embraces wide horizons, soft
        light, and quiet mornings under open skies.
      </p>
    </div>
  );
};

const SkeletonSix = () => {
  return (
    <div>
      <p className="font-normal text-base max-w-lg text-neutral-200">
        A modern home shaped by sea breeze and sunlight, designed for calm
        evenings, open views, and effortless indoor-outdoor living.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-1 md:row-span-2",
    thumbnail: "",
    colors: ["#ff8015", "#ff8015", "#ff8015"],
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "md:col-span-2",
    thumbnail: "",
    colors: ["#ff8015", "#ff8015", "#ff8015"],
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "md:col-span-1",
    thumbnail: "",
    colors: ["#ff8015", "#ff8015", "#ff8015"],
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-1",
    thumbnail: "",
    colors: ["#ff8015", "#ff8015", "#ff8015"],
  },
  {
    id: 5,
    content: <SkeletonFive />,
    className: "md:col-span-2",
    thumbnail: "",
    colors: ["#ff8015", "#ff8015", "#ff8015"],
  },
  {
    id: 6,
    content: <SkeletonSix />,
    className: "md:col-span-1",
    thumbnail: "",
    colors: ["#ff8015", "#ff8015", "#ff8015"],
  },
];
