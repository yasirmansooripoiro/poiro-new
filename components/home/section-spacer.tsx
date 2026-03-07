import { Cover } from "@/components/cover";

type SectionSpacerProps = {
  title: string;
};

export function SectionSpacer({ title }: SectionSpacerProps) {
  return (
    <div className="py-12 md:py-16 flex items-center justify-center">
      <Cover className="text-xs md:text-sm uppercase tracking-[0.22em]">
        {title}
      </Cover>
    </div>
  );
}
