import { User } from './user';

export interface Message {
  id: string;
  message: string;
  createdAt: string;
  senderId: string;
  receiverId: string;
}

export interface LastMessages {
  receiver: User;
  lastMessage: {
    id: string;
    senderId: string;
    receiverId: string;
    message: string;
    createdAt: string;
  };
}
