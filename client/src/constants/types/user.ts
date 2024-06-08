export interface SignupData {
  fullName: string;
  userName: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

export interface LoginData {
  userName: string;
  password: string;
}

export interface User {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  profilePicture: string;
  about: string;
  createdAt: string;
  gender: string;
  friends: string[];
  friendRequests: string[];
  sentRequests: string[];
}

export interface AuthUser {
  _id: string;
  fullName: string;
  userName: string;
  profilePicture: string;
  createdAt: string;
  token: string;
}
