import { HARD_CODED_BLOCKS_PER_COLUMN } from "@/constants";

const useBlocks = () => {
  const getBlocks = () => {
    return [...Array(HARD_CODED_BLOCKS_PER_COLUMN).keys()].map((_, index) => {
      return (
        <div
          onMouseEnter={(e) => {
            colorize(e.currentTarget);
          }}
          key={index}
        ></div>
      );
    });
  };

  const colorize = (el: HTMLDivElement) => {
    el.style.backgroundColor = "#ff7a00";
    setTimeout(() => {
      el.style.backgroundColor = "transparent";
    }, 300);
  };

  return { getBlocks };
};

export default useBlocks;
