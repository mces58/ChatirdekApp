import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import axios from 'axios';

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

interface RequestBoxBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
  requests: User[];
  setRequests: (requests: User[]) => void;
}

const RequestBoxBottomSheet: React.FC<RequestBoxBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
  requests,
  setRequests,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  const { authUser } = useAuthContext();

  const getRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/friend-request/${authUser?._id}`);
      setRequests(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authUser) {
      getRequests();
    }
  }, [authUser]);

  const acceptFriendRequest = async (receiverId: string) => {
    axios
      .post(`${BASE_URL}/users/friend-request/accept`, {
        senderId: receiverId,
        recepientId: authUser?._id,
      })
      .then((res) => {
        if (res.status === 200) {
          getRequests();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

      <TouchableOpacity
        onPress={() => {
          acceptFriendRequest(item._id);
        }}
        style={{
          backgroundColor: '#499dff',
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: 'white' }}>Accept</Text>
      </TouchableOpacity>
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
      {requests.length > 0 ? (
        requests.map((request) => renderItem({ item: request }))
      ) : (
        <Text
          style={{
            textAlign: 'center',
          }}
        >
          No requests
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

export default RequestBoxBottomSheet;
