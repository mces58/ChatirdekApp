import { User } from './user';

export interface Group {
  id: string;
  name: string;
  description: string;
  owner: User;
  members: User[];
  createdAt: string;
  deleted: boolean;
}

export interface CreateGroup {
  name: string;
  members: string[];
}
