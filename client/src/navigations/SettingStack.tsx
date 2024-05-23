import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from 'src/screens/Setting/Profile';

import { RootStackParamList } from './RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SettingStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default SettingStack;
