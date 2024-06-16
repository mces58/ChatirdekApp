import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { User } from 'src/constants/types/user';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  Main: { userId: string };
  Home: undefined;
  Chat: {
    senderId: string;
    receiverId: string;
  };
  Group: undefined;
  GroupChat: { groupId: string };
  GroupInfo: { groupId: string };
  UserProfile: { user: User };
  Profile: { user: User };
};

type OnboardingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;
export interface OnboardingProps {
  navigation: OnboardingScreenNavigationProp;
}

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;
export interface RegisterProps {
  navigation: RegisterScreenNavigationProp;
}

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export interface HomeProps {
  navigation: HomeScreenNavigationProp;
}

type ChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Chat'>;
type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;
export interface ChatProps {
  navigation: ChatScreenNavigationProp;
  route: ChatScreenRouteProp;
}

type UserProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'UserProfile'
>;
type UserProfileScreenRouteProp = RouteProp<RootStackParamList, 'UserProfile'>;
export interface UserProfileProps {
  navigation: UserProfileScreenNavigationProp;
  route: UserProfileScreenRouteProp;
}

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;
export interface ProfileProps {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
}

type GroupChatScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'GroupChat'
>;
type GroupChatScreenRouteProp = RouteProp<RootStackParamList, 'GroupChat'>;
export interface GroupChatProps {
  navigation: GroupChatScreenNavigationProp;
  route: GroupChatScreenRouteProp;
}

type GroupInfoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'GroupInfo'
>;
type GroupInfoScreenRouteProp = RouteProp<RootStackParamList, 'GroupInfo'>;
export interface GroupInfoProps {
  navigation: GroupInfoScreenNavigationProp;
  route: GroupInfoScreenRouteProp;
}
