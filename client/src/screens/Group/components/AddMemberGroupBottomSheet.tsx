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

import i18next from 'i18next';

import BaseBottomSheet from 'src/components/bottomSheet/BaseBottomSheet';
import LoadingIndicator from 'src/components/loading/Loading';
import ProfileContainer from 'src/components/profileContainer/ProfileContainer';
import { Colors } from 'src/constants/color/colors';
import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';
import { Response } from 'src/constants/types/response';
import { User } from 'src/constants/types/user';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import groupService from 'src/services/group-service';

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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getFriends = async () => {
      try {
        setLoading(true);
        if (authUser) {
          const response: Response = await groupService.getFriendsNotInGroup(
            authUser.toString(),
            groupId
          );

          if (response.success) {
            setFriends(response.data);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getFriends();
  }, [authUser]);

  const handleAddGroup = async () => {
    if (selectedFriends.length === 0) {
      ToastAndroid.show(i18next.t('toast.selectMembers'), ToastAndroid.SHORT);
      return;
    }
    try {
      if (authUser) {
        const response: Response = await groupService.addMember(
          authUser.toString(),
          groupId,
          { members: selectedFriends }
        );

        if (response.success) {
          ToastAndroid.show(
            i18next.t('toast.memberAdded', {
              length:
                selectedFriends.length > 1
                  ? selectedFriends.length + ' members'
                  : '1 member',
            }),
            ToastAndroid.SHORT
          );
          onSwipeDown();
          setSelectedFriends([]);
        }
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
        componentSize={{ width: ScaleHorizontal(40), height: ScaleVertical(40) }}
        showUserNames={false}
        textStyles={{ fontSize: ScaleFontSize(12) }}
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

        {loading ? (
          <LoadingIndicator />
        ) : (
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
        )}

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
      height: SCREEN_HEIGHT * ScaleVertical(0.4),
      backgroundColor: theme.bottomSheetBackgroundColor,
      borderTopLeftRadius: ScaleHorizontal(20),
      borderTopRightRadius: ScaleHorizontal(20),
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: ScaleHorizontal(18),
      paddingVertical: ScaleVertical(8),
      gap: 10,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: ScaleHorizontal(8),
      paddingVertical: ScaleVertical(8),
      gap: 10,
    },
    headerText: {
      fontSize: ScaleFontSize(18),
      color: theme.textColor,
      fontFamily: 'Poppins-Bold',
    },
    body: {
      width: '100%',
    },
    scrollViewContent: {
      alignItems: 'center',
      paddingHorizontal: ScaleHorizontal(8),
      paddingVertical: ScaleVertical(8),
      borderRadius: ScaleHorizontal(10),
      borderColor: theme.borderColor,
      borderWidth: ScaleHorizontal(1),
      gap: 10,
    },
    bodyHeaderText: {
      fontFamily: 'Nunito-Bold',
      color: theme.textColor,
      fontSize: ScaleFontSize(14),
    },
    userContainer: {
      width: '100%',
      gap: 15,
    },
    text: {
      textAlign: 'center',
      fontFamily: 'Nunito-Bold',
      color: theme.textMutedColor,
      fontSize: ScaleFontSize(12),
    },
    button: {
      width: '100%',
      backgroundColor: Colors.primaryColors.primary,
      paddingHorizontal: ScaleHorizontal(12),
      paddingVertical: ScaleVertical(12),
      borderRadius: ScaleHorizontal(20),
    },
    buttonText: {
      textAlign: 'center',
      fontFamily: 'Nunito-Bold',
      fontSize: ScaleFontSize(14),
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
      paddingVertical: ScaleVertical(8),
      paddingRight: ScaleHorizontal(12),
      borderRadius: ScaleHorizontal(20),
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
  });
