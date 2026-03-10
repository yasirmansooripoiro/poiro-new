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
    <CardCopy
      title="01 - Team"
      subtitle="10x creative output. Same team size."
      description="Work with dedicated AI creative producers who operate at the intersection of brand thinking and AI execution, multiplying your team's output without increasing headcount."
    />
  );
};

const SkeletonTwo = () => {
  return (
    <CardCopy
      title="02 - Tech"
      subtitle="Test more concepts. Find winners faster."
      description="Our proprietary AI production system lets you generate and iterate on far more creative directions, helping your team identify high-performing concepts earlier."
    />
  );
};
const SkeletonThree = () => {
  return (
    <CardCopy
      title="03 - Strategy"
      subtitle="Brand-consistent across every channel and market."
      description="With category intelligence and brand systems guiding every output, your creatives stay consistent across formats, platforms, and global markets."
    />
  );
};
const SkeletonFour = () => {
  return (
    <CardCopy
      title="04 - Accuracy"
      subtitle="Product accuracy your ecommerce team can trust."
      description="Logos stay sharp, colors stay true, and product details remain exact, so every asset reflects your brand and product the way it should."
    />
  );
};

const SkeletonFive = () => {
  return (
    <CardCopy
      title="05 - Output"
      subtitle="One brief in. One accountable partner. Zero production chaos."
      description="From concept to final export, everything is handled in one streamlined workflow, delivering publish-ready creatives your team can deploy immediately."
    />
  );
};

const SkeletonSix = () => {
  return (
    <CardCopy
      title="06 - Flexibility"
      subtitle="No model lock-in. Always the best AI for the job."
      description="We route every creative task through the most capable AI models available, ensuring your production stays cutting-edge without being tied to a single system."
    />
  );
};

type CardCopyProps = {
  title: string;
  subtitle: string;
  description: string;
};

const CardCopy = ({ title, subtitle, description }: CardCopyProps) => {
  return (
    <div className="max-w-lg">
      {/* <p className="text-base font-semibold tracking-[0.16em] text-neutral-300 uppercase">
        {title}
      </p> */}
      <h3 className="mt-1 text-base font-semibold leading-snug text-white">
        {subtitle}
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-neutral-200">
        {description}
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail: "",
    colors: ["#ff8015", "#ff8015", "#ff8015"],
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "md:col-span-1 md:row-span-2",
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
