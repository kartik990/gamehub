import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import io from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!socket) {
      const skt = io("https://gamehub-server.onrender.com");
      setSocket(skt);
    }

    console.log(socket);
  }, [socket]);

  return {
    socket,
  };
};

export default useSocket;
