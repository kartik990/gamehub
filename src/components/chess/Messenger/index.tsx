import QuitModel from "@/components/molecule/QuitModel";
import { chessEvents } from "@/constants/chessEvents";
import { MessageType } from "@/types/chess";
import { Home, LogoutOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface MessengerProps {
  socket: Socket | null;
}

const Messenger: React.FC<MessengerProps> = ({ socket }) => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [quitModel, setQuitModel] = useState(false);

  const handleSend = () => {
    socket?.emit(chessEvents.ChatToServer, {
      senderId: socket.id,
      content: msg,
      timeStamp: new Date(),
    });
    setMsg("");
  };

  useEffect(() => {
    if (socket) {
      socket.on(chessEvents.ChatFromServer, (data: any) => {
        setMessages((prev) => {
          return [...prev, data];
        });
      });
    }
  }, [socket]);

  return (
    <div className="bg-slate-100 w-[380px] h-[480px] flex flex-col justify-end overflow-hidden">
      {messages.map((message, idx) => (
        <div
          className={`bg-col-2 px-4 py-2 mb-2 mx-2 rounded-md ${
            socket?.id === message.senderId ? `self-end` : `self-start`
          }`}
          key={idx}
        >
          {message.content}
        </div>
      ))}
      <div className="flex ">
        <input
          type="text"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          onKeyDown={(e) => (e.key === "Enter" ? handleSend() : null)}
          className="w-3/4 border-t-2 border-slate-200 px-2 outline-none"
        />
        <button className="w-1/4 p-3 bg-col-3 text-white" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Messenger;
