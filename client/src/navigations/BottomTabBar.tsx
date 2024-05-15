import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';

import {
  ChatIcon,
  GroupIcon,
  NewIcon,
  SettingIcon,
  UpdateIcon,
} from 'src/assets/icons/bottom-tabs';
import Home from 'src/screens/Chat/Home';
import Profile from 'src/screens/Group/Profile';
import Setting from 'src/screens/Setting/Setting';
import Search from 'src/screens/Update/Search';
import { GetGradientStartEnd } from 'src/utils/rotate';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(0.9, { duration: 1000 }),
        withTiming(1.1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: insets.bottom,
          left: 0,
          right: 0,
          height: Platform.OS === 'ios' ? 90 : 90,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          ...styles.shadow,
          width: width,
        },
        tabBarBackground: () => {
          return (
            <LinearGradient
              colors={['#FFCCDD', '#FFA07A', '#FF6347', '#FF4500', '#FF0000']}
              {...GetGradientStartEnd(180)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: Platform.OS === 'ios' ? 90 : 90,
                backgroundColor: 'red',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
          );
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ gap: 1 }}>
                <ChatIcon width={30} height={30} color={focused ? 'white' : 'gray'} />
                {focused && (
                  <Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
                    Chat
                  </Text>
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Update"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  gap: 1,
                }}
              >
                <UpdateIcon width={30} height={30} color={focused ? 'white' : 'gray'} />
                {focused && (
                  <Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
                    Update
                  </Text>
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Post"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Animated.View
                style={[
                  focused ? animatedStyle : {},
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#2E3A59',
                    height: Platform.OS === 'ios' ? 70 : 70,
                    width: Platform.OS === 'ios' ? 70 : 70,
                    top: Platform.OS === 'ios' ? -35 : -30,
                    borderRadius: 50,
                    borderWidth: 3,
                    borderColor: 'transparent',
                  },
                ]}
              >
                <NewIcon width={30} height={30} color={focused ? 'white' : 'gray'} />
              </Animated.View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Group"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  gap: 1,
                }}
              >
                <GroupIcon width={30} height={30} color={focused ? 'white' : 'gray'} />
                {focused && (
                  <Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
                    Group
                  </Text>
                )}
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  gap: 1,
                }}
              >
                <SettingIcon width={30} height={30} color={focused ? 'white' : 'gray'} />
                {focused && (
                  <Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
                    Setting
                  </Text>
                )}
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
