"use client";

interface TimelineStopProps {
  number: number;
  isActive: boolean;
  onClick: () => void;
}

export default function TimelineStop({
  number,
  isActive,
  onClick,
}: TimelineStopProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-10 h-10 rounded-full flex items-center justify-center
        transition-all duration-200 ease-in-out
        ${
          isActive
            ? "bg-primary text-white shadow-md"
            : "bg-white text-gray-700 border-2 border-gray-300 hover:border-primary hover:text-primary"
        }
      `}
    >
      <span className="font-medium">{number}</span>
    </button>
  );
}
