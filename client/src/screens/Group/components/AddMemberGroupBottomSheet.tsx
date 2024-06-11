import React, { useEffect, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import axios from 'axios';
import i18next from 'i18next';

import BaseBottomSheet from 'src/components/bottomSheet/BaseBottomSheet';
import ProfileContainer from 'src/components/profileContainer/ProfileContainer';
import { Colors } from 'src/constants/color/colors';
import { User } from 'src/constants/types/user';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { BASE_URL } from 'src/services/baseUrl';

interface AddMemberGroupBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
  navigation: any;
  groupId: string;
}

const AddMemberGroupBottomSheet: React.FC<AddMemberGroupBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
  navigation,
  groupId,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme, SCREEN_HEIGHT), [theme]);
  const [friends, setFriends] = useState([] as any[]);
  const [selectedFriends, setSelectedFriends] = useState([] as string[]);
  const { authUser } = useAuthContext();

  const getFriends = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/groups/${groupId}/members/${authUser?._id}`
      );
      setFriends(res.data.nonGroupFriends);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authUser) {
      getFriends();
    }
  }, [authUser]);

  const handleAddGroup = async () => {
    if (selectedFriends.length === 0) {
      ToastAndroid.show(i18next.t('toast.selectMembers'), ToastAndroid.SHORT);
      return;
    }

    try {
      await axios.post(`${BASE_URL}/groups/${groupId}/members`, {
        members: selectedFriends,
      });

      ToastAndroid.show(
        i18next.t('toast.memberAdded', { length: selectedFriends.length }),
        ToastAndroid.SHORT
      );
      onSwipeDown();
      setSelectedFriends([]);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = (user: User, index: number) => (
    <TouchableOpacity
      key={index}
      style={[styles.renderUserContainer, styles.shadow]}
      onPress={() => {
        onSwipeDown();
        navigation.navigate('UserProfile', { user });
      }}
    >
      <ProfileContainer
        user={user}
        componentSize={{ width: 50, height: 50 }}
        showUserNames={false}
        textStyles={{ fontSize: 14 }}
        disabled
      />

      {selectedFriends.includes(user._id) ? (
        <TouchableOpacity
          style={[styles.removeButton, styles.shadow]}
          onPress={() => {
            setSelectedFriends((prev) => prev.filter((id) => id !== user._id));
          }}
        >
          <Text style={styles.buttonText}>{i18next.t('global.remove')}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.selectButton, styles.shadow]}
          onPress={() => {
            setSelectedFriends([...selectedFriends, user._id]);
          }}
        >
          <Text style={styles.buttonText}>{i18next.t('global.select')}</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  const content = (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>
          {i18next.t('group.addMembersBottomSheet.header')}
        </Text>

        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.userContainer}>
            {friends.length > 0 ? (
              friends.map((user, index) => renderItem(user, index))
            ) : (
              <Text style={styles.text}>No friends found</Text>
            )}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[styles.button, styles.shadow]}
          onPress={() => {
            handleAddGroup();
          }}
        >
          <Text style={styles.buttonText}>{i18next.t('global.add')}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );

  return (
    <BaseBottomSheet
      animationType="slide"
      isTransparent
      isVisible={isVisible}
      onSwipeDown={onSwipeDown}
      content={content}
      modalStyle={styles.bottomSheet}
    />
  );
};

export default AddMemberGroupBottomSheet;

const createStyles = (theme: Theme, SCREEN_HEIGHT: number) =>
  StyleSheet.create({
    bottomSheet: {
      height: SCREEN_HEIGHT * 0.5,
      backgroundColor: theme.bottomSheetBackgroundColor,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 20,
      paddingVertical: 10,
      gap: 10,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 10,
      gap: 10,
    },
    headerText: {
      fontSize: 20,
      color: theme.textColor,
      fontFamily: 'Poppins-Bold',
    },
    body: {
      width: '100%',
    },
    scrollViewContent: {
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 10,
      borderColor: theme.borderColor,
      borderWidth: 1,
      gap: 10,
    },
    bodyHeaderText: {
      fontFamily: 'Nunito-Bold',
      color: theme.textColor,
      fontSize: 16,
    },
    userContainer: {
      width: '100%',
      gap: 15,
    },
    text: {
      textAlign: 'center',
      fontFamily: 'Nunito-Bold',
      color: theme.textMutedColor,
      fontSize: 14,
    },
    button: {
      backgroundColor: Colors.primaryColors.primary,
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderRadius: 20,
      width: '100%',
    },
    buttonText: {
      textAlign: 'center',
      fontFamily: 'Nunito-Bold',
      fontSize: 16,
      color: Colors.primaryColors.beige,
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
    renderUserContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.borderColor,
      paddingVertical: 10,
      paddingRight: 15,
      borderRadius: 20,
    },
    removeButton: {
      backgroundColor: Colors.primaryColors.danger,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 20,
    },
    selectButton: {
      backgroundColor: Colors.primaryColors.primary,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 20,
    },
  });
