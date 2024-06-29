import { ChessContext } from "@/context/chess";
import React, { useContext, useEffect, useState } from "react";

interface MiddleSectionProps {}

const MiddleSection: React.FC<MiddleSectionProps> = () => {
  const [myTime, setMyTime] = useState({ min: 15, sec: 0 });
  const [opponentTime, setOpponentTime] = useState({ min: 15, sec: 0 });

  const {
    state: { turn, myCol },
  } = useContext(ChessContext);

  useEffect(() => {
    if (myCol == "") return;
    const timer = setInterval(() => {
      if (turn == myCol) {
        let s = myTime.sec - 1;
        if (s == -1) {
          setMyTime({ min: myTime.min - 1, sec: 59 });
        } else {
          setMyTime({ ...myTime, sec: s });
        }
      } else {
        let s = opponentTime.sec - 1;
        if (s == -1) {
          setOpponentTime({ min: opponentTime.min - 1, sec: 59 });
        } else {
          setOpponentTime({ ...opponentTime, sec: s });
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [myTime, opponentTime, myCol, turn]);

  return (
    <div className="w-[200px] h-[480px] flex flex-col justify-between ">
      <div
        className=" bg-white px-4 py-4
          flex justify-center items-center mx-4 text-2xl font-extrabold text-col-3 tracking-widest "
      >
        {`${opponentTime.min.toString().padStart(2, "0")}:${opponentTime.sec
          .toString()
          .padStart(2, "0")}`}
      </div>
      <div
        className="bg-col-1 px-4 py-4
          flex justify-center items-center m-4 h-full text-white "
      >
        Moves
      </div>
      <div
        className=" bg-white px-4 py-4
          flex justify-center items-center mx-4 text-2xl font-extrabold text-col-3 tracking-widest "
      >
        {`${myTime.min.toString().padStart(2, "0")}:${myTime.sec
          .toString()
          .padStart(2, "0")}`}
      </div>
    </div>
  );
};

export default MiddleSection;
