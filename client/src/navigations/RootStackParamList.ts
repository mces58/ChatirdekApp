export type RootStackParamList = {
  Onboarding: { screenName: string };
  Login: undefined;
  HomeStack: undefined;
  Home: undefined;
  Chat: {
    user: {
      userImg: string;
      isOnline: boolean;
      fullName: string;
      lastMessage: string;
      lastMessageTime: string;
      messageInQueue: number;
    };
  };
  Updates: undefined;
  Groups: undefined;
  Settings: undefined;
  Main: undefined;
};
