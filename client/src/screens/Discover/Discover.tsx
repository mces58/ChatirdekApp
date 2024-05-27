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
import Pagination from 'src/components/Pagination';
import { BASE_URL } from 'src/services/baseUrl';

interface User {
  _id: string;
  fullName: string;
  profilePicture: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTime: string;
  messageInQueue: number;
}

interface DiscoverProps {
  navigation: any;
}

const Discover: React.FC<DiscoverProps> = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const itemsPerPage = 4;

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        navigation.navigate('Chat', {
          user: {
            userImg: item.profilePicture,
            isOnline: item.isOnline,
            fullName: item.fullName,
            lastMessage: item.lastMessage,
            lastMessageTime: item.lastMessageTime,
            messageInQueue: item.messageInQueue,
          },
          userId: '', // Set userId as needed
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
        {paginatedData.map((user) => renderItem({ item: user }))}

        {users.length > itemsPerPage && (
          <View
            style={{
              width: '100%',
              padding: 10,
              alignSelf: 'center',
              position: 'absolute',
              bottom: 80,
              borderTopWidth: 1,
              borderTopColor: '#ccc',
            }}
          >
            <Pagination
              totalItems={users.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Discover;
