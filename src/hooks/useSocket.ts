import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import io from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!socket) {
      const skt = io("http://localhost:8080");
      setSocket(skt);
    }
  }, [socket]);

  return {
    socket,
  };
};

export default useSocket;
