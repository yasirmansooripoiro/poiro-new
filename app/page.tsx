import InfiniteGallery from "@/components/infinite";
import OurWorkSection from "@/components/our-work";
import { WorksGallery } from "@/components/works-gallery";
import cards from "@/data/cards";

export default function Home() {
  const sampleImages = cards.map((card, index) => ({
    src: card.image,
    alt: `Image ${index + 1}`,
  }));

  return (
    <main className="min-h-screen">
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

      {/* Our work  */}
      <OurWorkSection />

      {/* section : About */}
      <WorksGallery />

      {/* section : Contact */}
      <section className="min-h-screen py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Contact</h2>
          <p className="text-gray-600 text-lg max-w-2xl">
            Placeholder content for the contact section.
          </p>
        </div>
      </section>
    </main>
  );
}
