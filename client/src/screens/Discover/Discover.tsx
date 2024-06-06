import React, { useEffect, useMemo, useState } from 'react';
import {
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

import CrossIcon from 'src/assets/icons/cross';
import { EarthIcon } from 'src/assets/icons/headers';
import Header from 'src/components/headers/Header';
import Pagination from 'src/components/pagination/Pagination';
import ProfileContainer from 'src/components/profileContainer/ProfileContainer';
import { Colors } from 'src/constants/color/colors';
import { User } from 'src/constants/types/user';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { BASE_URL } from 'src/services/baseUrl';
import { GetGradientStartEnd } from 'src/utils/rotate';

import RequestBoxBottomSheet from './components/RequestBoxBottomSheet';

interface DiscoverProps {
  navigation: any;
}

const Discover: React.FC<DiscoverProps> = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [cardDisplay, setCardDisplay] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = cardDisplay ? 5 : 4;
  const { authUser } = useAuthContext();
  const [requestBoxBottomSheetVisible, setRequestBoxBottomSheetVisible] =
    useState<boolean>(false);
  const [requests, setRequests] = useState<User[]>([]);
  const { theme } = useTheme();
  const { StatusBarManager } = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const styles = useMemo(() => createStyles(theme, STATUSBAR_HEIGHT), [theme]);

  const getUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/non-friends/${authUser?._id}`);
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [authUser, setRequests, requests, users, setUsers]);

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
          getUsers();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderItem = (user: User, index: number) => (
    <LinearGradient
      key={user._id ?? index}
      colors={[...(theme.linearGradients ?? [])]}
      {...GetGradientStartEnd(index)}
      style={[styles.linearGradient, styles.shadow]}
    >
      <TouchableOpacity
        style={styles.userContainer}
        onPress={() => {
          navigation.navigate('UserProfile', { user });
        }}
      >
        <ProfileContainer
          user={user}
          componentSize={{ width: 55, height: 55 }}
          textStyles={{ fontSize: 14 }}
          showUserNames={false}
          disabled
        />

        <TouchableOpacity style={styles.button} onPress={() => handleConnect(user._id)}>
          <Text style={styles.buttonText}>Add Friend</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </LinearGradient>
  );

  return (
    <View style={styles.screenContainer}>
      <Header
        title="Discover"
        icon={<EarthIcon width={30} height={30} />}
        onIconPress={() => setRequestBoxBottomSheetVisible(true)}
        notificationCount={requests.length}
      />

      <View style={styles.container}>
        <View
          style={[
            styles.headerContainer,
            styles.shadow,
            cardDisplay && { display: 'none' },
          ]}
        >
          <Text style={styles.headerText}>
            You can discover new people here and connect with them
          </Text>
          <TouchableOpacity onPress={() => setCardDisplay(true)}>
            <CrossIcon width={15} height={15} />
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          {paginatedData.map((user, index) => renderItem(user, index))}

          {users.length > itemsPerPage && (
            <View style={styles.paginationContainer}>
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
              navigation={navigation}
            />
          )}
        </View>
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
    container: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 20,
      gap: 20,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: theme.borderColor,
      backgroundColor: theme.cardColor,
      borderRadius: 20,
    },
    headerText: {
      width: '90%',
      fontFamily: 'Nunito-SemiBold',
      fontStyle: 'italic',
      color: theme.textColor,
      fontSize: 16,
      textAlign: 'center',
    },
    body: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 5,
      gap: 20,
    },
    linearGradient: {
      width: '100%',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 20,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    button: {
      backgroundColor: Colors.primaryColors.dark,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 10,
    },
    buttonText: {
      fontFamily: 'Nunito-SemiBold',
      fontSize: 12,
      color: Colors.primaryColors.light,
    },
    paginationContainer: {
      width: '100%',
      paddingHorizontal: 10,
      paddingVertical: 5,
      alignSelf: 'center',
      position: 'absolute',
      bottom: 60,
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
    },
    shadow: {
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
    },
  });
