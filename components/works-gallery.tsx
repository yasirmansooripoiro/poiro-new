"use client";

import { useState } from "react";
import { CustomCursor } from "./custom-cursor";
import { VideoCard } from "./video-card";

const projects = [
  {
    id: 1,
    title: "FASHION STUDIO",
    category: "BRANDING",
    year: "2024",
    thumbnail:
      "https://images.unsplash.com/photo-1769950268368-f927c5cab379?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUyMDF8&ixlib=rb-4.1.0&q=85",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 2,
    title: "ARCHITECTURE FIRM",
    category: "DESIGN",
    year: "2024",
    thumbnail:
      "https://images.unsplash.com/photo-1772339014113-29414e7295b3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUyMDB8&ixlib=rb-4.1.0&q=85",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 3,
    title: "PRODUCT LAUNCH",
    category: "CREATIVE",
    year: "2024",
    thumbnail:
      "https://images.unsplash.com/photo-1769881846576-959f7e84ce32?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUyMDB8&ixlib=rb-4.1.0&q=85",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    id: 4,
    title: "STUDIO VALE",
    category: "MARKETING",
    year: "2024",
    thumbnail:
      "https://images.unsplash.com/photo-1771787616811-7ae7a73a31de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUyMDB8&ixlib=rb-4.1.0&q=85",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    id: 5,
    title: "AUTOMOTIVE",
    category: "COMMERCIAL",
    year: "2024",
    thumbnail:
      "https://images.unsplash.com/photo-1772606270537-6eb199b55aed?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUyMDB8&ixlib=rb-4.1.0&q=85",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  },
];

export function WorksGallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="relative w-full bg-background overflow-hidden py-20">
      <CustomCursor isActive={hoveredId !== null} />
      <div className="container mx-auto px-6">
        <div className="flex gap-4 items-stretch">
          {projects.map((project) => (
            <VideoCard
              key={project.id}
              project={project}
              isHovered={hoveredId === project.id}
              onHoverChange={(hovered) =>
                setHoveredId(hovered ? project.id : null)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
