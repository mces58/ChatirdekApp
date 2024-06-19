import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import i18next from 'i18next';
import { jwtDecode } from 'jwt-decode';

import ArrowIcon from 'src/assets/icons/arrow';
import BackHeaderWithUsers from 'src/components/headers/BackHeaderWithUsers';
import ImageMessage from 'src/components/message/ImageMessage';
import { Colors } from 'src/constants/color/colors';
import { Group } from 'src/constants/types/group';
import { GroupMessage } from 'src/constants/types/group-message';
import { Response } from 'src/constants/types/response';
import { useAuthContext } from 'src/context/AuthContext';
import { useFontSize } from 'src/context/FontSizeContext';
import { useSocket } from 'src/context/SocketContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { useWallpaper } from 'src/context/WallpaperContext';
import SendInput from 'src/forms/SendInput';
import { GroupChatProps } from 'src/navigations/RootStackParamList';
import groupService from 'src/services/group-service';

const GroupChat: React.FC<GroupChatProps> = ({ navigation, route }) => {
  const { authUser } = useAuthContext();
  const scrollViewRef = useRef<ScrollView>(null);
  const { theme } = useTheme();
  const { StatusBarManager } = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const styles = useMemo(() => createStyles(theme, STATUSBAR_HEIGHT), [theme]);
  const { fontSize } = useFontSize();
  const fontSizeValue = fontSize.value;
  const { wallpaper } = useWallpaper();
  const [meId, setMeId] = useState<string>('');
  const [group, setGroup] = useState<Group>({} as Group);
  const { getGroupMessages, groupMessages } = useSocket();

  useEffect(() => {
    if (authUser) {
      const decode: { _id: string } = jwtDecode(authUser.toString());
      setMeId(decode._id);
    }
  }, [authUser]);

  useEffect(() => {
    getGroupMessages(meId, route.params.groupId);
  }, [meId, route.params.groupId, getGroupMessages]);

  useEffect(() => {
    const getGroup = async () => {
      try {
        if (authUser) {
          const response: Response = await groupService.getGroup(
            authUser.toString(),
            route.params.groupId
          );

          if (response.success) {
            setGroup(response.data);
          }
        }
      } catch (error: any) {
        if (error.message === 'Request failed with status code 404') return;
      }
    };
    getGroup();
  }, [group, setGroup]);

  const renderItem = (message: GroupMessage, index: number) => {
    return (
      <View
        key={index}
        style={
          message.senderId.id === meId
            ? [styles.myMessage, styles.shadow]
            : [styles.theirMessage, styles.shadow]
        }
      >
        {message.image ? (
          <ImageMessage uri={message.image} />
        ) : (
          <Text
            style={[
              styles.text,
              { fontSize: fontSizeValue },
              meId === message.senderId.id
                ? { textAlign: 'right' }
                : { textAlign: 'left' },
            ]}
          >
            {message.message}
          </Text>
        )}
        <View
          style={[
            message.senderId.id === meId
              ? { flexDirection: 'row' }
              : { flexDirection: 'row-reverse' },

            {
              justifyContent: 'space-between',
              marginTop: 5,
              gap: 10,
            },
          ]}
        >
          <Text style={styles.timestamp}>
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <Text style={styles.timestamp}>
            {message.senderId.id === meId
              ? i18next.t('global.you')
              : message.senderId.userName}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: wallpaper.color }]}>
      <BackHeaderWithUsers
        meId={meId}
        group={group}
        icon={<ArrowIcon width={30} height={30} direction="left" />}
        onPressHeader={() =>
          navigation.navigate('GroupInfo', { groupId: route.params.groupId })
        }
        onPressIcon={() => navigation.goBack()}
        componentSize={{ height: 100 }}
      />

      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        style={styles.messageList}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {groupMessages.messages?.map((message: GroupMessage, index: number) =>
          renderItem(message, index)
        )}
      </ScrollView>

      <SendInput receiverId={route.params.groupId} isGroup />
    </View>
  );
};

export default GroupChat;

const createStyles = (theme: Theme, STATUSBAR_HEIGHT: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      paddingTop: STATUSBAR_HEIGHT,
    },
    messageList: {
      width: '100%',
      paddingHorizontal: 15,
      paddingVertical: 15,
    },
    myMessage: {
      backgroundColor: Colors.primaryColors.linearGradient2,
      marginVertical: 5,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 15,
      alignSelf: 'flex-end',
    },
    theirMessage: {
      backgroundColor: Colors.primaryColors.linearGradient1,
      marginVertical: 5,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 15,
      alignSelf: 'flex-start',
    },
    text: {
      fontFamily: 'Poppins-Regular',
      color: Colors.primaryColors.dark,
    },
    timestamp: {
      fontSize: 11,
      color: Colors.primaryColors.dark,
    },
    shadow: {
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
    },
  });
