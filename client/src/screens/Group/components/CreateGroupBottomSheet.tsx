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
import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';
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
        .required()
        .trim()
        .min(3)
        .max(20)
        .matches(/^[a-zA-Z0-9_ ]*$/, i18next.t('toast.invalidGroupName'))
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
        componentSize={{ width: ScaleHorizontal(40), height: ScaleVertical(40) }}
        showUserNames={false}
        textStyles={{ fontSize: ScaleFontSize(14) }}
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
      height: SCREEN_HEIGHT * ScaleVertical(0.42),
      backgroundColor: theme.bottomSheetBackgroundColor,
      borderTopLeftRadius: ScaleHorizontal(20),
      borderTopRightRadius: ScaleHorizontal(20),
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: ScaleHorizontal(12),
      paddingVertical: ScaleVertical(8),
      gap: 10,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: ScaleHorizontal(8),
      paddingVertical: ScaleVertical(8),
      gap: 20,
    },
    headerText: {
      fontSize: ScaleFontSize(16),
      color: theme.textColor,
      fontFamily: 'Poppins-Bold',
    },
    textInputContainer: {
      width: '100%',
    },
    textInput: {
      width: '100%',
      paddingHorizontal: ScaleHorizontal(12),
      paddingVertical: ScaleVertical(10),
      borderRadius: ScaleHorizontal(20),
      borderColor: theme.borderColor,
      borderWidth: ScaleHorizontal(1),
      color: theme.textColor,
    },
    scrollView: {
      alignItems: 'center',
      paddingHorizontal: ScaleHorizontal(8),
      paddingVertical: ScaleVertical(8),
      borderRadius: ScaleHorizontal(10),
      borderColor: theme.borderColor,
      borderWidth: ScaleHorizontal(1),
      gap: 20,
    },
    memberHeaderText: {
      fontFamily: 'Nunito-Bold',
      color: theme.textColor,
      fontSize: ScaleFontSize(14),
    },
    noFriendsText: {
      textAlign: 'center',
      fontFamily: 'Nunito-Bold',
      color: theme.textColor,
      fontSize: ScaleFontSize(14),
    },
    button: {
      backgroundColor: Colors.primaryColors.primary,
      paddingHorizontal: ScaleHorizontal(8),
      paddingVertical: ScaleVertical(8),
      borderRadius: ScaleHorizontal(20),
      width: '100%',
    },
    buttonText: {
      textAlign: 'center',
      fontFamily: 'Nunito-Bold',
      fontSize: ScaleFontSize(13),
      color: Colors.primaryColors.beige,
    },
    renderUserContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.borderColor,
      paddingVertical: ScaleVertical(5),
      paddingRight: ScaleHorizontal(10),
      borderRadius: ScaleHorizontal(10),
    },
    removeButton: {
      backgroundColor: Colors.primaryColors.danger,
      paddingHorizontal: ScaleHorizontal(8),
      paddingVertical: ScaleVertical(8),
      borderRadius: ScaleHorizontal(20),
    },
    selectButton: {
      backgroundColor: Colors.primaryColors.primary,
      paddingHorizontal: ScaleHorizontal(8),
      paddingVertical: ScaleVertical(8),
      borderRadius: ScaleHorizontal(20),
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
      borderBottomWidth: ScaleHorizontal(1),
      borderColor: theme.borderColor,
    },
  });
