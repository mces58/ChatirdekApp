import React from 'react';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { io, Socket } from 'socket.io-client';

import { GroupMessages } from 'src/constants/types/group-message';
import { Message } from 'src/constants/types/message';

interface SocketContextType {
  socket: Socket | null;
  messages: Message[];
  getMessages: (senderId: string, receiverId: string) => void;
  sendMessage: (senderId: string, receiverId: string, message: string) => void;
  groupMessages: GroupMessages;
  getGroupMessages: (senderId: string, groupId: string) => void;
  sendGroupMessage: (senderId: string, groupId: string, message: string) => void;
  isTyping: boolean;
  startTyping: (senderId: string, receiverId: string) => void;
  stopTyping: (senderId: string, receiverId: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketContextProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [groupMessages, setGroupMessages] = useState<GroupMessages>({} as GroupMessages);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    const newSocket = io('http://192.168.3.1:5000', {
      transports: ['websocket'],
    });
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      const handleMessages = ({
        data,
        success,
      }: {
        data: Message[];
        success: boolean;
      }) => {
        if (success) {
          setMessages(data);
        }
      };

      socket.on('messages', handleMessages);
      return () => {
        socket.off('messages', handleMessages);
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      const handleGroupMessages = ({
        data,
        success,
      }: {
        data: GroupMessages;
        success: boolean;
      }) => {
        if (success) {
          setGroupMessages(data);
        }
      };

      socket.on('groupMessages', handleGroupMessages);
      return () => {
        socket.off('groupMessages', handleGroupMessages);
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      const handleTyping = ({ isTyping }: { isTyping: boolean }) => {
        setIsTyping(isTyping);
      };

      socket.on('startTyping', handleTyping);
      socket.on('stopTyping', handleTyping);

      return () => {
        socket.off('startTyping', handleTyping);
        socket.off('stopTyping', handleTyping);
      };
    }
  }, [socket]);

  const getMessages = (senderId: string, receiverId: string) => {
    if (socket) {
      socket.emit('getMessages', { senderId, receiverId });
    }
  };

  const sendMessage = (senderId: string, receiverId: string, message: string) => {
    if (socket) {
      socket.emit('sendMessage', { senderId, receiverId, message });
    }
  };

  const getGroupMessages = (senderId: string, groupId: string) => {
    if (socket) {
      socket.emit('getGroupMessages', { senderId, groupId });
    }
  };

  const sendGroupMessage = (senderId: string, groupId: string, message: string) => {
    if (socket) {
      socket.emit('sendGroupMessage', { senderId, groupId, message });
    }
  };

  const startTyping = (senderId: string, receiverId: string) => {
    if (socket) {
      socket.emit('startTyping', { senderId, receiverId, isTyping: true });
    }
  };

  const stopTyping = (senderId: string, receiverId: string) => {
    if (socket) {
      socket.emit('stopTyping', { senderId, receiverId, isTyping: false });
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        messages,
        getMessages,
        sendMessage,
        groupMessages,
        getGroupMessages,
        sendGroupMessage,
        isTyping,
        startTyping,
        stopTyping,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
