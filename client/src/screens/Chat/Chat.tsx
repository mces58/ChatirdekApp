import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import axios from 'axios';

import ArrowIcon from 'src/assets/icons/arrow';
import BackHeaderWithImage from 'src/components/headers/BackHeaderWithImage';
import SendInput from 'src/components/inputs/SendInput';
import { Colors } from 'src/constants/color/colors';
import { Message } from 'src/constants/types/message';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { ChatProps } from 'src/navigations/RootStackParamList';
import { BASE_URL } from 'src/services/baseUrl';

const Chat: React.FC<ChatProps> = ({ navigation, route }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const [receiver, setReceiver] = useState({} as any);
  //const { authUser } = useAuthContext();
  const { theme } = useTheme();
  const { StatusBarManager } = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const styles = useMemo(() => createStyles(theme, STATUSBAR_HEIGHT), [theme]);

  const handleInputText = (text: string) => {
    setInputMessage(text);
  };

  const sendMessage = async () => {
    if (inputMessage.trim()) {
      try {
        const messageInfo = {
          senderId: route.params.userId,
          message: inputMessage,
          receiverId: route.params.receiverId,
        };

        const response = await axios.post(
          `${BASE_URL}/messages/send/${messageInfo.receiverId}`,
          messageInfo
        );

        const newMessage = {
          _id: response.data._id,
          text: response.data.message,
          createdAt: response.data.createdAt,
          user: {
            _id: response.data.senderId,
          },
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);

        setInputMessage('');
      } catch (error: any) {
        if (error.response && error.response.status === 403) {
          Alert.alert('Error', 'You can only send messages to your friends.');
          setInputMessage('');
        } else {
          console.error(error);
        }
      }
    }
  };
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`${BASE_URL}/messages/${route.params.receiverId}`);
      const messages = response.data.map((message: any) => {
        return {
          _id: message._id,
          text: message.message,
          createdAt: message.createdAt,
          user: {
            _id: message.senderId,
          },
        };
      });

      setMessages(messages);
    };
    getUser();
  }, [messages, setMessages]);

  useEffect(() => {
    const getUserProfile = async () => {
      const response = await axios.get(`${BASE_URL}/users/${route.params.receiverId}`);
      setReceiver(response.data);
    };
    getUserProfile();
  }, [receiver, setReceiver]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      console.log('keyboard is shown');

      scrollViewRef.current?.scrollToEnd({ animated: true });
    });

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const renderItem = (message: Message) => {
    return (
      <View
        key={message._id}
        style={[
          styles.shadow,
          message.user._id === route.params.receiverId
            ? styles.theirMessage
            : styles.myMessage,
        ]}
      >
        <Text style={styles.text}>{message.text}</Text>
        <Text
          style={[
            styles.timestamp,
            message.user._id === route.params.userId
              ? styles.myTimestamp
              : styles.theirTimestamp,
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
      <View style={styles.container}>
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
        <SendInput
          inputMessage={inputMessage}
          handleInputText={handleInputText}
          sendMessage={sendMessage}
        />
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
      fontSize: 14,
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
