import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import axios from 'axios';

import BaseModal from 'src/components/modal/BaseModal';
import { ModalAnimation } from 'src/components/modal/modalAnimation';
import { Colors } from 'src/constants/color/colors';
import { User } from 'src/constants/types/user';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { BASE_URL } from 'src/services/baseUrl';

interface GroupMemberDetailModalProps {
  isVisible: boolean;
  onClose: () => void;
  user: User;
  navigation?: any;
  groupId?: string;
}

const GroupMemberDetailModal: React.FC<GroupMemberDetailModalProps> = ({
  isVisible,
  onClose,
  user,
  navigation,
  groupId,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleRemoveUser = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}/groups/${groupId}/members/${user._id}`);
      console.log(res.data);
      onClose();
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
            receiverId: user._id,
          });
          onClose();
        }}
      >
        <Text style={styles.text}>Message {user.fullName}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.row, styles.shadow]}
        onPress={() => {
          navigation.navigate('UserProfile', {
            user,
          });

          onClose();
        }}
      >
        <Text style={styles.text}>View {user.fullName}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.row, styles.shadow]} onPress={handleRemoveUser}>
        <Text style={styles.text}>Remove {user.fullName}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.row, styles.shadow]}>
        <Text style={styles.text}>Make Group Admin</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <BaseModal
      isVisible={isVisible}
      onClose={onClose}
      content={content}
      animation={ModalAnimation.RubberBand}
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
