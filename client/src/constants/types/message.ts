export interface Message {
  _id: string;
  text: string;
  createdAt: string;
  user: {
    _id: string;
  };
}
