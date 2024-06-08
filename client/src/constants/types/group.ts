import { User } from './user';

export interface Group {
  _id: string;
  name: string;
  description: string;
  owner: string;
  members: User[];
  deleted: boolean;
  createdAt: string;
}
