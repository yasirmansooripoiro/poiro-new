import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const FAQData = [
  {
    id: "item-1",
    question: "Do we need to learn a new tool or workflow?",
    answer:
      "No. You brief us. We deliver. Your team reviews and approves. Zero ramp-up, zero prompt engineering, zero AI learning curve — ever.",
  },
  {
    id: "item-2",
    question: "Will it actually look on brand or like generic AI",
    answer:
      "On-brand. Always. Brandify™ encodes your visual identity into the production system. Brand Cosmos™ ensures every creative direction is strategically grounded — not pulled from a template.",
  },
  {
    id: "item-3",
    question: "How accurate is it for ecommerce and PDP's",
    answer:
      "Highly. Omni-focus™ is built specifically for product integrity — logos, textures, colors, fine details. If it ships in your name, it has to be right. We treat that seriously.",
  },
  {
    id: "item-4",
    question: "What format or placements do you cover?",
    answer:
      "All of them. Statics, Reels, TikTok, Shorts, PDPs, display, performance variants, resizes, and localization across any market — delivered to your exact platform specs.",
  },
];

export default function Faq() {
  return (
    <section className="w-full py-10 md:py-14">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
        <div className="mb-10 md:mb-12">
          <p className="text-xs uppercase tracking-[0.24em] text-[#ff8015]">
            FAQs
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
            Real Questions. Straight Answers.
          </h2>
          {/* <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-300 md:text-base">
            Everything teams ask us before starting a new creative production
            partnership.
          </p> */}
        </div>

        <div className="w-full rounded-2xl border border-neutral-800/80 bg-neutral-950/40 px-4 py-2 backdrop-blur-sm md:px-6">
          <Accordion type="single" collapsible>
            {FAQData.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-neutral-800/80 transition-colors duration-300 hover:border-[#ff8015]/70"
              >
                <AccordionTrigger className="gap-4 py-5 text-left text-base font-medium text-neutral-100 hover:text-[#ff9a47] hover:no-underline md:text-lg">
                  <span className="mt-0.5 text-xl leading-none text-[#ff8015] md:text-2xl">
                    +
                  </span>
                  <span className="flex-1">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 pl-8 pr-6 text-sm leading-relaxed text-neutral-300 md:pl-9 md:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
