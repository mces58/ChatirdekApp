import AsyncStorage from '@react-native-async-storage/async-storage';

import { Message } from 'src/constants/types/message';

const MESSAGES_KEY = 'chat_messages';

export const generateUniqueId = (): string => {
  return Math.random().toString(36).slice(0, 8);
};

export const saveMessageLocal = async (message: any): Promise<void> => {
  try {
    const messages = await getMessagesLocal();
    messages.push(message);
    await AsyncStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  } catch (e) {
    console.error('Failed to save message', e);
  }
};

export const getMessagesLocal = async (): Promise<any[]> => {
  try {
    const messagesJson = await AsyncStorage.getItem(MESSAGES_KEY);
    return messagesJson ? JSON.parse(messagesJson) : [];
  } catch (e) {
    console.error('Failed to fetch messages', e);
    return [];
  }
};

export const getMessagesWithUser = async (
  userId: string,
  currentUserId: string
): Promise<Message[]> => {
  try {
    const messagesJson = await AsyncStorage.getItem(MESSAGES_KEY);
    const messages: Message[] = messagesJson ? JSON.parse(messagesJson) : [];

    return messages.filter(
      (msg) =>
        (msg.senderId === userId && msg.receiverId === currentUserId) ||
        (msg.senderId === currentUserId && msg.receiverId === userId)
    );
  } catch (e) {
    console.error('Failed to fetch messages', e);
    return [];
  }
};

export const clearMessageLocal = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(MESSAGES_KEY);
    console.log('AsyncStorage cleared successfully');
  } catch (e) {
    console.error('Failed to clear AsyncStorage', e);
  }
};

export const isMessagesInLocalStorage = async (): Promise<boolean> => {
  try {
    const messagesJson = await AsyncStorage.getItem(MESSAGES_KEY);
    return messagesJson !== null;
  } catch (e) {
    console.error('Failed to check local storage', e);
    return false;
  }
};
