import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import axios from 'axios';
import LottieView from 'lottie-react-native';

import animation from 'src/assets/animatons/discover1.json';
import { BASE_URL } from 'src/services/baseUrl';

interface DiscoverProps {
  navigation: any;
}

const Discover: React.FC<DiscoverProps> = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [userId] = useState<string>('');
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  useEffect(() => {
    const getUsers = async () => {
      axios.get(`${BASE_URL}/users`).then((res) => {
        setUsers(res.data);
      });
    };
    getUsers();
  }, [users, setUsers]);

  useEffect(() => {
    const animate = () => {
      'worklet';
      translateX.value = withSequence(
        withTiming(SCREEN_WIDTH / 2.5, { duration: 5000, easing: Easing.linear }, () => {
          rotateY.value = withTiming(180, { duration: 500 });
        }),
        withTiming(-SCREEN_WIDTH / 2.5, { duration: 5000, easing: Easing.linear }, () => {
          rotateY.value = withTiming(0, { duration: 500 });
        })
      );
    };

    animate();
    const interval = setInterval(animate, 11000);

    return () => clearInterval(interval);
  }, [translateX, rotateY, SCREEN_WIDTH]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { rotateY: `${rotateY.value}deg` }],
    };
  });

  const renderUsers = () => {
    return users.map((user: any, index: number) => {
      return (
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Image
              source={{ uri: user.profilePicture }}
              style={{ width: 50, height: 50 }}
            />
            <Text>{user.fullName}</Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#499dff',
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => {}}
          >
            <Text style={{ color: 'white' }}>Connect</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: 30,
        gap: 10,
        backgroundColor: 'white',
      }}
    >
      <View
        style={{
          backgroundColor: '#499dff',
          borderBottomWidth: 1,
          borderBottomColor: '#f2f2f2',
          paddingVertical: 52,
          paddingLeft: 16,
        }}
      >
        <View
          style={{
            width: '100%',
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 16,
              color: 'white',
            }}
          >
            Discover
          </Text>
        </View>
        <Animated.View style={[animatedStyle]}>
          <LottieView
            style={{
              height: 1,
              transform: [{ scale: 0.6 }],
              zIndex: 10,
            }}
            source={animation}
            autoPlay
            loop
            speed={0.7}
            resizeMode="cover"
          />
        </Animated.View>
      </View>

      <View
        style={{
          width: '80%',
          alignSelf: 'center',
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          You can discover new people here and connect with them
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          padding: 10,
          gap: 20,
        }}
      >
        {renderUsers()}
      </View>
    </View>
  );
};

export default Discover;
