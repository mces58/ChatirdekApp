import React, { useEffect, useMemo, useState } from 'react';
import {
  BackHandler,
  FlatList,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import i18next from 'i18next';
import { jwtDecode } from 'jwt-decode';

import CrossIcon from 'src/assets/icons/cross';
import { PencilWriteIcon } from 'src/assets/icons/headers';
import SearchIcon from 'src/assets/icons/search';
import Header from 'src/components/headers/Header';
import LoadingIndicator from 'src/components/loading/Loading';
import { Colors } from 'src/constants/color/colors';
import { LastMessages } from 'src/constants/types/message';
import { Response } from 'src/constants/types/response';
import { User } from 'src/constants/types/user';
import { useAuthContext } from 'src/context/AuthContext';
import { useSocket } from 'src/context/SocketContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { HomeProps } from 'src/navigations/RootStackParamList';
import chatService from 'src/services/chat-service';
import friendService from 'src/services/friend-service';

import FriendsBottomSheet from './components/FriendsBottomSheet';
import MessageContainer from './components/MessageContainer';

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [search, setSearch] = useState<string>('');
  const [users, setUsers] = useState<LastMessages[]>([]);
  const [friendsBottomSheetVisible, setFriendsBottomSheetVisible] =
    useState<boolean>(false);
  const { theme } = useTheme();
  const { StatusBarManager } = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const styles = useMemo(() => createStyles(theme, STATUSBAR_HEIGHT), [theme]);
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [friends, setFriends] = useState<User[]>([]);
  const [meId, setMeId] = useState<string>('');
  const { onlineUsers } = useSocket();
  const [isOnline, setIsOnline] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        if (authUser) {
          const response: Response = await chatService.getLastMessages(
            authUser.toString()
          );

          if (response.success) {
            setUsers(response.data);
          }
        }
        setLoading(false);
      } catch (error) {
        return <Text>{i18next.t('chat.home.noMessages')}</Text>;
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [authUser, users, setUsers, setLoading, setFriends, navigation, users.length]);

  useEffect(() => {
    const backAction = () => {
      ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const getFriends = async () => {
      try {
        if (authUser) {
          const response: Response = await friendService.getFriends(authUser?.token);
          if (response.success) {
            setFriends(response.data);
          }
          const decode: { _id: string } = jwtDecode(authUser.toString());
          setMeId(decode._id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [authUser, friends, setFriends]);

  useEffect(() => {
    users.every((user) => onlineUsers.includes(user.receiver.id))
      ? setIsOnline(true)
      : setIsOnline(false);
  }, [onlineUsers, users]);

  const renderItem = (item: LastMessages) => {
    return (
      <MessageContainer
        user={item}
        isOnline={isOnline}
        gotoChatRoom={() =>
          navigation.navigate('Chat', {
            senderId: item.lastMessage.senderId,
            receiverId: item.receiver.id,
          })
        }
      />
    );
  };

  const renderContent = () => {
    return (
      <FlatList
        data={
          search.length > 0
            ? users.filter((user) =>
                user.receiver.fullName.toLowerCase().includes(search.toLowerCase())
              )
            : users
        }
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
        title={i18next.t('chat.home.header')}
        icon={<PencilWriteIcon width={30} height={30} />}
        onIconPress={() => setFriendsBottomSheetVisible(true)}
      />

      <View style={styles.container}>
        <View style={[styles.searchBarContainer, styles.shadow]}>
          <TextInput
            placeholder={i18next.t('global.search')}
            style={styles.searchInput}
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          <TouchableOpacity style={styles.searchIcon}>
            <SearchIcon
              width={20}
              height={20}
              customColor={
                search.length > 0
                  ? Colors.primaryColors.dark
                  : Colors.primaryColors.textMuted
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
            }}
          >
            <CrossIcon width={15} height={15} customColor={Colors.primaryColors.dark} />
          </TouchableOpacity>
        </View>

        {loading ? (
          <LoadingIndicator />
        ) : (
          (users.length === 0 && (
            <View style={styles.noMessageContainer}>
              <Text style={styles.noMessageText}>
                {i18next.t('chat.home.noMessages')}
              </Text>
            </View>
          )) ||
          renderContent()
        )}
      </View>

      {friendsBottomSheetVisible && (
        <FriendsBottomSheet
          isVisible={friendsBottomSheetVisible}
          onSwipeDown={() => setFriendsBottomSheetVisible(false)}
          navigation={navigation}
          friends={friends}
          meId={meId}
          setFriends={setFriends}
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
    noMessageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noMessageText: {
      fontFamily: 'Poppins-Bold',
      fontSize: 16,
      color: theme.textColor,
      textAlign: 'center',
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
