import Aurora from "@/components/aurora";

const TestPage = () => {
  return (
    <Aurora
      colorStops={["#ff8015", "#ff8015", "#ff8015"]}
      blend={0.5}
      amplitude={1.0}
      speed={1}
    />
  );
};

export default TestPage;
