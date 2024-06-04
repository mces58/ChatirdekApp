import React, { useEffect, useMemo, useState } from 'react';
import {
  BackHandler,
  FlatList,
  Image,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { jwtDecode } from 'jwt-decode';

import CrossIcon from 'src/assets/icons/cross';
import { PencilWriteIcon } from 'src/assets/icons/headers';
import SearchIcon from 'src/assets/icons/search';
import FriendsBoxBottomSheet from 'src/components/FriendsBoxBottomSheet';
import Header from 'src/components/headers/Header';
import { Colors } from 'src/constants/color/colors';
import { useAuthContext } from 'src/context/AuthContext';
import { useSocketContext } from 'src/context/SocketContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { BASE_URL } from 'src/services/baseUrl';

type HomeProps = {
  navigation: any;
};

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [search, setSearch] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, setUsers] = useState<
    {
      _id: string;
      profilePicture: string;
      isOnline: boolean;
      fullName: string;
      lastMessage: string;
      lastMessageTime: string;
      messageInQueue: number;
    }[]
  >([]);
  const [friendsBoxBottomSheetVisible, setFriendsBoxBottomSheetVisible] =
    useState<boolean>(false);

  const handleSearch = (text: string) => {
    setSearch(text);

    const filteredData = users.filter((item) => {
      return item.fullName.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredUsers(filteredData);
  };

  useEffect(() => {
    const getUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const user: { _id: string } = jwtDecode(token as string);

      axios
        .post(`${BASE_URL}/users/last-messages`, { userId: user._id })
        .then((response) => {
          setUsers(response.data);
          setFilteredUsers(response.data);
        })
        .catch((error) => {
          console.log('error retrieving users', error);
        });
    };
    getUser();
  }, [users, setUsers]);

  const { authUser } = useAuthContext();

  const { onlineUsers } = useSocketContext();
  const [isOnline, setIsOnline] = useState<boolean>(false);

  useEffect(() => {
    users.every((user) => onlineUsers.includes(user.userId))
      ? setIsOnline(true)
      : setIsOnline(false);
  }, [onlineUsers, users]);

  useEffect(() => {
    const backAction = () => {
      ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Chat', {
            receiverId: item.userId,
          });
        }}
        style={[
          styles.userContainer,
          index % 2 !== 0 ? { backgroundColor: '#f2f2f2' } : {},
        ]}
      >
        {item?.lastMessage && (
          <>
            <View style={styles.userImageContainer}>
              {isOnline && <View style={styles.onlineIndicator} />}
              <Image source={{ uri: item?.profilePicture }} style={styles.userImage} />
            </View>
            <View style={{ flexDirection: 'row', width: '90%', paddingVertical: 20 }}>
              <View style={styles.userInfoContainer}>
                <Text style={styles.userName}>{item?.fullName}</Text>
                <Text style={styles.lastSeen}>
                  {item?.lastMessage.receiverId === authUser?._id
                    ? item?.lastMessage.message || 'No message'
                    : 'You: ' + item?.lastMessage.message}
                </Text>
              </View>

              <View
                style={{ position: 'absolute', right: 30, top: 20, alignItems: 'center' }}
              >
                <Text style={styles.lastMessageTime}>
                  {new Date(item?.lastMessage?.updatedAt).toLocaleTimeString('tr-TR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
                <View>
                  <TouchableOpacity
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: item.messageInQueue > 0 ? 'gray' : 'transparent',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                    }}
                  >
                    <Text style={styles.messageInQueue}>{item?.messageInQueue}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )}
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    return (
      <View style={{ marginBottom: 80 }}>
        <View>
          <FlatList
            data={filteredUsers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  };
  const { theme } = useTheme();
  const { StatusBarManager } = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const styles = useMemo(() => createStyles(theme, STATUSBAR_HEIGHT), [theme]);

  return (
    <View style={styles.screenContainer}>
      <StatusBar
        style={theme.backgroundColor === Colors.primaryColors.light ? 'dark' : 'light'}
        animated
        backgroundColor={theme.headerBackgroundColor}
      />

      <Header
        title="Messages"
        icon={<PencilWriteIcon width={30} height={30} />}
        onIconPress={() => setFriendsBoxBottomSheetVisible(true)}
      />

      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={search}
          onChangeText={handleSearch}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 25,
            top: 13,
            zIndex: 1,
          }}
        >
          <SearchIcon
            width={20}
            height={20}
            color={search.length > 0 ? 'black' : 'gray'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: search.length > 0 ? 'flex' : 'none',
            position: 'absolute',
            right: 30,
            top: 17,
            zIndex: 1,
          }}
        >
          <CrossIcon width={15} height={15} color="black" />
        </TouchableOpacity>
      </View>
      {<View style={styles.container}>{renderContent()}</View>}

      {friendsBoxBottomSheetVisible && (
        <FriendsBoxBottomSheet
          isVisible={friendsBoxBottomSheetVisible}
          onSwipeDown={() => setFriendsBoxBottomSheetVisible(false)}
          navigation={navigation}
        />
      )}
    </View>
  );
};

export default Home;

const createStyles = (theme: Theme, STATUSBAR_HEIGHT: number) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      paddingTop: STATUSBAR_HEIGHT,
    },
  });

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: '#fff',
//     marginTop: 24,
//   },
//   container: {
//     flex: 1,
//   },
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginTop: -25,
//     borderBottomWidth: 1,
//     paddingBottom: 11,
//     borderBottomColor: '#f3d3d3',
//   },
//   searchText: {
//     color: '#fff',
//   },
//   searchInput: {
//     flex: 1,
//     marginHorizontal: 8,
//     padding: 8,
//     paddingLeft: 35,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#000',
//     backgroundColor: '#f2f2f2',
//   },
//   userContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#f2f2f2',
//     paddingHorizontal: 16,
//   },
//   userImageContainer: {
//     paddingVertical: 8,
//     marginRight: 8,
//   },
//   userImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 50,
//   },
//   onlineIndicator: {
//     width: 14,
//     height: 14,
//     borderRadius: 7,
//     backgroundColor: 'green',
//     position: 'absolute',
//     top: 10,
//     right: 0,
//     zIndex: 10,
//     borderWidth: 1,
//     borderColor: '#fff',
//   },
//   userInfoContainer: {
//     width: '70%',
//     paddingVertical: 8,
//   },
//   userName: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   lastSeen: {
//     fontSize: 12,
//     color: 'gray',
//   },
//   lastMessageTime: {
//     fontSize: 12,
//     color: 'gray',
//   },
//   messageInQueue: {
//     color: '#fff',
//   },
// });
