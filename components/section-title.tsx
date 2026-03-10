import { cn } from "@/lib/utils";

type SectionTitleProps = {
  title: string;
  className?: string;
  titleClassName?: string;
};

export function SectionTitle({
  title,
  className,
  titleClassName,
}: SectionTitleProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <p className={cn("text-xs md:text-sm uppercase tracking-[0.22em]", titleClassName)}>
        {title}
      </p>
    </div>
  );
}
