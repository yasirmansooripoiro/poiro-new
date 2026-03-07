import InfiniteGallery from "@/components/infinite";
import cards from "@/data/cards";

export default function Home() {
  const sampleImages = cards.map((card, index) => ({
    src: card.image,
    alt: `Image ${index + 1}`,
  }));

  return (
    <main className="min-h-screen ">
      <InfiniteGallery
        images={sampleImages}
        speed={1.2}
        zSpacing={3}
        visibleCount={12}
        falloff={{ near: 0.8, far: 14 }}
        className="h-screen w-full rounded-lg overflow-hidden"
      />
      <div className="h-screen inset-0 pointer-events-none fixed flex items-center justify-center text-center px-3 mix-blend-exclusion text-white">
        <h1 className="text-4xl md:text-8xl tracking-tight">
          <span className="italic">Engineering Creativity</span>
        </h1>
      </div>
    </main>
  );
}
