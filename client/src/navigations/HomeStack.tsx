// HomeStack.tsx
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Chat from 'src/screens/Chat/Chat';
import Home from 'src/screens/Chat/Home';

import { RootStackParamList } from './RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default HomeStack;
