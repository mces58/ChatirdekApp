import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import axios from 'axios';

import { BASE_URL } from 'src/services/baseUrl';

interface DiscoverProps {
  navigation: any;
}

const Discover: React.FC<DiscoverProps> = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [userId] = useState<string>('');
  useEffect(() => {
    const getUsers = async () => {
      axios.get(`${BASE_URL}/users`).then((res) => {
        setUsers(res.data);
      });
    };
    getUsers();
  }, []);

  const renderUsers = () => {
    return users.map((user: any, index: number) => {
      return (
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 20,
            backgroundColor: '#ccc',
            width: '100%',
            padding: 10,
            borderRadius: 10,
          }}
          onPress={() => {
            console.log(user._id);

            navigation.navigate('Chat', {
              user: {
                userImg: user.profilePicture,
                isOnline: user.isOnline,
                fullName: user.fullName,
                lastMessage: user.lastMessage,
                lastMessageTime: user.lastMessageTime,
                messageInQueue: user.messageInQueue,
              },
              userId: userId,
              receiverId: user._id,
            });
          }}
        >
          <Image
            source={{ uri: user.profilePicture }}
            style={{ width: 50, height: 50 }}
          />
          <Text>{user.fullName}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}
    >
      {renderUsers()}
    </View>
  );
};

export default Discover;
