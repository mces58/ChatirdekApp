import React, { useEffect, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import axios from 'axios';

import BaseBottomSheet from 'src/components/bottomSheet/BaseBottomSheet';
import ProfileContainer from 'src/components/profileContainer/ProfileContainer';
import { Colors } from 'src/constants/color/colors';
import { User } from 'src/constants/types/user';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { BASE_URL } from 'src/services/baseUrl';

interface CreateGroupBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
  navigation: any;
}

const CreateGroupBottomSheet: React.FC<CreateGroupBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
  navigation,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme, SCREEN_HEIGHT), [theme]);
  const [groupName, setGroupName] = useState<string>('');
  const [friends, setFriends] = useState([] as any[]);
  const [selectedFriends, setSelectedFriends] = useState([] as string[]);
  const { authUser } = useAuthContext();

  const getFriends = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/accepted-friends/${authUser?._id}`);
      setFriends(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authUser) {
      getFriends();
    }
  }, [authUser]);

  const handleCreateGroup = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/groups`, {
        name: groupName,
        members: [authUser?._id, ...selectedFriends],
      });

      if (res.status === 201) {
        ToastAndroid.show('Group created successfully', ToastAndroid.SHORT);
      }
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
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.selectButton, styles.shadow]}
          onPress={() => {
            setSelectedFriends([...selectedFriends, user._id]);
          }}
        >
          <Text style={styles.buttonText}>Add</Text>
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
        <Text style={[styles.headerText, styles.border]}>New Group</Text>

        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter group name"
            placeholderTextColor={theme.textMutedColor}
            value={groupName}
            onChangeText={(text) => setGroupName(text)}
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.memberHeaderText}>Select members</Text>

          {friends.length > 0 ? (
            friends.map((user, index) => renderItem(user, index))
          ) : (
            <Text style={styles.noFriendsText}>No friends found</Text>
          )}
        </ScrollView>

        <TouchableOpacity
          style={[styles.button, styles.shadow]}
          onPress={() => {
            handleCreateGroup();
            onSwipeDown();
          }}
        >
          <Text style={styles.buttonText}>Create Group</Text>
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

export default CreateGroupBottomSheet;

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
      gap: 20,
    },
    headerText: {
      fontSize: 20,
      color: theme.textColor,
      fontFamily: 'Poppins-Bold',
    },
    textInputContainer: {
      width: '100%',
    },
    textInput: {
      width: '100%',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 20,
      borderColor: theme.borderColor,
      borderWidth: 1,
    },
    scrollView: {
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 10,
      borderColor: theme.borderColor,
      borderWidth: 1,
      gap: 20,
    },
    memberHeaderText: {
      fontFamily: 'Nunito-Bold',
      color: theme.textColor,
      fontSize: 16,
    },
    noFriendsText: {
      textAlign: 'center',
      fontFamily: 'Nunito-Bold',
      color: theme.textColor,
      fontSize: 16,
    },
    button: {
      backgroundColor: Colors.primaryColors.primary,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 20,
      width: '100%',
    },
    buttonText: {
      textAlign: 'center',
      fontFamily: 'Nunito-Bold',
      fontSize: 16,
      color: Colors.primaryColors.beige,
    },
    renderUserContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.borderColor,
      paddingVertical: 5,
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
    border: {
      borderBottomWidth: 1,
      borderColor: theme.borderColor,
    },
  });
