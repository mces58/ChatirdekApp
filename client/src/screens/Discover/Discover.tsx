import React, { useEffect, useMemo, useState } from 'react';
import {
  Image,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  Easing,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import axios from 'axios';

import { EarthIcon } from 'src/assets/icons/headers';
import HourGlassIcon from 'src/assets/icons/hour-glass';
import Header from 'src/components/headers/Header';
import Pagination from 'src/components/Pagination';
import RequestBoxBottomSheet from 'src/components/RequestBoxBottomSheet';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
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
  const { authUser } = useAuthContext();
  const [requestBoxBottomSheetVisible, setRequestBoxBottomSheetVisible] = useState(false);
  const [requestedUsers, setRequestedUsers] = useState<{ [key: string]: boolean }>({});
  const [requests, setRequests] = useState<User[]>([]);

  const getUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/non-friends/${authUser?._id}`);
      setUsers(res.data);
      setRequestedUsers(
        res.data.reduce((acc: { [key: string]: boolean }, user: User) => {
          acc[user._id] = false;
          return acc;
        }, {})
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [authUser, setRequests, requests, users, setUsers, setRequestedUsers]);

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

  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{ translateX: translateX.value }, { rotateY: `${rotateY.value}deg` }],
  //   };
  // });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleConnect = (userId: string) => {
    axios
      .post(`${BASE_URL}/users/friend-request`, {
        currentUserId: authUser?._id,
        selectedUserId: userId,
      })
      .then((res) => {
        if (res.status === 200) {
          setRequestedUsers({ ...requestedUsers, [userId]: true });
          getUsers();
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
      onPress={() => {
        navigation.navigate('UserProfile', { user: item });
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
        onPress={() => handleConnect(item._id)}
        disabled={!!requestedUsers[item._id]}
      >
        {requestedUsers[item._id] ? (
          <HourGlassIcon width={20} height={20} color="white" />
        ) : (
          <Text style={{ color: 'white' }}>Add Friend</Text>
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const { theme } = useTheme();
  const { StatusBarManager } = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const styles = useMemo(() => createStyles(theme, STATUSBAR_HEIGHT), [theme]);

  return (
    <View style={styles.screenContainer}>
      <Header
        title="Discover"
        icon={<EarthIcon width={30} height={30} />}
        onIconPress={() => setRequestBoxBottomSheetVisible(true)}
      />

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

        {requestBoxBottomSheetVisible && (
          <RequestBoxBottomSheet
            isVisible={requestBoxBottomSheetVisible}
            onSwipeDown={() => setRequestBoxBottomSheetVisible(false)}
            requests={requests}
            setRequests={setRequests}
          />
        )}
      </View>
    </View>
  );
};

export default Discover;

const createStyles = (theme: Theme, STATUSBAR_HEIGHT: number) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      paddingTop: STATUSBAR_HEIGHT,
    },
  });
