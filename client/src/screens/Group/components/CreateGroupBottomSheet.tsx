import React, { useMemo, useState } from 'react';
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

import i18next from 'i18next';
import * as Yup from 'yup';

import BaseBottomSheet from 'src/components/bottomSheet/BaseBottomSheet';
import LoadingIndicator from 'src/components/loading/Loading';
import ProfileContainer from 'src/components/profileContainer/ProfileContainer';
import { Colors } from 'src/constants/color/colors';
import { CreateGroup } from 'src/constants/types/group';
import { Response } from 'src/constants/types/response';
import { User } from 'src/constants/types/user';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import groupService from 'src/services/group-service';

interface CreateGroupBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
  navigation: any;
  friends: User[];
}

const CreateGroupBottomSheet: React.FC<CreateGroupBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
  navigation,
  friends,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme, SCREEN_HEIGHT), [theme]);
  const [groupName, setGroupName] = useState<string>('');
  const [selectedFriends, setSelectedFriends] = useState([] as string[]);
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateGroup = async () => {
    if (Yup.string().required().min(1).isValidSync(groupName) === false) {
      ToastAndroid.show(i18next.t('toast.enterGroupName'), ToastAndroid.SHORT);
      return;
    }

    if (
      Yup.string()
        .matches(/^[a-zA-Z0-9_]*$/, 'Invalid characters')
        .isValidSync(groupName) === false
    ) {
      ToastAndroid.show(i18next.t('toast.invalidGroupName'), ToastAndroid.SHORT);
      return;
    }

    if (Yup.array().min(1).isValidSync(selectedFriends) === false) {
      ToastAndroid.show(i18next.t('toast.selectMembers'), ToastAndroid.SHORT);
      return;
    }

    try {
      if (authUser) {
        setLoading(true);
        const data: CreateGroup = {
          name: groupName,
          members: selectedFriends,
        };
        const response: Response = await groupService.createGroup(
          authUser.toString(),
          data
        );

        if (response.success) {
          ToastAndroid.show(i18next.t('toast.groupCreated'), ToastAndroid.SHORT);
          onSwipeDown();
        }
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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

      {selectedFriends.includes(user.id) ? (
        <TouchableOpacity
          style={[styles.removeButton, styles.shadow]}
          onPress={() => {
            setSelectedFriends((prev) => prev.filter((id) => id !== user.id));
          }}
        >
          <Text style={styles.buttonText}>{i18next.t('global.remove')}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.selectButton, styles.shadow]}
          onPress={() => {
            setSelectedFriends([...selectedFriends, user.id]);
          }}
        >
          <Text style={styles.buttonText}>{i18next.t('global.add')}</Text>
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
        <Text style={[styles.headerText, styles.border]}>
          {i18next.t('group.createGroupBottomSheet.header')}
        </Text>

        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={i18next.t('group.createGroupBottomSheet.placeholder')}
            placeholderTextColor={theme.textMutedColor}
            value={groupName}
            onChangeText={(text) => setGroupName(text)}
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          style={{ width: '100%' }}
        >
          {friends?.length > 0 ? (
            <>
              <Text style={styles.memberHeaderText}>
                {i18next.t('group.createGroupBottomSheet.selectMembers')}
              </Text>

              {friends.map((user, index) => renderItem(user, index))}
            </>
          ) : (
            <Text style={styles.noFriendsText}>{i18next.t('global.noFriends')}</Text>
          )}
        </ScrollView>

        {loading ? (
          <LoadingIndicator />
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.shadow]}
            onPress={() => handleCreateGroup()}
          >
            <Text style={styles.buttonText}>
              {i18next.t('group.createGroupBottomSheet.createGroup')}
            </Text>
          </TouchableOpacity>
        )}
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
