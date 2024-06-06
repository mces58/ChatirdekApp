export interface Group {
  _id: string;
  name: string;
  description: string;
  owner: string;
  members: string[];
  deleted: boolean;
  createdAt: string;
}
