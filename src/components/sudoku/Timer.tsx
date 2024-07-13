import React, { useEffect, useState } from "react";
import TimerIcon from "@mui/icons-material/Timer";

interface props {
  winner: boolean;
  time: {
    min: number;
    sec: number;
  };
  setTime: React.Dispatch<
    React.SetStateAction<{
      min: number;
      sec: number;
    }>
  >;
}

const Timer = ({ winner, time, setTime }: props) => {
  useEffect(() => {
    if (winner) return;

    const timer = setInterval(() => {
      let s = time.sec + 1;
      if (s == 60) {
        setTime({ min: time.min + 1, sec: 0 });
      } else {
        setTime({ ...time, sec: s });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time, winner, setTime]);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="w-full bg-col-1 py-3 rounded-2xl flex flex-col justify-center items-center">
        <div className="w-full flex justify-center text-4xl font-extrabold text-white tracking-widest mb-3 pb-3 border-b-4 ">
          {`${time.min.toString().padStart(2, "0")}:${time.sec
            .toString()
            .padStart(2, "0")}`}
        </div>
        <div className="text-lg text-white flex gap-1 items-end">
          <TimerIcon />
          Timer
        </div>
      </div>
    </div>
  );
};

export default Timer;
