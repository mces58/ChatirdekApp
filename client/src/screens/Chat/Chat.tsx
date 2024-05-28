import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { RouteProp } from '@react-navigation/native';
import axios from 'axios';

import ArrowIcon from 'src/assets/icons/arrow';
import { BASE_URL } from 'src/services/baseUrl';

type ChatRouteProps = {
  userId: string;
  receiverId: string;
};

type ChatProps = {
  navigation: any;
  route: RouteProp<Record<string, ChatRouteProps>, string>;
};

const Chat: React.FC<ChatProps> = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const [receiver, setReceiver] = useState({} as any);
  //const { authUser } = useAuthContext();

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
      } catch (error) {
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

  const renderItem = ({ item }) => {
    return (
      <View
        key={item._id}
        style={
          item.user._id === route.params.receiverId
            ? styles.theirMessage
            : styles.myMessage
        }
      >
        <Text>{item.text}</Text>
        <Text
          style={[
            styles.timestamp,
            item.user._id === route.params.userId
              ? styles.myTimestamp
              : styles.theirTimestamp,
          ]}
        >
          {new Date(item.createdAt).toLocaleTimeString([], {
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
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowIcon width={30} height={30} color="black" direction="left" />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: receiver.profilePicture }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
            <Text>{receiver.fullName}</Text>
          </View>
        </View>

        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
          style={styles.messageList}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((item) => renderItem({ item }))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputMessage}
            onChangeText={handleInputText}
            placeholder="Type your message"
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    marginTop: 50,
  },
  messageContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
  },
  myMessage: {
    backgroundColor: 'lightblue',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  theirTimestamp: {
    textAlign: 'left',
  },
  myTimestamp: {
    textAlign: 'right',
  },
  messageList: {
    paddingHorizontal: 10,
    backgroundColor: 'red',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    gap: 10,
  },
});
