import { Timeline } from "./timeline/timeline";

export function TimeLines() {
  const data = [
    {
      title: "01 - Send the Brief",
      content: <p>Share your goal, product, and guardrails.</p>,
    },
    {
      title: "02 - We Shape the Direction",
      content: <p>Hooks, angles, and concepts built for your brand.</p>,
    },
    {
      title: "03 - We Create",
      content: <p>Statics, videos, and PDP assets for every placement.</p>,
    },
    {
      title: "04 - You Review",
      content: <p>Feedback in. We refine fast.</p>,
    },
    {
      title: "05 - Ready to Publish",
      content: <p>Final creatives delivered to spec.</p>,
    },
    {
      title: "06 - Then We Scale",
      content: <p>More variants, markets, and winning creatives.</p>,
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
