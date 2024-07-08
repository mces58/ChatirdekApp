export interface RegisterData {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  publicKey: string;
}

export interface LoginData {
  userName: string;
  password: string;
}

export interface ForgotPassword {
  email: string;
}

export interface ResetPassword {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  gender: string;
  avatar: string;
  about: string;
  incomingFriendRequests: string[];
  outgoingFriendRequests: string[];
  friends: string[];
  hideOnlineStatus: boolean;
  hideAvatar: boolean;
  hideAbout: boolean;
  createdAt: string;
  publicKey: string;
}

export interface AuthUser {
  token: string;
}
