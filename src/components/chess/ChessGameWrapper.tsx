import React, { useContext, useEffect, useRef, useState } from "react";
import ChessBoard from "./ChessBoard";
import MiddleSection from "./MiddleSection";
import Messenger from "./Messenger";
import useSocket from "@/hooks/useSocket";
import { ChessContext } from "@/context/chess";
import { chessEvents } from "@/constants/chessEvents";
import { toast } from "react-toastify";
import Menu from "./Menu";
import { LogoutOutlined } from "@mui/icons-material";
import QuitModel from "../molecule/QuitModel";
import { GameOverReasons } from "@/types/chess";
import GameOverScreen from "./GameOverScreen";

const ChessGameWrapper: React.FC = () => {
  const { socket } = useSocket();
  const [showModel, setShowModel] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<{
    show: boolean;
    reason: GameOverReasons | null;
  }>({
    show: false,
    reason: null,
  });
  const [quitModel, setQuitModel] = useState(false);

  const {
    state: { myCol, turn },
    dispatch,
  } = useContext(ChessContext);

  useEffect(() => {
    if (!socket) return;

    socket.on(chessEvents.NEW_GAME, (gameId, board, color) => {
      dispatch({ type: "newGame", payload: { gameId, board, col: color } });
      setShowModel(false);
    });

    socket.on(
      chessEvents.UPDATE_BOARD,
      ({ board, turn, latestMove, isCheck, gameOver }) => {
        dispatch({
          type: "updateBoard",
          payload: { board, turn, latestMove, isCheck },
        });

        if (gameOver.isTrue) {
          if (gameOver.reason === "checkMate" && turn !== myCol)
            setGameOver({ show: true, reason: GameOverReasons.CheckMateMeWon });
          else if (gameOver.reason === "checkMate" && turn === myCol)
            setGameOver({
              show: true,
              reason: GameOverReasons.CheckMateOppWon,
            });
          else if (gameOver.reason === "draw")
            setGameOver({ show: true, reason: GameOverReasons.Draw });
          else if (gameOver.reason === "stalemate") {
            setGameOver({ show: true, reason: GameOverReasons.StaleMate });
          }
        }
      }
    );

    socket.on(chessEvents.GAME_OVER, () => {
      setGameOver({ show: true, reason: GameOverReasons.OpponentLeft });
    });

    socket.on(
      chessEvents.WARNING_MSG,
      (message: string, fr: "w" | "b" | "both") => {
        if (fr == myCol || fr == "both") {
          toast.warn(message);
        }
      }
    );
  }, [socket, dispatch, myCol]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-b from-col-4 via-col-4 to-col-3">
      <div className="w-auto h-auto flex gap-1">
        <div className="absolute top-0 right-0 cursor-pointer bg-slate-200 px-4 py-2 flex justify-between">
          <div
            onClick={() => {
              setQuitModel(true);
            }}
          >
            Quit <LogoutOutlined />
          </div>
        </div>
        {showModel && <Menu socket={socket} setShowModel={setShowModel} />}
        <ChessBoard socket={socket} />
        <MiddleSection setGameOver={setGameOver} />
        <Messenger socket={socket} />
      </div>
      <QuitModel show={quitModel} setModel={setQuitModel} />
      {gameOver.show && <GameOverScreen reason={gameOver.reason} />}
    </div>
  );
};

export default ChessGameWrapper;
