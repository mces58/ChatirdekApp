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
import AudioPlayer from 'src/components/message/AudioPlayer';
import ImageMessage from 'src/components/message/ImageMessage';
import { Colors } from 'src/constants/color/colors';
import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';
import { Message } from 'src/constants/types/message';
import { useAuthContext } from 'src/context/AuthContext';
import { useFontSize } from 'src/context/FontSizeContext';
import { useSocket } from 'src/context/SocketContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { useWallpaper } from 'src/context/WallpaperContext';
import { decryptMessage, decryptSessionKey } from 'src/e2e/encryption';
import { getPrivateKey } from 'src/e2e/savePrivateKey';
import SendInput from 'src/forms/SendInput';
import { ChatProps } from 'src/navigations/RootStackParamList';
import {
  getMessagesWithUser,
  isMessagesInLocalStorage,
} from 'src/storages/message-storage';

const Chat: React.FC<ChatProps> = ({ navigation, route }) => {
  const { messages, getMessages } = useSocket();
  const scrollViewRef = useRef<ScrollView>(null);
  const { theme } = useTheme();
  const { StatusBarManager } = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const styles = useMemo(() => createStyles(theme, STATUSBAR_HEIGHT), [theme]);
  const { fontSize } = useFontSize();
  const fontSizeValue = fontSize.value;
  const { wallpaper } = useWallpaper();
  const { authUser } = useAuthContext();
  const [meId, setMeId] = useState<string>('');
  const [decryptedMessages, setDecryptedMessages] = useState<string[]>([]);
  const [messagesFromStorage, setMessagesFromStorage] = useState<any[]>([]);

  useEffect(() => {
    getMessages(meId, route.params.receiverId);
  }, [meId, route.params.receiverId, messages.messages]);

  useEffect(() => {
    const getPrivateKeyAndDecrypt = async () => {
      const privateKey = await getPrivateKey();
      if (!privateKey) return;
      setDecryptedMessages(
        messages?.messages?.map((message) => {
          if (message.audio || message.image) return '';

          const splitMessage = message?.message?.split(':');
          const [encryptedMessage, encryptSessionKey] = splitMessage;
          const decryptedSessionKey = decryptSessionKey(encryptSessionKey, privateKey);

          const decryptedMessage = decryptMessage(
            encryptedMessage.toString(),
            decryptedSessionKey || encryptSessionKey
          );

          return decryptedMessage;
        }) || []
      );
    };

    getPrivateKeyAndDecrypt();
  }, [messages.receiver, messages.messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      const isLocal = await isMessagesInLocalStorage();
      if (isLocal) {
        setMessagesFromStorage(await getMessagesWithUser(route.params.receiverId, meId));
      } else {
        setMessagesFromStorage(decryptedMessages);
      }
    };

    fetchMessages();
  }, [route.params.receiverId]);

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

  const renderItem = (message: Message, index: number) => {
    const isLastMessage = index === messages.messages?.length - 1;
    const isTheirLastMessage = isLastMessage && message.senderId !== meId;
    const isMyLastMessage = isLastMessage && message.senderId === meId;

    return (
      <View
        key={message.id}
        style={[
          styles.shadow,
          styles.message,
          message.audio ? { width: '70%' } : {},
          isMyLastMessage ? styles.myLastMessage : {},
          isTheirLastMessage ? styles.theirLastMessage : {},
          message.senderId === meId ? styles.myMessage : styles.theirMessage,
        ]}
      >
        {message.image ? (
          <ImageMessage uri={message.image} />
        ) : message.audio ? (
          <AudioPlayer audioUrl={message.audio} />
        ) : (
          <Text style={[styles.text, { fontSize: fontSizeValue }]}>
            {messagesFromStorage.length > 0
              ? messagesFromStorage[index].message
              : decryptedMessages[index]}
          </Text>
        )}
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
          user={messages?.receiver || route.params.receiver}
          componentSize={{ height: ScaleVertical(85) }}
          icon={
            <ArrowIcon
              width={ScaleHorizontal(30)}
              height={ScaleVertical(30)}
              direction="left"
            />
          }
          onPressIcon={() => navigation.goBack()}
          imageComponentSize={{ width: ScaleHorizontal(40), height: ScaleVertical(40) }}
          onPressHeader={() =>
            navigation.navigate('UserProfile', {
              user: messages?.receiver || route.params.receiver,
            })
          }
        />

        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
          style={styles.messageList}
          showsVerticalScrollIndicator={false}
        >
          {messages && messages.messages?.length > 0
            ? messages.messages.map((message, index) => renderItem(message, index))
            : null}
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
      paddingHorizontal: ScaleHorizontal(12),
      paddingBottom: ScaleVertical(5),
    },
    message: {
      marginVertical: ScaleVertical(5),
      paddingHorizontal: ScaleHorizontal(12),
      paddingVertical: ScaleVertical(8),
      borderRadius: ScaleHorizontal(15),
    },
    myMessage: {
      backgroundColor: Colors.primaryColors.linearGradient2,
      alignSelf: 'flex-end',
    },
    myLastMessage: {
      borderRadius: 0,
      borderBottomLeftRadius: ScaleHorizontal(15),
      borderTopRightRadius: ScaleHorizontal(15),
      borderTopLeftRadius: ScaleHorizontal(15),
    },
    theirMessage: {
      backgroundColor: Colors.primaryColors.linearGradient1,
      alignSelf: 'flex-start',
    },
    theirLastMessage: {
      borderRadius: 0,
      borderBottomRightRadius: ScaleHorizontal(15),
      borderTopRightRadius: ScaleHorizontal(15),
      borderTopLeftRadius: ScaleHorizontal(15),
    },
    text: {
      fontFamily: 'Poppins-Regular',
      color: Colors.primaryColors.dark,
      textAlign: 'left',
    },
    timestamp: {
      fontSize: ScaleFontSize(9),
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
