import React, { useMemo } from 'react';
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';

import i18next from 'i18next';

import BaseModal from 'src/components/modal/BaseModal';
import { ModalAnimation } from 'src/components/modal/modalAnimation';
import { Colors } from 'src/constants/color/colors';
import { Response } from 'src/constants/types/response';
import { User } from 'src/constants/types/user';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import groupService from 'src/services/group-service';

interface GroupMemberDetailModalProps {
  isVisible: boolean;
  onClose: () => void;
  user: User;
  navigation: any;
  groupId: string;
  meId: string;
  ownerId: string;
}

const GroupMemberDetailModal: React.FC<GroupMemberDetailModalProps> = ({
  isVisible,
  onClose,
  user,
  navigation,
  groupId,
  meId,
  ownerId,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { authUser } = useAuthContext();

  const handleRemoveUser = async () => {
    try {
      if (authUser) {
        const response: Response = await groupService.removeMember(
          authUser.toString(),
          groupId,
          user.id
        );

        if (response.success) {
          ToastAndroid.show(
            i18next.t('toast.memberRemoved', { name: user.fullName }),
            ToastAndroid.SHORT
          );
          onClose();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const makeAdmin = async () => {
    try {
      if (authUser) {
        const response: Response = await groupService.makeAdmin(
          authUser.toString(),
          groupId,
          user.id
        );

        if (response.success) {
          ToastAndroid.show(
            i18next.t('toast.makeAdmin', { name: user.fullName }),
            ToastAndroid.SHORT
          );
          onClose();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const content = (
    <View style={styles.modalContent}>
      <TouchableOpacity style={[styles.closeButton, styles.shadow]} onPress={onClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.row, styles.shadow]}
        onPress={() => {
          navigation.navigate('Chat', {
            senderId: meId,
            receiverId: user.id,
          });
          onClose();
        }}
      >
        <Text style={styles.text}>
          {i18next.t('global.message')}: {user.fullName}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.row, styles.shadow]}
        onPress={() => {
          navigation.navigate('UserProfile', { user });
          onClose();
        }}
      >
        <Text style={styles.text}>
          {i18next.t('global.view')}: {user.fullName}
        </Text>
      </TouchableOpacity>

      {meId === ownerId && (
        <>
          <TouchableOpacity
            style={[styles.row, styles.shadow]}
            onPress={handleRemoveUser}
          >
            <Text style={styles.text}>
              {i18next.t('global.remove')}: {user.fullName}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.row, styles.shadow]} onPress={makeAdmin}>
            <Text style={styles.text}>
              {i18next.t('group.groupMemberDetailModal.makeAdmin')}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
  return (
    <BaseModal
      isVisible={isVisible}
      onClose={onClose}
      content={content}
      animation={ModalAnimation.SlideInUp}
    />
  );
};

export default GroupMemberDetailModal;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    modalContent: {
      backgroundColor: theme.backgroundColor,
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderRadius: 20,
      alignItems: 'center',
      gap: 20,
    },
    closeButton: {
      alignSelf: 'flex-end',
      backgroundColor: Colors.primaryColors.danger,
      padding: 5,
      borderRadius: 50,
      width: 30,
      height: 30,
      alignItems: 'center',
    },
    closeButtonText: {
      color: Colors.primaryColors.beige,
    },
    row: {
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: theme.borderColor,
      borderRadius: 30,
    },
    text: {
      fontFamily: 'Nunito-Bold',
      fontSize: 16,
      color: Colors.primaryColors.dark,
    },
    shadow: {
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 3,
    },
  });
