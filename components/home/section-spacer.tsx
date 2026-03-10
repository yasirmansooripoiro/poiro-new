import { SectionTitle } from "@/components/section-title";

type SectionSpacerProps = {
  title: string;
};

export function SectionSpacer({ title }: SectionSpacerProps) {
  return <SectionTitle title={title} />;
}
