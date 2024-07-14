import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import io from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!socket) {
      let skt;
      if (process.env.NODE_ENV === "production") {
        skt = io("https://gamehub-server.onrender.com");
      } else {
        skt = io("http://localhost:8080/");
      }
      setSocket(skt);
    }

    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  return {
    socket,
  };
};

export default useSocket;
