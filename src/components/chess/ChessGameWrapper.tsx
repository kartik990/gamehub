import React, { useContext, useEffect, useState } from "react";
import ChessBoard from "./ChessBoard";
import MiddleSection from "./MiddleSection";
import Messenger from "./Messenger";
import useSocket from "@/hooks/useSocket";
import { ChessContext } from "@/context/chess";
import { chessEvents } from "@/constants/chessEvents";

interface ChessGameWrapperProps {}

const ChessGameWrapper: React.FC<ChessGameWrapperProps> = () => {
  const { socket } = useSocket();
  const [showModel, setShowModel] = useState<boolean>(true);

  const { dispatch } = useContext(ChessContext);

  const handleClick = () => {
    socket?.emit(chessEvents.INIT_GAME);
    setShowModel(false);
  };

  useEffect(() => {
    if (!socket) return;

    socket.on(chessEvents.NEW_GAME, (gameId, board, color) => {
      dispatch({ type: "newGame", payload: { gameId, board, col: color } });
    });

    socket.on(chessEvents.UPDATE_BOARD, (board, turn) => {
      dispatch({ type: "updateBoard", payload: { board, turn } });
    });
  }, [socket, dispatch]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-col-4">
      <div className="w-auto h-auto flex gap-1">
        {showModel && (
          <div className="w-screen h-screen flex justify-center items-center bg-slate-500 opacity-85 absolute top-0 left-0 z-10">
            <button
              className="w-36 h-16 bg-white text-lg text-col-4 rounded"
              onClick={handleClick}
            >
              New Game
            </button>
          </div>
        )}
        <ChessBoard socket={socket} />
        <MiddleSection />
        <Messenger socket={socket} />
      </div>
    </div>
  );
};

export default ChessGameWrapper;
