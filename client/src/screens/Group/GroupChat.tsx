import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import axios from 'axios';

import ArrowIcon from 'src/assets/icons/arrow';
import BackHeaderWithUsers from 'src/components/headers/BackHeaderWithUsers';
import SendInput from 'src/components/inputs/SendInput';
import { Colors } from 'src/constants/color/colors';
import { GroupMessage } from 'src/constants/types/group-message';
import { AuthUser, User } from 'src/constants/types/user';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { GroupChatProps } from 'src/navigations/RootStackParamList';
import { BASE_URL } from 'src/services/baseUrl';

const GroupChat: React.FC<GroupChatProps> = ({ navigation, route }) => {
  const { authUser } = useAuthContext();
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [participants, setParticipants] = useState<User[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [group, setGroup] = useState({} as any);
  const { theme } = useTheme();
  const { StatusBarManager } = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const styles = useMemo(() => createStyles(theme, STATUSBAR_HEIGHT), [theme]);

  const getGroup = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/groups/${route.params.groupId}`);
      setGroup(res.data.group);
    } catch (error) {
      console.error(error);
    }
  };

  const getMessages = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/groups/${route.params.groupId}/messages`);
      setMessages(res.data.groupMessages);
      setParticipants(res.data.participants);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async () => {
    if (inputMessage.trim()) {
      try {
        const messageInfo = {
          senderId: authUser?._id,
          message: inputMessage,
        };

        const response = await axios.post(
          `${BASE_URL}/groups/${group._id}/messages`,
          messageInfo
        );

        const newMessage = {
          _id: response.data._id,
          message: response.data.message,
          createdAt: response.data.createdAt,
          senderId: response.data.senderId,
        };

        setMessages((prevMessages: GroupMessage[]) => [
          ...prevMessages,
          newMessage as GroupMessage,
        ]);

        setInputMessage('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getGroup();
  }, [group, setGroup]);

  useEffect(() => {
    getMessages();
  }, [messages, setMessages]);

  const renderItem = (message: GroupMessage, index: number) => {
    const sender = participants.find(
      (participant) => participant._id === message.senderId
    );

    const isCurrentUser = authUser?._id === message.senderId;

    return (
      <View
        key={index}
        style={
          isCurrentUser
            ? [styles.myMessage, styles.shadow]
            : [styles.theirMessage, styles.shadow]
        }
      >
        <Text style={styles.text}>{message.message}</Text>
        <Text
          style={[
            styles.timestamp,
            isCurrentUser ? styles.myTimestamp : styles.theirTimestamp,
          ]}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
        <Text style={styles.timestamp}>{isCurrentUser ? 'You' : sender?.fullName}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BackHeaderWithUsers
        authUser={authUser as AuthUser}
        group={group}
        icon={<ArrowIcon width={30} height={30} direction="left" />}
        onPressHeader={() => navigation.navigate('GroupInfo', { groupId: group._id })}
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
        {messages?.map((message, index) => renderItem(message, index))}
      </ScrollView>

      <SendInput
        inputMessage={inputMessage}
        handleInputText={setInputMessage}
        sendMessage={sendMessage}
      />
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
