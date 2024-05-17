import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import io from 'socket.io-client';

interface SocketContextType {
  socket: any;
  onlineUsers: any[]; // Burada online kullanıcılar için uygun bir tipi belirlemeniz gerekebilir.
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: [],
});

export const useSocketContext = () => {
  return useContext(SocketContext);
};

interface SocketContextProviderProps {
  children: ReactNode;
}

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const newSocket = io('http://172.16.24.239:5000', {
      query: {
        token: AsyncStorage.getItem('authToken'),
      },
    });

    newSocket.on('onlineUsers', (users: any[]) => {
      setOnlineUsers(users);
    });

    setSocket(newSocket);
    console.log(socket?._opts.query.token._j);

    setUserId(jwtDecode(socket?._opts.query.token._j)._id);
    console.log(userId);

    console.log(onlineUsers);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
