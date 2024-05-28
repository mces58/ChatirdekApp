import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import axios from 'axios';

import SendMessageIcon from 'src/assets/icons/send-message';
import { useTheme } from 'src/context/ThemeContext';
import { BASE_URL } from 'src/services/baseUrl';

import BaseBottomSheet from './BaseBottomSheet';

interface User {
  _id: string;
  fullName: string;
  profilePicture: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTime: string;
  messageInQueue: number;
}

interface FriendsBoxBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
  navigation: any;
}

const FriendsBoxBottomSheet: React.FC<FriendsBoxBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
  navigation,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users`);
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      key={item._id}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ccc',
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
      }}
      onPress={() => {
        onSwipeDown();
        navigation.navigate('Chat', {
          user: {
            userImg: item.profilePicture,
            isOnline: item.isOnline,
            fullName: item.fullName,
            lastMessage: item.lastMessage,
            lastMessageTime: item.lastMessageTime,
            messageInQueue: item.messageInQueue,
          },
          userId: '',
          receiverId: item._id,
        });
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Image
          source={{ uri: item.profilePicture }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <Text>{item.fullName}</Text>
      </View>

      <TouchableOpacity onPress={() => {}}>
        <SendMessageIcon width={35} height={35} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const content = (
    <ScrollView
      style={{
        flex: 1,
        marginTop: 20,
      }}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        gap: 20,
      }}
    >
      {users.map((user) => renderItem({ item: user }))}
    </ScrollView>
  );

  return (
    <BaseBottomSheet
      animationType="slide"
      isTransparent
      isVisible={isVisible}
      onSwipeDown={onSwipeDown}
      content={content}
      modalStyle={{
        height: SCREEN_HEIGHT * 0.8,
        backgroundColor: theme.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
      }}
    />
  );
};

export default FriendsBoxBottomSheet;
