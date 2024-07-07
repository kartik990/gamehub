import React, { useContext, useEffect, useRef, useState } from "react";
import Cell from "./Cell";
import { Socket } from "socket.io-client";
import { indexToPosition } from "@/utils/chess";
import { ChessContext } from "@/context/chess";
import PromotionCard from "./promotionCard";

interface ChessBoardProps {
  socket: Socket | null;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ socket }) => {
  const [move, setMove] = useState<{
    from: string;
    to: string;
    promotion: null | string;
  }>({
    from: "",
    to: "",
    promotion: null,
  });
  const [promoteTo, setPromoteTo] = useState<null | string>("");
  const [showPromotion, setShowPromotion] = useState(false);
  const selectedPiece = useRef<{
    type: undefined | string;
    col: undefined | string;
  }>({ type: undefined, col: undefined });

  const {
    state: { board, myCol, gameId, turn },
  } = useContext(ChessContext);

  const isInverted = myCol == "b";

  const handleMove = (
    i: number,
    j: number,
    col: string | undefined,
    type: string | undefined
  ): void => {
    if (move.from == "" && turn != myCol) return;

    const pos = indexToPosition(i, j);

    if (move.from === "" || col == myCol) {
      setMove((prev) => ({ ...prev, from: pos }));
      selectedPiece.current.type = type;
      selectedPiece.current.col = col;
    } else {
      if (
        (pos.endsWith("8") &&
          selectedPiece.current.type == "p" &&
          selectedPiece.current.col == "w") ||
        (pos[1] == "1" &&
          selectedPiece.current.type == "p" &&
          selectedPiece.current.col == "b")
      ) {
        console.log("in my");
        setShowPromotion(true);
        setMove((prev) => ({ ...prev, to: pos, promotion: "hold" }));
        selectedPiece.current = { type: undefined, col: undefined };
      } else {
        console.log("in normal");
        setMove((prev) => ({ ...prev, to: pos }));
      }
    }
  };

  useEffect(() => {
    setMove((prev) => ({
      ...prev,
      promotion: promoteTo,
    }));
    setShowPromotion(false);
  }, [promoteTo]);

  useEffect(() => {
    if (move.from !== "" && move.to !== "" && move?.promotion != "hold") {
      socket?.emit("move", gameId, move);
      setMove({ from: "", to: "", promotion: null });
    }
  }, [move, socket, gameId, promoteTo]);

  const cols = "abcdefgh";

  return (
    <div className="relative">
      <div
        className={`w-[480px] h-[480px] bg-slate-100 grid grid-row-8 grid-cols-8
         ${isInverted ? "rotate-180" : ""}`}
      >
        {board?.length ? (
          board.map((row, i) =>
            row?.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                onClick={() => handleMove(i, j, cell?.color, cell?.type)}
                className="relative"
              >
                <Cell
                  isInverted={isInverted}
                  isDarkCell={(i + j) % 2 === 1}
                  cell={cell}
                  selected={cell?.square == move.from}
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
          <div className="w-full h-full row-start-3 row-end-6 col-start-4 col-end-5 text-xl text-col-3 font-bold">
            Loading...
          </div>
        )}
      </div>
      {showPromotion && (
        <div className="absolute  top-[-60px]">
          <PromotionCard col={myCol} setPromoteTo={setPromoteTo} />
        </div>
      )}
    </div>
  );
};

export default ChessBoard;
