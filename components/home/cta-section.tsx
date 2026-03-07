import { GradientBackground } from "@/components/gradient-background";
import { LayoutTextFlip } from "@/components/layout-text-flip";

export function CtaSection() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden max-w-7xl mx-auto py-20 min-h-200">
      <GradientBackground />
      <div className="absolute inset-0 -z-10 bg-black/20" />

      <div className="px-6">
        <h2 className="text-4xl md:text-6xl tracking-tight text-center">
          Prompting ≠ Creativity
        </h2>

        <div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
          <LayoutTextFlip
            text="It is all about "
            words={["Storyboarding", "Generation", "Key Visuals", "Editing"]}
          />
        </div>
      </div>
    </section>
  );
}
