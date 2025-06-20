import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  setupSocketListeners,
  teardownSocketListeners,
} from "../socketHandlers";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io("http://localhost:4000", {
      reconnection: true,
      reconnectionAttempts: Infinity,
      randomizationFactor: 0.5,
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("Socket connected");
      setIsConnected(true);
      setupSocketListeners(newSocket); // Подписка на события
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setIsConnected(false);
      teardownSocketListeners(newSocket); // Отписка от событий
    });

    newSocket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    setSocket(newSocket);

    return () => {
      teardownSocketListeners(newSocket);
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
