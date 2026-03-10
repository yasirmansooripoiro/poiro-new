"use client";

import type React from "react";
import { useRef, useMemo, useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

type ImageItem = string | { src: string; alt?: string };

interface FadeSettings {
  /** Fade in range as percentage of depth range (0-1) */
  fadeIn: {
    start: number;
    end: number;
  };
  /** Fade out range as percentage of depth range (0-1) */
  fadeOut: {
    start: number;
    end: number;
  };
}

interface BlurSettings {
  /** Blur in range as percentage of depth range (0-1) */
  blurIn: {
    start: number;
    end: number;
  };
  /** Blur out range as percentage of depth range (0-1) */
  blurOut: {
    start: number;
    end: number;
  };
  /** Maximum blur amount (0-10, higher values = more blur) */
  maxBlur: number;
}

interface InfiniteGalleryProps {
  images: ImageItem[];
  /** Speed multiplier applied to scroll delta (default: 1) */
  speed?: number;
  /** Spacing between images along Z in world units (default: 2.5) */
  zSpacing?: number;
  /** Number of visible planes (default: clamp to images.length, min 8) */
  visibleCount?: number;
  /** Near/far distances for opacity/blur easing (default: { near: 0.5, far: 12 }) */
  falloff?: { near: number; far: number };
  /** Fade in/out settings with ranges based on depth range percentage (default: { fadeIn: { start: 0.05, end: 0.15 }, fadeOut: { start: 0.85, end: 0.95 } }) */
  fadeSettings?: FadeSettings;
  /** Blur in/out settings with ranges based on depth range percentage (default: { blurIn: { start: 0.0, end: 0.1 }, blurOut: { start: 0.9, end: 1.0 }, maxBlur: 3.0 }) */
  blurSettings?: BlurSettings;
  /** Optional className for outer container */
  className?: string;
  /** Optional style for outer container */
  style?: React.CSSProperties;
  /** Disable wheel/keyboard scroll control (for external scroll managers) */
  disableWheelControl?: boolean;
  /** External ref to control autoplay speed multiplier (0 = stopped, 1 = normal) */
  autoPlaySpeedRef?: React.RefObject<number>;
  /** External ref for transition progress (0 = gallery normal, 1 = one image centered). Controlled by scroll timeline. */
  transitionProgressRef?: React.RefObject<number>;
  /** Cumulative downward scroll (px) before the gallery releases scroll to the page (default: undefined = never release) */
  scrollLockDistance?: number;
}

interface PlaneData {
  index: number;
  z: number;
  imageIndex: number;
  x: number;
  y: number; // Added y property for vertical positioning
}

const DEFAULT_DEPTH_RANGE = 50;
const MAX_HORIZONTAL_OFFSET = 8;
const MAX_VERTICAL_OFFSET = 8;
const CENTER_EXCLUSION_RADIUS = 2.8;

function optimizeTextureSrc(src: string): string {
  // Downscale large Unsplash payloads to speed up first visible texture decode.
  if (!src.includes("images.unsplash.com")) {
    return src;
  }

  try {
    const url = new URL(src);
    if (!url.searchParams.has("w")) {
      url.searchParams.set("w", "1200");
    }
    if (!url.searchParams.has("fit")) {
      url.searchParams.set("fit", "max");
    }
    if (!url.searchParams.has("auto")) {
      url.searchParams.set("auto", "format");
    }

    return url.toString();
  } catch {
    return src;
  }
}

// Custom shader material for blur, opacity, and cloth folding effects
const createClothMaterial = () => {
  return new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      map: { value: null },
      opacity: { value: 1.0 },
      blurAmount: { value: 0.0 },
      scrollForce: { value: 0.0 },
      time: { value: 0.0 },
      isHovered: { value: 0.0 },
    },
    vertexShader: `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vUv = uv;
        vNormal = normal;
        
        vec3 pos = position;
        
        // Create smooth curving based on scroll force
        float curveIntensity = scrollForce * 0.3;
        
        // Base curve across the plane based on distance from center
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;
        
        // Add gentle cloth-like ripples
        float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
        float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;
        float clothEffect = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;
        
        // Flag waving effect when hovered
        float flagWave = 0.0;
        if (isHovered > 0.5) {
          // Create flag-like wave from left to right
          float wavePhase = pos.x * 3.0 + time * 8.0;
          float waveAmplitude = sin(wavePhase) * 0.1;
          // Damping effect - stronger wave on the right side (free edge)
          float dampening = smoothstep(-0.5, 0.5, pos.x);
          flagWave = waveAmplitude * dampening;
          
          // Add secondary smaller waves for more realistic flag motion
          float secondaryWave = sin(pos.x * 5.0 + time * 12.0) * 0.03 * dampening;
          flagWave += secondaryWave;
        }
        
        // Apply Z displacement for curving effect (inverted) with cloth ripples and flag wave
        pos.z -= (curve + clothEffect + flagWave);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vec4 color = texture2D(map, vUv);
        
        // Simple blur approximation
        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }
        
        // Add subtle lighting effect based on curving
        float curveHighlight = abs(scrollForce) * 0.05;
        color.rgb += vec3(curveHighlight * 0.1);
        
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
  });
};

function GalleryScene({
  images,
  speed = 1,
  visibleCount = 8,
  fadeSettings = {
    fadeIn: { start: 0.05, end: 0.15 },
    fadeOut: { start: 0.85, end: 0.95 },
  },
  blurSettings = {
    blurIn: { start: 0.0, end: 0.1 },
    blurOut: { start: 0.9, end: 1.0 },
    maxBlur: 3.0,
  },
  disableWheelControl = false,
  autoPlaySpeedRef,
  transitionProgressRef,
  scrollLockDistance,
}: Omit<InfiniteGalleryProps, "className" | "style">) {
  const scrollVelocityRef = useRef(0);
  const autoPlayRef = useRef(true);
  const [hoveredPlaneIndex, setHoveredPlaneIndex] = useState<number | null>(
    null,
  );
  const lastInteraction = useRef(0);
  const meshRefs = useRef<Array<THREE.Mesh | null>>([]);
  const selectedPlaneRef = useRef<number | null>(null);
  const cumulativeScrollRef = useRef(0);

  useEffect(() => {
    lastInteraction.current = Date.now();
  }, []);

  // Normalize images to objects
  const normalizedImages = useMemo(
    () =>
      images.map((img) =>
        typeof img === "string"
          ? { src: optimizeTextureSrc(img), alt: "" }
          : { ...img, src: optimizeTextureSrc(img.src) },
      ),
    [images],
  );

  const textureSources = useMemo(
    () => normalizedImages.map((img) => img.src),
    [normalizedImages],
  );

  useEffect(() => {
    textureSources.forEach((src) => {
      useTexture.preload(src);
    });
  }, [textureSources]);

  useEffect(() => {
    const eagerSources = textureSources.slice(
      0,
      Math.max(visibleCount, Math.min(6, textureSources.length)),
    );

    eagerSources.forEach((src) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = src;
    });
  }, [textureSources, visibleCount]);

  // Load textures
  const textures = useTexture(textureSources);

  // Create materials pool
  const materials = useMemo(
    () => Array.from({ length: visibleCount }, () => createClothMaterial()),
    [visibleCount],
  );

  useEffect(() => {
    return () => {
      materials.forEach((material) => material.dispose());
    };
  }, [materials]);

  const spatialPositions = useMemo(() => {
    const positions: { x: number; y: number }[] = [];
    const maxHorizontalOffset = MAX_HORIZONTAL_OFFSET;
    const maxVerticalOffset = MAX_VERTICAL_OFFSET;

    for (let i = 0; i < visibleCount; i++) {
      // Create varied distribution patterns for both axes
      const horizontalAngle = (i * 2.618) % (Math.PI * 2); // Golden angle for natural distribution
      const verticalAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2); // Offset angle for vertical

      const horizontalRadius = ((i % 3) + 1) * 1.1; // Keep lanes away from exact center
      const verticalRadius = (((i + 1) % 4) + 1) * 0.65; // Similar for vertical distribution

      let x =
        (Math.sin(horizontalAngle) * horizontalRadius * maxHorizontalOffset) /
        3;
      let y =
        (Math.cos(verticalAngle) * verticalRadius * maxVerticalOffset) / 4;

      // Keep images from passing through the center/title zone.
      const distanceFromCenter = Math.hypot(x, y);
      if (distanceFromCenter < CENTER_EXCLUSION_RADIUS) {
        const safeScale =
          CENTER_EXCLUSION_RADIUS / Math.max(distanceFromCenter, 0.001);
        x *= safeScale;
        y *= safeScale;
      }

      positions.push({ x, y });
    }

    return positions;
  }, [visibleCount]);

  const totalImages = normalizedImages.length;
  const depthRange = DEFAULT_DEPTH_RANGE;
  const planeIndices = useMemo(
    () => Array.from({ length: visibleCount }, (_, i) => i),
    [visibleCount],
  );

  // Initialize plane data
  const planesData = useRef<PlaneData[]>(
    Array.from({ length: visibleCount }, (_, i) => ({
      index: i,
      z: visibleCount > 0 ? ((depthRange / visibleCount) * i) % depthRange : 0,
      imageIndex: totalImages > 0 ? i % totalImages : 0,
      x: spatialPositions[i]?.x ?? 0, // Use spatial positions for x
      y: spatialPositions[i]?.y ?? 0, // Use spatial positions for y
    })),
  );

  useEffect(() => {
    planesData.current = Array.from({ length: visibleCount }, (_, i) => ({
      index: i,
      z:
        visibleCount > 0
          ? ((depthRange / Math.max(visibleCount, 1)) * i) % depthRange
          : 0,
      imageIndex: totalImages > 0 ? i % totalImages : 0,
      x: spatialPositions[i]?.x ?? 0,
      y: spatialPositions[i]?.y ?? 0,
    }));
  }, [depthRange, spatialPositions, totalImages, visibleCount]);

  // Handle scroll input
  const handleWheel = useCallback(
    (event: WheelEvent) => {
      // Track cumulative downward scroll toward the lock distance
      if (scrollLockDistance != null && event.deltaY > 0) {
        cumulativeScrollRef.current += event.deltaY;
      }

      // Once threshold is reached, let the page scroll naturally
      const isLocked =
        scrollLockDistance == null ||
        cumulativeScrollRef.current < scrollLockDistance;

      if (!isLocked) return;

      event.preventDefault();
      scrollVelocityRef.current += event.deltaY * 0.01 * speed;
      autoPlayRef.current = false;
      lastInteraction.current = Date.now();
    },
    [speed, scrollLockDistance],
  );

  // Handle keyboard input
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        scrollVelocityRef.current -= 2 * speed;
        autoPlayRef.current = false;
        lastInteraction.current = Date.now();
      } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        scrollVelocityRef.current += 2 * speed;
        autoPlayRef.current = false;
        lastInteraction.current = Date.now();
      }
    },
    [speed],
  );

  useEffect(() => {
    if (disableWheelControl) return;
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.addEventListener("wheel", handleWheel, { passive: false });
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        canvas.removeEventListener("wheel", handleWheel);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [handleWheel, handleKeyDown, disableWheelControl]);

  // Re-engage scroll lock when user scrolls back to top
  useEffect(() => {
    if (scrollLockDistance == null) return;

    const handlePageScroll = () => {
      if (window.scrollY <= 10) {
        cumulativeScrollRef.current = 0;
      }
    };

    window.addEventListener("scroll", handlePageScroll, { passive: true });
    return () => window.removeEventListener("scroll", handlePageScroll);
  }, [scrollLockDistance]);

  // Auto-play logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastInteraction.current > 3000) {
        autoPlayRef.current = true;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state, delta) => {
    const tp = transitionProgressRef?.current ?? 0;
    let nextVelocity = scrollVelocityRef.current;

    // Apply auto-play (scaled by external speed ref) — freeze during transition
    if (autoPlayRef.current && tp < 0.05) {
      const playSpeed = autoPlaySpeedRef?.current ?? 1;
      nextVelocity += 0.3 * delta * playSpeed;
    }

    // Damping — kill velocity during transition
    nextVelocity *= tp < 0.05 ? 0.95 : 0.8;
    scrollVelocityRef.current = nextVelocity;

    // Update time uniform for all materials
    const time = state.clock.getElapsedTime();
    materials.forEach((material) => {
      if (material && material.uniforms) {
        material.uniforms.time.value = time;
        material.uniforms.scrollForce.value = nextVelocity;
      }
    });

    // Update plane positions
    const imageAdvance =
      totalImages > 0 ? visibleCount % totalImages || totalImages : 0;
    const totalRange = depthRange;

    planesData.current.forEach((plane, i) => {
      let newZ = plane.z + nextVelocity * delta * 10;
      let wrapsForward = 0;
      let wrapsBackward = 0;

      if (newZ >= totalRange) {
        wrapsForward = Math.floor(newZ / totalRange);
        newZ -= totalRange * wrapsForward;
      } else if (newZ < 0) {
        wrapsBackward = Math.ceil(-newZ / totalRange);
        newZ += totalRange * wrapsBackward;
      }

      if (wrapsForward > 0 && imageAdvance > 0 && totalImages > 0) {
        plane.imageIndex =
          (plane.imageIndex + wrapsForward * imageAdvance) % totalImages;
      }

      if (wrapsBackward > 0 && imageAdvance > 0 && totalImages > 0) {
        const step = plane.imageIndex - wrapsBackward * imageAdvance;
        plane.imageIndex = ((step % totalImages) + totalImages) % totalImages;
      }

      plane.z = ((newZ % totalRange) + totalRange) % totalRange;
      plane.x = spatialPositions[i]?.x ?? 0;
      plane.y = spatialPositions[i]?.y ?? 0;

      // Calculate opacity based on fade settings
      const normalizedPosition = plane.z / totalRange; // 0 to 1
      let opacity = 1;

      if (
        normalizedPosition >= fadeSettings.fadeIn.start &&
        normalizedPosition <= fadeSettings.fadeIn.end
      ) {
        // Fade in: opacity goes from 0 to 1 within the fade in range
        const fadeInProgress =
          (normalizedPosition - fadeSettings.fadeIn.start) /
          (fadeSettings.fadeIn.end - fadeSettings.fadeIn.start);
        opacity = fadeInProgress;
      } else if (normalizedPosition < fadeSettings.fadeIn.start) {
        // Before fade in starts: fully transparent
        opacity = 0;
      } else if (
        normalizedPosition >= fadeSettings.fadeOut.start &&
        normalizedPosition <= fadeSettings.fadeOut.end
      ) {
        // Fade out: opacity goes from 1 to 0 within the fade out range
        const fadeOutProgress =
          (normalizedPosition - fadeSettings.fadeOut.start) /
          (fadeSettings.fadeOut.end - fadeSettings.fadeOut.start);
        opacity = 1 - fadeOutProgress;
      } else if (normalizedPosition > fadeSettings.fadeOut.end) {
        // After fade out ends: fully transparent
        opacity = 0;
      }

      // Clamp opacity between 0 and 1
      opacity = Math.max(0, Math.min(1, opacity));

      // Calculate blur based on blur settings
      let blur = 0;

      if (
        normalizedPosition >= blurSettings.blurIn.start &&
        normalizedPosition <= blurSettings.blurIn.end
      ) {
        // Blur in: blur goes from maxBlur to 0 within the blur in range
        const blurInProgress =
          (normalizedPosition - blurSettings.blurIn.start) /
          (blurSettings.blurIn.end - blurSettings.blurIn.start);
        blur = blurSettings.maxBlur * (1 - blurInProgress);
      } else if (normalizedPosition < blurSettings.blurIn.start) {
        // Before blur in starts: full blur
        blur = blurSettings.maxBlur;
      } else if (
        normalizedPosition >= blurSettings.blurOut.start &&
        normalizedPosition <= blurSettings.blurOut.end
      ) {
        // Blur out: blur goes from 0 to maxBlur within the blur out range
        const blurOutProgress =
          (normalizedPosition - blurSettings.blurOut.start) /
          (blurSettings.blurOut.end - blurSettings.blurOut.start);
        blur = blurSettings.maxBlur * blurOutProgress;
      } else if (normalizedPosition > blurSettings.blurOut.end) {
        // After blur out ends: full blur
        blur = blurSettings.maxBlur;
      }

      // Clamp blur to reasonable values
      blur = Math.max(0, Math.min(blurSettings.maxBlur, blur));

      // Update material uniforms
      const material = materials[i];
      if (material && material.uniforms) {
        const texture = textures[plane.imageIndex];
        if (texture) {
          material.uniforms.map.value = texture;
        }
        material.uniforms.opacity.value = opacity;
        material.uniforms.blurAmount.value = blur;
        material.uniforms.isHovered.value = hoveredPlaneIndex === i ? 1.0 : 0.0;
      }

      const mesh = meshRefs.current[i];
      if (mesh) {
        const worldZ = plane.z - totalRange / 2;
        mesh.position.set(plane.x, plane.y, worldZ);

        const texture = textures[plane.imageIndex];
        const textureImage = texture?.image as
          | { width?: number; height?: number }
          | undefined;
        const width = textureImage?.width ?? 1;
        const height = textureImage?.height ?? 1;
        const aspect = width / Math.max(height, 1);

        if (aspect > 1) {
          mesh.scale.set(2 * aspect, 2, 1);
        } else {
          mesh.scale.set(2, 2 / Math.max(aspect, 0.001), 1);
        }
      }
    });

    // Transition: one image moves to center, others fade out
    if (tp > 0) {
      // Lock selection on first transition frame
      if (selectedPlaneRef.current === null) {
        let bestIdx = 0;
        let minDist = Infinity;
        planesData.current.forEach((plane, idx) => {
          const wz = plane.z - totalRange / 2;
          // Pick the plane closest to the camera (smallest absolute z that is in front)
          const dist = Math.abs(wz);
          if (dist < minDist) {
            minDist = dist;
            bestIdx = idx;
          }
        });
        selectedPlaneRef.current = bestIdx;
      }

      const si = selectedPlaneRef.current;

      planesData.current.forEach((_, i) => {
        const mesh = meshRefs.current[i];
        const material = materials[i];
        if (!mesh || !material?.uniforms) return;

        if (i === si) {
          // Animate selected plane to center of view
          mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, 0, tp);
          mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, 0, tp);
          mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, -6, tp);
          material.uniforms.opacity.value = 1;
          material.uniforms.blurAmount.value = 0;
          // Scale up slightly for emphasis
          const sx = mesh.scale.x;
          const sy = mesh.scale.y;
          mesh.scale.set(
            THREE.MathUtils.lerp(sx, sx * 1.15, tp * 0.1),
            THREE.MathUtils.lerp(sy, sy * 1.15, tp * 0.1),
            1,
          );
        } else {
          // Fade out all other planes
          material.uniforms.opacity.value *= 1 - tp;
        }
      });
    } else {
      // Reset selection when transition is inactive
      selectedPlaneRef.current = null;
    }
  });

  if (normalizedImages.length === 0) return null;

  return (
    <>
      {planeIndices.map((i) => {
        const material = materials[i];
        if (!material) return null;

        return (
          <mesh
            key={i}
            ref={(mesh) => {
              meshRefs.current[i] = mesh;
            }}
            material={material}
            onPointerEnter={() => setHoveredPlaneIndex(i)}
            onPointerLeave={() => {
              setHoveredPlaneIndex((prev) => (prev === i ? null : prev));
            }}
          >
            <planeGeometry args={[1, 1, 32, 32]} />
          </mesh>
        );
      })}
    </>
  );
}

// Fallback component for when WebGL is not available
function FallbackGallery({ images }: { images: ImageItem[] }) {
  const normalizedImages = useMemo(
    () =>
      images.map((img) =>
        typeof img === "string" ? { src: img, alt: "" } : img,
      ),
    [images],
  );

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
      <p className="text-gray-600 mb-4">
        WebGL not supported. Showing image list:
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
        {normalizedImages.map((img, i) => (
          <Image
            key={i}
            src={img.src || "/placeholder.svg"}
            alt={img.alt ?? "Gallery image"}
            width={320}
            height={180}
            className="w-full h-32 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
}

export default function InfiniteGallery({
  images,
  speed,
  visibleCount,
  className = "h-96 w-full",
  style,
  disableWheelControl,
  autoPlaySpeedRef,
  transitionProgressRef,
  scrollLockDistance,
  fadeSettings = {
    fadeIn: { start: 0.05, end: 0.25 },
    fadeOut: { start: 0.4, end: 0.43 },
  },
  blurSettings = {
    blurIn: { start: 0.0, end: 0.1 },
    blurOut: { start: 0.4, end: 0.43 },
    maxBlur: 8.0,
  },
}: InfiniteGalleryProps) {
  const [webglSupported] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      return Boolean(gl);
    } catch {
      return false;
    }
  });

  if (!webglSupported) {
    return (
      <div className={className} style={style}>
        <FallbackGallery images={images} />
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      <Canvas
        camera={{ position: [0, 0, 0], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <GalleryScene
          images={images}
          speed={speed}
          visibleCount={visibleCount}
          fadeSettings={fadeSettings}
          blurSettings={blurSettings}
          disableWheelControl={disableWheelControl}
          autoPlaySpeedRef={autoPlaySpeedRef}
          transitionProgressRef={transitionProgressRef}
          scrollLockDistance={scrollLockDistance}
        />
      </Canvas>
    </div>
  );
}
