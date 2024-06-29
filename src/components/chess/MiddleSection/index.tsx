import { ChessContext } from "@/context/chess";
import React, { useContext, useEffect, useState } from "react";
import { getPiece } from "../ChessBoard/Cell";
import Image from "next/image";

interface MiddleSectionProps {}

const MiddleSection: React.FC<MiddleSectionProps> = () => {
  const [myTime, setMyTime] = useState({ min: 10, sec: 0 });
  const [opponentTime, setOpponentTime] = useState({ min: 10, sec: 0 });

  const {
    state: { turn, myCol, moves },
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
        className={`  px-4 py-4
          flex justify-center items-center mx-4 text-2xl font-extrabold text-col-3 tracking-widest ${
            myCol != turn ? "bg-white" : "bg-col-1 text-slate-200"
          }
            ${opponentTime.min < 1 ? "text-red-400" : ""} `}
      >
        {`${opponentTime.min.toString().padStart(2, "0")}:${opponentTime.sec
          .toString()
          .padStart(2, "0")}`}
      </div>
      <div
        className="bg-slate-100 px-4 py-4
          flex justify-center items-center m-4 h-full overflow-hidden text-slate-600 "
      >
        <div className="flex flex-col justify-end gap-2 h-full">
          {moves.map((move, idx) => {
            const imgSrc = getPiece(move.piece, move.col);
            return idx % 2 ? (
              <div
                key={idx}
                className="flex items-center gap-2 px-2 py-1 border-slate-400 border-2 rounded-md font-bold"
              >
                <Image width={30} height={30} src={imgSrc} alt="piece" />
                <div className="">{move.from}</div>
                <div>{"to"}</div>
                <div>{move.to}</div>
              </div>
            ) : null;
          })}
        </div>
      </div>
      <div
        className={` px-4 py-4
          flex justify-center items-center mx-4 text-2xl font-extrabold text-col-3 tracking-widest ${
            myCol == turn ? "bg-white" : "bg-col-1 text-slate-200"
          } ${myTime.min < 1 ? "text-red-400" : ""} `}
      >
        {`${myTime.min.toString().padStart(2, "0")}:${myTime.sec
          .toString()
          .padStart(2, "0")}`}
      </div>
    </div>
  );
};

export default MiddleSection;
