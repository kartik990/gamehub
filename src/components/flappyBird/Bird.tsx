import React from "react";

const Bird = () => {
  return (
    <div className="bg-col-3  w-11 h-10 rounded-xl relative ">
      <div className="w-2 h-2 bg-white rounded-full absolute top-2 right-2" />
      <div className="w-2 h-1 bg-col-4 rounded-full absolute top-4 -right-[6px]" />
      <div className="w-7 h-4 bg-col-4 rounded-md absolute top-3 -left-2 animate-bounce " />
      <div className="w-4 h-1 bg-col-4 rounded-full absolute -bottom-2 left-1 animate-bounce " />
      <div className="w-4 h-1 bg-col-4 rounded-full absolute -bottom-2 right-1 animate-bounce " />
    </div>
  );
};

export default Bird;
