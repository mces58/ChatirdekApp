import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import NotificationBubble from 'src/components/bubble/NotificationBubble';
import ProfileImage from 'src/components/profileContainer/ProfileImage';
import { User } from 'src/constants/types/user';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';

interface MessageContainerProps {
  user: User;
  isOnline: boolean;
  navigation: any;
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  user,
  isOnline,
  navigation,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { authUser } = useAuthContext();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Chat', {
            receiverId: user._id,
          });
        }}
        style={[styles.userContainer]}
      >
        {user?.lastMessage && (
          <>
            <View>
              {isOnline && <NotificationBubble />}
              <ProfileImage
                imageUri={user?.profilePicture}
                componentSize={{
                  height: 50,
                  width: 50,
                }}
              />
            </View>

            <View style={styles.row}>
              <View style={styles.userInfoContainer}>
                <Text style={styles.userName}>{user?.fullName}</Text>
                <Text style={styles.lastSeen}>
                  {user?.lastMessage.receiverId === authUser?._id
                    ? user?.lastMessage.message || 'No message'
                    : 'You: ' + user?.lastMessage.message}
                </Text>
              </View>

              <View style={styles.time}>
                <Text style={styles.timeText}>
                  {new Date(user?.lastMessage?.updatedAt).toLocaleTimeString('tr-TR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
                <View>
                  <TouchableOpacity
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                    }}
                  >
                    <Text style={styles.messageInQueue}>{user?.messageInQueue}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MessageContainer;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    userContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      gap: 10,
    },
    row: {
      flexDirection: 'row',
      width: '90%',
      paddingVertical: 20,
    },
    userInfoContainer: {
      width: '70%',
      paddingVertical: 5,
    },
    userName: {
      fontFamily: 'Poppins-Bold',
      fontSize: 14,
      color: theme.textColor,
    },
    lastSeen: {
      fontFamily: 'Nunito-Regular',
      fontSize: 12,
      color: theme.textMutedColor,
    },
    time: {
      position: 'absolute',
      right: 30,
      top: 30,
      alignItems: 'center',
    },
    timeText: {
      fontFamily: 'Nunito-Bold',
      fontSize: 12,
      color: theme.textMutedColor,
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
