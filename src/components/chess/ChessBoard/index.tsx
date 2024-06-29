import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useState,
} from "react";
import Cell from "./Cell";
import { BoardType } from "@/types/chess";
import { Socket } from "socket.io-client";
import { indexToPosition } from "@/utils/chess";
import useSocket from "@/hooks/useSocket";
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

    if (move.from === "") {
      setMove((prev) => ({ ...prev, from: pos }));
    } else {
      // send move
      setMove((prev) => ({ ...prev, to: pos }));
      // setTurn((prev) => (prev === "w" ? "w" : "b"));
    }
  };

  useEffect(() => {
    if (move.from !== "" && move.to !== "") {
      socket?.emit("move", gameId, move);
      setMove({ from: "", to: "" });
    }
  }, [move, socket, gameId]);

  return (
    <div
      className={`w-[480px] h-[480px] bg-slate-100 b grid grid-row-8 grid-cols-8
     ${isInverted ? "rotate-180" : ""}`}
    >
      {board?.length ? (
        board.map((row, i) =>
          row?.map((cell, j) => (
            <div
              key={`${i}- ${j}`}
              onClick={() => handleMove(i, j, cell?.color)}
            >
              <Cell
                isInverted={isInverted}
                isDarkCell={(i + j) % 2 === 1}
                cell={cell}
              />
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
