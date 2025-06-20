import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BottomMenu } from "./BottomMenu";
import { useStore } from "../Hooks/useStore";
import useSocket from "../Hooks/useSocket";
import { useNotification } from "../Providers/NotificationProvider";
import errorMessages from "../errorMessages.json";

export const LayoutComponent = ({ children }) => {
  const { socket, isConnected } = useSocket();
  const navigate = useNavigate();
  const { player } = useStore();
  const { addNotification } = useNotification();

  // Перенаправление при отсутствии игрока или подключения
  useEffect(() => {
    if (!player || !isConnected) {
      navigate("/");
    }
  }, [player, isConnected, navigate]);

  // Обработка ошибок сокета
  useEffect(() => {
    if (!socket) return;

    const handleError = (data) => {
      const message = errorMessages[data.message] || data.message;
      addNotification("error", message);
    };

    socket.on("error", handleError);

    return () => {
      socket.off("error", handleError);
    };
  }, [socket, addNotification]);

  return (
    <div className="container">
      <div className="content">{children}</div>
      <BottomMenu />
    </div>
  );
};