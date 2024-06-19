import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import i18next from 'i18next';

import GalleryIcon from 'src/assets/icons/gallery';
import { Colors } from 'src/constants/color/colors';
import { GroupLastMessages } from 'src/constants/types/group-message';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { GetGradientStartEnd } from 'src/utils/rotate';

interface GroupCardProps {
  group: GroupLastMessages;
  onPressCard: () => void;
  index: number;
  meId: string;
}

const GroupCard: React.FC<GroupCardProps> = ({ group, onPressCard, index, meId }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const getMessagePreview = (message: string, isSender: boolean, name: string) => {
    const previewMessage = message?.length > 25 ? message.slice(0, 25) + '...' : message;
    return isSender
      ? i18next.t('global.you') + ': ' + previewMessage
      : name + ': ' + previewMessage;
  };

  const renderLastMessage = (
    lastMessage: { image: string; message: string; senderId: { fullName: string } },
    isReceiver: boolean
  ) => {
    if (!lastMessage) {
      return i18next.t('chat.messageContainer.noMessage');
    }

    if (lastMessage.image) {
      return (
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
        >
          {isReceiver ? (
            <Text style={styles.lastMessageText}>{i18next.t('global.you') + ': '}</Text>
          ) : (
            <Text style={styles.lastMessageText}>
              {group?.lastMessage?.senderId.fullName + ': '}
            </Text>
          )}
          <GalleryIcon width={15} height={15} />
        </View>
      );
    }

    return getMessagePreview(
      lastMessage.message,
      isReceiver,
      lastMessage.senderId.fullName
    );
  };

  return (
    <LinearGradient
      colors={[
        Colors.primaryColors.linearGradient1,
        Colors.primaryColors.linearGradient2,
      ]}
      style={[styles.cardContainer, styles.shadow]}
      {...GetGradientStartEnd(index)}
    >
      <TouchableOpacity onPress={onPressCard}>
        <View style={styles.row}>
          <View style={styles.groupContainer}>
            <View>
              <Text style={styles.groupNameText}>{group.name}</Text>
              <Text style={styles.lastMessageText}>
                {renderLastMessage(
                  group?.lastMessage,
                  group?.lastMessage?.senderId.id === meId
                )}
              </Text>

              {group?.lastMessage?.message && (
                <Text style={styles.lastMessageText}>
                  {new Date(group?.lastMessage?.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              )}
            </View>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              gap: 5,
            }}
          >
            <Text style={styles.groupMemberText}>
              {group.members.length}{' '}
              {group.members.length > 1
                ? i18next.t('global.members')
                : i18next.t('global.member')}
            </Text>
            <Text style={styles.groupMemberText}>
              {new Date(group.createdAt).toLocaleDateString([], {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default GroupCard;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    cardContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingVertical: 20,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    row: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    groupContainer: {
      flex: 1,
    },
    groupNameText: {
      fontFamily: 'Poppins-Bold',
      fontSize: 18,
      color: Colors.primaryColors.dark,
    },
    lastMessageText: {
      fontFamily: 'Nunito-Regular',
      fontSize: 12,
      color: Colors.primaryColors.dark,
      opacity: 0.8,
    },
    groupMemberText: {
      fontFamily: 'Nunito-Regular',
      fontSize: 14,
      color: Colors.primaryColors.dark,
      opacity: 0.8,
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
  });
