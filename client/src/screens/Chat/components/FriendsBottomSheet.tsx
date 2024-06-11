import React, { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import axios from 'axios';
import i18next from 'i18next';

import BinIcon from 'src/assets/icons/bin';
import SendMessageIcon from 'src/assets/icons/send-message';
import BaseBottomSheet from 'src/components/bottomSheet/BaseBottomSheet';
import ProfileContainer from 'src/components/profileContainer/ProfileContainer';
import { Colors } from 'src/constants/color/colors';
import { User } from 'src/constants/types/user';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { BASE_URL } from 'src/services/baseUrl';

interface FriendsBoxBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
  navigation: any;
}

const FriendsBottomSheet: React.FC<FriendsBoxBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
  navigation,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme, SCREEN_HEIGHT), [theme]);
  const [friends, setFriends] = useState<User[]>([]);
  const { authUser } = useAuthContext();

  const getFriends = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/accepted-friends/${authUser?._id}`);
      setFriends(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFriend = async (friendId: string) => {
    try {
      await axios.delete(`${BASE_URL}/users/remove-friend/${authUser?._id}/${friendId}`);
      getFriends();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authUser) {
      getFriends();
    }
  }, [authUser, friends, setFriends]);

  const renderItem = (user: User, index: number) => (
    <TouchableOpacity
      key={index}
      style={[styles.userContainer, styles.shadow]}
      onPress={() => {
        onSwipeDown();
        navigation.navigate('UserProfile', { user });
      }}
    >
      <ProfileContainer
        user={user}
        componentSize={{ width: 50, height: 50 }}
        showUserNames={false}
        disabled
        textStyles={{ fontSize: 16 }}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.messageButton, styles.shadow]}
          onPress={() => {
            onSwipeDown();
            navigation.navigate('Chat', {
              userId: authUser?._id,
              receiverId: user._id,
            });
          }}
        >
          <SendMessageIcon
            width={20}
            height={20}
            customColor={Colors.primaryColors.light}
            strokeWidth={4}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.deleteButton, styles.shadow]}
          onPress={() => {
            deleteFriend(user._id);
          }}
        >
          <BinIcon
            width={20}
            height={20}
            strokeWidth={4}
            customColor={Colors.primaryColors.beige}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const content = (
    <View style={styles.container}>
      <Text style={styles.headerText}>{i18next.t('chat.friendsBottomSheet.header')}</Text>

      {friends.length > 0 ? (
        friends.map((user, index) => renderItem(user, index))
      ) : (
        <Text style={styles.headerText}>
          {i18next.t('chat.friendsBottomSheet.noFriends')}
        </Text>
      )}
    </View>
  );

  return (
    <BaseBottomSheet
      animationType="slide"
      isTransparent
      isVisible={isVisible}
      onSwipeDown={onSwipeDown}
      content={
        <ScrollView
          style={{ flex: 1, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      }
      modalStyle={styles.bottomSheet}
    />
  );
};

export default FriendsBottomSheet;

const createStyles = (theme: Theme, SCREEN_HEIGHT: number) =>
  StyleSheet.create({
    bottomSheet: {
      height: SCREEN_HEIGHT * 0.6,
      backgroundColor: theme.bottomSheetBackgroundColor,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 20,
      paddingVertical: 10,
      gap: 20,
    },
    container: {
      flex: 1,
      gap: 20,
    },
    headerText: {
      fontSize: 20,
      color: theme.textColor,
      fontFamily: 'Poppins-Bold',
      textAlign: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.borderColor,
      width: '100%',
      paddingVertical: 10,
      paddingRight: 15,
      borderRadius: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    messageButton: {
      backgroundColor: Colors.primaryColors.primary,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 20,
    },
    deleteButton: {
      backgroundColor: Colors.primaryColors.danger,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 20,
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
