import React from "react";

const Cell = ({
  value = "",
  handleSelect,
  r,
  c,
}: {
  value?: string;
  handleSelect: () => void;
  r?: number;
  c?: number;
}) => {
  return (
    <div
      className={`w-10 h-10 bg-col-2 border-col-4 rounded-sm font-bold flex justify-center items-center text-xl hover:border-[1.8px]`}
      onClick={handleSelect}
    >
      {value ? value : ""}
    </div>
  );
};

export default Cell;
