import { User } from './user';

export interface Message {
  _id: string;
  text: string;
  createdAt: string;
  user: {
    _id: string;
  };
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
