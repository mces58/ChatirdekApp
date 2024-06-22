import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BackHandler,
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import i18next from 'i18next';
import { jwtDecode } from 'jwt-decode';

import CrossIcon from 'src/assets/icons/cross';
import { PencilWriteIcon } from 'src/assets/icons/headers';
import SearchIcon from 'src/assets/icons/search';
import Header from 'src/components/headers/Header';
import { Colors } from 'src/constants/color/colors';
import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';
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
  const [friends, setFriends] = useState<User[]>([]);
  const [meId, setMeId] = useState<string>('');
  const { onlineUsers } = useSocket();
  const [isOnline, setIsOnline] = useState<boolean>(false);

  const getUsers = async () => {
    try {
      if (authUser) {
        const response: Response = await chatService.getLastMessages(authUser.toString());

        if (response.success) {
          setUsers(response.data);
        }
      }
    } catch (error) {
      return <Text>{i18next.t('chat.home.noMessages')}</Text>;
    }
  };

  useEffect(() => {
    getUsers();
  }, [authUser, users, setUsers, setFriends, navigation, users.length]);

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

  useFocusEffect(
    useCallback(() => {
      getUsers();
    }, [authUser])
  );

  const renderItem = (item: LastMessages, index: number) => {
    return (
      <MessageContainer
        key={index}
        user={item}
        isOnline={isOnline}
        gotoChatRoom={() =>
          navigation.navigate('Chat', {
            senderId: item.lastMessage.senderId,
            receiverId: item.receiver.id,
            receiver: item.receiver,
          })
        }
      />
    );
  };

  return (
    <ScrollView
      style={styles.screenContainer}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar
        style={theme.backgroundColor === Colors.primaryColors.light ? 'dark' : 'light'}
        animated
        backgroundColor={theme.headerBackgroundColor}
      />

      <Header
        title={i18next.t('chat.home.header')}
        icon={<PencilWriteIcon width={ScaleHorizontal(25)} height={ScaleVertical(25)} />}
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
          <View style={styles.searchIcon}>
            <SearchIcon
              width={ScaleHorizontal(18)}
              height={ScaleVertical(18)}
              customColor={
                search.length > 0
                  ? Colors.primaryColors.dark
                  : Colors.primaryColors.textMuted
              }
            />
          </View>
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
            <CrossIcon
              width={ScaleHorizontal(13)}
              height={ScaleVertical(13)}
              customColor={Colors.primaryColors.dark}
            />
          </TouchableOpacity>
        </View>

        {users.length > 0 ? (
          <View>
            {users
              .filter((user) =>
                user.receiver.userName.toLowerCase().includes(search.toLowerCase())
              )
              .map((user, index) => renderItem(user, index))}
          </View>
        ) : (
          <View style={styles.noMessageContainer}>
            <Text style={styles.noMessageText}>{i18next.t('chat.home.noMessages')}</Text>
          </View>
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
    </ScrollView>
  );
};

export default Home;

const createStyles = (theme: Theme, STATUSBAR_HEIGHT: number) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    scrollContainer: {
      paddingTop: STATUSBAR_HEIGHT,
      paddingBottom: ScaleVertical(100),
      gap: 10,
    },
    container: {
      flex: 1,
      paddingHorizontal: ScaleHorizontal(10),
      gap: 10,
    },
    searchBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: ScaleHorizontal(50),
      paddingHorizontal: ScaleHorizontal(30),
      paddingVertical: ScaleVertical(8),
      backgroundColor: theme.borderColor,
    },
    searchInput: {
      width: '100%',
      paddingHorizontal: ScaleHorizontal(8),
    },
    searchIcon: {
      position: 'absolute',
      left: ScaleHorizontal(13),
      top: ScaleVertical(10),
      zIndex: 1,
    },
    crossIcon: {
      position: 'absolute',
      right: ScaleHorizontal(15),
      top: ScaleVertical(13),
      zIndex: 1,
    },
    noMessageContainer: {
      height: ScaleVertical(400),
      justifyContent: 'center',
      alignItems: 'center',
    },
    noMessageText: {
      fontFamily: 'Poppins-Bold',
      fontSize: ScaleFontSize(14),
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
