import { useSocketContext } from "../Contexts/SocketContext";

const useSocket = () => {
  const { socket, isConnected } = useSocketContext();

  return { socket, isConnected };
};

export default useSocket;
