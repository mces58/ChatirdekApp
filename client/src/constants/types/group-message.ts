export interface GroupMessage {
  _id: string;
  message: string;
  senderId: string;
  groupId: string;
  createdAt: string;
  text: string;
  user: {
    _id: string;
  };
}
