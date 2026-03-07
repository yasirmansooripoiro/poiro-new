import InfiniteGallery from "@/components/infinite";
import cards from "@/data/cards";

export function HeroSection() {
  const sampleImages = cards.map((card, index) => ({
    src: card.image,
    alt: `Image ${index + 1}`,
  }));

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <InfiniteGallery
        images={sampleImages}
        speed={1.2}
        zSpacing={3}
        visibleCount={20}
        scrollLockDistance={900}
        falloff={{ near: 0.8, far: 14 }}
        className="h-full w-full"
      />

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-center px-3 mix-blend-exclusion text-white">
        <h1 className="text-4xl md:text-8xl tracking-tight">
          <span className="italic">Engineering Creativity</span>
        </h1>
      </div>
    </section>
  );
}
