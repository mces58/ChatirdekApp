export type RootStackParamList = {
  Onboarding: { screenName: string };
  Login: undefined;
  Register: undefined;
  HomeStack: undefined;
  Home: { userId: string };
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
  Groups: undefined;
  SettingStack: undefined;
  Setting: undefined;
  Profile: undefined;
  Main: { userId: string };
  UserProfile: undefined;
  GroupChat: undefined;
};
