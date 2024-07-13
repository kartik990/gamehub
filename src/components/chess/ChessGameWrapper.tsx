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

interface ChessGameWrapperProps {}

const ChessGameWrapper: React.FC<ChessGameWrapperProps> = () => {
  const { socket } = useSocket();
  const [showModel, setShowModel] = useState<boolean>(true);
  const [quitModel, setQuitModel] = useState(false);

  const {
    state: { myCol },
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
      ({ board, turn, latestMove, isCheck }) => {
        dispatch({
          type: "updateBoard",
          payload: { board, turn, latestMove, isCheck },
        });
      }
    );

    socket.on(
      chessEvents.WARNING_MSG,
      (message: string, fr: "w" | "b" | "both") => {
        if (fr == myCol || fr == "both") {
          toast.warn(message);
        }
      }
    );

    // socket.on(
    //   chessEvents.CRITICAL_MSG,
    //   (message: string, fr: "w" | "b" | "both") => {
    //     if(message=="check-mate"){

    //     }
    //   }
    // );
  }, [socket, dispatch, myCol]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-col-4">
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
        <MiddleSection />
        <Messenger socket={socket} />
      </div>
      <QuitModel show={quitModel} setModel={setQuitModel} />
    </div>
  );
};

export default ChessGameWrapper;
