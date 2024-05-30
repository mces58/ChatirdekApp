import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
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
import { useAuthContext } from 'src/context/AuthContext';
import { BASE_URL } from 'src/services/baseUrl';

interface GroupChatRouteProps {
  groupId: string;
}

interface GroupChatProps {
  navigation: any;
  route: RouteProp<Record<string, GroupChatRouteProps>, string>;
}

const GroupChat: React.FC<GroupChatProps> = ({ navigation, route }) => {
  const { authUser } = useAuthContext();
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([] as any[]);
  const [inputMessage, setInputMessage] = useState('');
  const [group, setGroup] = useState({} as any);

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

        setMessages((prevMessages) => [...prevMessages, newMessage]);

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

  const renderItem = ({ item, index }) => {
    const sender = participants.find((participant) => participant._id === item.senderId);

    const isCurrentUser = authUser?._id === item.senderId;

    return (
      <View
        key={index}
        style={[
          {
            padding: 10,
            borderRadius: 10,
            marginVertical: 5,
            marginHorizontal: 10,
            alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
            backgroundColor: isCurrentUser ? '#DCF8C6' : '#f0f0f0',
          },
        ]}
      >
        <Text>{item.message}</Text>
        <Text style={{ fontSize: 10, color: '#555' }}>
          {new Date(item.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
        <Text style={{ fontSize: 12, color: '#555' }}>
          {isCurrentUser ? 'You' : sender?.fullName}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        style={{
          width: '100%',
          backgroundColor: '#499dff',
          borderBottomWidth: 1,
          borderBottomColor: '#f2f2f2',
          paddingTop: 32,
          paddingBottom: 16,
          paddingHorizontal: 16,
        }}
        onPress={() => navigation.navigate('GroupInfo', { groupId: group._id })}
      >
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowIcon width={30} height={30} color="white" direction="left" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            {group.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            paddingLeft: 30,
            marginTop: 5,
          }}
        >
          {group?.members?.length > 3
            ? group?.members?.slice(0, 3)?.map((user, index) =>
                authUser?._id === user._id ? (
                  <Text
                    key={index}
                    style={{
                      color: 'white',
                    }}
                  >
                    You {index === 2 ? '...' : ','}
                  </Text>
                ) : (
                  <Text
                    key={index}
                    style={{
                      color: 'white',
                    }}
                  >
                    {user.fullName}
                    {index === 2 ? '...' : ','}
                  </Text>
                )
              )
            : group.members?.map((user, index) =>
                authUser?._id === user._id ? (
                  <Text
                    key={index}
                    style={{
                      color: 'white',
                    }}
                  >
                    You{index === group.members?.length - 1 ? '' : ','}
                  </Text>
                ) : (
                  <Text
                    key={index}
                    style={{
                      color: 'white',
                    }}
                  >
                    {user.fullName}
                    {index === group.members?.length - 1 ? '' : ','}
                  </Text>
                )
              )}
        </View>
      </TouchableOpacity>

      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        style={styles.messageList}
        showsVerticalScrollIndicator={false}
      >
        {messages?.map((item, index) => renderItem({ item, index }))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
          placeholder="Type your message"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default GroupChat;

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
    width: '100%',
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
