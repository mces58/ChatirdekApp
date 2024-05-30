import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Chat from 'src/screens/Chat/Chat';
import UserProfile from 'src/screens/Discover/UserProfile';
import GroupChat from 'src/screens/Group/GroupChat';
import GroupInfo from 'src/screens/Group/GroupInfo';
import Login from 'src/screens/Login/Login';
import Register from 'src/screens/Login/Register';
import Onboarding from 'src/screens/Onboarding/Onboarding';
import Profile from 'src/screens/Setting/Profile';

import BottomTabNavigator from './BottomTabBar';
import { RootStackParamList } from './RootStackParamList';

interface AppNavigatorProps {}

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC<AppNavigatorProps> = () => {
  // const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(false);

  // useEffect(() => {
  //   const checkIfFirstLaunch = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem('alreadyLaunched');

  //       if (value === null) {
  //         await AsyncStorage.setItem('hasOnboarded', 'true');
  //         setIsFirstLaunch(true);
  //       } else {
  //         setIsFirstLaunch(false);
  //       }
  //     } catch (error) {
  //       console.log('error', error);
  //     }
  //   };

  //   checkIfFirstLaunch();
  // }, []);

  // if (isFirstLaunch === false) {
  //   return <Onboarding navigation={undefined} />;
  // }

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
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Main" component={BottomTabNavigator} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="GroupChat" component={GroupChat} />
        <Stack.Screen name="GroupInfo" component={GroupInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
