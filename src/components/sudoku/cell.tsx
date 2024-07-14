import React from "react";

const Cell = ({
  value,
  handleSelect,
  r,
  c,
  selected,
}: {
  value?: number;
  handleSelect: () => void;
  r?: number;
  c?: number;
  selected: { r: number; c: number } | null;
}) => {
  return (
    <div
      className={`w-8 h-8 bg-col-2 border-col-4 rounded-sm font-bold flex justify-center items-center text-xl hover:border-4 ${
        selected?.r === r && selected?.c == c ? "border-4" : ""
      } ${value ? "hover:border-0 cursor-default" : "cursor-pointer"}`}
      onClick={handleSelect}
    >
      {value ? value : ""}
    </div>
  );
};

export default Cell;
