import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { RouteProp } from '@react-navigation/native';
import axios from 'axios';
import LottieView from 'lottie-react-native';

import animation from 'src/assets/animatons/user-profile1.json';
import ArrowIcon from 'src/assets/icons/arrow';
import { BASE_URL } from 'src/services/baseUrl';

interface UserProfileRouteProps {
  user: {
    _id: string;
    fullName: string;
    profilePicture: string;
    userName: string;
  };
}

interface UserProfileProps {
  navigation: any;
  route: RouteProp<Record<string, UserProfileRouteProps>, string>;
}

const UserProfile: React.FC<UserProfileProps> = ({ navigation, route }) => {
  const [userInfo, setUserInfo] = useState({});
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const getUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/${route.params.user._id}`);
      setUserInfo(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log(userInfo);

  return (
    <View
      style={{
        flex: 1,
        marginTop: 30,
        backgroundColor: 'white',
      }}
    >
      <View
        style={{
          backgroundColor: '#499dff',
          borderBottomWidth: 1,
          borderBottomColor: '#f2f2f2',
          paddingVertical: 22,
        }}
      >
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            gap: 5,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowIcon width={25} height={25} color="white" direction="left" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            {route.params.user.fullName}
          </Text>
        </View>
      </View>

      <View
        style={{
          alignItems: 'center',
          marginTop: 25,
          gap: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          paddingBottom: 25,
        }}
      >
        <Image
          source={{ uri: route.params.user.profilePicture }}
          style={{
            width: 150,
            height: 150,
          }}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
          }}
        >
          {route.params.user.fullName}
        </Text>
      </View>

      <View
        style={{
          alignItems: 'center',
          marginTop: 40,
          gap: 30,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          paddingBottom: 25,
        }}
      >
        <View
          style={{
            width: '90%',
            backgroundColor: '#f2f2f2',
            paddingHorizontal: 25,
            paddingVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 30,
          }}
        >
          <Text>created at: {userInfo?.createdAt?.slice(0, 10)}</Text>
          <Text>icon</Text>
        </View>

        <View
          style={{
            width: '90%',
            backgroundColor: '#f2f2f2',
            paddingHorizontal: 25,
            paddingVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 30,
          }}
        >
          <Text>email: {userInfo?.email}</Text>
          <Text>icon</Text>
        </View>

        <View
          style={{
            width: '90%',
            backgroundColor: '#f2f2f2',
            paddingHorizontal: 25,
            paddingVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 30,
          }}
        >
          <Text>friends: {userInfo?.friends && userInfo?.friends?.length}</Text>
          <Text>icon</Text>
        </View>

        <View
          style={{
            width: '90%',
            backgroundColor: '#f2f2f2',
            paddingHorizontal: 25,
            paddingVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 30,
          }}
        >
          <Text>gender: {userInfo?.gender}</Text>
          <Text>icon</Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          width: '100%',
        }}
      >
        <Animated.View
          style={[
            {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          <LottieView
            source={animation}
            style={{
              width: SCREEN_WIDTH * 0.35,
              height: SCREEN_WIDTH * 0.35,
            }}
            autoPlay
            loop
            speed={1}
            resizeMode="cover"
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default UserProfile;
