import { User } from './user';

export interface GroupMessage {
  groupMessageId: string;
  groupId: string;
  senderId: User;
  message: string;
  createdAt: string;
}

export interface GroupMessages {
  messages: GroupMessage[];
  participants: User[];
}

export interface GroupLastMessages {
  id: string;
  name: string;
  description: string;
  owner: User;
  members: User[];
  deleted: boolean;
  createdAt: string;
  lastMessage: {
    senderId: User;
    message: string;
    createdAt: string;
  };
}
