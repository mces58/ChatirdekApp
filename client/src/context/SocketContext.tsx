import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

import io from 'socket.io-client';

import { useAuthContext } from './AuthContext';

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
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const newSocket = io('http://172.16.24.239:5000', {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(newSocket);

      // console.log(socket);

      newSocket.on('getOnlineUsers', (users: any[]) => {
        setOnlineUsers(users);
        console.log(users);
      });

      return () => newSocket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
    console.log(onlineUsers);
  }, [authUser]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active' && authUser) {
        // Reconnect socket when app comes to foreground
        const newSocket = io('http://172.16.24.239:5000', {
          query: {
            userId: authUser._id,
          },
        });

        setSocket(newSocket);

        newSocket.on('getOnlineUsers', (users: any[]) => {
          setOnlineUsers(users);
          console.log(users);
        });
      } else if (nextAppState.match(/inactive|background/) && socket) {
        // Close socket when app goes to background
        socket.close();
        setSocket(null);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [authUser, socket]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
