import { useEffect } from 'react';
import SocketApi from '../Api/socket.js';


const useConnectSocket = () => {
  const connectSocket = () => {
    SocketApi.createConnection();
  };

  useEffect(() => {
    connectSocket();
  }, []);
};

export default useConnectSocket;
