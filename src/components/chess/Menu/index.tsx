import Image from "next/image";
import chess from "@/assets/chess.png";
import { useEffect, useState } from "react";
import { ContentCopy, Create, Login, Logout } from "@mui/icons-material";
import { toast } from "react-toastify";
import Link from "next/link";
import { Socket } from "socket.io-client";
import { chessEvents } from "@/constants/chessEvents";

interface MenuProps {
  socket: Socket | null;
  setShowModel: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<MenuProps> = ({ socket, setShowModel }) => {
  const [roomId, setRoomID] = useState<string | null>(null);
  const [show, setShow] = useState({ create: true, join: true, input: false });
  const [inputVal, setInputVal] = useState("");

  const handleCreateRoom = () => {
    const id = Math.ceil(Math.random() * 10000)
      .toString()
      .padEnd(4, "0");

    setRoomID(id);
    setShow((prev) => ({ ...prev, join: false, create: false }));

    socket?.emit(chessEvents.CREATE_ROOM, id);
  };

  const handleCopy = () => {
    if (roomId) navigator.clipboard.writeText(roomId);
    toast.info("Room ID Copied");
  };

  const handleJoinRoom = () => {
    setShow({ create: false, join: false, input: true });
  };

  const handleNewRandomGame = () => {
    socket?.emit(chessEvents.INIT_GAME);
    setShowModel(false);
  };

  const handleStartGameWithFriend = () => {
    socket?.emit(chessEvents.JOIN_ROOM, inputVal);
  };

  useEffect(() => {
    if (socket) {
      socket.on(chessEvents.ROOM_ERROR, (msg) => {
        toast.warn("invalid room id");
      });
    }
  }, [socket]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-col-4 absolute top-0 left-0 z-10 ">
      <div className="flex justify-between gap-10 w-full max-w-[80%]">
        <Image src={chess} alt="chess" className="w-[350px] h-[350px]" />
        <div className="relative">
          <div className="text-5xl text-white font-semibold">Chess</div>
          <div className="text-white my-4">
            Chess is a two player game you can play either with your friend by
            generating a room using create room button, or if you don&apos;t
            have a friend available right now you can click on play with a
            stranger to create a new room and play with some random player.
          </div>
          <div className="flex justify-between mt-6 gap-8">
            <div className="w-[50%]">
              <div className="text-white text-2xl font-bold mb-4">
                Play with some friend
              </div>
              <div className="flex gap-4">
                {show.create && (
                  <button
                    className="px-4 py-2 bg-white  text-col-4 rounded"
                    onClick={() => handleCreateRoom()}
                  >
                    Create Room
                  </button>
                )}
                {roomId && (
                  <div className="text-white">
                    Share this room Id with your friend and wait till they joins
                    :{" "}
                    <span
                      onClick={handleCopy}
                      className="text-xl border-b-2 border-slate-500 px-2 py-1 cursor-pointer"
                    >
                      {roomId} <ContentCopy />
                    </span>
                  </div>
                )}
                {show.create}
                {show.join && (
                  <button
                    className="px-4 py-2 bg-white  text-col-4 rounded"
                    onClick={() => handleJoinRoom()}
                  >
                    Join Room
                  </button>
                )}
              </div>
              {show.input && (
                <div className="flex flex-col gap-2 ">
                  <div className="text-white">Please Enter Room ID</div>
                  <input
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    className="bg-slate-300 px-4 py-2"
                  />
                  <button
                    className="px-4 py-2 bg-white  text-col-4 rounded"
                    onClick={handleStartGameWithFriend}
                  >
                    Join <Login />
                  </button>
                </div>
              )}
            </div>
            <div className="w-[50%] flex flex-col ">
              <div className="text-white text-2xl font-bold mb-4">
                {" "}
                Play with random player
              </div>
              <button
                className="px-4 py-2 bg-white text-col-4 rounded"
                onClick={() => handleNewRandomGame()}
              >
                Play with Random Player
              </button>
            </div>
          </div>
          <Link href="/">
            <div className="absolute top-4 right-0 hover:scale-110 text-white cursor-pointer">
              Homepage <Logout />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
