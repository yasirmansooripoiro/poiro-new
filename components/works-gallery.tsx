"use client";

import { useState } from "react";
import { CustomCursor } from "./custom-cursor";
import { VideoCard } from "./video-card";

const projects = [
  {
    id: 1,
    title: "SHORT FORM",
    category: "TIKTOK/REELS",
    year: "2024",
    thumbnail:
      "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772913913/anycript_thumbnail_3_dodxf0.png",
    video:
      "https://res.cloudinary.com/dl20l7ldt/video/upload/v1772912829/SHORT-FORM_kxpkcm.mp4",
  },
  {
    id: 2,
    title: "STATICS",
    category: "CAMPAIGN-READY CREATIVES",
    year: "2024",
    thumbnail:
      "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772913347/3_gs18zp.png",
    image:
      "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772913343/1_rfmf4p.png",
  },
  {
    id: 3,
    title: "UGC/AFFILIATE",
    category: "INFLUENCER COLLABORATIONS",
    year: "2024",
    thumbnail:
      "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772913847/anycript_thumbnail_2_tm7mtq.png",
    video:
      "https://res.cloudinary.com/dl20l7ldt/video/upload/v1772912830/UGC_cgexw1.mp4",
  },
  {
    id: 4,
    title: "MICRO DRAMA",
    category: "SOCIAL-FIRST NARRATIVES",
    year: "2024",
    thumbnail:
      "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915463/anycript_thumbnail_5_ntzuyd.png",
    video:
      "https://res.cloudinary.com/dl20l7ldt/video/upload/v1772915427/ascii-art_1_pxwmyo.mp4",
  },
  {
    id: 5,
    title: "TVC/ANIMATICS",
    category: "PRODUCTION GRADE COMMERCIALS",
    year: "2024",
    thumbnail:
      "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772913915/anycript_thumbnail_4_u2pgua.png",
    video:
      "https://res.cloudinary.com/dl20l7ldt/video/upload/v1772912827/TVC_u0s1zj.mp4",
  },
];

export function WorksGallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="relative w-full bg-transparent overflow-hidden py-20">
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
