import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

import { RouteProp } from '@react-navigation/native';

import ArrowIcon from 'src/assets/icons/arrow';

type ChatRouteProps = {
  user: {
    userImg: string;
    isOnline: boolean;
    fullName: string;
    lastMessage: string;
    lastMessageTime: string;
    messageInQueue: number;
  };
};

type ChatProps = {
  navigation: any;
  route: RouteProp<Record<string, ChatRouteProps>, string>;
};

const Chat: React.FC<ChatProps> = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleInputText = (text: string) => {
    setInputMessage(text);
  };

  const renderMessage = (props: any) => {
    const { currentMessage } = props;

    if (currentMessage.user._id === 1) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#007aff',
                marginRight: 10,
                marginVertical: 5,
              },
            }}
            textStyle={{
              right: {
                color: '#fff',
              },
            }}
          />
        </View>
      );
    }
  };

  const submitHandler = () => {
    const message = {
      _id: Math.random().toString(36).substring(7),
      text: inputMessage,
      createdAt: new Date().getTime(),
      user: {
        _id: 1,
      },
    };

    setMessages(
      message.text.length > 0
        ? (previousMessages) => GiftedChat.append(previousMessages, [message])
        : (previousMessages) => previousMessages
    );

    setInputMessage('');
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 16,
          backgroundColor: '#fff',
          borderBottomWidth: 2,
          borderBottomColor: '#f2f2f2',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowIcon width={30} height={30} color="black" direction="left" />
          </TouchableOpacity>

          <View>
            {route.params.user.isOnline && (
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 4,
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'green',
                  zIndex: 10,
                  borderWidth: 1,
                  borderColor: '#fff',
                }}
              />
            )}
            <Image
              source={{ uri: route.params.user.userImg }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginLeft: 10,
              }}
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              {route.params.user.fullName}
            </Text>
            <Text style={{ color: 'gray' }}>
              {route.params.user.isOnline ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'space-around',
          }}
        >
          <Text style={{ color: 'blue' }}>Search</Text>
          <Text style={{ color: 'blue' }}>Profile</Text>
          <Text style={{ color: 'blue' }}>...</Text>
          {/* walpaper, clear chat, media, süreli mesaj */}
        </View>
      </View>

      <GiftedChat
        messages={messages}
        renderInputToolbar={() => {
          return null;
        }}
        user={{ _id: 1 }}
        minInputToolbarHeight={0}
        renderMessage={renderMessage}
      />

      <View style={styles.inputContainer}>
        <View style={styles.inputMessageContainer}>
          <TextInput
            style={styles.inputMessage}
            placeholder="Type a message"
            placeholderTextColor={'#bfbfbf'}
            value={inputMessage}
            onChangeText={handleInputText}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <TouchableOpacity>
              <Text style={{ color: 'blue' }}>camera</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ color: 'blue' }}>file</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={submitHandler}>
            <Text style={{ color: 'blue' }}>send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  inputContainer: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#f2f2f2',
  },
  inputMessageContainer: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    flex: 1,
    paddingHorizontal: 16,
    gap: 10,
  },
  inputMessage: {
    flex: 1,
    color: '#000',
  },
});
