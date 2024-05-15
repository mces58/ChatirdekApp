import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Chat from 'src/screens/Chat/Chat';
import Home from 'src/screens/Chat/Home';
import Profile from 'src/screens/Group/Profile';
import Login from 'src/screens/Login/Login';
import Onboarding from 'src/screens/Onboarding/Onboarding';
import Setting from 'src/screens/Setting/Setting';
import Search from 'src/screens/Update/Search';

import BottomTabNavigator from './BottomTabBar';
import HomeStack from './HomeStack';
import { RootStackParamList } from './RootStackParamList';

interface AppNavigatorProps {}

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC<AppNavigatorProps> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Onboarding"
      >
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={BottomTabNavigator} />
        <Stack.Screen name="HomeStack" component={HomeStack} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
