import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import i18next from 'i18next';

import CloseIcon from 'src/assets/icons/close';
import Button from 'src/components/button/Button';
import LoadingIndicator from 'src/components/loading/Loading';
import BaseModal from 'src/components/modal/BaseModal';
import ProfileContainer from 'src/components/profileContainer/ProfileContainer';
import { Colors } from 'src/constants/color/colors';
import { Response } from 'src/constants/types/response';
import { User } from 'src/constants/types/user';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import friendService from 'src/services/friend-service';

interface ClearChatHistoryModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ClearChatHistoryModal: React.FC<ClearChatHistoryModalProps> = ({
  isVisible,
  onClose,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [friends, setFriends] = useState<User[]>([]);
  const { authUser } = useAuthContext();
  const [selectedFriends, setSelectedFriends] = useState([] as string[]);
  const [loading, setLoading] = useState(false);

  const getFriends = async () => {
    try {
      setLoading(true);
      if (authUser) {
        const response: Response = await friendService.getFriends(authUser.toString());
        if (response.success) {
          setFriends(response.data);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFriends();
  }, [authUser]);

  const handleClearChatHistory = async () => {
    console.log(selectedFriends);
  };

  const renderItem = (user: User, index: number) => (
    <View key={index} style={[styles.renderUserContainer, styles.shadow]}>
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
          <Text style={styles.buttonText}>{i18next.t('global.select')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const content = (
    <View style={styles.modalContent}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Text style={styles.title}>
            {i18next.t('settings.chatsBottomSheet.ClearChatHistoryModal.header')}
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <CloseIcon width={30} height={30} customColor={Colors.primaryColors.danger} />
          </TouchableOpacity>
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

          <Button
            title={i18next.t('global.clear')}
            customStyle={
              selectedFriends.length === 0
                ? [styles.button, { backgroundColor: Colors.primaryColors.gray }]
                : styles.button
            }
            textStyle={
              selectedFriends.length === 0
                ? [styles.buttonText, { color: Colors.primaryColors.textMuted }]
                : styles.buttonText
            }
            disabled={selectedFriends.length === 0}
            onPress={handleClearChatHistory}
          />
        </>
      )}
    </View>
  );
  return <BaseModal isVisible={isVisible} onClose={onClose} content={content} />;
};

export default ClearChatHistoryModal;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    modalContent: {
      backgroundColor: theme.backgroundColor,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      gap: 20,
    },
    title: {
      fontSize: 20,
      fontFamily: 'Poppins-Bold',
      color: theme.textColor,
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
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
