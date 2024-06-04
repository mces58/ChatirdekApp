import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import axios from 'axios';

import BinIcon from 'src/assets/icons/bin';
import SendMessageIcon from 'src/assets/icons/send-message';
import { useAuthContext } from 'src/context/AuthContext';
import { useTheme } from 'src/context/ThemeContext';
import { BASE_URL } from 'src/services/baseUrl';

import BaseBottomSheet from './bottomSheet/BaseBottomSheet';

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
  const [friends, setFriends] = useState<User[]>([]);
  const { authUser } = useAuthContext();

  const getFriends = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/accepted-friends/${authUser?._id}`);
      setFriends(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFriend = async (friendId: string) => {
    try {
      await axios.delete(`${BASE_URL}/users/remove-friend/${authUser?._id}/${friendId}`);
      getFriends();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authUser) {
      getFriends();
    }
  }, [authUser, friends, setFriends]);

  const renderItem = ({ item, index }: { item: User; index: number }) => (
    <TouchableOpacity
      key={index}
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
      onPress={() => {}}
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

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <TouchableOpacity
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
          style={{
            backgroundColor: '#499dff',
            padding: 10,
            borderRadius: 10,
          }}
        >
          <SendMessageIcon width={20} height={20} color="white" strokeWidth={4} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            deleteFriend(item._id);
          }}
          style={{
            backgroundColor: '#ff3b30',
            padding: 10,
            borderRadius: 10,
          }}
        >
          <BinIcon width={20} height={20} color="white" strokeWidth={4} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const content = (
    <View
      style={{
        flex: 1,
        marginTop: 30,
        gap: 10,
        backgroundColor: 'white',
      }}
    >
      {friends.length > 0 ? (
        friends.map((item, index) => renderItem({ item, index }))
      ) : (
        <Text
          style={{
            textAlign: 'center',
          }}
        >
          No friends found
        </Text>
      )}
    </View>
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
