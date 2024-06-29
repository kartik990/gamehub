import React, { useContext, useEffect, useState } from "react";
import Cell from "./Cell";
import { Socket } from "socket.io-client";
import { indexToPosition } from "@/utils/chess";
import { ChessContext } from "@/context/chess";

interface ChessBoardProps {
  socket: Socket | null;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ socket }) => {
  const [move, setMove] = useState({ from: "", to: "" });
  // const [turn, setTurn] = useState<"w" | "b">("w");

  const {
    state: { board, myCol, gameId, turn },
  } = useContext(ChessContext);

  const isInverted = myCol == "b";

  const handleMove = (i: number, j: number, col: string | undefined): void => {
    const pos = indexToPosition(i, j);

    if (turn != myCol) return;

    if (move.from === "" || col == myCol) {
      setMove((prev) => ({ ...prev, from: pos }));
    } else {
      setMove((prev) => ({ ...prev, to: pos }));
    }
  };

  useEffect(() => {
    if (move.from !== "" && move.to !== "") {
      socket?.emit("move", gameId, move);
      setMove({ from: "", to: "" });
    }
  }, [move, socket, gameId]);

  const cols = "abcdefgh";

  return (
    <div
      className={`w-[480px] h-[480px] bg-slate-100 b grid grid-row-8 grid-cols-8
     ${isInverted ? "rotate-180" : ""}`}
    >
      {board?.length ? (
        board.map((row, i) =>
          row?.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => handleMove(i, j, cell?.color)}
              className="relative"
            >
              <Cell
                isInverted={isInverted}
                isDarkCell={(i + j) % 2 === 1}
                cell={cell}
              />
              {j == 0 && !isInverted ? (
                <div className="absolute top-1 left-[-12px] text-xs text-white">
                  {8 - i}
                </div>
              ) : null}
              {j == 7 && isInverted ? (
                <div className="absolute bottom-1 right-[-12px] text-xs text-white  rotate-180">
                  {8 - i}
                </div>
              ) : null}
              {i == 7 && !isInverted ? (
                <div className="absolute bottom-[-20px] right-2 text-xs text-white">
                  {cols[j]}
                </div>
              ) : null}
              {i == 0 && isInverted ? (
                <div className="absolute left-2 top-[-20px]  text-xs text-white rotate-180">
                  {cols[j]}
                </div>
              ) : null}
            </div>
          ))
        )
      ) : (
        <div className="w-full h-full">Loading...</div>
      )}
    </div>
  );
};

export default ChessBoard;
