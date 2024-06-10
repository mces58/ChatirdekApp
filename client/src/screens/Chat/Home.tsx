import React, { useEffect, useMemo, useState } from 'react';
import {
  BackHandler,
  FlatList,
  NativeModules,
  Platform,
  StyleSheet,
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
import Header from 'src/components/headers/Header';
import { Colors } from 'src/constants/color/colors';
import { User } from 'src/constants/types/user';
import { useSocketContext } from 'src/context/SocketContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { HomeProps } from 'src/navigations/RootStackParamList';
import { BASE_URL } from 'src/services/baseUrl';

import FriendsBottomSheet from './components/FriendsBottomSheet';
import MessageContainer from './components/MessageContainer';

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [search, setSearch] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [friendsBottomSheetVisible, setFriendsBottomSheetVisible] =
    useState<boolean>(false);
  const { theme } = useTheme();
  const { StatusBarManager } = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const styles = useMemo(() => createStyles(theme, STATUSBAR_HEIGHT), [theme]);
  const { onlineUsers } = useSocketContext();
  const [isOnline, setIsOnline] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        const user: { _id: string } = jwtDecode(token);

        axios
          .post(`${BASE_URL}/users/last-messages`, { userId: user._id })
          .then((response) => {
            setUsers(response.data);
            setFilteredUsers(response.data);
          })
          .catch((error) => {
            console.log('error retrieving users', error);
          });
      }
    };
    getUser();
  }, [users, setUsers]);

  useEffect(() => {
    users.every((user) => onlineUsers.includes(user._id))
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

  const handleSearch = (text: string) => {
    setSearch(text);

    const filteredData = users.filter((item) => {
      return item.fullName.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredUsers(filteredData);
    console.log(filteredData);
  };

  const renderItem = (item: User) => {
    return <MessageContainer user={item} isOnline={isOnline} navigation={navigation} />;
  };

  const renderContent = () => {
    return (
      <FlatList
        data={filteredUsers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem(item)}
        showsVerticalScrollIndicator={false}
      />
    );
  };

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
        onIconPress={() => setFriendsBottomSheetVisible(true)}
      />

      <View style={styles.container}>
        <View style={[styles.searchBarContainer, styles.shadow]}>
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            value={search}
            onChangeText={(text) => handleSearch(text)}
          />
          <TouchableOpacity style={styles.searchIcon}>
            <SearchIcon
              width={20}
              height={20}
              color={
                search.length > 0 ? Colors.primaryColors.dark : Colors.primaryColors.light
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.crossIcon,
              {
                display: search.length > 0 ? 'flex' : 'none',
              },
            ]}
            onPress={() => {
              setSearch('');
              setFilteredUsers(users);
            }}
          >
            <CrossIcon width={15} height={15} customColor={Colors.primaryColors.dark} />
          </TouchableOpacity>
        </View>

        {renderContent()}
      </View>

      {friendsBottomSheetVisible && (
        <FriendsBottomSheet
          isVisible={friendsBottomSheetVisible}
          onSwipeDown={() => setFriendsBottomSheetVisible(false)}
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
      gap: 20,
    },
    container: {
      flex: 1,
      paddingHorizontal: 10,
      gap: 10,
    },
    searchBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 50,
      paddingHorizontal: 35,
      paddingVertical: 10,
      backgroundColor: theme.borderColor,
    },
    searchInput: {
      width: '100%',
      paddingHorizontal: 10,
    },
    searchIcon: {
      position: 'absolute',
      left: 15,
      top: 13,
      zIndex: 1,
    },
    crossIcon: {
      position: 'absolute',
      right: 20,
      top: 16,
      zIndex: 1,
    },
    shadow: {
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });
