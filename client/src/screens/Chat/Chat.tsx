import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { jwtDecode } from 'jwt-decode';

import ArrowIcon from 'src/assets/icons/arrow';
import BackHeaderWithImage from 'src/components/headers/BackHeaderWithImage';
import { Colors } from 'src/constants/color/colors';
import { Message } from 'src/constants/types/message';
import { Response } from 'src/constants/types/response';
import { useAuthContext } from 'src/context/AuthContext';
import { useFontSize } from 'src/context/FontSizeContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { useWallpaper } from 'src/context/WallpaperContext';
import SendInput from 'src/forms/SendInput';
import { ChatProps } from 'src/navigations/RootStackParamList';
import chatService from 'src/services/chat-service';
import userService from 'src/services/user-service';

const Chat: React.FC<ChatProps> = ({ navigation, route }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [receiver, setReceiver] = useState({} as any);
  const { theme } = useTheme();
  const { StatusBarManager } = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const styles = useMemo(() => createStyles(theme, STATUSBAR_HEIGHT), [theme]);
  const { fontSize } = useFontSize();
  const fontSizeValue = fontSize.value;
  const { wallpaper } = useWallpaper();
  const { authUser } = useAuthContext();
  const [meId, setMeId] = useState<string>('');

  useEffect(() => {
    const getUser = async () => {
      try {
        if (authUser) {
          const response: Response = await userService.getUser(
            authUser.toString(),
            route.params.receiverId
          );

          if (response.success) {
            setReceiver(response.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [receiver, setReceiver]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (authUser) {
          const response: Response = await chatService.getMessages(
            authUser.toString(),
            route.params.receiverId
          );
          if (response.success) {
            setMessages(response.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    getMessages();
  }, [messages, setMessages]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (authUser) {
      const decode: { _id: string } = jwtDecode(authUser.toString());
      setMeId(decode._id);
    }
  }, [authUser]);

  const renderItem = (message: Message) => {
    return (
      <View
        key={message.id}
        style={[
          styles.shadow,
          styles.message,
          message.senderId === meId ? styles.myMessage : styles.theirMessage,
        ]}
      >
        <Text style={[styles.text, { fontSize: fontSizeValue }]}>{message.message}</Text>
        <Text
          style={[
            styles.timestamp,
            message.senderId === meId ? styles.myTimestamp : styles.theirTimestamp,
          ]}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <View style={[styles.container, { backgroundColor: wallpaper.color }]}>
        <BackHeaderWithImage
          user={receiver}
          componentSize={{ height: 95 }}
          icon={<ArrowIcon width={30} height={30} direction="left" />}
          onPressIcon={() => navigation.goBack()}
          imageComponentSize={{ height: 50, width: 50 }}
          onPressHeader={() => navigation.navigate('UserProfile', { user: receiver })}
        />

        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
          style={styles.messageList}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => renderItem(message))}
        </ScrollView>
        <SendInput receiverId={route.params.receiverId} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;

const createStyles = (theme: Theme, STATUSBAR_HEIGHT: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      paddingTop: STATUSBAR_HEIGHT,
    },
    messageList: {
      width: '100%',
      height: '100%',
      paddingHorizontal: 15,
      paddingBottom: 5,
    },
    message: {
      marginVertical: 5,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 15,
    },
    myMessage: {
      backgroundColor: Colors.primaryColors.linearGradient2,
      alignSelf: 'flex-end',
    },
    theirMessage: {
      backgroundColor: Colors.primaryColors.linearGradient1,
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
    myTimestamp: {
      textAlign: 'right',
    },
    theirTimestamp: {
      textAlign: 'left',
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
