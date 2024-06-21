import { User } from './user';

export interface Message {
  id: string;
  message: string;
  image: string;
  audio: string;
  createdAt: string;
  senderId: string;
  receiverId: string;
}

export interface MessagesWithReceiver {
  receiver: User;
  messages: Message[];
}

export interface LastMessages {
  receiver: User;
  lastMessage: {
    id: string;
    senderId: string;
    receiverId: string;
    message: string;
    image: string;
    audio: string;
    createdAt: string;
  };
}
