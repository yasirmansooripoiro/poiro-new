"use client";

import Image from "next/image";

export const Background = ({ src }: { src: string }) => {
  const className =
    "absolute bg-background left-0 top-0 w-full h-full object-cover rounded-[42px] md:rounded-[72px]";

  return (
    <Image
      priority
      loading="eager"
      src={src}
      alt="Background"
      className={className}
      sizes="100vw"
      fill
    />
  );
};
