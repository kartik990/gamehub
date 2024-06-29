import React from "react";

interface OptionsStripProps {}

const OptionsStrip: React.FC<OptionsStripProps> = () => {
  return (
    <div className="flex">
      {[...Array(9)].map((_, idx) => {
        return (
          <div
            key={idx}
            className="w-10 h-10 border-black text-lg font-bold border-2 flex justify-center items-center"
          >
            {idx + 1}
          </div>
        );
      })}
    </div>
  );
};

export default OptionsStrip;
